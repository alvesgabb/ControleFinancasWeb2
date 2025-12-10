//Funções das rotas

const TransacaoModel= require("../models/transacoes-model")

//GET
function getAll(req, res) {
  try{
    const transacoes = TransacaoModel.listarTodos()
    res.json(transacoes)
  }
  catch(err){
    console.error("Erro ao listar transações:",err);
    res.status(500).json({erro:"Erro ao listar transações."})
  }
}


//POST 
function create(req,res){
  try{
const { descricao, tipo, data, valor } = req.body;

  if (!descricao || !tipo || !data || valor == null) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const transacao = TransacaoModel.criar({descricao,tipo,data,valor});

  console.log("Transação adicionada:", transacao);
  return res.status(201).json(transacao);
   }
   catch(err){
    console.error("Erro ao criar transação.",err)
    return res.status(500).json(({erro:"Erro ao criar transação."}))
   }
}

//DELETE
  function deleteId(req, res){
  try{
    //const id = Number (req.params.id);
    const id = req.params.id;

    const existe = TransacaoModel.BuscarporId(id)

    if (!existe){
      console.log("Transação não encontrada")
      return res.status(400).json({erro: "Transação não encontrada."})
    }

    TransacaoModel.deletar(id);
    return res.status(200).send();
} catch (err) {
  console.error("Erro ao deletar transação:",err);
  res.status(500).json({erro:"Erro ao deletar transação."})
}
}

//GET Saldo
function getSaldo(req,res){
  try{
    
  const transacoes = TransacaoModel.listarTodos()
  const entradas = transacoes
  .filter(t=>t.tipo ==="entrada")
  .reduce((total,t)=> total + Number(t.valor),0)

  const saidas = transacoes
  .filter(t=>t.tipo === "saida")
  .reduce((total,t)=> total + Number(t.valor),0)

  const saldo = entradas-saidas;

  return res.json({
    entrada:entradas,
    saida: saidas,
    saldo: saldo

  })
  }catch (err){
    console.error("Erro ao calcular o saldo",err)
    res.status(500).json({erro:"Erro ao calcular o saldo."})
  }

}

module.exports = {
  getAll,
  create,
  deleteId,
  getSaldo
}
