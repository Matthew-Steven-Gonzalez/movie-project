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
            for (let i = 0; i < data.length; i += 1) {
                console.log(data[i].title);
                var html = "<div class='card'>";
                html += "<div id='moviePoster'></div>";
                html += "<div>";
                html += "<h5 class=\"card-title\" id=\"title\">`${data[i].title}`</h5>";

                $('#movieCards').html(html)
            }
        })
        .catch(error =>{
            console.log("error");
            console.log(error);
        })
}

getMovies();

