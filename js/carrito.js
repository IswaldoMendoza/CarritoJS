
//                >>>>>>>>>>>>>>>>>>>>>>>>> CONSTANTES Y VARIABLES <<<<<<<<<<<<<<<<<<<<<<<<<
const carro = document.querySelector(`#carrito`);

const contenedorDelCarrito = document.querySelector(`#lista-carrito tbody`);
const vaciarCarritoBtn = document.querySelector(`#vaciar-carrito`);
const listaJuegos = document.querySelector(`#lista-juegos`);
let estanteria = [];


// Eliminar juegos del carrito
carro.addEventListener("click", eliminarJuego)


// Vacia el carrito
vaciarCarritoBtn.addEventListener("click", () => {
  estanteria = []
  limpiarHTML();
})



//                >>>>>>>>>>>>>>>>>>>>>>>>> FUNCIONES <<<<<<<<<<<<<<<<<<<<<<<<<

cargarEventListeners();
function cargarEventListeners(){
  //agregar juego presionando "agregar al carrito"
  listaJuegos.addEventListener("click", agregarJuego);
}

function agregarJuego(e) {
  e.preventDefault();
  
  if( e.target.classList.contains("agregar-carrito") ){
    const juegoSeleccionado = e.target.parentElement.parentElement;
    leerDatosJuego(juegoSeleccionado);
  }
}

// Para eliminar un juego del carrito
function eliminarJuego(e){
  if(e.target.classList.contains("borrar-juego")){
    const juegoId = e.target.getAttribute("data-id");
    
    // Elimina del array de estanteria por el data-id
    estanteria = estanteria.filter( juego => juego.id !== juegoId );
    
    estanteriaHTML()

  }
}


//Para leer los datos
function leerDatosJuego(juego){
  
  
  // con esto se crea el objeto nuevo 
  const infoJuego = {
    imagen: juego.querySelector("img").src,
    nombre: juego.querySelector("h4").textContent,
    precio: juego.querySelector("span").textContent,
    id: juego.querySelector("a").getAttribute(`data-id`),
    cantidad: 1
  }
  
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Libreria <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  Swal.fire({
  title: "Producto Añadido!",
  text: "Ve tus compras en el carrito",
  icon: "success",
  confirmButtonText: "Aceptar",
});


// Esto revisa la existencia del juego en el carrito
const yaExiste = estanteria.some( juego => juego.id === infoJuego.id )
if(yaExiste){
  
  const juegos = estanteria.map( juego => {
    if(juego.id === infoJuego.id){
      juego.cantidad++;
      return juego;
    }else{
      return juego;
    }
  } );
  estanteria =[...juegos]
}else{
  estanteria = [...estanteria, infoJuego]
};



console.log(estanteria);

estanteriaHTML();

}


//Aqui se muestra el HTML que se va a inyectar al carrito

function estanteriaHTML(){
  
  //Limpiar el HTMl
  limpiarHTML()
  
  //Recorrer el HTML
  estanteria.forEach( juego=> {
    const {imagen, nombre, precio, cantidad, id} = juego;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <img src="${imagen}" width="150">
    </td>
    <td>
    ${nombre}
    </td>
    <td>
    ${precio}
    </td>
    <td>
    ${cantidad}
    </td>
    <td>
      <a href"#" class="borrar-juego" data-id="${id}"> X </a>
      </td>
      `;
      
      // agrega el HTML del carrito en el tbody
      contenedorDelCarrito.appendChild(row);
      
    })
  }
  
  
  
// Eliminar los cursos del tbdoy
function limpiarHTML(){

  while(contenedorDelCarrito.firstChild){
    contenedorDelCarrito.removeChild(contenedorDelCarrito.firstChild)
  }

}
