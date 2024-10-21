const albums = [
    {
        "title": "Clics Modernos",
        "price": 25000,
        "description": "Álbum clásico de Charly.",
        "img": "/img/Clics Modernos.jpg"
    },
    {
        "title": "Cómo Conseguir Chicas",
        "price": 13000,
        "description": "Otro álbum icónico.",
        "img": "/img/Como conseguir chicas.jpg"
    },
    {
        "title": "La Lógica del Escorpión",
        "price": 33000,
        "description": "Disco experimental de Charly.",
        "img": "/img/La logica del escorpion.jpg"
    },
    {
        "title": "Parte de la Religión",
        "price": 26500,
        "description": "Álbum profundo y filosófico.",
        "img": "/img/Parte de la religion.jpg"
    },
    {
        "title": "Piano Bar",
        "price": 29300,
        "description": "Un clásico infaltable.",
        "img": "/img/Piano bar.jpg"
    },
    {
        "title": "Yendo de la Cama al Living",
        "price": 19999,
        "description": "Charly en su mejor momento creativo.",
        "img": "/img/Yendo de la cama al living.jpg"
    }
];

function generateDiscography() {
    const discographyContainer = document.getElementById('discography');
    discographyContainer.innerHTML = ''; 

    albums.forEach(album => {
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';

        const img = document.createElement('img');
        img.src = album.img;
        img.alt = `${album.title} - Charly García`;

        const title = document.createElement('h3'); 
        title.textContent = album.title;

        const price = document.createElement('p');
        price.textContent = `Precio: $${album.price.toLocaleString()}`;

        const description = document.createElement('p');
        description.textContent = `Descripción: ${album.description}`;

        const button = document.createElement('button');
        button.textContent = 'Comprar';
        button.addEventListener('click', () => handlePurchase(album)); 
        albumCard.appendChild(img);
        albumCard.appendChild(title); 
        albumCard.appendChild(price);
        albumCard.appendChild(description);
        albumCard.appendChild(button);

        discographyContainer.appendChild(albumCard);
    });
}

function handlePurchase(album) {
    const albumTitle = album.title; 

    document.getElementById('album').value = albumTitle; 
    document.getElementById('quantity').focus(); 
}

document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    try {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const albumTitle = document.getElementById('album').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (!name || !email || !address || !albumTitle || isNaN(quantity) || quantity <= 0) {
            throw new Error("Por favor, completa todos los campos correctamente.");
        }

        const selectedAlbum = albums.find(album => album.title === albumTitle);
        if (!selectedAlbum) {
            throw new Error("El álbum seleccionado no existe.");
        }

        const totalPrice = selectedAlbum.price * quantity;

        const purchaseData = {
            name,
            email,
            address,
            albumTitle,
            quantity,
            totalPrice
        };

        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        purchases.push(purchaseData);
        localStorage.setItem('purchases', JSON.stringify(purchases));

        const summaryText = document.getElementById('summaryText');
        summaryText.innerHTML = `
            <strong>Gracias por tu compra, ${name}!</strong><br>
            Has comprado ${quantity} copia(s) del álbum "${albumTitle}".<br>
            El total de tu compra es: $${totalPrice.toLocaleString()}.<br>
            Te enviaremos un correo de confirmación a ${email}, y enviaremos el pedido a la siguiente dirección: ${address}.
        `;
        document.getElementById('purchaseSummary').style.display = 'block'; 

        Swal.fire({
            title: 'Compra realizada exitosamente!',
            html: summaryText.innerHTML,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    } finally {
        document.getElementById('purchaseForm').reset();
    }
});

document.addEventListener('DOMContentLoaded', generateDiscography);