const form = document.getElementById('movie-form');
const movieId = document.getElementById('movie-id');
const titleInput = document.getElementById('title');
const genreInput = document.getElementById('genre');
const yearInput = document.getElementById('year');
const movieList = document.getElementById('movie-list');
const formTitle = document.getElementById('form-title');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

loadMovies();

// READ
async function loadMovies() {
  const response = await fetch('/api/movies');
  const movies = await response.json();

  movieList.innerHTML = '';

  if (movies.length === 0) {
    movieList.innerHTML = '<p>No movies added yet.</p>';
    return;
  }

  movies.forEach(movie => {
    const item = document.createElement('div');
    item.className = 'movie-item';

    item.innerHTML = `
      <div>
        <h3>${escapeHtml(movie.title)}</h3>
        <p>${escapeHtml(movie.genre)} • ${movie.year}</p>
      </div>
      <div class="buttons">
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      </div>
    `;

    item.querySelector('.edit-button').addEventListener('click', () => {
      startEdit(movie);
    });

    item.querySelector('.delete-button').addEventListener('click', () => {
      deleteMovie(movie.id);
    });

    movieList.appendChild(item);
  });
}

// CREATE or UPDATE
form.addEventListener('submit', async event => {
  event.preventDefault();

  const movie = {
    title: titleInput.value.trim(),
    genre: genreInput.value.trim(),
    year: Number(yearInput.value)
  };

  let response;

  if (movieId.value) {
    response = await fetch(`/api/movies/${movieId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });
  } else {
    response = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });
  }

  if (response.ok) {
    resetForm();
    loadMovies();
  } else {
    alert('Something went wrong.');
  }
});

// Put selected movie into the form
function startEdit(movie) {
  movieId.value = movie.id;
  titleInput.value = movie.title;
  genreInput.value = movie.genre;
  yearInput.value = movie.year;

  formTitle.textContent = 'Edit Movie';
  saveButton.textContent = 'Save Changes';
  cancelButton.classList.remove('hidden');
}

// DELETE
async function deleteMovie(id) {
  const confirmed = confirm('Delete this movie?');
  if (!confirmed) return;

  const response = await fetch(`/api/movies/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    if (movieId.value === String(id)) resetForm();
    loadMovies();
  } else {
    alert('Could not delete the movie.');
  }
}

cancelButton.addEventListener('click', resetForm);

function resetForm() {
  form.reset();
  movieId.value = '';
  formTitle.textContent = 'Add Movie';
  saveButton.textContent = 'Add Movie';
  cancelButton.classList.add('hidden');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
