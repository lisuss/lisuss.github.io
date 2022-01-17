class Movie {
    constructor(title, director, releaseDate) {
        this.title = title;
        this.director = director;
        this.releaseDate = releaseDate;
    } 
}

class UI {
    addMovieToList(movie) {
        const list = document.getElementById('movie-list');

        const row = document.createElement('tr');
    
        row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.director}</td>
        <td>${movie.releaseDate}</td>
        <td><a href="#" class="delete">X<a></td>
        `;
    
        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#movie-form');
        container.insertBefore(div, form);

        setTimeout(function(){
             document.querySelector('.alert').remove();
        }, 5000);
    }

    deleteMovie(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('director').value = '';
        document.getElementById('release-date').value = '';
    }
}

class Store {
    static getMovies() {
        let movies;
        if(localStorage.getItem('movies') === null) {
          movies = [];
        } else {
          movies = JSON.parse(localStorage.getItem('movies'));
        }
    
        return movies;
      }

    static displayMovies() {
        const movies = Store.getMovies();

        movies.forEach(function(movie) {
            const ui = new UI();

            ui.addMovieToList(movie);

        });
    }

    static addMovie(movie) {
        const movies = Store.getMovies();
  
        movies.push(movie);
    
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    static removeMovie(title) {
        const movies = Store.getMovies();

        movies.forEach(function(movie, index) {
            if(movie.title === title) {
                movies.splice(index, 1);
            }  

        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }

}
document.addEventListener('DOMContentLoaded', Store.displayMovies);

document.addEventListener('DOMContentLoaded', Store.displayMovies);

document.getElementById('movie-form').addEventListener('submit', function(e) {
    
    const title = document.getElementById('title').value,
          director = document.getElementById('director').value,
          releaseDate = document.getElementById('release-date').value

const movie = new Movie(title, director, releaseDate);

const ui = new UI();

console.log(ui);

if(title === '' || director === '' || releaseDate === ''){
    ui.showAlert('Please fill all fields!', 'error');
} else {
    ui.addMovieToList(movie);

    Store.addMovie(movie);

    ui.showAlert('Movie was added to your list', 'success');

    ui.clearFields();
    }



e.preventDefault();
});

document.getElementById('movie-list').addEventListener('click', function(e) {

const ui = new UI();

ui.deleteMovie(e.target);

Store.removeMovie
(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

ui.showAlert('Movie was deleted from list', 'success');

e.preventDefault();
});