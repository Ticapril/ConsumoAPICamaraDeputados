var button = document.querySelector("#app button")
var quantidadeDeputadosExibidos = 100;
function criarLista(){
    var element = document.querySelector("div#app");
    lista = document.createElement("select");
    element.appendChild(lista);
}

// function carregarOpcoes(){
//     //crio a tag opção
//     var element = document.querySelector("div#app select")
//     opcoes = document.createElement("option")
//     element.appendChild(opcoes)
//     //puxo os dados da api
//     var vetorDeputados = axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados/')
//     console.log(vetorDeputados);
//     //armazeno o nome no conteudo da option
//     textoOpcoes = document.createTextNode(vetorDeputados.data.dados[0].nome)
//     opcoes.appendChild(textoOpcoes)
// }
// carregarOpcoes();



button.addEventListener("click", function(){
    axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados/')
    .then(function(response){
        i = 0;
        criarLista();
        while(i < quantidadeDeputadosExibidos){
            //crio a tag opção
            var element = document.querySelector("div#app select")
            opcoes = document.createElement("option")
            element.appendChild(opcoes)
            //os dados da API já vem com a response
            // var vetorDeputados = axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados/')
            // console.log(vetorDeputados);

            //armazeno o nome no conteudo da option
            textoOpcoes = document.createTextNode(response.data.dados[i].nome)
            opcoes.appendChild(textoOpcoes)
            console.log(textoOpcoes)
            i++
        }
    })
    .catch(function(error){
        console.log(error)
    })
})