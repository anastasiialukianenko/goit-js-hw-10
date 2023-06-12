import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';



const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
    catInfoEl: document.querySelector('.cat-info'),
};

hideError();

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        refs.selectEl.appendChild(option);
      });
      refs.loaderEl.classList.add('hidden');
    })
    .catch(error => {
      showError();
    });

refs.selectEl.addEventListener('change', changeOnSelect);


function changeOnSelect(event) {
    event.preventDefault();

  const selectedBreedId = event.target.value;
   refs.loaderEl.classList.remove('hidden');
   
  fetchCatByBreed(selectedBreedId).then(catData => {
 if (catData.length === 0) {
        showError();
        refs.catInfoEl.innerHTML = '';
    }

    createCatdescription(catData);
    refs.loaderEl.classList.add('hidden');
    }).catch(err => {
       showError();
    })
}

function createCatdescription(catData) {
  catData.forEach(cat => {
    refs.catInfoEl.innerHTML = `
        <img src="${cat.url}" alt="Cat Image" width="500">
        <h3>${cat.breeds[0].name}</h3>
        <p>${cat.breeds[0].description}</p>
        <p>Temperament: ${cat.breeds[0].temperament}</p>`;
  })
}

function hideError() {
  refs.errorEl.classList.add('hidden');
}
function showError() {
  Notiflix.Notify.failure(`${refs.errorEl.textContent}`);
   refs.loaderEl.classList.add('hidden');
}
