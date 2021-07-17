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

        if (hits.length < 12) {
            return refs.loadMoreBtn.classList.add('is-hidden');
        }
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
        text: "По Вашему запросу нет подходящих картинок."
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