async function inicializarLocalStorage() {
    try {
        const response = await fetch('lobinhos.json');
        if (!response.ok) {
            throw new Error(`Erro ao buscar lobinho.json: ${response.statusText}`);
        }
        const lobos = await response.json();
        localStorage.setItem('lobos', JSON.stringify(lobos));
        console.log('Lobos inicializados no localStorage');
    } catch (error) {
        console.error('Erro ao inicializar o localStorage:', error);
    } finally {
        console.log('Tentativa de inicialização do localStorage concluída');
    }
}

if (!localStorage.getItem('lobos')) {
    inicializarLocalStorage().then(() => {
        console.log('Inicialização do localStorage concluída');
    }).catch(error => {
        console.error('Erro durante a inicialização do localStorage:', error);
    });
}

let lobos = JSON.parse(localStorage.getItem('lobos'));

//localStorage.setItem('lobos', JSON.stringify(lobos)); -- atualizar localStorage

let page = 1;
let wolfList = document.querySelector("#wolf_list");
let pageBrowser = document.querySelector('#pagebrowse');
let pages = document.querySelector('#pages');

let searchbar = document.querySelector("#searchbar input[type=text]");
let searchButton = document.querySelector("#searchbar input[type=button]");

let checkAdopt = document.querySelector("#checkmarks div input");

if(wolfList){
    Pagina(page);
};

searchButton.addEventListener("click", ()=>{Pesquisar()});

function Pesquisar(){
    if(searchbar.value){
        let lobosEncontrados = lobos.filter(lobo => {
            return lobo.nome === searchbar.value;
        });
        if(lobosEncontrados.length > 0){
            LimparLobos();
            for(let i = 0; i < lobosEncontrados.length; i++){
                ExibirLobo((lobosEncontrados[i].id - 1));
                return;
            }
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
    /* lobos a aparecerem = (seleção - 4) até seleção */
    for(let i = (selecao - 4); i < selecao; i++){
        ExibirLobo(i);
    }
}

function LimparLobos(){
    wolfList.innerHTML = "";
}

function ExibirLobo(loboId){
    let novoLobo = document.createElement("div");
    novoLobo.className = "display_wolf";

    let loboNome = document.createElement("h2");
    loboNome.innerText = lobos[loboId].nome;

    let loboIdade = document.createElement("h5");
    loboIdade.innerText = ("Idade: " + lobos[loboId].idade + " Anos");
    
    let loboDescricao = document.createElement("p");
    loboDescricao.innerText = lobos[loboId].descricao;

    let loboImagem = document.createElement("img");
    loboImagem.src = lobos[loboId].imagem;

    let divHor = document.createElement("div");
    
    let botaoAdotar = document.createElement("input");
    botaoAdotar.type = "button";
    botaoAdotar.value = "Adotar";

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