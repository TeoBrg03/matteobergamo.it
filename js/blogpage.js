document.addEventListener('DOMContentLoaded', () => {
    const blogCover = document.getElementById('main-cover');
    const blogTitle = document.getElementById('main-cover-h2');
    const blogContent = document.getElementById('main-content');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const blogId = urlParams.get('id');

    if (!blogId) {
        window.location.replace('/blog.html');
    }

    fetch(`/json/blog.json`)
        .then(res => {
            if (!res.ok) throw new Error('Errore nel caricamento JSON');
            return res.json();
        })
        .then(data => {
            const post = data.find(el => el.id == blogId);

            if (!post) {
                alert("Articolo non trovato. Verrai reindirizzato al blog.");
                window.location.replace('/blog.html');
            } else {
                blogTitle.innerHTML = post.title;
                blogCover.style.backgroundImage = `url("/images/blog/${post.img}")`
                blogContent.innerHTML = `<p>${post.testo}</p>`
            }
        })
        .catch(err => console.error(err));
});