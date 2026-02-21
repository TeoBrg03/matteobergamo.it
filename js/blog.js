document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('main-grid');

    fetch(`/json/blog.json`)
        .then(res => {
            if (!res.ok) throw new Error('Errore nel caricamento JSON');
            return res.json();
        })
        .then(data => {
            data.forEach(el => {

                // 1. Crea il wrapper principale (la card)
                const card = document.createElement('div');
                card.className = 'main-grid-card';

                const link = `/blogpage.html?id=${el.id}`
                const imgPath = `images/blog/${el.img}`;
                
                card.innerHTML = `
                    <div class="main-grid-card-img" style="background-image: url('${imgPath}')"></div>
                    <h4>${el.title || 'Titolo del post'}</h4>
                    <p>${el.summary || 'Descrizione'}</p>
                    <h5>${el.date || 'Data'}</h5>
                    <a href="${link}" aria-label="Leggi l'articolo ${el.title || 'Titolo del post'} di Martina Coggiola"></a>
                `;

                // 5. Aggiungi al contenitore
                container.appendChild(card);
            });
        })
        .catch(err => console.error(err));
});