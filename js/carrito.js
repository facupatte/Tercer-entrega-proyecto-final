    const pintarCarrito = () => {
        
    //header del modal
    contenidoModal.innerHTML = "";
    contenidoModal.style.display = "flex";
    const modalEncabezado = document.createElement("div");
    modalEncabezado.className = "encabezado-modal";
    modalEncabezado.innerHTML = `
        <h1 class="encabezado-modal-titulo">Articulos (${carrito.length})</h1>  
    `
    contenidoModal.append(modalEncabezado);
    
    const botonModal = document.createElement("h1");
    botonModal.innerText = "✖";
    botonModal.className = "boton-modal-encabezado";

    botonModal.addEventListener("click", () =>{
        contenidoModal.style.display = "none";
    });

    modalEncabezado.append(botonModal);
    //Contenido del carrito en modal
    carrito.forEach ((producto) =>{
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "cuerpo-carrito";
        contenidoCarrito.innerHTML = `
            <img class="imagen-carrito" src="${producto.img}">
            <h3 class="tipo-carrito">${producto.nombre}</h3>
            <p class="precio-carrito">${producto.precio} U$S</p>
            <span class="restar"> - </span>
            <p>${producto.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${producto.cantidad * producto.precio} U$S</p>
            <span class="eliminar-producto"> X </span>
        `;
    contenidoModal.append(contenidoCarrito)

    let restar = contenidoCarrito.querySelector(".restar");

    restar.addEventListener("click", () => {
      if(producto.cantidad !== 1){
        producto.cantidad--;
      }
      guardarLocal();
      pintarCarrito();
    })

    let sumar = contenidoCarrito.querySelector(".sumar")
    sumar.addEventListener("click", () => {
      producto.cantidad++;
      guardarLocal();
      pintarCarrito();
    })

    let eliminar = contenidoCarrito.querySelector(".eliminar-producto");
    eliminar.addEventListener("click", () =>{
        eliminarProducto(producto.id);
    });
    
    })
    //total de carrito
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const compraTotal = document.createElement("div");
    compraTotal.className = "compra-total"
    compraTotal.innerText = `Total a pagar: ${total} U$S`;
    contenidoModal.append(compraTotal);

    let finalizarCompra = document.createElement("button");
    finalizarCompra.className = "btn-finalizar-compra";
    finalizarCompra.innerText = "Finalizar Compra";
    contenidoModal.append(finalizarCompra);
  
    // Escuchar el evento
    finalizarCompra.addEventListener("click", () => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra finalizada con exito',
                showConfirmButton: 'Continuar',
                timer: 1500
              });
        });
    };

    verCarrito.addEventListener("click", pintarCarrito)

    const eliminarProducto = (id) =>{
        const foundId = carrito.find((element) => element.id === id);

        carrito = carrito.filter((carritoId) => {
            return carritoId !== foundId;
        });
        carritoCounter();
        guardarLocal();
        pintarCarrito();
    };

const carritoCounter = () =>{
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoCounter();

