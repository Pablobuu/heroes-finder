//Validación de formulario

let buscar = document.getElementById("form-busqueda");
const validar = () => {
  let patronNum = /^[0-9]{0,3}$/gim;
  let numIngresado = document.querySelector(".input-busqueda").value;
  if (!numIngresado.match(patronNum)) {
    alert("Ingresa sólo números para tu búsqueda");
    document.querySelector(".input-busqueda").value = "";
  } else {
    buscaHeroe(numIngresado);
  }
};
buscar.addEventListener("click", validar);

//AJAX

function buscaHeroe(id) {
  $.ajax({
    type: "GET",
    url: "https://www.superheroapi.com/api.php/4905856019427443/${id}",
    dataType: "json",
    success: function (datos) {
      console.log(datos);
      muestraInfo;
      muestraGrafico;
    },
    error: function (error) {
      alert("Error al buscar los datos");
    },
  });
}

function muestraInfo(datos) {}

function muestraGrafico(datos) {}
