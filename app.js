var submitButton = document.querySelector('#app form button')
var zipCodeFied = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run (event) {
    event.preventDefault()

    var zipCode = zipCodeFied.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('-', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios.
    get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function (response) {
        content.innerHTML = ''
        if(response.data.erro) {
            throw new Error('CEP inválido')
        }
        createLine(response.data.logradouro)
        createLine(response.data.localidade + '-' + response.data.uf)
        createLine(response.data.bairro)
    })
    .catch(function (error) { 
        content.innerHTML = ''
        createLine('Ops... verifique o CEP')

    })
} 

function createLine (text) {
    var line = document.createElement('p')
        var text = document.createTextNode(text)
        line.appendChild(text)
        content.appendChild(line)
}