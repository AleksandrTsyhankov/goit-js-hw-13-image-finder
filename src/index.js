import './sass/main.scss';
import GalleryApiService from './apiService'
import galleryCardsTpl from './templates/galleryCards';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { alert, error } from '@pnotify/core';


const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('#load-more-button'),
}

const galleryApiService = new GalleryApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function smoothScrolling() {
    const element = document.getElementById('load-more-button');
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function onSearch(e) {
    e.preventDefault();

    galleryApiService.query = e.currentTarget.elements.query.value;
    if (!galleryApiService.query) return alertMsgEmptyRequest();
    galleryApiService.resetPage();
    galleryApiService.fetchArticles();
    galleryApiService.fetchArticles().then(hits => {
        clearGallery();
        appendGalleryMarkup(hits);

        if (hits.length === 0) {
            alertMsg()
        } else {
            refs.loadMoreBtn.classList.remove('is-hidden');
        }
    }).catch(errortMsg);
}

function onLoadMore() {
    galleryApiService.fetchArticles().then(hits =>  {
        appendGalleryMarkup(hits);
        smoothScrolling();
        });
}

function appendGalleryMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryCardsTpl(hits));
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function alertMsg() {
    alert({
        text: "По Вашему запросу ничего не найдено."
    });
}

function alertMsgEmptyRequest() {
    alert({
        text: "Введите Ваш запрос."
    });
}

function errortMsg() {
    error({
        text: "Что-то пошло не так."
    });
}






/*

console.log(gallery)
function onQueryToPixabay(event) {
    // console.log(event.currentTarget.elements.query.value)
    const searchQuery = inputForm.value;

    if (searchQuery === '') {
        resetPage();
        return alertMsg();
    }

    fetch(`${refs.baseUrl}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${refs.pageNumber}&per_page=12&key=${refs.key}`)
        .then(result => result.json())
        .then(data => {
            loadMoreBtn.removeAttribute('disabled')
            incrementPage();
            renderGalleryCards(data);
        })
}
    
function incrementPage() {
    refs.pageNumber += 1;
}

function resetPage() {
    loadMoreBtn.setAttribute('disabled', 'disabled')
    gallery.innerHTML = '';
    refs.pageNumber = 1;
}



function onClickRenderedBtn() {
    onQueryToPixabay();
    
    smoothScrolling();
}

function alertMsg() {
    alert({
        text: "Введите Ваш запрос."
    });
}

function renderGalleryCards(data) {
    const cards = galleryCards(data);
    return gallery.insertAdjacentHTML('beforeend', cards);
}

function smoothScrolling() {
const element = document.getElementById('load-button');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});  
}

*/







