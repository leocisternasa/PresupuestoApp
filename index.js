let montoPresupuesto = 0;

function agregarPresupuesto() {
  let presupuesto = document.getElementById('inputPresupuesto');
  montoPresupuesto = presupuesto.value;
  let html = `<div>$ ${parseInt(montoPresupuesto).toLocaleString(
    'es-ES'
  )}</div>`;
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

  for (let gasto in gastos) {
    htmlGasto += ` <div
    class="row border-bottom border-dark-subtle mx-4 d-flex flex-nowrap"
    id="${gasto}"
  >
    <div id="nombreGasto" class="col">${gasto}</div>
    <div id="valorDeGasto${gasto}" class="col">$ ${parseInt(
      gastos[gasto]
    ).toLocaleString('es-ES')}</div>
    <div class="col">
      <img
      id="img${gasto}"
        src="./assets/images/junk.png"
        alt="trash icon"
        class="trashImage"
        onclick="eliminarGasto(${gasto})"
      />
    </div>
  </div>`;
    sumaGastos += parseInt(gastos[gasto]);
    htmlSumaGastos = `<div id="gastoAcumulado">$ ${sumaGastos.toLocaleString(
      'es-ES'
    )}</div>`;
  }
  htmlSaldo = `<div id="saldoActual">$ ${(
    parseInt(montoPresupuesto) - sumaGastos
  ).toLocaleString('es-ES')}</div>`;

  document.getElementById('sumaGastos').innerHTML = htmlSumaGastos;
  document.getElementById('cardGasto').innerHTML = htmlGasto;
  document.getElementById('saldo').innerHTML = htmlSaldo;
  document.getElementById('inputNombreGasto').value = '';
  document.getElementById('montoGasto').value = '';
  console.log(cardGasto);
}

function eliminarGasto(nombreGasto) {
  console.log(Object.keys(gastos).length);
  console.log(nombreGasto);
  delete gastos[nombreGasto];
  console.log(Object.keys(gastos).length);
  let sumaGastos = 0;
  for (let gasto in gastos) {
    sumaGastos += parseInt(gastos[gasto]);
  }
  let saldoActual = parseInt(montoPresupuesto) - sumaGastos;
  let htmlGasto = '';
  for (let gasto in gastos) {
    // if (Object.keys(gastos).length == 1) {
    //   htmlGasto = ``;

    //   document.getElementById('sumaGastos').textContent = ``;
    //   document.getElementById('saldo').textContent = ``;
    // } else {
    htmlGasto += `
      <div class="row border-bottom border-dark-subtle mx-4 d-flex flex-nowrap" id="${gasto}">
        <div class="col">${gasto}</div>
        <div class="col">$ ${gastos[gasto].toLocaleString('es-ES')}</div>
        <div class="col">
          <img src="./assets/images/junk.png" alt="trash icon" class="trashImage" onclick="eliminarGasto('${gasto}')"/>
        </div>
      </div>
    `;
  }

  document.getElementById('cardGasto').innerHTML = htmlGasto;
  document.getElementById(
    'gastoAcumulado'
  ).innerHTML = `$ ${sumaGastos.toLocaleString('es-ES')}`;
  document.getElementById(
    'saldoActual'
  ).innerHTML = `$ ${saldoActual.toLocaleString('es-ES')}`;
  // }
}
