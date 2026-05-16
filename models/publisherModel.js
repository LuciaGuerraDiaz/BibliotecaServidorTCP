// Para generar un ID único para cada editorial

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/publishers.json');

const publisherModel = {
    findAll: () => {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data || '[]'); // Evita errores si el archivo está vacío
    },
    save: (publishers) => {
        fs.writeFileSync(filePath, JSON.stringify(publishers, null, 2));
    }
};
module.exports = publisherModel;



