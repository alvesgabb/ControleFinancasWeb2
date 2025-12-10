const db = require("../db")

function listarTodos(){
    return db.prepare('SELECT id, descricao, valor, tipo, data, data_criacao FROM transacoes ORDER BY id').all();
}

function BuscarporId(id){
    return db.prepare('SELECT id, descricao, valor, tipo, data, data_criacao FROM transacoes WHERE id = ?').get(id)
}


function criar ({descricao,valor,tipo,data}){
    const stmt = db.prepare('INSERT INTO transacoes (descricao,valor,tipo,data) VALUES (?,?,?,?)')
    const info = stmt.run(descricao,valor,tipo,data);
    return BuscarporId(info.lastInsertRowid)
}

function deletar(id){
    const stmt= db.prepare('DELETE FROM transacoes WHERE id = ?')
    const info = stmt.run(id)
    return info.changes>0
}


module.exports = {
    listarTodos,
    criar,
    BuscarporId,
    deletar,
}
