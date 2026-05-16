//Su función es tomar los datos puros y darles un formato amigable antes de enviarlos.
const responseViews = {
    formatResponse: (data) => {
        // JSON.stringify convierte un objeto de JavaScript a un "String" (texto) de JSON.
        // El 'null' es para un parámetro de reemplazo (que no estamos usando).
        // El '2' es el más importante: indica que use 2 espacios de sangría (identación).
        // Esto hace que el JSON sea legible para humanos y no una sola línea larga de texto.
        return JSON.stringify(data, null, 2);
    }
};

module.exports = responseViews;