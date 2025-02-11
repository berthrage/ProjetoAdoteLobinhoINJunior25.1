import { inicializarLocalStorage, getLobos, updateLocalStorage } from "./script.js";

if (!localStorage.getItem('lobos')) {
    inicializarLocalStorage().then(() => {
        console.log('Inicialização do localStorage concluída');
    }).catch(error => {
        console.error('Erro durante a inicialização do localStorage:', error);
    });
}

let lobos = getLobos();

let lobosAdotados = lobos.filter(lobo =>{
    return lobo.adotado == true;
}
);

console.log(lobos);

let page = 1;
let wolfList = document.querySelector("#wolf_list");
let pages = document.querySelector('#pages');

let searchbar = document.querySelector("#searchbar input[type=text]");
searchbar.addEventListener("keyup", event =>{
    if(event.keyCode === 13){
        Pesquisar();
    }
})

let checkAdopt = document.querySelector("#checkmarks div input");

let firstPage = document.querySelector('#firstPage')
firstPage.addEventListener("click", ()=>{Pagina(1)});
let lastPage = document.querySelector('#finalPage');
lastPage.addEventListener("click", ()=>{Pagina(LastPageFind())});

function LastPageFind(){
    if(checkAdopt.checked){
        return (Math.round((Object.keys(lobosAdotados).length)/4));
    } else {
        return (Math.round((Object.keys(lobos).length)/4));
    }
}

if(wolfList){
    Pagina(page);
    pages.childNodes.forEach((botaoPagina) =>
        botaoPagina.addEventListener("click", () => {
            let numero = botaoPagina.value;
            page = numero;
            Pagina(numero);  
        })
    );
};

function PageSpread(numero){
    let menorValor = numero - 2;
    if(menorValor <= 0){
        menorValor = 1;
    }
    let maiorValor = menorValor + 4
    let botoes = pages.children;
    let valor = menorValor;
    for(let i = 0; i < 5; i++){
        botoes[i].value = valor;
        valor++;
    }
}

checkAdopt.addEventListener("change", ()=>{
    page = 1;
    Pagina(page);
});


// searchButton.addEventListener("click", ()=>{Pesquisar()});

function Pesquisar(){
    if(searchbar.value){
        let lobosEncontrados = lobos.filter(lobo => {
            return lobo.nome === searchbar.value;
        });
        if(lobosEncontrados.length > 0){
            LimparLobos();
            if(checkAdopt.checked){
                if(!lobosEncontrados[0].adotado){
                    alert("lobo encontrado, mas não é adotado");
                    return;
                }
            }
            let index = lobos.indexOf(lobosEncontrados[0])
            ExibirLobo((index));
            return;
        } else {
            alert("Nenhum lobo encontrado");
            return;
        }
    } else {
        alert("Digite um nome de um lobo");
        LimparLobos();
        Pagina(page);
        return;
    }
    
}

function Pagina(numero){
    LimparLobos();
    let selecao = (numero * 4);
    for(let i = (selecao - 4); i < selecao; i++){ 
        ExibirLobo(i, (i % 2 != 0));
    }
    PageSpread(numero);
    page = numero;
}

function LimparLobos(){
    wolfList.innerHTML = "";
}

function adotarLobinho(index){
    localStorage.setItem("IndexLobo", index);
}

/* Usar lista de lobos adotados somente */
function ExibirLobo(loboId, par){
    let lista;
    if(checkAdopt.checked){
        lista = lobosAdotados;
    } else {
        lista = lobos;
    }

    let botaoAdotar = document.createElement("input");
    let novoLobo = document.createElement("div");
    novoLobo.className = "display_wolf";

    if(par){
        novoLobo.style.flexDirection = "row";
    }
    
    let loboNome = document.createElement("h2");
    loboNome.innerText = lista[loboId].nome;

    let loboIdade = document.createElement("h5");
    loboIdade.innerText = ("Idade: " + lista[loboId].idade + " Anos");
    
    let loboDescricao = document.createElement("p");
    loboDescricao.innerText = lista[loboId].descricao;

    let loboImagem = document.createElement("img");
    loboImagem.src = lista[loboId].imagem;


    let divHor = document.createElement("div");
    divHor.id = "wolf_totalinfo";
    
    botaoAdotar.type = "button";
    botaoAdotar.value = "Adotar";
    if(lista[loboId].adotado){
        botaoAdotar.value = "Adotado"
        botaoAdotar.style.background = "#7AAC3A";
    }

    botaoAdotar.addEventListener("click", ()=>{
        adotarLobinho(loboId);
        window.location.href = "./show-lobinho.html"

    })

    let divInfo = document.createElement("div");
    divInfo.id = "wolf_header";

    let divNomeIdade = document.createElement("div");

    let divDescricao = document.createElement("div");
    divDescricao.id ="wolf_desc"

    novoLobo.append(divHor);
    novoLobo.append(loboImagem);
    divHor.append(divInfo);
    divHor.append(divDescricao);
    divDescricao.append(loboDescricao);
    divInfo.append(divNomeIdade);
    divInfo.append(botaoAdotar);
    divNomeIdade.append(loboNome);
    divNomeIdade.append(loboIdade);

    wolfList.append(novoLobo);
}