document.querySelector('#add-time') // Pegando o botão
.addEventListener('click', cloneField) // Adicionando evento

// Função para adicionar um novo campo
function cloneField() {  
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) // Duplicando elemento

    const fields = newFieldContainer.querySelectorAll('input')  // Procurando os inputs
    
    // Limpando inputs
    fields.forEach(function(field) {
        // Pegando o clone e o limpando
        field.value = ""
    })

    document.querySelector('#schedule-items').appendChild(newFieldContainer);  // Adicionando a variável na página
}

