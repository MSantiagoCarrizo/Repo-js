# Repo-js: Tienda Urban - Simulador de E-commerce

Proyecto desarrollado en **JavaScript** para simular el flujo completo de una tienda online, aplicando conceptos de programación asincrónica y persistencia de datos.


## Funcionalidades

- **Visualización de productos:** Carga de productos desde un archivo JSON local mediante el uso de `fetch`.
- **Selección de cantidad:** Control individual de unidades antes de agregar al carrito.
- **Agregar productos al Carrito:** Agregar productos (con validación de duplicados) y eliminar productos individualmente.
- **Cálculo automático:** Sumatoria del total basada en precio y cantidad.
- **Conservación de datos con localStorage:** Conservación de datos mediante `localStorage` para evitar pérdida de información al recargar.
- **Finalización de compra:** Notificaciones de ayuda y de confirmación para una mejor experiencia de usuario.


## Tecnologías utilizadas

- **HTML5 & CSS3:** Maquetación semántica y diseño responsive (Grid/Flexbox).
- **JavaScript:** Manipulación del DOM, eventos y lógica de objetos.
- **Librerías Externas:**
- [SweetAlert2](https://sweetalert2.github.io): Para confirmaciones de finalización de compra.
- [Toastify JS](https://apvarun.github.io): Para avisos rápidos al usuario.
- **Manejo de Datos:** Fetch API para consumo de recursos JSON y Web Storage API.


## Flujo de uso

1. **Carga:** Al iniciar, la app consume los datos de `lista.json` y recupera el carrito del storage si existe.
2. **Selección:** El usuario ajusta la cantidad (+/-) y hace click en "Agregar al carrito".
3. **Feedback:** Se dispara un Toast confirmando la acción.
4. **Gestión:** El carrito se actualiza visualmente y se recalculan los totales.
5. **Finalización:** Al presionar "Finalizar compra", un SweetAlert solicita confirmación, vacía el carrito y limpia el `localStorage`.