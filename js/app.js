const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registroPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
  formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector("#termino").value;

  if (terminoBusqueda === "") {
    mostrarAlerta("Agregar un termino, para realizar la busqueda...");
    return;
  }

  buscarImagenes();
}

function mostrarAlerta(mensaje) {

  const existeAlerta = document.querySelector(".bg-red-100");

  if (!existeAlerta) {
    const alerta = document.createElement("p");
    alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded",
      "max-w-lg", "mx-auto", "mt-6", "text-center");

    alerta.innerHTML = `
    <strong class="font-bold">¡Vaya, ha ocurrido un Error!</strong>
     <br/>
    <span class="block sm:inline">${mensaje}</span>
  `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes() {

  const termino = document.querySelector("#termino").value;

  const key = "35049240-810631d43584f1c0d90607b80";
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {

      totalPaginas = calcularPagina(resultado.totalHits);

      // console.log(totalPaginas);
      mostrarImagenes(resultado.hits);
    })
}

// Generador que va a calcular la cantidad de páginas que hay de imagenes
function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function calcularPagina(total) {
  return parseInt(Math.ceil(total / registroPorPagina));
}

function mostrarImagenes(imagenes) {
  // console.log(imagenes);

  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  // Iterar sobre el arreglo de imagenes y mostrarlas en el HTML
  imagenes.forEach(imagen => {
    const { previewURL, likes, views, largeImageURL } = imagen;

    resultado.innerHTML += `
        <div class="md:w-1/3 lg:w-1/4 p-3 mb-3 rounder">
          <div class="bg-white">
            <img class="w-full" src="${previewURL}">
            <div class="p-4">            
              <div class="card-flex">
                <p class="p-flex">
                  <span class="font-bold"> ${likes} </span> 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.  5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                  </svg>            
                </p>

                <p class="p-flex"> 
                  <span class="font-bold"> ${views} </span> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"   class="w-5 h-5">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>         
                </p>
              </div>
              <a class="block text-center font-bold mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                Ver Imagen
              </a>
            </div>
          </div>
        </div>
      `;
  })

  // Limpiar el paginador previo
  while (paginacionDiv.firstChild) {
    paginacionDiv.removeChild(paginacionDiv.firstChild);
  }

  // Generamos el HTML5
  imprimirPaginador();
}

function imprimirPaginador() {
  iterador = crearPaginador(totalPaginas);

  while (true) {
    const { value, done } = iterador.next();

    if (done) return;

    // Caso contrario genera un boton por cada elemento en el generador 
    const boton = document.createElement('a');
    boton.href = "#";
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add("Siguiente", "bg-yellow-400", "px-4", "py-1", "mr-2", "font-bold", "mb-4", "rounder");

    boton.onclick = () => {
      paginaActual = value;

      buscarImagenes();
    }

    paginacionDiv.appendChild(boton);
  }
}