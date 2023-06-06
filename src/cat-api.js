export const fetchBreeds = function () {
    
    const BASE_URL = 'https://api.thecatapi.com/v1';
    const API_KEY = 'live_r8cF8fWNIWOhCaYZIEsZmvzMxyltUUUJ0l0mg8YAph1MEZG6eQIJS50fOPf9dknd';

    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }

        return resp.json()
    })
}

export const fetchCatByBreed = function (breedId) {
     const API_KEY = 'live_r8cF8fWNIWOhCaYZIEsZmvzMxyltUUUJ0l0mg8YAph1MEZG6eQIJS50fOPf9dknd';
    return fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }

        return resp.json()
    })
}
