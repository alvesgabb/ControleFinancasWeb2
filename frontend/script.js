
const API = "http://localhost:3000/transacoes";

//POST Fazer lançamento


async function lancarFinanca(event) {
  event.preventDefault();
  if (event && typeof event.preventDefault=== "function"){
    event.preventDefault();

  }

  const descricao = document.getElementById("descricao").value;
  const tipo = document.getElementById("select").value;
  const data = document.getElementById("data").value;
  const valor = document.getElementById("valor").value;


const resposta = await fetch(API,{
  method:"POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    descricao, 
    tipo, 
    data, 
    valor: Number(valor)
})

});

if (!resposta.ok) {
    alert("Erro ao realizar lançamento.");
    return;
  }

const dataa = await resposta.json()
console.log(dataa)


document.getElementById("descricao").value=""
document.getElementById("select").value="entrada"
document.getElementById("data").value=""
document.getElementById("valor").value=""


mostrarSaldo()
listarLancamentos()

}

//GET
async function listarLancamentos(){
  
  const resposta = await fetch (API)
  const transacoes = await resposta.json()

  const div = document.getElementById("resultado")
  div.innerHTML=""

  if (transacoes.length === 0){
    div.innerHTML = "<p>Nenhuma transação cadastrada.</p>"
    return
    
  }

  const ul = document.createElement("ul");
  ul.classList.add("lista-transacoes");

  transacoes.forEach(lancamento => {
    const li= document.createElement("li")
    li.innerHTML=`
    <span class="id">ID: ${lancamento.id}</span>
    <span>${lancamento.descricao}</span>
    <span>${lancamento.tipo}</span>
    <span>${lancamento.data}</span>
    <span>${lancamento.valor}R$</span>
    <button type="button" class="deleteID" onclick="deletarId(${lancamento.id})">Deletar</button>`;
    ul.appendChild(li)
    
  });
   
  div.appendChild(ul)


}

//DELETE
async function deletarId(id){
  const resposta = await fetch(`${API}/${id}`,{
    method:"DELETE"
  })

  if(resposta.ok){
    alert("Transação Deletada")
    listarLancamentos()
    mostrarSaldo()
  }
  else{
    alert("Erro ao deletar.")
  }


}

//GET
async function mostrarSaldo() {
  const resposta = await fetch("http://localhost:3000/transacoes/saldo")
  const dados = await resposta.json()

  document.getElementById("saldo").innerText=`R$ ${dados.saldo}`


  
}
