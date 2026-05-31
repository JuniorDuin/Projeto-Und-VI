const express = require('express');
const cors = require('cors');
const { validarNome, validarEmail, validarTelefone } = require('./contatos');

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados em memória
let contatos = [];
let nextId = 1;

// GET /contatos — lista todos
app.get('/contatos', (req, res) => {
  res.json(contatos);
});

// GET /contatos/:id — busca um
app.get('/contatos/:id', (req, res) => {
  const contato = contatos.find(c => c.id === parseInt(req.params.id));
  if (!contato) return res.status(404).json({ erro: 'Contato não encontrado' });
  res.json(contato);
});

// POST /contatos — cria novo
app.post('/contatos', (req, res) => {
  const { nome, email, telefone } = req.body;

  try {
    const nomeValido = validarNome(nome);
    const emailValido = validarEmail(email);
    const telefoneValido = validarTelefone(telefone);

    const duplicado = contatos.find(c => c.email === emailValido);
    if (duplicado) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }

    const novoContato = {
      id: nextId++,
      nome: nomeValido,
      email: emailValido,
      telefone: telefoneValido
    };

    contatos.push(novoContato);
    return res.status(201).json(novoContato);
  } catch (e) {
    return res.status(400).json({ erro: e.message });
  }

});

// DELETE /contatos/:id — remove
app.delete('/contatos/:id', (req, res) => {
  const idx = contatos.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ erro: 'Contato não encontrado' });
  contatos.splice(idx, 1);
  res.json({ mensagem: 'Contato removido com sucesso' });
});

// Exporta o app para os testes, e sobe o servidor se for chamado diretamente
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}
