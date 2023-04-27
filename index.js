let montoPresupuesto = 0;

function agregarPresupuesto() {
  let presupuesto = document.getElementById('inputPresupuesto');
  montoPresupuesto = presupuesto.value;
  let html = `<div>${montoPresupuesto}</div>`;
  document.getElementById('montoPresupuesto').innerHTML = html;
  document.getElementById('inputPresupuesto').value = '';
  document.getElementById('saldo').innerHTML = html;
}

let gastos = {};
function agregarGasto() {
  let nombreGasto = document.getElementById('inputNombreGasto').value;
  let montoGasto = document.getElementById('montoGasto').value;
  console.log(saldo);

  gastos[nombreGasto] = montoGasto;

  let htmlSaldo = ``;
  let htmlGasto = ``;
  let sumaGastos = 0;
  let htmlSumaGastos = ``;

  for (gasto in gastos) {
    htmlGasto += ` <div
    class="row border-bottom border-dark-subtle mx-4 d-flex flex-nowrap"
    id="${gasto}"
  >
    <div id="nombreGasto" class="col">${gasto}</div>
    <div id="anadeGasto" class="col">${gastos[gasto]}</div>
    <div class="col">
      <img
      id="img${gasto}"
        src="./assets/images/junk.png"
        alt="trash icon"
        class="trashImage"
        onclick="eliminarGasto()"
      />
    </div>
  </div>`;
    sumaGastos += parseInt(gastos[gasto]);
    htmlSumaGastos = `<div>${sumaGastos}</div>`;
  }
  htmlSaldo = `<div>${parseInt(montoPresupuesto) - sumaGastos}</div>`;

  document.getElementById('sumaGastos').innerHTML = htmlSumaGastos;
  document.getElementById('cardGasto').innerHTML = htmlGasto;
  document.getElementById('saldo').innerHTML = htmlSaldo;
  document.getElementById('inputNombreGasto').value = '';
  document.getElementById('montoGasto').value = '';
}

function eliminarGasto() {
  let trashImg = document.getElementById(`${gasto}`);
  trashImg.remove();
}
