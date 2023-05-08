let montoPresupuesto = 0;
let gastos = [];

function generateUniqueId() {
  const timestamp = Date.now().toString(36); // Convertir la fecha actual a una cadena de caracteres en base 36
  const randomStr = Math.random().toString(36).substring(2, 8); // Generar una cadena aleatoria de 6 caracteres en base 36
  return `${timestamp}${randomStr}`; // Combinar los dos valores para obtener el ID único
}

function agregarPresupuesto() {
  let presupuesto = document.getElementById('inputPresupuesto');
  montoPresupuesto = parseInt(presupuesto.value);
  if (montoPresupuesto < 0 || isNaN(montoPresupuesto)) {
    alert('Tu monto inicial debe ser positivo, pida un prestamo');
  } else {
    console.log(montoPresupuesto);
    let html = `<div>$ ${montoPresupuesto.toLocaleString('es-ES')}</div>`;
    document.getElementById('montoPresupuesto').innerHTML = html;
    document.getElementById('inputPresupuesto').value = '';
    document.getElementById('saldo').innerHTML = html;
  }
}

function calcularSumaDeGastos(gastos) {
  let resultado = 0;
  gastos.forEach((gasto) => {
    resultado = resultado + gasto.monto;
  });
  return resultado;
}

function agregarGasto() {
  const nuevoGasto = {};
  let nombreGasto = document.getElementById('inputNombreGasto').value;
  let montoGasto = parseInt(document.getElementById('montoGasto').value);
  let idValue = generateUniqueId();

  if (!nombreGasto || montoGasto < 0 || isNaN(montoGasto)) {
    alert('Debes escribir un Nombre del Gasto y un Monto del gasto mayor a 0');
  } else {
    nuevoGasto['id'] = idValue;
    nuevoGasto['nombre'] = nombreGasto;
    nuevoGasto['monto'] = montoGasto;

    gastos.push(nuevoGasto);

    let htmlSaldo = ``;
    let htmlGasto = ``;

    let sumaGastos = calcularSumaDeGastos(gastos);
    let htmlSumaGastos = ``;

    gastos.forEach((gasto) => {
      htmlGasto += ` <div
    class="row border-bottom border-dark-subtle mx-4 d-flex flex-nowrap"
    id="${gasto.id}"
  >
    <div id="nombreGasto" class="col">${gasto.nombre}</div>
    <div id="valorDeGasto${
      gasto.id
    }" class="col">$ ${gasto.monto.toLocaleString('es-ES')}</div>
    <div class="col">
      <img
      id="img${gasto.id}"
        src="./assets/images/junk.png"
        alt="trash icon"
       class="trashImage" onclick="eliminarGasto(${gasto.id})"
      />
    </div>
  </div>`;
      htmlSumaGastos = `<div id="gastoAcumulado">$ ${sumaGastos.toLocaleString(
        'es-ES'
      )}</div>`;
    });

    htmlSaldo = `<div id="saldoActual">$ ${(
      montoPresupuesto - sumaGastos
    ).toLocaleString('es-ES')}</div>`;

    document.getElementById('sumaGastos').innerHTML = htmlSumaGastos;
    document.getElementById('cardGasto').innerHTML = htmlGasto;
    document.getElementById('saldo').innerHTML = htmlSaldo;
    document.getElementById('inputNombreGasto').value = '';
    document.getElementById('montoGasto').value = '';
    console.log(cardGasto);
  }
}

function eliminarGasto({ id }) {
  gastos = gastos.filter((gasto) => {
    return gasto.id !== id;
  });

  let sumaGastos = calcularSumaDeGastos(gastos);

  let saldoActual = montoPresupuesto - sumaGastos;
  let htmlGasto = '';

  gastos.forEach((gasto) => {
    htmlGasto += `
      <div class="row border-bottom border-dark-subtle mx-4 d-flex flex-nowrap" id="${
        gasto.id
      }">
        <div class="col">${gasto.nombre}</div>
        <div class="col">$ ${gasto.monto.toLocaleString('es-ES')}</div>
        <div class="col">
          <img id="img${
            gasto.id
          }" src="./assets/images/junk.png" alt="trash icon" class="trashImage" onclick="eliminarGasto(${
      gasto.id
    })"/>
        </div>
      </div>
    `;
  });

  document.getElementById('cardGasto').innerHTML = htmlGasto;
  document.getElementById(
    'gastoAcumulado'
  ).innerHTML = `$ ${sumaGastos.toLocaleString('es-ES')}`;
  document.getElementById(
    'saldoActual'
  ).innerHTML = `$ ${saldoActual.toLocaleString('es-ES')}`;
}
