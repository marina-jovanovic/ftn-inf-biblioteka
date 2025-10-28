'use strict'

const tabelaTijelo = document.getElementById('knjige-tijelo'); 

const prikaziKnjige = () => {
    if (typeof knjige === 'undefined' || knjige.length === 0) {
        tabelaTijelo.innerHTML = '<tr><td colspan="5">Nema knjiga za prikaz.</td></tr>';
        return;
    }
    
    tabelaTijelo.innerHTML = '';

    knjige.forEach(knjiga => {
        const red = document.createElement('tr');

        red.innerHTML = `
            <td>${knjiga.identifikator}</td>
            <td>${knjiga.nazivKnjige}</td>
            <td>${knjiga.datumStampanja}</td>
            <td>${knjiga.popularnost}</td>
            <td>
                <button class="obrisi-btn" data-id="${knjiga.identifikator}">
                    Obriši
                </button>
            </td>
        `;

        tabelaTijelo.appendChild(red);
    });
};

const obrisiKnjigu = (idZaBrisanje) => {
    const id = parseInt(idZaBrisanje);

    const indexZaBrisanje = knjige.findIndex(k => k.identifikator === id);

    if (indexZaBrisanje !== -1) {
        knjige.splice(indexZaBrisanje, 1);

        prikaziKnjige();
        alert(`Knjiga ${id} obrisana.`);
    }
};

tabelaTijelo.addEventListener('click', (e) => {
    if (e.target.classList.contains('obrisi-btn')) {
        const id = e.target.getAttribute('data-id');
        if (confirm(`Da li ste sigurni da želite da obrišete knjigu sa ID ${id}?`)) {
            obrisiKnjigu(id);
        }
    }
});

document.addEventListener('DOMContentLoaded', prikaziKnjige);