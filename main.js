// Constructor
class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;
    }
}


// Array de productos base
const productosBase = [
    new Producto(1, "Camiseta Básica Negra", 10900),
    new Producto(2, "Camiseta Blanca Oversize", 22500),
    new Producto(3, "Buzo Gris", 33000),
    new Producto(4, "Buzo Negra", 32500),
    new Producto(5, "Cargo Jogger", 34000),
    new Producto(6, "Jeans Baggy", 56000),
    new Producto(7, "Campera Cuero", 95000),
    new Producto(8, "Campera Deportiva", 40000),
    new Producto(9, "Gorra Urbana", 15000),
    new Producto(10, "Mochila", 28000)
];


// Cargar local storage
const productos = JSON.parse(localStorage.getItem("productos")) || []
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalDOM = document.getElementById("total");
const btnComprar = document.getElementById("comprar");


// Funciones
function mostrarToast() {
    Toastify({
        text: "Se agrego al carrito",
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


// Renderizar productos
function renderizarProductos() {
    contenedorProductos.innerHTML = "";

    productosBase.forEach(prod => {

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

        btnSumar.addEventListener("click", () => {
            prod.cantidad++;
            spanCantidad.textContent = prod.cantidad;
        });


        const btnRestar = div.querySelector(".restar");

        btnRestar.addEventListener("click", () => {
            if (prod.cantidad > 1) {
                prod.cantidad--;
                spanCantidad.textContent = prod.cantidad;
            }
        });


        const btnAgregar = div.querySelector(".agregar");

        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(prod);
        });

        contenedorProductos.appendChild(div);
    });
}


// Agregar producto al carrito

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
    mostrarToast()
}


// Renderizar carrito
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

// Eliminar producto del carrito
function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    renderizarCarrito();
}

// Calcular total
function actualizarTotal() {
    const total = carrito.reduce((acumulador, prod) => acumulador + prod.precio * prod.cantidad, 0);
    totalDOM.textContent = `Total: $${total}`;
}

// Guardar en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Finalizar compra con sweetalert2
function finalizarCompra() {
    carrito = [];
    localStorage.removeItem("carrito");
    renderizarCarrito();
    totalDOM.textContent = "Compra finalizada :)";
}

btnComprar.addEventListener("click", () => {
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
            Swal.fire({
                title: "Compra finalizada!",
                text: "Gracias por comprar en nuestra tienda.",
                icon: "success"
            });
            finalizarCompra()
        }
    });
})

// Iniciar simulador
renderizarProductos();
renderizarCarrito();



