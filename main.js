// Constructor
class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;
    }
}


// Local Storage y DOM
const listaDeProductos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const URLproductosRaiz = "./lista.json";

const contenedorProductos = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalDOM = document.getElementById("total");
const btnComprar = document.getElementById("comprar");


// Funciones
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarToast() {
    Toastify({
        text: "Se agregó al carrito",
        duration: 2000,
        offset: {
            x: 50,
            y: 10
        },
        onClick: function () {
            document.getElementById("carrito").scrollIntoView();
        }
    }).showToast();
}


// Carrito
function actualizarTotal() {
    const total = carrito.reduce((acumulador, prod) => acumulador + prod.precio * prod.cantidad, 0);
    totalDOM.textContent = `Total: $${total}`;
}

function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    renderizarCarrito();
}

function agregarAlCarrito(producto) {
    const existe = carrito.find(p => p.id === producto.id);

    if (existe) {
        existe.cantidad += producto.cantidad;
    } else {
        const productoNuevo = new Producto(
            producto.id,
            producto.nombre,
            producto.precio
        );

        productoNuevo.cantidad = producto.cantidad;
        carrito.push(productoNuevo);
    }

    producto.cantidad = 1;

    guardarCarrito();
    renderizarProductos();
    renderizarCarrito();
    mostrarToast();
}


// Renderizado                                  
function renderizarProductos() {
    contenedorProductos.innerHTML = "";

    listaDeProductos.forEach(prod => {
        const div = document.createElement("div");

        div.className = "producto";

        div.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio}</p>

            <div class="controles">
                <button class="restar">-</button>
                <span class="cantidad">${prod.cantidad}</span>
                <button class="sumar">+</button>
            </div>

            <button class="agregar">Agregar al carrito</button>
        `;

        const spanCantidad = div.querySelector(".cantidad");
        const btnSumar = div.querySelector(".sumar");
        const btnRestar = div.querySelector(".restar");
        const btnAgregar = div.querySelector(".agregar");

        btnSumar.addEventListener("click", () => {
            prod.cantidad++;
            spanCantidad.textContent = prod.cantidad;
        });

        btnRestar.addEventListener("click", () => {
            if (prod.cantidad > 1) {
                prod.cantidad--;
                spanCantidad.textContent = prod.cantidad;
            }
        });

        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(prod);
        });

        contenedorProductos.appendChild(div);
    });
}

function renderizarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach(prod => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${prod.nombre} x${prod.cantidad} - $${prod.precio * prod.cantidad}
            <button class="eliminar">Eliminar</button>
        `;

        li.querySelector(".eliminar").addEventListener("click", () => {
            eliminarProducto(prod.id);
        });

        listaCarrito.appendChild(li);
    });

    actualizarTotal();
}


// Fetch
async function cargarProductosDesdeJSON() {
    try {
        const resolve = await fetch(URLproductosRaiz);
        const data = await resolve.json();

        data.forEach(prod => {
            const productoPuro = new Producto(prod.id, prod.nombre, prod.precio);
            listaDeProductos.push(productoPuro);
        });

        renderizarProductos();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}


// 7. Evento
btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        return Swal.fire({
            title: "Carrito vacío",
            icon: "info"
        })
    }

    Swal.fire({
        title: "Deseas finalizar la compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, finalizar compra",
        cancelButtonText: "Seguir con la compra"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            localStorage.removeItem("carrito");
            renderizarCarrito();
            totalDOM.textContent = "Compra finalizada :)";

            Swal.fire({
                title: "Compra finalizada!",
                text: "Gracias por comprar en nuestra tienda.",
                icon: "success"
            });
        }
    });
});


// Iniciar simulador
cargarProductosDesdeJSON();
renderizarCarrito();

