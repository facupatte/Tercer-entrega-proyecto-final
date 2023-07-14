//Captura 
const contenidoTienda = document.getElementById ("contenidoTienda");
const verCarrito = document.getElementById ("verCarrito");
const contenidoModal = document.getElementById ("contenidoModal");

//carrito vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Recorre el array de productos e ingresa contenido HTML
Productos.forEach((producto)=> {
    let contenido = document.createElement("div");
    contenido.className = "card";
    contenido.innerHTML = `
        <img class="imagen" src=${producto.img} alt="">
        <h3 class="tipo">${producto.tipo}</h3>
        <p class="precio">${producto.precio} U$S</p>
    `;

    contenidoTienda.append(contenido);

    let comprar = document.createElement("button")
    comprar.className = "boton"
    comprar.innerText = "comprar" ;
    contenido.append(comprar);

    //Escuchar el evento
    comprar.addEventListener("click", () => {
        carrito.push({
            id : producto.id,
            img : producto.img,
            nombre : producto.tipo,
            precio: producto.precio,
        });
        console.log(carrito);
        guardarLocal();
    })
});

verCarrito.addEventListener("click", () => { 
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
        `;
    contenidoModal.append(contenidoCarrito)    
    })
    //total de carrito
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const compraTotal = document.createElement("div");
    compraTotal.className = "compra-total"
    compraTotal.innerText = `Total a pagar: ${total} U$S`;
    contenidoModal.append(compraTotal);

})

//set item
const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
};






