import './css/styles.css';
import { fetchCountries } from './JS/fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList= document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;


const serchCountries = e => {
    e.preventDefault();
    if (searchBox.value) {
        const name = searchBox.value.trim();
        return fetchCountries(name).then(showCountries).catch(error);
    } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    }
    };

function showCountries(data) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (data.length > 10) {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length >= 2 && data.length <= 10) {
    markupList(data);
    } else if (data.length === 1) {
    markupInfo(data);
    }
}

function markupList(data) {
    const markup = data
    .map(({ name, capital, population, flags }) => {
        return `<li><img src="${flags.svg}" alt="Flag of ${name.common}" width="20"> ${name.common}</li>`;
    })
    .join('');
    countryList.innerHTML = markup;
}

function markupInfo(data) {
    data.map(({ name, capital, population, flags, languages }) => {
    const markup = `<h1><img src="${flags.svg}" alt="Flag of ${name.common}"width="40"> ${
    name.common
    }</h1>
        <li>Capital: ${capital}</li>
        <li>Population: ${population}</li>
        <li>Languages: ${Object.values(languages).join(', ')}</li>`;
    countryInfo.innerHTML = markup;
    });
}

function error() {
    return Notiflix.Notify.failure('Oops, there is no country with that name');
}

searchBox.addEventListener('input', debounce(serchCountries, DEBOUNCE_DELAY));