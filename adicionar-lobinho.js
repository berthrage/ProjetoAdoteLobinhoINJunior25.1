import { inicializarLocalStorage, getLobos, updateLocalStorage } from "./script.js";

if (!localStorage.getItem('lobos')) {
    inicializarLocalStorage().then(() => {
        console.log('Inicialização do localStorage concluída');
    }).catch(error => {
        console.error('Erro durante a inicialização do localStorage:', error);
    });
}

let lobos = getLobos();
/*------------------------------------------------------------*/

let id = Object.keys(lobos).length;

function adicionarLobinho(){
    let inputNome = document.querySelector("#name-input"); 
    let inputIdade = document.querySelector("#age-input"); 
    let inputLink = document.querySelector("#link-input"); 
    let inputDescricao = document.querySelector("#description-input");

    let nome = inputNome.value;
    let idade = inputIdade.value;
    let link = inputLink.value;
    let descricao = inputDescricao.value;

    if (!nome || !idade || !link || !descricao){
        alert("Preencha todos os espaços")
        return
    }
        

    id+=1;

    let novoLobo = {
        id: id,
        nome: nome,
        idade: idade,
        descricao: descricao,
        imagem: link,
        adotado: false,
        nomeDono: null,
        idadeDono: null,
        emailDono: null,
    };

    lobos.unshift(novoLobo);

    updateLocalStorage(lobos);
    
    inputNome.value = "";
    inputIdade.value = "";
    inputLink.value = "";
    inputDescricao.value = "";

    alert("Lobo adicionado com sucesso!!")
}


let salvar = document.querySelector("#save-button");
salvar.addEventListener("click", ()=>{adicionarLobinho()})