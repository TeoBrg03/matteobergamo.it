document.addEventListener('DOMContentLoaded', () => {

    /* ======================
       FORM CONTATTI
    ====================== */

    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('statusMessage');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const oggetto = document.getElementById('oggetto').value.trim();
            const messaggio = document.getElementById('messaggio').value.trim();

            if (nome.length < 3) {
                statusMsg.textContent = "Il nome è troppo corto.";
                statusMsg.className = "error";
                return;
            }

            const tuaEmail = "martinacoggiola@gmail.com";
            const corpoEmail =
                encodeURIComponent(`${messaggio}\n\n${nome}`);

            window.location.href =
                `mailto:${tuaEmail}?subject=${encodeURIComponent(oggetto)}&body=${corpoEmail}`;

            statusMsg.textContent =
                "Si sta aprendo il tuo client di posta per inviare il messaggio...";
            statusMsg.className = "success";

            form.reset();
        });
    }


    /* ======================
       BLOG PREVIEW
    ====================== */

    const contentPosts = document.getElementById('main-blog-grid');

    if (contentPosts) {
        fetch('/json/blog.json')
            .then(res => {
                if (!res.ok) throw new Error('Errore nel caricamento JSON');
                return res.json();
            })
            .then(data => {

                const n = Math.min(data.length, 3);

                for (let i = 1; i <= n; i++) {

                    const el = data[data.length - i];

                    const card = document.createElement('div');
                    card.className = 'main-blog-grid-card';

                    const linkUrl = `/blogpage.html?id=${el.id}`;
                    const imgPath = `images/blog/${el.img}`;

                    /* --- IMMAGINE --- */
                    const imgDiv = document.createElement('div');
                    imgDiv.className = 'main-blog-grid-card-img';
                    imgDiv.style.backgroundImage = `url('${imgPath}')`;

                    /* --- TITOLO --- */
                    const title = document.createElement('h4');
                    title.textContent = el.title || 'Titolo del post';

                    /* --- CONTENUTO --- */
                    const content = document.createElement('div');
                    content.className = 'main-blog-grid-card-content';
                    content.textContent = el.summary || 'Descrizione';

                    /* --- LINK --- */
                    const link = document.createElement('a');
                    link.href = linkUrl;
                    link.setAttribute(
                        'aria-label',
                        `Leggi l'articolo ${el.title || 'Titolo del post'} di Martina Coggiola`
                    );

                    /* --- APPEND --- */
                    card.appendChild(imgDiv);
                    card.appendChild(title);
                    card.appendChild(content);
                    card.appendChild(link);

                    contentPosts.appendChild(card);
                }
            })
            .catch(err => console.error(err));
    }
});
