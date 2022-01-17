function Movie(title, director, releaseDate) {
    this.title = title;
    this.director = director;
    this.releaseDate = releaseDate;
}

function UI() {}

UI.prototype.addMovieToList = function(movie) {
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

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('director').value = '';
    document.getElementById('release-date').value = '';
}

UI.prototype.deleteMovie = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message, className) {
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

document.getElementById('movie-form').addEventListener('submit', function(e) {
    
        const title = document.getElementById('title').value,
              director = document.getElementById('director').value,
              realeaseDate = document.getElementById('release-date').value

    const movie = new Movie(title, director, realeaseDate);

    const ui = new UI();

    if(title === '' || director === '' || realeaseDate === ''){
        ui.showAlert('Please fill all fields!', 'error');
    } else {
        ui.addMovieToList(movie);

        ui.showAlert('Movie was added to your list', 'success');

        ui.clearFields();
    }

    

    e.preventDefault();
});

document.getElementById('movie-list').addEventListener('click', function(e) {
    console.log(123);

    const ui = new UI();

    ui.deleteMovie(e.target);

    ui.showAlert('Movie was deleted from list', 'success');

    e.preventDefault();
});
