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

/*------------------------------------------------------------*/

let id = Object.keys(lobos).length;

function adicionarLobinho(){
    let inputNome = document.querySelector("#nome");
    let inputIdade = document.querySelector("#idade");
    let inputLink = document.querySelector("#link");
    let inputDescricao = document.querySelector("#descricao");

    let nome = inputNome.value;
    let idade = inputIdade.value;
    let link = inputLink.value;
    let descricao = inputDescricao.value;

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

    lobos.push(novoLobo);

    localStorage.setItem('lobos', JSON.stringify(lobos));
    
    inputNome.value = "";
    inputIdade.value = "";
    inputLink.value = "";
    inputDescricao.value = "";

}


let salvar = document.querySelector("#salvar");
salvar.addEventListener("click", ()=>{adicionarLobinho()})