export default class GalleryApiService {
    constructor() {
        this.searchQuery = '';
        this.pageNumber = 1;
    }

    fetchArticles() {
        const API_KEY = '22516164-f116a0b1efd134847fc29d1d4';

        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                this.incrementPage();
                return data.hits;
            })
    }

    incrementPage() {
        this.pageNumber += 1;
    }

    resetPage() {
        this.pageNumber = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}