const net = require('net');
const bookController = require('./controllers/bookController');

// Validar si la cadena es un JSON válido (básico)
function isJSON(str) {
    try {
        return (str.startsWith('{') && str.endsWith('}')) || (str.startsWith('[') && str.endsWith(']'));
    } catch (e) {
        return false;
    }
}

// Crear el server TCP
const server = net.createServer((socket) => {
    console.log('Cliente conectado: ' + socket.remoteAddress + ':' + socket.remotePort);

    // Escuchar los datos enviados por el cliente
    socket.on('data', (data) => {
        const command = data.toString().trim();
        console.log('Comando recibido: ' + command);

        if (command === 'GET BOOKS') {
            const response = bookController.getBooks();
            socket.write(response + '\n');
        } 
        else if (command.startsWith('ADD BOOK')) {
            const bookDataRaw = command.replace('ADD BOOK', '').trim();

            if (isJSON(bookDataRaw)) {
                try {
                    const newBook = JSON.parse(bookDataRaw);
                    
                    // Nombres validados con correspondencia cliente y controlador
                    if (newBook.titleName && 
                        newBook.authorName &&
                        newBook.publisherName && 
                        Number.isInteger(newBook.publishedYear) && 
                        newBook.genero && 
                        newBook.status) 
                    {
                        // 1. Guardamos el libro a través del controlador
                        const response = bookController.addBook(newBook);
                        
                        // 2. Enviamos una única respuesta limpia al cliente con los datos que procesó el controlador
                        socket.write(`LIBRO_AGREGADO: ${response}\n`);
                        
                    } else {
                        socket.write('Error: Faltan campos obligatorios.\n');
                    }
                } catch (err) {
                    socket.write('Error: JSON mal formado.\n');
                }
            } else {
                socket.write('Error: Debes enviar un JSON válido después de ADD BOOK.\n');
            }
        } 
        else {
            socket.write('Comando no reconocido. Use "GET BOOKS" o "ADD BOOK {json}".\n');
        }
    }); // <-- Aquí se cierra correctamente socket.on('data')

    // Manejar la desconexión del cliente (DENTRO del net.createServer)
    socket.on('end', () => {
        console.log('Cliente desconectado');
    }); 

    // Manejar errores de socket para que el servidor no se caiga (DENTRO del net.createServer)
    socket.on('error', (err) => {
        console.error('Error en el socket:', err.message);
    });

}); // <-- Aquí se cierra correctamente net.createServer

// El servidor escucha en el puerto 8080
server.listen(8080, () => {
    console.log('Servidor TCP escuchando en el puerto 8080');
});