myImageAPIKey = '45685829-8006e5c09d93e3ce431f01729';
ressourceURL = 'https://pixabay.com/api/';

async function findImage (image) {
    let queryString = `?key=${myImageAPIKey}&q=${image}`;
    let response = await fetch(ressourceURL + queryString);
    if (!response.ok) throw new Error ("Error while fetching the ressource.");     
    else {
        let data = await response.json();
        return data.hits[0].webformatURL;
    } 
}

