document.addEventListener('DOMContentLoaded', () => {
    setupHeaderMenu();
});

function setupHeaderMenu() {
    // Selezioniamo solo i bottoni che hanno un dropdown vicino (opzionale, ma più sicuro)
    const buttons = document.querySelectorAll('.header-links-list button');
    const hamburger = document.getElementById('header-hamburger');
    const links = document.getElementById('header-links');

    // 1. Evita che cliccare DENTRO il dropdown lo faccia chiudere
    document.querySelectorAll('.dropdown').forEach(d =>
        d.addEventListener('click', e => e.stopPropagation())
    );

    // 2. Gestione click sui bottoni
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            // Impedisce che il click arrivi al document (che chiuderebbe tutto)
            e.stopPropagation();

            const li = btn.closest('li');

            // Controlla se questo menu è già aperto
            const isAlreadyOpen = li.classList.contains('is-open');

            // Chiudi TUTTI i menu aperti
            document.querySelectorAll('.header-links-list li').forEach(item => {
                item.classList.remove('is-open');
            });

            // Se non era già aperto, aprilo
            if (!isAlreadyOpen) {
                li.classList.add('is-open');
            }
        });
    });

    // 3. Click ovunque altro nella pagina chiude i menu
    document.addEventListener('click', () => {
        document.querySelectorAll('.header-links-list li.is-open').forEach(openedItem => {
            openedItem.classList.remove('is-open');
        });
    });

    hamburger.addEventListener('click', e => {
        e.stopPropagation();
        links.classList.toggle('header-links-open');
    })
}