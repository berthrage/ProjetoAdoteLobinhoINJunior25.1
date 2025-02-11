export async function inicializarLocalStorage() {
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

export function getLobos() {
    return JSON.parse(localStorage.getItem('lobos'));
}

export function updateLocalStorage(lobos) {
    try {
        localStorage.setItem('lobos', JSON.stringify(lobos));
    } catch (error) {
        console.error('Erro ao *atualizar* localStorage');
    }
}