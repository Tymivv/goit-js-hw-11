import './css/styles.css';
import { fetchImg } from './JS/fetchImg';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import axios from 'axios';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const searchQuery = document.querySelector('#searchQuery');
const button = document.querySelector('button ');
const galleryDiv = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const DEBOUNCE_DELAY = 3;
let page = 0;
let isAlertVisible = false;
let totalPages = 1;

btnLoadMore.classList.add("is-hidden");

const serchImg = e => {
    e.preventDefault();
    if (searchQuery.value === '') {
    Notiflix.Notify.info(
    'Sorry, there are no images matching your search query. Please try again.',
    );
    }
    page = 1;
    galleryDiv.innerHTML = '';
    if (searchQuery.value) {
        const name = searchQuery.value.trim();
        return fetchImg(name, page).then(markupList).catch(error);
    }
    btnLoadMore.classList.remove('.is-hidden');
    if (data.totalHits > 0) {
        btnLoadMore.classList.remove('.is-hidden');
    }
    btnLoadMore.classList.remove('.is-hidden');
    };

const onbtnLoadMore = e => {
    e.preventDefault();
    page += 1;

    if (searchQuery.value) {
    const name = searchQuery.value.trim();
    return fetchImg(name, page).then(markupList).catch(error);
    }
    if (page > totalPages) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    galleryDiv.innerHTML = '';
};

function markupList(data) {
    
    const markup = data.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {

        return `<div class="photo-card ">
        <a class="gallery__item" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
    <p class="info-item">
        <b>likes ${likes}</b>
    </p>
    <p class="info-item">
        <b>views ${views}</b>
    </p>
    <p class="info-item">
        <b>comments ${comments}</b>
    </p>
    <p class="info-item">
        <b>downloads ${downloads}</b>
    </p>
    </div>
</div>`;
        })
        .join('');
    galleryDiv.insertAdjacentHTML("beforeend", markup);
        totalPages = data.totalHits;
}



function error() {
    return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    );
}

searchForm.addEventListener('submit', serchImg);
btnLoadMore.addEventListener('click', onbtnLoadMore);

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});