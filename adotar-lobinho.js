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

/*----------------------------------------------------*/

function adotar(){
    let inputNome = document.querySelector("#nome_usuario");
    let nomeDono = inputNome.value;

    let inputIdade = document.querySelector("#idade_usuario");
    let idadeDono = inputIdade.value;

    let inputEmail = document.querySelector("#email_usuario");
    let emailDono = inputEmail.value;

    if (!nomeDono || !idadeDono || !emailDono){
        let alerta = alert("Preencha todos campos por favor");
        return;
    }

    lobos[indexLobo].nomeDono = nomeDono;
    lobos[indexLobo].idadeDono = idadeDono;
    lobos[indexLobo].emailDono = emailDono;
    lobos[indexLobo].adotado = true;

    updateLocalStorage(lobos);

    inputNome.value = "";
    inputIdade.value = "";
    inputEmail.value = "";
    
    let parabens = alert("Lobinho adotado com sucesso!!");

    window.location.href = "./lista.html";

}

let btn_adotar = document.querySelector("#botao_adotar");
btn_adotar.addEventListener("click", adotar);