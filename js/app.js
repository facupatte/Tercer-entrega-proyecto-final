//Captura 
const contenidoTienda = document.getElementById ("contenidoTienda");
const verCarrito = document.getElementById ("verCarrito");
const contenidoModal = document.getElementById ("contenidoModal");
const cantidadCarrito = document.getElementById ("cantidadCarrito");

//carrito vacio y get item
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProductos = async () => {
    try {
      const response = await fetch("./JSON/data.json");
      const data = await response.json();
  
      // Recorre el array de productos e ingresa contenido HTML
      data.forEach((producto) => {
        let contenido = document.createElement("div");
        contenido.className = "card";
        contenido.innerHTML = `
          <img class="imagen" src=${producto.img} alt="">
          <h3 class="tipo">${producto.tipo}</h3>
          <p class="precio">${producto.precio} U$S</p>
        `;
  
        contenidoTienda.append(contenido);
  
        let comprar = document.createElement("button");
        comprar.className = "boton";
        comprar.innerText = "comprar";
        contenido.append(comprar);
  
        // Escuchar el evento
        comprar.addEventListener("click", () => {
          const repeat = carrito.some((repeatProducto) => repeatProducto.id === producto.id);
          if (repeat) {
            carrito.map((prod) => {
              if (prod.id === producto.id) {
                prod.cantidad++;
              }
            });
          } else {
            carrito.push({
              id: producto.id,
              img: producto.img,
              nombre: producto.tipo,
              precio: producto.precio,
              cantidad: producto.cantidad,
            });
          }
          guardarLocal();
          carritoCounter();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500
          });
        });
      });
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
};

getProductos();



//set item
const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
};










