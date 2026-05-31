'use strict';

/**
 * Funções puras de validação de contatos.
 * Separadas do server.js para permitir testes unitários isolados.
 */

function validarNome(nome) {
  if (!nome || typeof nome !== 'string' || nome.trim() === '') {
    throw new Error('Nome inválido');
  }
  return nome.trim();
}

function validarEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('E-mail inválido');
  }
  if (!email.includes('@')) {
    throw new Error('E-mail inválido');
  }
  return email.trim();
}

function validarTelefone(telefone) {
  if (!telefone || typeof telefone !== 'string' || telefone.trim() === '') {
    throw new Error('Telefone inválido');
  }
  return telefone.trim();
}

function criarContato(id, nome, email, telefone) {
  return {
    id,
    nome: validarNome(nome),
    email: validarEmail(email),
    telefone: validarTelefone(telefone)
  };
}

module.exports = { validarNome, validarEmail, validarTelefone, criarContato };
