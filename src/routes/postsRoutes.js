import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de imagens para o upload
const storage = multer.diskStorage({
  // Define a pasta de destino para as imagens enviadas (`uploads/`)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo utilizando o nome original
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

// Cria uma instância do middleware multer utilizando a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage })

// Define o destino de upload para Linux/Mac (caso queira sobrescrever a configuração anterior)
// Comente a linha anterior e descomente esta para usar o diretório "./uploads" no Linux/Mac
// const upload = multer({ dest: "./uploads" })

// Função que define as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware `express.json()` para permitir que o servidor entenda requisições com corpo em formato JSON.
  app.use(express.json());
  app.use(cors(corsOptions))
  // Rota GET para listar todos os posts (tratada pela função `listarPosts` no arquivo `postsController.js`)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada pela função `postarNovoPost` no arquivo `postsController.js`)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware `upload.single("imagem")` para processar o upload e chama a função `uploadImagem` no arquivo `postsController.js`)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função `routes` para ser utilizada em outros arquivos do projeto
export default routes;