document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('main-grid');

    fetch('/json/blog.json')
        .then(res => {
            if (!res.ok) throw new Error('Errore nel caricamento JSON');
            return res.json();
        })
        .then(data => {
            data.forEach(el => {

                const card = document.createElement('div');
                card.className = 'main-grid-card';

                const linkUrl = `/blogpage.html?id=${el.id}`;
                const imgPath = `images/blog/${el.img}`;

                // IMG DIV
                const imgDiv = document.createElement('div');
                imgDiv.className = 'main-grid-card-img';
                imgDiv.style.backgroundImage = `url('${imgPath}')`; 
                // Questa riga ora NON è inline HTML → è JS property → CSP OK

                // TITLE
                const title = document.createElement('h4');
                title.textContent = el.title || 'Titolo del post';

                // SUMMARY
                const summary = document.createElement('p');
                summary.textContent = el.summary || 'Descrizione';

                // DATE
                const date = document.createElement('h5');
                date.textContent = el.date || 'Data';

                // LINK
                const link = document.createElement('a');
                link.href = linkUrl;
                link.setAttribute(
                    'aria-label',
                    `Leggi l'articolo ${el.title || 'Titolo del post'} di Martina Coggiola`
                );

                // APPEND
                card.appendChild(imgDiv);
                card.appendChild(title);
                card.appendChild(summary);
                card.appendChild(date);
                card.appendChild(link);

                container.appendChild(card);
            });
        })
        .catch(err => console.error(err));
});
