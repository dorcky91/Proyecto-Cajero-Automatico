//Datos Usuarios
let cuentas = [
  {
    nombre: "Mali Carla Mendoza Sánchez",
    correo: "mali@gmail.com",
    password: "Mali1234",
    saldo: 200,
    noCuenta: 3490457465,
  },
  {
    nombre: "Gera Junior López García",
    correo: "gera@gmail.com",
    password: "Gera1234",
    saldo: 290,
    noCuenta: 9807054608,
  },
  {
    nombre: "Maui Magdalena Giménez Delva",
    correo: "maui@gmail.com",
    password: "Maui1234",
    saldo: 67,
    noCuenta: 1324009857,
  },
  {
    nombre: "Lordan Bendt Bodgar Hernts",
    correo: "lordan@gmail.com",
    password: "Lordan1234",
    saldo: 900,
    noCuenta: 1991201414,
  },
  {
    nombre: "Gaby FL Appolon Méndez",
    correo: "gabyfl@gmail.com",
    password: "GabyFL1234",
    saldo: 700,
    noCuenta: 1998231414,
  },
];

//Guardar en localstorage
verificarDatosLocalStorage();
function verificarDatosLocalStorage() {
  let hayDatos = localStorage.getItem("cuentasRegistradas");
  if (hayDatos === null) {
    localStorage.setItem("cuentasRegistradas", JSON.stringify(cuentas));
  }
}

//Iniciar Sesión
function iniciarSesion(e) {
  let correo = document.querySelector("#correo-usuario");
  let password = document.querySelector("#contrasena-usuario");

  let baseDeDatosLocal = localStorage.getItem("cuentasRegistradas");
  let arreglo = JSON.parse(baseDeDatosLocal);
  //   for (let index = 0; index < arreglo.length; index++) {
  //     let correoDb = arreglo[index].correo;
  //     let passwordDb = arreglo[index].password;

  //     if (correo.value === correoDb && password.value === passwordDb) {
  //       location.href = "atm.html";
  //     }
  //   }

  let dato = arreglo.find(
    (x) => x.correo === correo.value && x.password === password.value
  );

  if (dato) {
    sessionStorage.setItem("usuarioConectado", correo.value);
    location.href = "atm.html";
  } else {
    let error = document.querySelector("#error");
    error.innerText = "Contraseña y/o correo incorrecto.";
  }

  e.preventDefault();
}

function verificarSesion() {
  if (!sessionStorage.getItem("usuarioConectado")) {
    location.href = "index.html";
  }
}

// if (location.href.includes("atm.html")) {
//   // if (!sessionStorage.getItem("usuarioConectado")) {
//   //   location.href = "index.html";
//   // }

//   var mostrarPorPrimeraVez = (function () {
//     var executed = false;
//     return function () {
//       if (!executed) {
//         executed = true;
//         mostrarPantallaInicio();
//       }
//     };
//   })();
//   mostrarPorPrimeraVez();
// }

function cerrarSession() {
  sessionStorage.clear();
}

//Pantalla Inicio
function mostrarPantallaInicio() {
  verificarSesion();

  let correoSesion = sessionStorage.getItem("usuarioConectado");
  let usuarioConectado = JSON.parse(
    localStorage.getItem("cuentasRegistradas")
  ).find((x) => x.correo === correoSesion);

  let contenido = document.getElementById("contenido");
  contenido.innerHTML = `
    <div id="pantalla-inicio">
        <div id="bienvenido">
            <h3 class="mb-4">Bienvenido <span id="usuario">${usuarioConectado.nombre}</span></h3>
            <h4>¿Qué desea realizar?</h4>
        </div>

      <div class="container-xl">
        <div id="menu-principal">
          <div class="row gy-3">
            <div class="col-6 col-md-4">
              <div id="menu-depositar" class="menu-item h-100 py-lg-3 p-2">
                <a class="text-decoration-none" role="button" onclick="mostrarPantallaDepositar()">
                <img height="50" src="fotos/depositar.png" alt="" />
                <p class="mb-0">Depositar a cuenta</p>
                </a>
              </div>
            </div>

            <div class="col-6 col-md-4">
              <div id="menu-retirar" class="menu-item h-100 py-lg-3 p-2">
                <a class="text-decoration-none" role="button" onclick="mostrarPantallaRetirar()">
                <img height="50" src="fotos/retiro.png" alt="" />
                <p class="mb-0">Retirar efectivo</p>
                </a>
              </div>
            </div>

            <div class="col-6 col-md-4 mx-auto">
              <div id="menu-consultar" class="menu-item h-100 py-lg-3 p-2">
                <a class="text-decoration-none" role="button" onclick="mostrarPantallaConsultar()">
                <img height="50" src="fotos/consultar.png" alt="" />
                <p class="mb-0">Consultar saldo</p>
                </a>
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  `;

  let btnAceptar = document.querySelector("#btn-aceptar");
  btnAceptar.onclick = function () {
    return false;
  };

  let btnCancelar = document.querySelector("#btn-cancelar");
  btnCancelar.onclick = function () {
    return false;
  };

  let btnBorrar = document.querySelector("#btn-borrar");
  btnBorrar.onclick = function () {
    return false;
  };
}

