//Rotas

const express = require("express")
const router = express.Router()
const transacoesController = require("../controllers/transacoes-controller")



//GET mostrar transações
router.get("/",transacoesController.getAll)

//POST receber lançamentos
router.post("/",transacoesController.create)

//GET  Saldo -> mostrar saldo
router.get("/saldo",transacoesController.getSaldo)

//DELETE especifico
router.delete("/:id",transacoesController.deleteId)


module.exports = router
