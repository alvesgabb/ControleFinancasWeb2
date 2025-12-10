const express = require("express");
const cors = require("cors");
const transacoesRoutes = require("./routes/transacoes-routes")

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json())


//monta as rotas de transação em /transações
app.use("/transacoes", transacoesRoutes);

//rota raiz
app.get("/", (req, res) => {
  res.json({ res: "API funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

