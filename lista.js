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
let searchButton = document.querySelector("#searchbar input[type=button]");

let checkAdopt = document.querySelector("#checkmarks div input");

if(wolfList){
    Pagina(page);
    pages.childNodes.forEach((botaoPagina) =>
        botaoPagina.addEventListener("click", () => {
            let numero = botaoPagina.value;
            PageSpread(numero);
            page = numero;
            LimparLobos();
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
    console.log(menorValor, maiorValor);
    let valor = menorValor;
    for(let i = 0; i < 5; i++){
        botoes[i].value = valor;
        valor++;
    }
}

checkAdopt.addEventListener("change", ()=>{
    LimparLobos();
    page = 1;
    Pagina(page);
});


searchButton.addEventListener("click", ()=>{Pesquisar()});

function Pesquisar(){
    if(searchbar.value){
        let lobosEncontrados = lobos.filter(lobo => {
            return lobo.nome === searchbar.value;
        });
        if(lobosEncontrados.length > 0){
            LimparLobos();
            if(!checkAdopt.checked){
                if(lobosEncontrados[0].adotado){
                    alert("lobo encontrado, mas é adotado");
                    return;
                }
            }
            ExibirLobo((lobosEncontrados[0].id - 1));
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
    let selecao = (numero + 3);
    for(let i = (selecao - 4); i < selecao; i++){
        
        /* FAZER DIFERENCIACAO DAS LISTAS DE LOBOS AQUI */ 
        
    }
}

function LimparLobos(){
    wolfList.innerHTML = "";
}

/* Usar lista de lobos adotados somente */
function ExibirLobo(loboId, par){
    let lista;
    if(checkAdopt.checked){
        lista = lobosAdotados;
    } else {
        lista = lobos;
    }
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
    
    let botaoAdotar = document.createElement("input");
    botaoAdotar.type = "button";
    botaoAdotar.value = "Adotar";
    if(lista[loboId].adotado){
        botaoAdotar.value = "Adotado"
        botaoAdotar.style.background = "#7AAC3A";
    }
    
    let divInfo = document.createElement("div");
    divInfo.id = "wolf_header";

    let divNomeIdade = document.createElement("div");

    let divDescricao = document.createElement("div");

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