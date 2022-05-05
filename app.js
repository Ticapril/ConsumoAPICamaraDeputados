//variaveis globais
let idPartido 
let membrosPartido = []
let contador = 0

//funções de criação de elementos
function criarLista(){
    var element = document.querySelector("div.ml");
    lista = document.createElement("select");
    lista.setAttribute("id","listagem-partidos")
    lista.setAttribute("class","select")
    element.appendChild(lista);
}
function criarItensLista(conteudo){
    var element = document.querySelector("div.ml ul#lista-deputados");
    item = document.createElement("li");
    element.appendChild(item);
    conteudoItem = document.createTextNode(conteudo)
    item.appendChild(conteudoItem)
}
function criarListaDeputados(seletor, tagElement){
    let element = document.querySelector(seletor)
    lista = document.createElement(tagElement)
    lista.setAttribute("id","lista-deputados")
    element.appendChild(lista)
}
function removerItensLista(id){
    document.getElementById(id).remove()
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
                //busco todos os nomes desse partido e dou um console.log
                getMembrosPartido(partido.id)
            }
        });
    })
    .catch(function(e){
        console.log(e)
    })
}
function getMembrosPartido(id){
 //url https://dadosabertos.camara.leg.br/api/v2/partidos/id_parametroFunção/membros
 axios.get(`https://dadosabertos.camara.leg.br/api/v2/partidos/${id}/membros`)
     .then(function(response){
         response.data.dados.forEach(membroPartido => {
             membrosPartido.push(membroPartido.nome)
             console.log(membroPartido.nome)
             criarItensLista(membroPartido.nome)

         });
     })
     .catch(function(e){
         console.log(e)
     })
}
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
//pego a referencia do botão a ser clicado
btn = document.getElementById("btn-listagem-deputados")
//disparo uma ação que é listar os deputados do partido
btn.addEventListener("click",function(){
    //pegar o valor do select
    let referencia = document.querySelector("div#app select#listagem-partidos")
    let conteudoReferencia
    conteudoReferencia = referencia.value
    console.log(conteudoReferencia)
    //pego esse valor e utilizo para pegar o id
    if(contador === 0){
        getIdPartidos(conteudoReferencia)
        contador++
    } else {
        removerItensLista("lista-deputados")
        criarListaDeputados("div.ml","ul")
        getIdPartidos(conteudoReferencia)
    }
    

})
getPartidos()