//Pantalla Depositar
function mostrarPantallaDepositar() {
  verificarSesion();

  let contenido = document.getElementById("contenido");
  contenido.innerHTML = `
  <div id="pantalla-depositar" class="row gy-5">
    <div class="left col-12 col-md-6">
        <h3 class="mb-5 fs-5">Depositar a cuenta</h3>

        <div id="depositar-formulario">
        </div>
    </div>
    <div class="col-12 d-md-none">
      <div id="botones-atm" class="d-flex border-0 ">
        <button id="btn-cancelar" class="btn-acciones">Cancelar</button>
        <button id="btn-aceptar" class="btn-acciones">Aceptar</button>
      </div>
    </div>
    <div class="gif col-12 col-md-6">
    </div>
  </div>
  `;

  mostrarDepositarFormulario();

  let btnBorrar = document.querySelector("#btn-borrar");
  btnBorrar.onclick = function () {
    borrarNumeroEnPantalla();
  };
}

function validarNumeroCuenta() {
  let error = document.querySelector("#error");
  error.innerText = "Número de cuenta incorrecto/no existe.";

  let numeroCuenta = document.querySelector("#numero-cuenta");
  let cantidad = document.querySelector("#cantidad-depositar");
  let otraCantidad = document.querySelector("#otra-cantidad");

  let btnAceptar = document.querySelector("#btn-aceptar");
  btnAceptar.onclick = function () {
    return false;
  };

  if (numeroCuenta) {
    if (numeroCuenta.value.length === 10) {
      if (beneficiario(numeroCuenta.value) != null) {
        error.innerText = "";

        if (cantidad.value.length > 0) {
          btnAceptar.onclick = function () {
            let inputEscondido = document.querySelector("#input-escondido");
            inputEscondido.value = numeroCuenta.value;

            let inputCantidadEscondido = document.querySelector(
              "#input-cantidad-escondido"
            );
            inputCantidadEscondido.value = cantidad.value;

            mostrarDepositarConfirmar();
            let confirmarCuenta = document.querySelector(
              "#numero-cuenta-confirmar"
            );
            confirmarCuenta.value = inputEscondido.value;
            beneficiario(confirmarCuenta.value);
          };
        }
      }
    }
  }

  if (otraCantidad) {
    error.innerText = "";
    if (otraCantidad.value.length > 0) {
      btnAceptar.onclick = function () {
        mostrarOtraCantidadRetirar(otraCantidad.value);
      };
    }

    let btnBorrar = document.querySelector("#btn-borrar");
    btnBorrar.onclick = function () {
      borrarNumeroEnPantalla();
    };
  }
}

let botonNumero = document.querySelectorAll(".btn-numero");
botonNumero.forEach((boton) => {
  boton.addEventListener("click", () => {
    let inputActivo = document.querySelector(".form-control.activo");

    inputActivo.value += boton.innerText;
    inputActivo.focus();

    if (inputActivo.id === "numero-cuenta") {
      if (inputActivo.value.length > 10) {
        inputActivo.value = inputActivo.value.slice(0, -1);
      }
    } else if (inputActivo.id === "cantidad-depositar") {
      if (inputActivo.value.length > 3) {
        inputActivo.value = inputActivo.value.slice(0, -1);
      }
    } else if (inputActivo.id === "otra-cantidad") {
      if (inputActivo.value.length > 3) {
        inputActivo.value = inputActivo.value.slice(0, -1);
      }
    }

    //Ann veye pi devan
    validarNumeroCuenta();
  });
});

