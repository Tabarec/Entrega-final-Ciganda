const btn = document.querySelector("#btnCarrito");
const verSeleccionado = document.querySelector("#verCarrito");
const eliminar = document.querySelector("#btnEliminar");

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productos; 

fetch("productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data.productos;
  })
  .catch(error => console.error("Ocurrió un error"));

  btn.addEventListener("click", agregar);
    verSeleccionado.addEventListener("click", ver);
    eliminar.addEventListener("click", eliminarProducto);

function agregar() {
  let producto = document.querySelector("#productoAAgregar").value.toLowerCase();
  let mensaje = document.querySelector("#agregado");
  let productoABuscar = productos.find(objeto => objeto.nombre === producto);

  if (productoABuscar) {
    carrito.push(producto);
    let total = 0;
    total += productoABuscar.precio;

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mensaje.innerHTML = "El producto fue agregado al carrito exitosamente, el precio final es " + total;
  } 
  
  else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ingrese un producto de la lista",
    });
  }
}


function ver() {
  let mensaje = document.querySelector("#queTengo");

  if (carrito.length >= 1) {
    mensaje.innerHTML = "Producto/s agregado/s: " + carrito;
  } 
  
  else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El carrito está vacío",
    });
  }
}

function eliminarProducto() {
  let mensaje = document.querySelector("#productoEliminado");
  let productoAEliminar = document.querySelector("#productoAEliminar").value.toLowerCase();

  let nuevoCarrito = carrito.filter((producto) => producto !== productoAEliminar);

  if (nuevoCarrito.length < carrito.length) {
    carrito = nuevoCarrito;
    mensaje.innerHTML = "Producto eliminado exitosamente, el nuevo carrito es: " + carrito;

    localStorage.setItem('carrito', JSON.stringify(carrito));
  } 
  
  else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El producto elegido no existe o no está en el carrito",
    });
}
}