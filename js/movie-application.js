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
    let loader = `<div class="loading text-center"><h1 class="fs-1">Loading</h1></div>`
    document.getElementById('movieCards').innerHTML =loader;
    fetch(`https://foregoing-dashing-gibbon.glitch.me/movies`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let report = data;
            for (let i = 0; i < report.length; i++) {
                console.log(data[i].title);
                let html = "<div class='card movieCard'>";
                // html += "<div id='moviePoster'></div>";
                html += "<h2 class='text-center'>" + report[i].title + "</h2>";
                html += "<img src='" + report[i].image + "' class='image mx-auto ' alt='Movie Poster'>";
                html += "<ul class='list-group '>";
                html += "<li class='list-group-item' id='rating'><div class='rating'>";
                html += "<i class='rating__star far fa-star'></i>"
                html += "<i class='rating__star far fa-star'></i>"
                html += "<i class='rating__star far fa-star'></i>"
                html += "<i class='rating__star far fa-star'></i>"
                html += "<i class='rating__star far fa-star'></i>"
                html += "</div>"
                html += "<div>";
                html += "<h5 class='text-center'>" + report[i].genre + "</h5>";
                html += "</div>";
                html += "</div>";

                $('#movieCards').append(html)
                $('.loading').html("")
            }
        })
        .catch(error =>{
            console.log("error");
            console.log(error);
        })
}


getMovies();

