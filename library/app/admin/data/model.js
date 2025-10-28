'use strict'

class Book {
    constructor(identifikator, nazivKnjige, datumStampanja, url, opisKnjige, popularnost) {
        this.identifikator = identifikator;
        this.nazivKnjige = nazivKnjige;
        this.datumStampanja = datumStampanja;
        this.url = url;
        this.opisKnjige = opisKnjige;
        this.popularnost = popularnost;
    }
}

var knjige = [
    new Book(1, "Most na Žepi", "1984-01-01", "/slike/most.jpg", "Andrićev klasik.", 3),
    new Book(2, "Proces", "1925-04-20", "/slike/proces.jpg", "Kafka o apsurdnosti.", 5),
    new Book(3, "1984", "1949-06-08", "/slike/1984.jpg", "Orvelova distopija.", 4),
];