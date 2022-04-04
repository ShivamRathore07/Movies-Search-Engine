var id;
function debounce() {
    if (id) clearTimeout(id);
    id = setTimeout(function () {
        run();
    }, 500);
}



function run() {
    let movie = document.querySelector("#serch").value;
    reQuest(movie);
}
async function reQuest(movie) {
    try {
        let result = await fetch(`https://www.omdbapi.com/?apikey=381f166f&s=${movie}`)
        let data = await result.json();
        display(data.Search);
    } catch (err) {
        console.log(err)
    }
}
function display(data) {
    if (data == undefined) {
        return
    }
    let movies = document.querySelector("#response");
    movies.innerHTML = "";

    for (let s = 0; s < data.length; s++) {
        let div = document.createElement("div")
        div.className = "box1"
        div.addEventListener("click", function () {
            fetchFunction(data[s].Title)
        })

        let box1 = document.createElement("div")

        let box2 = document.createElement("div")

        let imge = document.createElement("img")
        imge.src = data[s].Poster
        if (data[s].Poster == "") {
            continue
        }

        let name = document.createElement("h4")
        name.innerText = data[s].Title

        let type = document.createElement("p")
        type.innerText = data[s].Year

        box1.append(imge);
        box2.append(name, type)
        box2.className = "box2"

        div.append(box1, box2)
        movies.append(div)
    }
}
function fetchFunction(movie) {
    fetch(`https://www.omdbapi.com/?apikey=381f166f&t=${movie}`)
        .then(async function (response) {
            let data2 = await response.json();
            console.log(data2)

            var imge = document.createElement("img")
            imge.src = data2.Poster

            document.querySelector("#b1").innerText = ""
            document.querySelector("#b1").append(imge);

            document.querySelector("#a").innerText =data2.Title
            document.querySelector("#b").innerText =data2.Actors
            document.querySelector("#c").innerText =data2.imdbRating
            document.querySelector("#d").innerText =data2.Plot

            document.querySelector("#e").innerText =data2.Year
           
        })
}