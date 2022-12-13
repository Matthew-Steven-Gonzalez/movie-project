"use strict";

function getMovies() {
    let loader = `<div class="loading text-center"><h1 class="fs-1">Loading...</h1></div>`
    document.getElementById('movieCards').innerHTML = loader;
    fetch(`https://foregoing-dashing-gibbon.glitch.me/movies`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let report = data;
            for (let i = 0; i < report.length; i++) {
                let html = "<div class='card movieCard col-10 mx-auto'>";
                html += "<h2 class='text-center mt-1' id='MovieTitle'>" + report[i].title + "</h2>";
                html += "<img src='" + report[i].image + "' class='image mx-auto' alt='Movie Poster'>";
                html += "<div>";
                html += "<ul class='list-group'>";
                html += "<li class='list-group-item mx-auto' id='rating'>";
                html += "<div class='rating'>";
                html += "<i class='rating__star far fa-star'></i>"
                html += "<i class='rating__star far fa-star'></i>"
                html += "<i class='rating__star far fa-star'></i>"
                html += "<i class='rating__star far fa-star'></i>"
                html += "<i class='rating__star far fa-star'></i>"
                html += "</div>"
                html += "</div>"
                html += "<div>";
                html += "<h5 class='text-center'>" + report[i].genre + "</h5>";
                html += "<p class='text-center'>" + report[i].plot + " </p>"
                html += "<h6 class='text-center'>" + report[i].director + " </h6>"
                html += "</div>";
                html += "<button class='w-25 mx-auto'>Delete</button>"
                html += "</div>";

                $('#movieCards').append(html)
                $('.loading').html("")
            }
        })
        .catch(error => {
            console.log("error");
            console.log(error);
        })
}

function addAMovie(movie) {
    const url = 'https://foregoing-dashing-gibbon.glitch.me/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    fetch(url, options)
        .then(response => console.log(response)) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

function deleteAMovie(index){
    const url = 'https://foregoing-dashing-gibbon.glitch.me/movies/'+index +'';
    const options = {
        method: 'delete',
    };
    fetch(url, options)
        .then(response => console.log(response)) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

getMovies();

$('#newMovieButton').click((e)=>{
    e.preventDefault();
    let movie ={};
    movie.title = $('#Title').val();
    movie.director = $('#Director').val();
    console.log(movie);
    addAMovie(movie);
})


