import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// A linha acima estabelece a conexão com o banco de dados, utilizando a função `conectarAoBanco` definida em `dbConfig.js` e a string de conexão obtida da variável de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts () {
    // Obtém o banco de dados "imersao-instabytes" da conexão.
    const db = conexao.db("imersao-instabytes")
    // Obtém a coleção "posts" do banco de dados.
    const colecao = db.collection("posts")
    // Retorna um array com todos os documentos da coleção "posts".
    return colecao.find().toArray()
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}