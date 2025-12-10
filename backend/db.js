const Database = require("better-sqlite3")
const path = require ("path")

const DB_PATH = path.join(__dirname, "data" ,"database.sqlite");

function openDB(){
    const db = new Database(DB_PATH)

    //garantir tabela de transações
    
    db.prepare(
        `CREATE TABLE IF NOT EXISTS transacoes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        valor REAL TEXT NOT NULL,
        tipo TEXT NOT NULL,
        data TEXT NOT NULL,
        data_criacao TEXT DEFAULT CURRENT_TIMESTAMP)`).run();

    return db;
}

const db = openDB()
module.exports=db