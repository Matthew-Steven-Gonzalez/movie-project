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
                let html = "<div class='card movieCard col-10 mx-auto text-center'>";
                html += "<h2 class=' mt-1' id='MovieTitle'>" + report[i].title + "</h2>";
                html += "<img src='" + report[i].image + "' class='image mx-auto' alt='Movie Poster'>";
                html += "<div>";
                html += "<h2>" +report[i].rating + " / 10 Potatoes</h2>";
                html += "<h5 class=''>" + report[i].genre + "</h5>";
                html += "<p class=''>" + report[i].plot + " </p>"
                html += "<h6 class='r'>" + report[i].director + " </h6>"
                html += "</div class=>";
                html += "<div class='row'>";
                html += "<button type='button' class='w-25 mx-auto delete' value='"+ report[i].id + "'><i class=\"fa-solid fa-trash\"> delete</i></button>"
                html += "<button type='button' class='w-25 mx-auto edit' data-bs-toggle='modal' data-bs-target='#exampleModal' value='"+ report[i].id + "'><i class=\"fa-solid fa-pen-to-square\"> edit</i></button>"
                html += "</div>"
                $('#movieCards').append(html)
                $('.loading').html("")

            }
            $(".delete").on("click",function(){
                // $(this).css("background","red");
                console.log($(this).val());
                deleteAMovie($(this).val());

            })
            $(".edit").on("click",function(){
                // $(this).css("background","red");
                console.log($(this).val());
                let title = report[$(this).val()-1].title;
                document.getElementById('editTitle').setAttribute('value', title);


            })
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
    return fetch(url, options)
        .then(response => console.log(response)) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

function deleteAMovie(index){
    const url = 'https://foregoing-dashing-gibbon.glitch.me/movies/'+index +'';
    const options = {
        method: 'delete',
    };
    return fetch(url, options)
        .then(response => console.log(response)) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

getMovies();

$('#newMovieButton').click((e)=>{
    e.preventDefault();
    let movie ={};
    movie.title = $('#Title').val();
    movie.rating = $('#Rating').val();
    movie.director = $('#Director').val();
    movie.genre = $('#Genres').val();
    console.log(movie);
    addAMovie(movie).then(getMovies);

})

// OMDb API GET Request
$(document).ready(function (){

    $('#searchButton').submit(function (e){
        e.preventDefault()
        let movie = $('#movieSearch').val();
        let url = `http://www.omdbapi.com/?`

        $.ajax({
            method: 'GET',
            url: `${url}t=${movie}&apikey=${OMDKEY}`,
        }).done(function (data){
            console.log(data);
            let movie = data;
            console.log(movie.plot);
        })
    })
})