function inputDeposito(numero) {
  let inputDeposito = document.querySelectorAll(".form-control");
  inputDeposito.forEach((elemento) => {
    elemento.classList.remove("activo");
  });

  numero.classList.add("activo");
}

function borrarNumeroEnPantalla() {
  let inputActivo = document.querySelector(".form-control.activo");
  let resultado = inputActivo.value.slice(0, -1);
  inputActivo.focus();
  inputActivo.value = resultado;

  //Ann veye pi devan
  validarNumeroCuenta();
}

function mostrarDepositarFormulario() {
  let mostrarDepositarFormulario = document.getElementById(
    "depositar-formulario"
  );

  mostrarDepositarFormulario.innerHTML = `
    <form action="" autocomplete="off">
        <div class="form-group">
            <label class="form-label" for="numero-cuenta">Número de cuenta de destino :</label>
            <input class="form-control activo" id="numero-cuenta" type="text" maxlength="10" onfocus="inputDeposito(this)" oninput="validarNumeroCuenta()"/>
        </div>
        <div id="error" class="error"></div>
        <div class="form-group">
            <label class="form-label" for="cantidad-depositar">Cantidad a depositar :</label>
            <input class="form-control" id="cantidad-depositar" type="text" maxlength="3"
            onfocus="inputDeposito(this)" oninput="validarNumeroCuenta()"/>
        </div>
    </form>
    `;

  mostrarDepositarImagenFormulario();

  let btnCancelar = document.querySelector("#btn-cancelar");
  btnCancelar.onclick = function () {
    mostrarPantallaInicio();
  };

  let btnAceptar = document.querySelector("#btn-aceptar");
  btnAceptar.onclick = function () {
    validarNumeroCuenta();
    // return false;
  };
}

function mostrarDepositarImagenFormulario() {
  let gif = document.querySelector(".gif");
  gif.innerHTML = `
    <img src="fotos/10.jpg" alt="" />
    `;
}

function mostrarDepositarImagenConfirmar() {
  let gif = document.querySelector(".gif");
  gif.innerHTML = `
    <img class="right" src="fotos/secretaria.jpg" alt="" />
    `;

  let beneficiarioConfirmar = document.querySelector("#beneficiario-confirmar");
  let inputEscondido = document.querySelector("#input-escondido");
  beneficiarioConfirmar.value = beneficiario(inputEscondido.value);

  let btnAceptar = document.querySelector("#btn-aceptar");
  btnAceptar.onclick = function () {
    mostrarPantallaValidacion();

    let mensaje;
    let carita;

    let depositoExitoso = actualizarSaldo("deposito");
    if (depositoExitoso === true) {
      mensaje =
        "Su transacción ha sido realizado satisfactoriamente.<br/><br/> Regrese pronto.";
      carita = "caritaFeliz.png";
    } else {
      mensaje =
        "Su depósito ha sido rechazado: esta cuenta no puede exceder el limite ($990.00).<br/><br/> Intenta nuevamente.";
      carita = "caritaTriste.png";
    }

    loading(mensaje, carita);
  };

  let btnCancelar = document.querySelector("#btn-cancelar");
  btnCancelar.onclick = function () {
    mostrarDepositarFormulario();

    let numeroCuenta = document.querySelector("#numero-cuenta");
    numeroCuenta.value = inputEscondido.value;

    let inputCantidadEscondido = document.querySelector(
      "#input-cantidad-escondido"
    );
    let cantidad = document.querySelector("#cantidad-depositar");
    cantidad.value = inputCantidadEscondido.value;
    validarNumeroCuenta();
  };
}

function mostrarDepositarConfirmar() {
  let mostrarDepositarFormulario = document.getElementById(
    "depositar-formulario"
  );
  mostrarDepositarFormulario.innerHTML = `
    <div id="depositar-confirmar">
        <p class="mb-4">Favor de confirmar los datos de la cuenta de destino.</p>
        <div class="form-group">
            <label class="form-label" for="numero-cuenta-confirmar">Número de cuenta :</label>
            <input class="form-control" id="numero-cuenta-confirmar" type="text" disabled />
        </div>
        <div class="form-group">
            <label class="form-label" for="beneficiario-confirmar">Beneficiario :</label>
            <input class="form-control" id="beneficiario-confirmar" type="text" disabled />
        </div>
    </div>
`;

  mostrarDepositarImagenConfirmar();
}

