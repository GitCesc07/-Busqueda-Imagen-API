const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

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
}

function mostrarAlerta(mensaje) {
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