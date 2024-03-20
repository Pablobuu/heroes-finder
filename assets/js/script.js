//Validación de formulario
$(document).ready(function () {
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
  buscar.addEventListener("click", function (event) {
    event.preventDefault();
    validar();
  });
  buscar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      validar();
    }
  });

  //AJAX

  function muestraInfo(datosApi) {
    const ul = $("#info-list");
    $("#nombre").html(datosApi.name);
    $("#heroes-img").attr("src", datosApi.image.url);
    $("#aliases").html(datosApi.biography.aliases.join(" | "));
    ul.empty();
    ul.append(`<li>Publicado por: ${datosApi.biography.publisher}</li>`);
    ul.append(
      `<li>Primera aparición: ${datosApi.biography["first-appearance"]}</li>`
    );
    ul.append(`<li>Altura: ${datosApi.appearance.height}</li>`);
    ul.append(`<li>Peso: ${datosApi.appearance.weight}</li>`);
    ul.append(`<li>Familia: ${datosApi.connections.relatives}</li>`);
    ul.append(
      `<li>Conexiones: ${datosApi.connections["group-affiliation"]}</li>`
    );
    ul.append(`<li>Alineamiento: ${datosApi.biography.alignment}</li>`);
    $("#stats").html("Estadísticas de poder");
  }

  let dataPoints = [];
  let options = {
    title: {
      text: "",
    },
    legend: {},
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{indexLabel}",
        dataPoints: [""],
      },
    ],
  };

  let chart = new CanvasJS.Chart("chartContainer", options);

  function buscaHeroe(id) {
    dataPoints = [];
    options.data[0].dataPoints = dataPoints;
    chart.render();
    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
      dataType: "json",
      success: function (datosApi) {
        muestraInfo(datosApi);
        dataPoints.push(
          { y: datosApi.powerstats.intelligence, indexLabel: "Intelligence" },
          { y: datosApi.powerstats.strength, indexLabel: "Strength" },
          { y: datosApi.powerstats.speed, indexLabel: "Speed" },
          { y: datosApi.powerstats.durability, indexLabel: "Durability" },
          { y: datosApi.powerstats.power, indexLabel: "Power" },
          { y: datosApi.powerstats.combat, indexLabel: "Combat" }
        );
        options.data[0].dataPoints = dataPoints;
        chart.render();
      },
      error: function (error) {
        alert("Error al buscar los datos");
      },
    });
  }
});
