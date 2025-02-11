import { inicializarLocalStorage, getLobos, updateLocalStorage } from "./script.js";

if (!localStorage.getItem('lobos')) {
    inicializarLocalStorage().then(() => {
        console.log('Inicialização do localStorage concluída');
    }).catch(error => {
        console.error('Erro durante a inicialização do localStorage:', error);
    });
}

let lobos = getLobos();
let index = localStorage.getItem('IndexLobo');

let titulo = document.querySelector("#nomeLobo");
let nome = document.createElement("h1");
nome.innerText = lobos[index].nome;

let imagem = document.querySelector("#imagem");
let foto = document.createElement("img");
foto.src = lobos[index].imagem;

let descricao = document.querySelector("#descricao");
descricao.innerText = lobos[index].descricao;

titulo.append(nome);
imagem.append(foto);

localStorage.removeItem("IndexLobo");

/*-------------------------------------------------*/

