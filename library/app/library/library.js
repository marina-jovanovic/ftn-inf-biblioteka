'use strict'

var reservedBooks = [];

const iznajmljeneTijelo = document.getElementById('iznajmljene-tijelo');
const dostupneTijelo = document.getElementById('dostupne-tijelo');


const ucitajKnjigeIzSkladista = () => {
    const reservedJSON = localStorage.getItem('reserved_books');
    
    reservedBooks = reservedJSON ? JSON.parse(reservedJSON) : []; 
    
    azurirajPrikaz();
};

const azurirajLocalStorage = () => {
    localStorage.setItem('reserved_books', JSON.stringify(reservedBooks));
};


const azurirajPrikaz = () => {
    const availableBooks = knjige.filter(allBooks => 
        !reservedBooks.some(reserved => reserved.identifikator === allBooks.identifikator)
    );
    
    prikaziReservedBooks(reservedBooks); 
    
    prikaziAvailableBooks(availableBooks);
};


const prikaziReservedBooks = (nizKnjiga) => {
    iznajmljeneTijelo.innerHTML = '';
    
    if (nizKnjiga.length === 0) {
        iznajmljeneTijelo.innerHTML = '<tr><td colspan="4">Trenutno nema iznajmljenih knjiga.</td></tr>';
        return;
    }
    
    nizKnjiga.forEach(knjiga => {
        const red = document.createElement('tr');
        red.innerHTML = `
            <td>${knjiga.identifikator}</td>
            <td>${knjiga.nazivKnjige}</td>
            <td>${knjiga.datumStampanja}</td>
            <td>
                <button class="vrati-btn" data-id="${knjiga.identifikator}">Vrati</button>
            </td>
        `;
        
        red.addEventListener('mouseover', () => { red.style.backgroundColor = '#e6f7ff'; }); 
        red.addEventListener('mouseout', () => { red.style.backgroundColor = ''; });
        
        iznajmljeneTijelo.appendChild(red);
    });
};


const vratiKnjigu = (idZaVracanje) => {
    const id = parseInt(idZaVracanje);
    
    const indexZaVracanje = reservedBooks.findIndex(k => k.identifikator === id);
    
    if (indexZaVracanje !== -1) {
        reservedBooks.splice(indexZaVracanje, 1);
        
        azurirajLocalStorage();
        
        azurirajPrikaz();
        alert(`Knjiga ID ${id} je vraćena.`);
    }
};

const prikaziAvailableBooks = (nizKnjiga) => {
    dostupneTijelo.innerHTML = '<tr><td colspan="4">Ovaj deo rešava kolega (B2).</td></tr>';
};


iznajmljeneTijelo.addEventListener('click', (e) => {
    if (e.target.classList.contains('vrati-btn')) {
        const id = e.target.getAttribute('data-id');
        vratiKnjigu(id);
    }
});


document.addEventListener('DOMContentLoaded', ucitajKnjigeIzSkladista);