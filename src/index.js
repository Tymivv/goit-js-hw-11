import './css/styles.css';
import { fetchImg } from './JS/fetchImg';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import axios from 'axios';


const searchForm = document.querySelector('#search-form');
const searchQuery = document.querySelector('#searchQuery');
const button = document.querySelector('button ');
const galleryDiv = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const DEBOUNCE_DELAY = 3;
let page = 1;
let isAlertVisible = false;
let totalPages = 1;
console.log(page);

btnLoadMore.classList.add("is-hidden");
const serchImg = e => {
    e.preventDefault();
        if (page > totalPages) {
            return toggleAlertPopup();
        }
    if (searchQuery.value) {
        const name = searchQuery.value.trim();
        return fetchImg(name, page).then(markupList).catch(error);
        page += 1;
    }
    // if (page > 1) {
    //     btnLoadMore.classList.remove('.is-hidden');
    // }

    //galleryDiv.innerHTML = '';
    
    
    };



function markupList(data) {
    totalPages = data.totalHits; 
    console.log(data.totalHits);
    const markup = data.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {

        return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
        <b>${likes}</b>
    </p>
    <p class="info-item">
        <b>${views}</b>
    </p>
    <p class="info-item">
        <b>${comments}</b>
    </p>
    <p class="info-item">
        <b>${downloads}</b>
    </p>
    </div>
</div>`;
        })
        .join('');
    galleryDiv.insertAdjacentHTML("beforeend", markup);
    //galleryDiv.innerHTML = markup;
}



function error() {
    return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    );
}

searchForm.addEventListener('submit', serchImg);

function toggleAlertPopup() {
  if (isAlertVisible) {
    return;
  }
  isAlertVisible = true;
  alertPopup.classList.add('is-visible');
  setTimeout(() => {
      btnLoadMore.classList.add('.is-hidden');
       Notiflix.Notify.failure(
         'Sorry, there are no images matching your search query. Please try again.',
       );
    isAlertVisible = false;
  }, 3000);
}