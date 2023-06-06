import { fetchBreeds, fetchCatByBreed} from "./cat-api";


const refs = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
    catInfoEl: document.querySelector('.cat-info'),
};


  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        refs.selectEl.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });

refs.selectEl.addEventListener('change', changeOnSelect);


function changeOnSelect(event) {
    event.preventDefault();

    const selectedBreedId = event.target.value;
   
  fetchCatByBreed(selectedBreedId).then(catData => {
    createCatdescription(catData);
    }).catch(err => console.log(err))
}


function createCatdescription(catData) {
  catData.forEach(cat => {
    console.dir(cat)
    refs.catInfoEl.innerHTML = `
        <img src="${cat.url}" alt="Cat Image" width="500">
        <h3>${cat.breeds[0].name}</h3>
        <p>${cat.breeds[0].description}</p>
        <p>Temperament: ${cat.breeds[0].temperament}</p>`;
  })
}



// (event) => {
//   const selectedBreedId = event.target.value;

//   fetchCatByBreed(selectedBreedId)
    // .then(catData => {
    //   catInfoDiv.innerHTML = `
    //     <img src="${catData.url}" alt="Cat Image">
    //     <h3>${catData.breeds[0].name}</h3>
    //     <p>${catData.breeds[0].description}</p>
    //     <p>Temperament: ${catData.breeds[0].temperament}</p>
    //   `;
    // })
//     .catch(error => {
//       console.error('Error fetching cat by breed:', error);
//     });
// });