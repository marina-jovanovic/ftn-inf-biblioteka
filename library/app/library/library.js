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

//B2 - Dostupne knjige za iznajmljivanje

const prikaziAvailableBooks = (nizKnjiga) => {
    dostupneTijelo.innerHTML = '';

    if (nizKnjiga.length === 0) {
        dostupneTijelo.innerHTML = '<tr><td colspan="4">Nema dostupnih knjiga za iznajmljivanje.</td></tr>';
        return;
    }

    nizKnjiga.forEach(knjiga => {
        const red = document.createElement('tr');
        red.innerHTML = `
            <td>${knjiga.identifikator}</td>
            <td>${knjiga.nazivKnjige}</td>
            <td>${knjiga.popularnost}</td>
            <td>
                <button class="iznajmi-btn" data-id="${knjiga.identifikator}">Iznajmi</button>
            </td>
        `;

        red.addEventListener('mouseover', () => red.style.backgroundColor = '#e6ffe6');
        red.addEventListener('mouseout', () => red.style.backgroundColor = '');

        dostupneTijelo.appendChild(red);
    });
};

const iznajmiKnjigu = (idZaIznajmljivanje) => {
    const id = parseInt(idZaIznajmljivanje);
    const knjigaZaIznajmljivanje = knjige.find(k => k.identifikator === id);

    if (knjigaZaIznajmljivanje) {
        reservedBooks.push(knjigaZaIznajmljivanje);
        azurirajLocalStorage();
        azurirajPrikaz();
        alert(`Knjiga ID ${id} je uspešno iznajmljena.`);
    }
};

iznajmljeneTijelo.addEventListener('click', (e) => {
    if (e.target.classList.contains('vrati-btn')) {
        const id = e.target.getAttribute('data-id');
        vratiKnjigu(id);
    }
});

dostupneTijelo.addEventListener('click', (e) => {
    if (e.target.classList.contains('iznajmi-btn')) {
        const id = e.target.getAttribute('data-id');
        iznajmiKnjigu(id);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const knjigeLS = localStorage.getItem('knjige');
    if (knjigeLS) {
        knjige = JSON.parse(knjigeLS);
    } else {
        knjige = window.knjige || [];
        localStorage.setItem('knjige', JSON.stringify(knjige));
    }

    const reservedJSON = localStorage.getItem('reserved_books');
    reservedBooks = reservedJSON ? JSON.parse(reservedJSON) : [];

    azurirajPrikaz();
});