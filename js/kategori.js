document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category) {
        const apiUrl = `${baseUrl}${category}/`;
        getNews(apiUrl);
    } else {
        console.error("Category parameter is missing.");
    }

    // Mengatur ulang event listener pada sidebar
    const sidebarLinks = document.querySelectorAll('.tags a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });
});
