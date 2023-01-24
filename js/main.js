const form = document.querySelector('#novoItem')
const itens = JSON.parse(localStorage.getItem("item")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) =>{
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    
    if( quantidade.value == '' || nome.value == ''){
        alertMsg('Digite um valor valido nos campos a baixo')
    }else{
        const existe = itens.find( elemento => elemento.nome.toLowerCase() === nome.value.toLowerCase())

        const itemAtual = {
            "nome": nome.value.toUpperCase(),
            "quantidade": quantidade.value
        }
    
        if (existe){
            itemAtual.id = existe.id
    
            atualizaElemento(itemAtual)
    
            itens[itens.findIndex( elemento => elemento.id === existe.id)] = itemAtual
        } else{
            //criação de id para gestão do localStorage
            itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
    
            criaElemento(itemAtual)
    
            itens.push(itemAtual)
    
        }
    
        localStorage.setItem("item", JSON.stringify(itens))
    }
    
    nome.value = ''
    quantidade.value = ''

})

function criaElemento(item){

    const novoItem = document.createElement('li')
    novoItem.style.display = 'flex'
    novoItem.style.justifyContent = 'space-between'
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(deleteButton(item.id)).style.justifyContent = 'space-around'

    const lista = document.querySelector(".lista")

    lista.appendChild(novoItem)

}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deleteButton(id) {
    const buttonElement = document.createElement("button")
    buttonElement.innerText = "x"
    


    buttonElement.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return buttonElement
}

function deleteElement(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex( elemento => elemento.id === id), 1)

    localStorage.setItem("item", JSON.stringify(itens))
}

function alertMsg(msg) {
    document.querySelector('.popUp-background').style.display = 'flex'

    const newMsg = document.querySelector('.popUp-text p')
    newMsg.innerText = msg

    const closeButton = document.querySelector('.popUp-close')
    closeButton.addEventListener('click', () => {
        document.querySelector('.popUp-background').style.display = 'none'
    })
}
