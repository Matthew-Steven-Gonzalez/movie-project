"use strict";

const testbtn = document.getElementById("newMovieButton");

testbtn.addEventListener("click",() => {
    fetch(`https://foregoing-dashing-gibbon.glitch.me/movies`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        })
        .catch(error =>{
            console.log("error");
            console.log(error);
        })
});

function getMovies(){
    fetch(`https://foregoing-dashing-gibbon.glitch.me/movies`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let report = data;
            for (let i = 0; i < report.length; i++) {
                console.log(data[i].title);
                let html = "<div class='card movieCard'>";
                // html += "<div id='moviePoster'></div>";
                html += "<div>";
                html += "<h5 class='text-center'>" + report[i].title + "</h5>";
                html += "</div>";
                html += "</div>";

                $('#movieCards').append(html)
            }
        })
        .catch(error =>{
            console.log("error");
            console.log(error);
        })
}

getMovies();

