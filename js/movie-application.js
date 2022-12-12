"use strict";

const searchbtn = document.getElementById("newMovieButton");

searchbtn.addEventListener("click", () => {
    function addAMovie(Title, Director) {
        const reviewObj = {
            title: Title,
            director: Director,
            rating: 5,
            comments: "Please add a review"
        };
        const url = 'https://foregoing-dashing-gibbon.glitch.me/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewObj),
        };
        fetch(url, options)
            .then(response => console.log(response)) /* review was created successfully */
            .catch(error => console.error(error)); /* handle errors */
    }
});

function getMovies() {
    let loader = `<div class="loading text-center"><h1 class="fs-1">Loading...</h1></div>`
    document.getElementById('movieCards').innerHTML = loader;
    fetch(`https://foregoing-dashing-gibbon.glitch.me/movies`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let report = data;
            for (let i = 0; i < report.length; i++) {
                console.log(data[i].title);
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
                html += "<p class='text-center'>" + report[i].comments + " </p>"
                html += "</div>";
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

function addAMovie(Title, Director) {
    const reviewObj = {
        title: Title,
        director: Director
        // rating: 5,
        // comments: "Please add a review"
    };
    const url = 'https://foregoing-dashing-gibbon.glitch.me/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewObj),
    };
    fetch(url, options)
        .then(response => console.log(response)) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

getMovies();
// addAMovie("Troy","Joe Russo");

$('#newMovieButton').click(()=>{
    let movie = {};
    movie.title = $('#Title').value;
    movie.director = $('#Director').value;
    addAMovie(Title,Director);
    getMovies();
})



