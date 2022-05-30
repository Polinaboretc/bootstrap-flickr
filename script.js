const BASE_URL = 'https://www.flickr.com/services/feeds/photos_public.gne?format=json'

function initFlickr() {
    fetch(BASE_URL)
    .then(resp => resp.text())
    .then(result => createCarouselCards(result))
    .catch(error => console.log(error))
}

function cleanJson(text) {
    const cleanedJson1 = text.replace('jsonFlickrFeed(','');
    const cleanedJson2 = cleanedJson1.slice(0, -1);
    const json = JSON.parse(cleanedJson2)
    return json;
} 

function createCarouselCards(result) {
    const parsedResult = cleanJson(result);
    const items = parsedResult.items;

    const template =
        `<img src="#URL" class="centered d-block w-100" alt="#ALT">
        <div class="carousel-caption d-none d-md-block div-background">
        <h5>#TITLE</h5>
        </div>`

    const container = document.getElementById('carousel-container');
    container.innerHTML = '';

    for (let i = 0; i < items.length; i++) {
        
        const item = items[i];
        const div = document.createElement('div');
        div.classList.add("carousel-item");
        if (i === 0) {
            div.classList.add('active');
        }

        const internalHTML = template.replace('#URL', item.media.m)
                                     .replace('#ALT', item.tags)
                                     .replace('#TITLE', item.title)
        div.innerHTML = internalHTML;
        container.appendChild(div)
    }
}

function search() {
    const input = document.getElementById('search-input');
    const searchWords = input.value.trim();
    const tags = searchWords.replaceAll(' ', ',');
    const tagsUrl = BASE_URL + '&tags=' + tags;

    fetch(tagsUrl)
    .then(resp => resp.text())
    .then(result => createCarouselCards(result))
    .catch(error => console.log(error))
}

initFlickr();

