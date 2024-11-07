const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    });

    input.value = '';

    mostrarTarefas();
}

function mostrarTarefas() {
    let novaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi += `
            <li class="task ${item.concluida ? "done" : ""}">
                <img src="img/checked.png" alt="check" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="img/trash.png" alt="lixeira" onclick="deletarItem(${posicao})">
            </li>
        `;
    });

    listaCompleta.innerHTML = novaLi;
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    mostrarTarefas();
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');
    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
        mostrarTarefas();
    }
}

recarregarTarefas();

if (button) {
    button.addEventListener('click', adicionarNovaTarefa);
} else {
    console.error('Elemento com a classe .button-add-task não encontrado');
}

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa();
    }
});
