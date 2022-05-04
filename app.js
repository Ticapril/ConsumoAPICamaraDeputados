// //variaveis globais
// // a ideia do programa é listar os deputados de um determinado partido
// var button = document.querySelector("#app button")
// var quantidadeDeputadosExibidos = 100;
// var siglaPartidosVetor
// var vetorTeste

//funções de criação de elementos
function criarLista(){
    var element = document.querySelector("div#app");
    lista = document.createElement("select");
    lista.setAttribute("id","listagem-partidos")
    element.appendChild(lista);
}
function criarItensLista(conteudo){
    var element = document.querySelector("div.mg ul#lista-deputados");
    item = document.createElement("li");
    element.appendChild(item);
    conteudoItem = document.createTextNode(conteudo)
    item.appendChild(conteudoItem)
}
function criarBotao(){
    var element = document.querySelector("div#app");
    botao = document.createElement("button");
    element.appendChild(botao);
    botaoConteudo = document.createTextNode('Listar Deputados do Partido');
    botao.appendChild(botaoConteudo)
}

function getIdPartidos(nomePartido){
    axios.get("https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla")
    .then(function(response){
        response.data.dados.forEach(partido => {
            if(nomePartido === partido.nome){
                console.log('funcionou!')
                console.log(partido.id)
                return partido.id
            }
        });
    })
    .catch(function(e){
        console.log(e)
    })
}
// function getMembrosPartido(id){
// //url https://dadosabertos.camara.leg.br/api/v2/partidos/id_parametroFunção/membros
// axios.get(`https://dadosabertos.camara.leg.br/api/v2/partidos/${id}/membros`)
//     .then(function(response){
//         // console.log(response.data.dados)
//         // criarItensLista()
//         response.data.dados.forEach(membroPartido => {
//             console.log(membroPartido.nome)
//             criarItensListagemDeputados("div.mg ul#lista-deputados","li",membroPartido.nome)
//         });
        
//     })
//     .catch(function(e){
//         console.log(e)
//     })
// }
function getPartidos(){
    axios.get("https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla")
    .then(function(response){
        // console.log(response.data.dados[0].nome)
        criarLista();
        i = 0
        response.data.dados.forEach(partido => {
            criarOpcoesLista("div#app select","option",partido)
        });
    })
    .catch(function(e){
        console.log(e)
    })
}
function getDeputados(){
    deputados = []
    axios.get("https://dadosabertos.camara.leg.br/api/v2/deputados/")
    .then(function(response){
        response.data.dados.forEach(deputado => {
            deputados.push(deputado.nome)
            console.log(deputado.nome)
        });
        return deputados
    })
    .catch(function(e){
        console.log(e)
    })
}
function criarOpcoesLista(seletor,elementoTag,partido){
            element = document.querySelector(seletor)
            opcoes = document.createElement(elementoTag)
            element.appendChild(opcoes)
            textoOpcoes = document.createTextNode(partido.nome)
            opcoes.appendChild(textoOpcoes)
}
function criarItensListagemDeputados(seletor,elementoTag,membroPartido){
    element = document.querySelector(seletor)
    item = document.createElement(elementoTag)
    element.appendChild(item)
    textoItem = document.createTextNode(membroPartido.nome)
    item.appendChild(textoOpcoes)
}
btn = document.getElementById("btn-listagem-deputados")

btn.addEventListener("click",function(){
    let referencia = document.querySelector("div#app select#listagem-partidos"),conteudoReferencia
    conteudoReferencia = referencia.value;
    console.log(conteudoReferencia)
    
})


getIdPartidos("Avante");
getPartidos()
// getDeputados()
// getSiglaPartidos()

//vou armazenar o id dos partidos em um array
