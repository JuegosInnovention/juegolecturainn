document.addEventListener("DOMContentLoaded", function () {
  const consonantesDiv = document.getElementById("consonantes");
  const vocalesDiv = document.getElementById("vocales");
  const imagenPalabra = document.getElementById("imagen-palabra");
  const contenedorLetrasEscritas = document.getElementById("contenedor-letras-escritas");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnComprobar = document.getElementById("btnComprobar");

  const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  const vocales = ["A", "E", "I", "O", "U"];

  const palabras = {
    "A": { palabra: "Arbol", imagen: "imagenes/arbol.jpg" },
    "B": { palabra: "Barco", imagen: "imagenes/barco.jpg" },
    "C": { palabra: "Casa", imagen: "imagenes/casa.jpg" },
    "D": { palabra: "Dado", imagen: "imagenes/dado.jpg" },
    "E": { palabra: "Elefante", imagen: "imagenes/elefante.jpg" },
    "F": { palabra: "Foca", imagen: "imagenes/foca.jpg" },
    "G": { palabra: "Gato", imagen: "imagenes/gato.jpg" },
    "H": { palabra: "Helado", imagen: "imagenes/helado.jpg" },
    "I": { palabra: "Isla", imagen: "imagenes/isla.jpg" },
    "J": { palabra: "Jirafa", imagen: "imagenes/jirafa.jpg" },
    "K": { palabra: "Koala", imagen: "imagenes/koala.jpg" },
    "L": { palabra: "Luna", imagen: "imagenes/luna.jpg" },
    "M": { palabra: "Manzana", imagen: "imagenes/manzana.jpg" },
    "N": { palabra: "Nube", imagen: "imagenes/nube.jpg" },
    "Ñ": { palabra: "Ñu", imagen: "imagenes/ñu.jpg" },
    "O": { palabra: "Oso", imagen: "imagenes/oso.jpg" },
    "P": { palabra: "Perro", imagen: "imagenes/perro.jpg" },
    "Q": { palabra: "Queso", imagen: "imagenes/queso.jpg" },
    "R": { palabra: "Rana", imagen: "imagenes/rana.jpg" },
    "S": { palabra: "Sol", imagen: "imagenes/sol.jpg" },
    "T": { palabra: "Tigre", imagen: "imagenes/tigre.jpg" },
    "U": { palabra: "Uva", imagen: "imagenes/uva.jpg" },
    "V": { palabra: "Vela", imagen: "imagenes/vela.jpg" },
    "W": { palabra: "Wafle", imagen: "imagenes/waffles.jpg" },
    "X": { palabra: "Xilofono", imagen: "imagenes/xilofono.jpg" },
    "Y": { palabra: "Yoyo", imagen: "imagenes/yoyo.jpg" },
    "Z": { palabra: "Zorro", imagen: "imagenes/zorro.jpg" }
  };

  const orden = Object.keys(palabras);
  let indexActual = 0;
  let palabraActual = "";
  let letrasIngresadas = [];

  function crearBotones() {
    letras.forEach((letra) => {
      const btn = document.createElement("button");
      btn.textContent = letra;
      btn.classList.add("letra");
      btn.addEventListener("click", () => agregarLetra(letra));

      if (vocales.includes(letra)) {
        vocalesDiv.appendChild(btn);
      } else {
        consonantesDiv.appendChild(btn);
      }
    });
  }

  function cargarPalabra() {
    const letra = orden[indexActual];
    const data = palabras[letra];
    palabraActual = data.palabra.toUpperCase();
    imagenPalabra.src = data.imagen;

    letrasIngresadas = [];
    contenedorLetrasEscritas.innerHTML = "";

    for (let i = 0; i < palabraActual.length; i++) {
      const div = document.createElement("div");
      div.classList.add("contenedor-letra");
      contenedorLetrasEscritas.appendChild(div);
    }

    // Botón para borrar la última letra
    const botonBorrar = document.createElement("div");
    botonBorrar.classList.add("contenedor-letra", "borrar-letra");
    botonBorrar.textContent = "X";
    botonBorrar.style.backgroundColor = "red";
    botonBorrar.style.color = "white";
    botonBorrar.style.cursor = "pointer";
    botonBorrar.addEventListener("click", () => {
      if (letrasIngresadas.length > 0) {
        letrasIngresadas.pop();
        contenedorLetrasEscritas.children[letrasIngresadas.length].textContent = "";
      }
    });
    contenedorLetrasEscritas.appendChild(botonBorrar);
  }

  function agregarLetra(letra) {
    if (letrasIngresadas.length < palabraActual.length) {
      letrasIngresadas.push(letra);
      contenedorLetrasEscritas.children[letrasIngresadas.length - 1].textContent = letra;
    }
  }

  function comprobarPalabra() {
    const formada = letrasIngresadas.join("").toUpperCase();
    const modalId = formada === palabraActual ? "modalCorrecto" : "modalIncorrecto";
    mostrarModalTemporal(modalId);
  }

  function mostrarModalTemporal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "flex";
  
    setTimeout(() => {
      modal.style.display = "none";
    }, 5000);
  }
  

  function palabraSiguiente() {
    indexActual = (indexActual + 1) % orden.length;
    cargarPalabra();
  }

  function palabraAnterior() {
    indexActual = (indexActual - 1 + orden.length) % orden.length;
    cargarPalabra();
  }

  btnSiguiente.addEventListener("click", palabraSiguiente);
  btnAnterior.addEventListener("click", palabraAnterior);
  btnComprobar.addEventListener("click", comprobarPalabra);

  crearBotones();
  cargarPalabra();
});
