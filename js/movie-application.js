"use strict";
(function(){
    function getMovies() {
        let loader = `<div class="loading text-center"><h1 class="fs-1">Loading...</h1></div>`
        document.getElementById('movieCards').innerHTML = loader;
        fetch(`https://foregoing-dashing-gibbon.glitch.me/movies`)
            .then(resp => resp.json())
            .then(data => {
                let report = data;
                for (let i = 0; i < report.length; i++) {
                    let html = "<div class='card movieCard col-6 mx-auto text-center'>";
                    html += "<h2 class=' mt-1' id='MovieTitle'>" + report[i].title + "</h2>";
                    html += "<img src='" + report[i].image + "' class='image mx-auto' alt='Movie Poster'>";
                    html += "<div>";
                    html += "<h2>" +report[i].rating + " / 10 Potatoes</h2>";
                    html += "<h5 class=''>" + report[i].genre + "</h5>";
                    html += "<p class=''>" + report[i].plot + " </p>"
                    html += "<h6 class='r'>" + report[i].director + " </h6>"
                    html += "</div class=>";
                    html += "<div class='row'>";
                    html += "<button type='button' class='w-25 mx-auto delete' value='"+ i + "'><i class=\"fa-solid fa-trash\"> delete</i></button>"
                    html += "<button type='button' class='w-25 mx-auto edit' data-bs-toggle='modal' data-bs-target='#myModal' value='"+ i + "'><i class=\"fa-solid fa-pen-to-square\"> edit</i></button>"
                    html += "<input type='hidden' class='movie-id' value='" + report[i].id + "'>"
                    html += "</div>"
                    $('#movieCards').append(html)
                    $('.loading').html("")

                }
                // Click function, will delete targeted item
                $(".delete").on("click",function(){
                    deleteAMovie($(this).parent().children().last().val()).then(getMovies);
                })

                // Click function that will create edited object for modal
                $(".edit").on("click",function(){
                    let edit = {};
                    // Prepopulate the title in edit form
                    edit.titles = report[$(this).val()].title;
                    document.getElementById('editTitle').setAttribute('value', edit.titles);
                    // Prepopulate the rating in edit form
                    edit.rating = report[$(this).val()].rating;
                    document.getElementById('editRating').setAttribute('value', edit.rating);
                    // Prepopulate the genres in edit form
                    edit.genres = report[$(this).val()].genre;
                    document.getElementById('editGenres').setAttribute('value', edit.genres);
                    // Prepopulate the director in edit form
                    edit.directors = report[$(this).val()].director;
                    document.getElementById('editDirector').setAttribute('value', edit.directors);
                    edit.plot = report[$(this).val()].plot;
                    document.getElementById('editPlot').setAttribute('value', edit.plot);
                    edit.image = report[$(this).val()].image;
                    document.getElementById('editImage').setAttribute('value', edit.image);
                    edit.id = report[$(this).val()].id;
                    document.getElementById("editId").setAttribute('value',edit.id);
                })

                // Click function, creating new object
                $("#edits").click(function(e){
                    e.preventDefault();
                    let editedMovie = {
                        title:$("#editTitle").val(),
                        rating:$("#editRating").val(),
                        genre:$("#editGenres").val(),
                        director:$("#editDirector").val(),
                        plot:$("#editPlot").val(),
                        image:$("#editImage").val()
                    };
                    // Pushing new object to server
                    editAMovie($("#editId").val(),editedMovie).then(getMovies);
                })
            })
            .catch(error => {
                console.log("error");
                console.log(error);
            })
    }

    // This function adds new object(Movie) to server
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
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    // Deletes object(Movie) from our server
    function deleteAMovie(index){
        const url = 'https://foregoing-dashing-gibbon.glitch.me/movies/'+index +'';
        const options = {
            method: 'DELETE',
        };
        return fetch(url, options)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    // This function runs a patch that updates object in our database
    function editAMovie(index, modMovie){
        const url = 'https://foregoing-dashing-gibbon.glitch.me/movies/'+ index +'';
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(modMovie)
        };
        return fetch(url, options)
    }
    getMovies();

    // Creates movie object, then runs function "addAMovie" to add new object to our server
    $('#newMovieButton').click((e)=>{
        e.preventDefault();
        let movie ={};
        movie.title = $('#Title').val();
        movie.rating = $('#Rating').val();
        movie.director = $('#Director').val();
        movie.genre = $('#Genres').val();
        movie.plot = $('#Plot').val();
        movie.image = $('#Image').val();
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
})();