function beneficiario(numeroCuenta) {
  var baseDeDatosLocal = localStorage.getItem("cuentasRegistradas");
  let arreglo = JSON.parse(baseDeDatosLocal);

  let dato = arreglo.find((x) => x.noCuenta == numeroCuenta);
  if (dato) {
    return dato.nombre;
  }
  return null;
}

//Pantalla Retirar
function mostrarPantallaRetirar() {
  verificarSesion();

  let contenido = document.getElementById("contenido");
  contenido.innerHTML = `
      <div id="retirar-efectivo" class="row gy-3">
        <div class="col-md-7">
          <div id="pantalla-retirar">
                 <h3 class="mb-5 fs-5">Retirar efectivo</h3>
             </div>
             <div class="cuenta-retiro">
                 <div id="retirar">
                     <p class="mb-4">
                         Retirar efectivo de nuestro cajero de manera rápida y segura.
                     </p>
                </div>
             </div>
             <p class="mb-4">
                 Seleccionar la cantidad que desea retirar :
             </p>
             <div id="numeros">

                 <div class="retiro-atm retiroBtn">
                     <button class="btn-cantidad" onclick="mostrarOtraCantidadRetirar(this.innerText)">$50</button>
                 </div>

                 <div class="retiro-atm retiroBtn">
                     <button class="btn-cantidad" onclick="mostrarOtraCantidadRetirar(this.innerText)">$100</button>
                 </div>

                 <div class="retiro-atm retiroBtn" onclick="mostrarOtraCantidadRetirar(this.innerText)">
                     <button class="btn-cantidad">$200</button>
                 </div>

                 <div class="retiro-atm retiroBtn">
                     <button class="btn-cantidad" onclick="mostrarOtraCantidadRetirar(this.innerText)">$300</button>
                 </div>

                 <div class="retiro-atm retiroBtn">
                     <button class="btn-cantidad" onclick="mostrarOtraCantidadRetirar(this.innerText)">$400</button>
                 </div>

                 <div class="retiro-atm retiroBtn">
                     <button class="btn-cantidad" onclick="mostrarOtraCantidadRetirar(this.innerText)">$500</button>
                 </div>

                 <div class="retiro-atm retiroBtn">
                     <button class="btn-cantidad" onclick="mostrarOtraCantidadRetirar(this.innerText)">$1000</button>
                 </div>

                 <div class="retiro-atm retiroBtn otra-cantidad">
                     <button class="btn-cantidad" onclick="mostrarOtraCantidadDetalle()">Otra cantidad</button>
                 </div>

            </div>
            </div>
            <div id="iconos-retiro" class="col-md-5">
              <div>
                <img src="https://www.gifsanimados.org/data/media/56/computadora-y-ordenador-imagen-animada-0204.gif" border="0" alt="computadora-y-ordenador-imagen-animada-0204"/>
              </div>

              <div>
                  <img class="w-100 object-fit-cover h-100" src="fotos/atmRetiro.jpg" />
              </div>
        </div>
      </div>
  `;

  let retirarBtn = document.querySelectorAll(".retiroBtn");
  retirarBtn.onclick = function () {
    mostrarOtraCantidadDetalle();
  };

  let btnCancelar = document.querySelector("#btn-cancelar");
  btnCancelar.onclick = function () {
    mostrarPantallaInicio();
  };

  let btnAceptar = document.querySelector("#btn-aceptar");
  btnAceptar.onclick = function () {
    console.log("pantalla retirar");
    return false;
  };
}

