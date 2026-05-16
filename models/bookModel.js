const fs= require('fs'); //file system
const path = require('path'); //la ruta del archivo

const filePath = path.join(__dirname, '../data/books.json'); //ruta del archivo
// linkear del archivo de controller al modelo
const bookModel = {
    //Metodo para leer los libros del archivo JSON
    readBooks: () => {
        //lógica para leer el archivo JSON
        const data = fs.readFileSync(filePath, 'utf-8'); //leer el archivo
        return JSON.parse(data); //devolver los datos en formato JSON
    },
    //metodo paa escribir los libros en el archivo JSON
    writeBooks: (books) => {
        //lógica para escribir en el archivo JSON
        const jsonData = JSON.stringify(books, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf-8');
    }

    };
    //exportar el modelo para usarlo en el controlador
    module.exports = bookModel;


