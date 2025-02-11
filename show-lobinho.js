import { inicializarLocalStorage, getLobos, updateLocalStorage } from "./script.js";

let lobos = getLobos();

let indexLobo = localStorage.getItem("IndexLobo");

let main = document.querySelector("main");

if(indexLobo){
    PrepararLobo();
} else {
    alert("falha ao carregar lobo");
    window.location.href = "./lista.html"
}

function PrepararLobo(){
    let mainContent = document.createElement("section");
    mainContent.id = "main_content";

    let nomeLobo = document.createElement("h1");
    nomeLobo.innerText = lobos[indexLobo].nome;

    let divDescricao = document.createElement("div");
    divDescricao.id = "descricao";

    let divImagemBototes = document.createElement("div");
    divImagemBototes.id = "imagem_botoes";

    let descricao = document.createElement("p");
    descricao.innerText = lobos[indexLobo].descricao;

    let loboImagem = document.createElement("img");
    loboImagem.src= lobos[indexLobo].imagem;

    let divBotoes = document.createElement("div");
    divBotoes.id = "buttons";
    let botaoAdotar = document.createElement("button");
    botaoAdotar.id = "adotar";
    botaoAdotar.innerText = "ADOTAR";
    if(lobos[indexLobo].adotado){
        botaoAdotar.innerText = "JÁ ADOTADO";
    } else {
        botaoAdotar.addEventListener("click", ()=>{
            AdotarLobo();
        })
    }
    let botaoExcluir = document.createElement("button");
    botaoExcluir.id = "excluir";
    botaoExcluir.innerText = "EXCLUIR";
    botaoExcluir.addEventListener("click", ()=>{
        ExcluirLobo();
    })


    mainContent.append(nomeLobo);
    mainContent.append(divDescricao);
    divDescricao.append(divImagemBototes);
    divDescricao.append(descricao);
    divImagemBototes.append(loboImagem);
    divImagemBototes.append(divBotoes);
    divBotoes.append(botaoAdotar);
    divBotoes.append(botaoExcluir);

    main.append(mainContent);    

}

function AdotarLobo(){
    window.location.href = "./adotar-lobinho.html"   
}

function ExcluirLobo(){
    alert("lobo "+ lobos[indexLobo].nome + " excluido");
    lobos.splice(indexLobo, 1);
    updateLocalStorage(lobos);
    window.location.href = "./lista.html" 
}