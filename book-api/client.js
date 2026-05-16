//Usar modulo net
const net = require('net');
const readline = require('readline'); //Para creer la interfaz por la consola

// Crear la interfaz de lectura por consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

// Crear el cliente TCP
const client = new net.Socket();    

// Conectar al servidor
client.connect(8080, 'localhost', () => {
    console.log('Conectado al servidor TCP en localhost:8080');
    mostrarMenu(); // Mostrar el menú al conectar
    });

client.on('data', (data) => {
const respuesta = data.toString().trim();

    // Si la respuesta empieza con nuestro prefijo especial:
    if (respuesta.startsWith('LIBRO_AGREGADO:')) {
        const libroData = respuesta.replace('LIBRO_AGREGADO:', '').trim();
        const libro = JSON.parse(libroData);

        console.log('\n==================================');
        console.log('\n✅ ¡LIBRO AGREGADO EXITOSAMENTE!');
        console.log(`ID:     ${libro.id}`);
        console.log(`Título: ${libro.title}`);
        console.log(`Autor:  ${libro.author}`);
        console.log('=====================================');
    } else {
        try {
            // Intentamos convertir la respuesta del servidor en una lista/objeto JSON
            const libros = JSON.parse(respuesta);
            
            if (Array.isArray(libros) && libros.length > 0) {
                console.log('\n=================================== LISTADO DE LIBROS ===================================');
                
                // Mapeamos los libros para "aplanar" las propiedades internas y que console.table se vea impecable
                const tablaLibros = libros.map(libro => ({
                    'ID': libro.id.substring(0, 8) + '...', // Acortamos IDs largos para no desarmar la tabla
                    'Título': libro.title,
                    'Año': libro.publishedYear,
                    'Género': libro.genero,
                    'Autor': libro.author ? libro.author.name : 'Desconocido',
                    'Editorial': libro.publisher ? libro.publisher.name : 'Desconocido',
                    'Estado': libro.status
                }));

                // Renderiza la tabla estructurada automáticamente en la consola
                console.table(tablaLibros);
                console.log('========================================================================================');
            } else {
                console.log('\nNo hay libros registrados en la biblioteca.');
            }
        } catch (error) {
            // Si el servidor responde con texto plano (como un mensaje de error), lo imprimimos directamente
            console.log('\n=== RESPUESTA DEL SERVIDOR ===');
            console.log(respuesta);
            console.log('==============================');
        }
    }
    
    // Volvemos a mostrar el menú para seguir operando
    mostrarMenu(); 
});

// Crear un menu para facilitar la interacción con el cliente TCP

function mostrarMenu() {
    console.log('\nSeleccione una opción:');
    console.log('1. GET BOOKS📝📚(Ver lista)');
    console.log('2. ADD BOOK ➕📚 (Agregar nuevo)');
    console.log('3. Salir');

    rl.question('Opción: ', (opcion) => {
        if (opcion === '1') {
            client.write('GET BOOKS');
        } else if (opcion === '2') {
            // Aquí van los datos para armar el JSON
            rl.question('Título del libro: ', (title) => {
                rl.question('Nombre del Autor: ', (author) => {
                    rl.question('Año: ', (year) => {
                        rl.question('Género (ej: Novela, Terror): ', (genreInput) => { // <-- NUEVA PREGUNTA
                            const libro = {
                                titleName: title,
                                authorName: author,
                                publisherName: "Editorial Ejemplo",
                                publishedYear: parseInt(year),
                                genero: "Varios",
                                status: "disponible"    
                            };
                            // Enviamos el comando completo que el servidor espera
                            console.log('Enviando:', `ADD BOOK ${JSON.stringify(libro)}`);
                            client.write(`ADD BOOK ${JSON.stringify(libro)}`);
                        });
                    });
                });
            });
        } else if (opcion === '3') {
            console.log('Cerrando conexión...');
            client.destroy();
            rl.close();
        } else {
            console.log('Opción no válida.');
            mostrarMenu();
        }
        });
};

client.on('error', (err) => {
    console.error('Error en la conexión: ', err);
});

client.on('close', () => {
    console.log('🔌 Conexión cerrada. ¡Gracias por usar la biblioteca TCP! 📚 Te esperamos pronto... 👋✨');
});


