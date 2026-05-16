const { v4: uuidv4 } = require('uuid');
const bookModel = require('../models/bookModel');
const authorModel = require('../models/authorModel');
const publisherModel = require('../models/publisherModel');
const bookViews = require('../views/bookView');

// Obtener todos los libros
const bookController = {
  getBooks: () => {
    const books = bookModel.readBooks();
    const authors = authorModel.findAll();
    const publishers = publisherModel.findAll();

    const booksWithDetails = books.map(book => {
      const author = authors.find(a => a.id === book.authorId);
      const publisher = publishers.find(p => p.id === book.publisherId);

      return {
        id: book.id,
        title: book.title,
        publishedYear: book.publishedYear,
        genero: book.genero,
        status: book.status,
        author: author || { name: "Desconocido" },
        publisher: publisher || { name: "Desconocido" }
      };
    });

    return bookViews.formatResponse(booksWithDetails);
  },
// Obtener un libro por ID
  // getBookById: (id) => {
  //   const book = bookModel.readBook(id);

  //   if (!book) {
  //     return bookViews.formatResponse({ error: 'Libro no encontrado' });
  //   }

  //   const authors = authorModel.readAuthors();
  //   const publishers = publisherModel.readPublishers();

  //   const author = authors.find(a => a.id === book.authorId);
  //   const publisher = publishers.find(p => p.id === book.publisherId);

  //   const bookWithDetails = {
  //     ...book,
  //     author: author || null,
  //     publisher: publisher || null
  //   };

  //   return bookViews.formatResponse(bookWithDetails);
  // },

// Agregar un nuevo libro

    addBook: (data) => {
      // Manejar el Autor
    let authors = authorModel.findAll();
    let author = authors.find(a => a.name.toLowerCase() === data.authorName.toLowerCase());

    if (!author) {
    author = { id: uuidv4(), name: data.authorName };
    authors.push(author);
    authorModel.save(authors);
    }
    // 2. Manejar la Editorial
    let publishers = publisherModel.findAll();
    let publisher = publishers.find(p => p.name.toLowerCase() === data.publisherName.toLowerCase());

    if (!publisher) {
    publisher = { id: uuidv4(), name: data.publisherName };
    publishers.push(publisher);
    publisherModel.save(publishers);
    }

    // 3. Guardar el Libro
    const books = bookModel.readBooks();
    //Aca agrega, el libro nuevo en consecuencia con los datos solicitados al cliente,js
    const newBook = {
        id: uuidv4(),
        title: data.titleName,
        authorId: author.id,
        publisherId: publisher.id,
        publishedYear: data.publishedYear,
        genero: data.genero,
        status: data.status
    };

    books.push(newBook);
    bookModel.writeBooks(books);

    return JSON.stringify(newBook);
    ({
    message: `¡Listo! Libro "${newBook.title}" guardado correctamente.`,
    book: newBook
  });
}
};

module.exports = bookController;