function mostrarOtraCantidadRetirar(cantidad) {
  let contenido = document.querySelector("#contenido");
  contenido.innerHTML = `
    <div class="confirmacion-retiro text-start row">
      <div class="col-12">
         <div id="pantalla-retirar">
             <h3 class="mb-5 fs-5">Cantidad a retirar:<span id="cantidad-deseado-retirar"></span> </h3>
         </div">
         
          <div class="confirmacion-retiro">
             <h4 class="mb-6 fs-5">¿Es correcta la información ingresada?</h4>
             <h4 class="mb-4 fs-5">Presione <span class="aceptar">Aceptar</span> para confirmar.</h4>
             <h4 class="fs-5 mb-4"> Sino, presione <span id="cancelar">Cancelar</span> para regresar.</h4>
          </div>
      </div>

      <div class="col-12 d-md-none mt-5">
        <div id="botones-atm" class="d-flex border-0 ">
           <button id="btn-cancelar" class="btn-acciones">Cancelar</button>
           <button id="btn-aceptar" class="btn-acciones">Aceptar</button>
        </div>
      </div>
    </div>
    </div>
    `;

  let nuevoEscondido = document.querySelector("#cantidad-deseado-retirar");
  nuevoEscondido.innerText = cantidad;

  let btnCancelar = document.querySelector("#btn-cancelar");
  btnCancelar.onclick = function () {
    mostrarPantallaRetirar();
  };

  let btnAceptar = document.querySelectorAll("#btn-aceptar");
  btnAceptar.forEach((element) => {
    element.onclick = function () {
      let inputCantidadEscondido = document.querySelector(
        "#input-cantidad-escondido"
      );
      inputCantidadEscondido.value = cantidad.replace("$", "");

      let numeroCuentaEscondido = document.querySelector("#input-escondido");

      var baseDeDatosLocal = localStorage.getItem("cuentasRegistradas");
      let arreglo = JSON.parse(baseDeDatosLocal);

      let dato = arreglo.find(
        (x) => x.correo === sessionStorage.getItem("usuarioConectado")
      );

      if (dato) {
        numeroCuentaEscondido.value = dato.noCuenta;
      }

      mostrarPantallaValidacion();
      let mensaje;
      let carita;

      let depositoExitoso = actualizarSaldo("retiro");
      if (depositoExitoso === true) {
        mensaje =
          "Su retiro ha sido realizado satisfactoriamente.<br/><br/> Regrese pronto.";
        carita = "caritaFeliz.png";
      } else {
        mensaje =
          "Su retiro ha sido rechazado: saldo insuficiente o cantidad incorrecta.<br/><br/> Intenta nuevamente.";
        carita = "caritaTriste.png";
      }

      loading(mensaje, carita);
    };
  });
}

function mostrarOtraCantidadDetalle() {
  let contenido = document.querySelector("#contenido");
  contenido.innerHTML = `
        <div class="form-group detalle-cantidad row gy-3">
          <form id="form-cantidad" class="col-12 col-md-6" autocomplete="off">
             <div>
                 <h3 class="mb-5 fs-5">Retirar efectivo</h3>
             </div>

            <div class="form-group">
                 <label class="form-label" for="otra-cantidad">Digite la cantida que desea retirar :</label>
                 <input class="form-control activo" id="otra-cantidad" name="otra-cantidad" type="text" maxlength="3" onfocus="inputDeposito(this)" required />
            </div>
            <div id="error" class="error"></div>
          </form>

          <div class="col-12 col-md-6 order-1">
             <img src="fotos/retiroOtraCantidad.jpg" />
         </div>

          <div class="col-12 d-md-none mb-3 order-0">
            <div id="botones-atm" class="d-flex border-0 ">
               <button id="btn-cancelar" class="btn-acciones">Cancelar</button>
               <button id="btn-aceptar" class="btn-acciones">Aceptar</button>
            </div>
          </div>
        </div>
    `;

  let btnCancelar = document.querySelector("#btn-cancelar");
  btnCancelar.onclick = function () {
    mostrarPantallaRetirar();
  };

  let btnAceptar = document.querySelector("#btn-aceptar");
  btnAceptar.onclick = function () {
    mostrarPantallaValidacion();

    let mensaje;
    let carita;

    let retiroExitoso = actualizarSaldo("retiro");
    if (retiroExitoso === true) {
      mensaje =
        "Su retiro ha sido realizado satisfactoriamente.<br/><br/> Regrese pronto.";
      carita = "caritaFeliz.png";
    } else {
      mensaje =
        "Su retiro ha sido rechazado: saldo insuficiente o cantidad incorrecta.<br/><br/> Intenta nuevamente.";
      carita = "caritaTriste.png";
    }

    loading(mensaje, carita);
  };
}

