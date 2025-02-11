import { inicializarLocalStorage, getLobos, updateLocalStorage } from "./script.js";

let lobos = getLobos();

let indexLobo = localStorage.getItem("IndexLobo");
localStorage.removeItem("IndexLobo");

let imagem = document.querySelector("#imagem");
let foto = document.createElement("img");

foto.src = lobos[indexLobo].imagem;
imagem.append(foto);

let nomeLobo = document.querySelector("#nome_lobo");
let id = document.querySelector("#id_lobo");

nomeLobo.innerText = "Adote o(a) " + lobos[indexLobo].nome;
id.innerText = "ID:" + lobos[indexLobo].id;



