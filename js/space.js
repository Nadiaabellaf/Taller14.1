document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value;
    buscarImagenes(query);
});

function buscarImagenes(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            mostrarImagenes(data.collection.items);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
        });
}

function mostrarImagenes(imagenes) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos resultados

    imagenes.forEach(item => {
        const titulo = item.data[0].title;
        const descripcion = item.data[0].description || 'Descripción no disponible';
        const fecha = item.data[0].date_created || 'Fecha no disponible';
        const imagen = item.links[0].href;

        const tarjeta = crearTarjeta(titulo, descripcion, fecha, imagen);
        contenedor.appendChild(tarjeta);
    });
}

function crearTarjeta(titulo, descripcion, fecha, imagen) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = imagen;
    img.classList.add('card-img-top');
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = titulo;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement('div');
    cardText.classList.add('card-text');
    cardText.style.overflowY = 'auto'; // Agregar scroll vertical
    cardText.style.maxHeight = '60px'; // Altura máxima del contenedor de texto
    cardText.textContent = descripcion; // Asignar la descripción
    cardBody.appendChild(cardText);

    const cardFecha = document.createElement('small');
    cardFecha.textContent = `Fecha: ${new Date(fecha).toLocaleDateString()}`;
    cardBody.appendChild(cardFecha);

    card.appendChild(cardBody);
    return card;
}
