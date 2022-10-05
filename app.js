const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
// by id is recommend
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
//  console.log(addMovieModal);
// const backdrop = document.body.firstElementChild;
const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];


const updateUi = () => {
    if(movies.length === 0){
        entryTextSection.style.display = 'block';
    }
    else {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal =()=>{
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');

};

const deleteMovieHandler = (movieId) => {
    let movieIndex =0;
    for (const movie of movies){
        if (movie.id === movieId){
            break;
        }
        movieIndex++;

    }
    movies.splice(movieIndex,1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();

    // listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUi();

}



const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    // /will not work confirmDeletionButton.removeEventListener('click',deleteMovieHandler.bind(null,movieId));
    cancelDeletionButton.removeEventListener('click',closeMovieDeletionModal);
    
    cancelDeletionButton.addEventListener('click',closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click',deleteMovieHandler.bind(null,movieId));
    //deleteMovie(movieId);
    

};

const renderNewMovieElement = (id,title,imageUrl,rating)=>{
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element_image">
    <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element_info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p></div>
    `;
newMovieElement.addEventListener('click',startDeleteMovieHandler.bind(null,id));
const listRoot = document.getElementById('movie-list');
listRoot.append(newMovieElement);

};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const showMovieModel = ()=>  {
        addMovieModal.classList.add('visible');
        toggleBackdrop();
};

const clearMovieInput = () => {
    //userInputs.value = ' ';
    for(const userInput of userInputs){
        userInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
closeMovieModal();
toggleBackdrop();
clearMovieInput();
};

const addMovieHandler = () => {
const titleValue = userInputs[0].value;
const imageUrlValue = userInputs[1].value;
const ratingValue = userInputs[2].value;

if(
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === ''||
    +ratingValue < 1 ||
    +ratingValue >5        
){
    alert('Please enter the valid output');
    return;
};

const newMovie={id: Math.random().toString(),title: titleValue,image: imageUrlValue,rating: ratingValue};

movies.push(newMovie);
console.log(movies);
// toggleMovieModal();
closeMovieModal();

clearMovieInput();
toggleBackdrop();
renderNewMovieElement(newMovie.id,newMovie.title,newMovie.image,newMovie.rating);
updateUi();

};

const backdropClickHandler = () => {
closeMovieModal();
closeMovieDeletionModal();
clearMovieInput();

};
// console.log(addMovieHandler);
// console.log(movies);
startAddMovieButton.addEventListener('click',showMovieModel );
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click',cancelAddMovieHandler );
confirmAddMovieButton.addEventListener('click',addMovieHandler);