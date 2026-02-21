document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('statusMessage');
    
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Recuperiamo i valori
        const nome = document.getElementById('nome').value;
        const oggetto = document.getElementById('oggetto').value;
        const messaggio = document.getElementById('messaggio').value;

        // 2. Controllo validità di base
        if (nome.length < 3) {
            statusMsg.textContent = "Il nome è troppo corto.";
            statusMsg.className = "error";
            return;
        }

        // 3. Costruiamo il link mailto
        // Nota: 'encodeURIComponent' serve a gestire spazi e caratteri speciali
        const tuaEmail = "martinacoggiola@gmail.com";
        const corpoEmail = `${messaggio} %0D%0A%0D%0A${nome}`;

        // 4. Apriamo il client di posta
        window.location.href = `mailto:${tuaEmail}?subject=${encodeURIComponent(oggetto)}&body=${corpoEmail}`;

        // 5. Feedback utente
        statusMsg.textContent = "Si sta aprendo il tuo client di posta per inviare il messaggio...";
        statusMsg.className = "success";
        
        // Opzionale: resettiamo il form
        form.reset(); 
    });

    const contentPosts = document.getElementById('main-blog-grid');

    fetch(`/json/blog.json`)
        .then(res => {
            if (!res.ok) throw new Error('Errore nel caricamento JSON');
            return res.json();
        })
        .then(data => {
            const n = Math.min(data.length, 3);

            for (let i = 1; i < n + 1; i++) {
                el = data[data.length - i];

                // 1. Crea il wrapper principale (la card)
                const card = document.createElement('div');
                card.className = 'main-blog-grid-card';

                const link = `/blogpage.html?id=${el.id}`
                const imgPath = `images/blog/${el.img}`;
                
                card.innerHTML = `
                    <div class="main-blog-grid-card-img" style="background-image: url('${imgPath}')"></div>
                    <h4>${el.title || 'Titolo del post'}</h4>
                    <div class="main-blog-grid-card-content">
                        ${el.summary || 'Descrizione'}
                    </div>
                    <a href="${link}" aria-label="Leggi l'articolo ${el.title || 'Titolo del post'} di Martina Coggiola"></a>
                `;

                // 5. Aggiungi al contenitore
                contentPosts.appendChild(card);
            }
        })
        .catch(err => console.error(err));
});