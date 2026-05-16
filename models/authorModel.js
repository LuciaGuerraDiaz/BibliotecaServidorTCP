// Para generar un ID único para cada autor

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/authors.json');

const authorModel = {
    findAll: () => {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data || '[]'); // Evita errores si el archivo está vacío
    },
    save: (authors) => {
        fs.writeFileSync(filePath, JSON.stringify(authors, null, 2));
    }
};
module.exports = authorModel;