//Pantalla Consultar
function mostrarPantallaConsultar() {
  verificarSesion();

  mostrarPantallaValidacion();

  setTimeout(function () {
    let contenido = document.getElementById("contenido");
    contenido.innerHTML = `
      <div id="pantalla-consultar" class="mb-5 row gy-3">
        <div id="consultar-form" class="col-12 col-md-6">
             <h3 class="mb-5 fs-5">Consultar saldo</h3>

             <div>
                 <div class="form-group">
                     <label class="form-label" for="saldo-total">Saldo total :</label>
                     <input class="form-control bg-light" id="saldo-total" type="text" disabled />
                 </div>
         
                 <div class="form-group">
                     <label class="form-label" for="saldo-disponible">Saldo disponible :</label>
                     <input class="form-control bg-light" id="saldo-disponible" type="text" disabled />
                 </div>
             </div>

            <div class="d-none d-md-block mt-3">Presione 
              <span class="aceptar">Aceptar</span> Para regresar al menú principal.
            </div> 
        </div>



        <div id="consultar-saldo" class="col-12 col-md-6">
           <img src="fotos/consultarSaldo.jpg">
        </div>
      </div> 
`;

    consultarSaldo();
  }, 2000);

  let btnAceptar = document.querySelector("#btn-aceptar");
  btnAceptar.onclick = function () {
    mostrarPantallaInicio();
  };
}

function actualizarSaldo(tipoActualizacion) {
  let numeroCuentaTransaccion = document.querySelector("#input-escondido");
  let cantidadTransaccion = document.querySelector("#input-cantidad-escondido");

  //  if (!cantidadTransaccion.value.includes("-")) {
  if (tipoActualizacion === "deposito") {
    let arreglo = JSON.parse(localStorage.getItem("cuentasRegistradas"));
    let dato = arreglo.find(
      (x) => x.noCuenta === parseInt(numeroCuentaTransaccion.value)
    );

    if (dato) {
      let saldoActual = dato.saldo;
      if (parseInt(cantidadTransaccion.value) > 0) {
        let nuevoSaldo = saldoActual + parseFloat(cantidadTransaccion.value);

        if (nuevoSaldo <= 990) {
          dato.saldo = nuevoSaldo;
          localStorage.setItem("cuentasRegistradas", JSON.stringify(arreglo));
          return true;
        }
      }
    }
  } else if (tipoActualizacion === "retiro") {
    let arreglo = JSON.parse(localStorage.getItem("cuentasRegistradas"));

    let dato = arreglo.find(
      (x) => x.noCuenta === parseInt(numeroCuentaTransaccion.value)
    );

    if (dato) {
      let saldoActual = dato.saldo;
      if (parseInt(cantidadTransaccion.value) > 0) {
        let nuevoSaldo = saldoActual - parseFloat(cantidadTransaccion.value);

        if (saldoActual > 10 && nuevoSaldo > 0) {
          dato.saldo = nuevoSaldo;
          localStorage.setItem("cuentasRegistradas", JSON.stringify(arreglo));
          return true;
        }
      }
    }
  }
  //}

  return false;
}

function consultarSaldo() {
  let correoSesion = sessionStorage.getItem("usuarioConectado");
  var baseDeDatosLocal = localStorage.getItem("cuentasRegistradas");
  let arreglo = JSON.parse(baseDeDatosLocal);

  let dato = arreglo.find((x) => x.correo === correoSesion);
  if (dato) {
    let saldoTotal = document.querySelector("#saldo-total");
    saldoTotal.value = "$" + dato.saldo;
    let saldoDisponible = document.querySelector("#saldo-disponible");
    saldoDisponible.value = "$" + (dato.saldo - 10);
  }
}

function loading(mensaje, carita) {
  setTimeout(function () {
    mostrarValidacionDetalle(mensaje, carita);
  }, 8000);
}

//Pantalla Validacion
function mostrarPantallaValidacion() {
  let contenido = document.getElementById("contenido");
  contenido.innerHTML = `
    <div id="validacion">
        <div id="validacion-detalle">
            <p class="mb-4">Favor de esperar</p>
            <img class="mb-4"
                src="https://www.gifsanimados.org/data/media/1261/reloj-de-arena-imagen-animada-0010.gif"
                border="0"
                alt="reloj-de-arena-imagen-animada-0010" />
            <p>Su transacción está siendo procesada.</p>
        </div>
    </div>
  `;
}

function mostrarValidacionDetalle(mensaje, carita) {
  let validacionDetalle = document.querySelector("#validacion-detalle");
  validacionDetalle.innerHTML = `
     <h3>
        ${mensaje}
     </h3>
     <br/>
     <img src="fotos/${carita}" />
  `;

  let btnAceptar = document.querySelector("#btn-aceptar");
  btnAceptar.onclick = function () {
    return false;
  };

  setTimeout(function () {
    mostrarPantallaInicio();
  }, 8000);
}
