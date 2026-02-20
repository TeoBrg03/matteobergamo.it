document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('main-grid');
    const pageName = window.location.pathname
        .split('/')
        .pop()
        .replace('.html', '');

    fetch(`/json/${pageName}.json`)
        .then(res => {
            if (!res.ok) throw new Error('Errore nel caricamento JSON');
            return res.json();
        })
        .then(data => {
            data.forEach(el => {
                const img = document.createElement('img');
                img.src = `images/${pageName}/${el.src}`;
                img.alt = el.alt;

                img.style.gridColumn = `${el.gridColumnStart} / ${el.gridColumnEnd}`;
                img.style.gridRow = `${el.gridRowStart} / ${el.gridRowEnd}`;

                img.onclick = () => openImg(`images/${pageName}/${el.src}`);;

                container.appendChild(img);
            });
        })
        .catch(err => console.error(err));

        const bigDiv = document.getElementById('main-bigimg');
        const bigImg = document.getElementById('main-bigimg-img')

        function openImg(img){
            bigDiv.classList.add("main-bigimg-open");
            bigImg.src = img;
        }

        bigDiv.addEventListener('click', () => {
            bigDiv.classList.remove("main-bigimg-open");
        });
});