(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ContatosUtil = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function validarCampos(nome, email, telefone) {
    if (!nome || !email || !telefone) {
      throw new Error('Preencha todos os campos');
    }
    if (nome.trim() === '' || email.trim() === '' || telefone.trim() === '') {
      throw new Error('Preencha todos os campos');
    }
    if (!email.includes('@')) {
      throw new Error('E-mail inválido');
    }
    return true;
  }

  function formatarContato(id, nome, email, telefone) {
    return {
      id,
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim()
    };
  }

  function contarContatos(lista) {
    if (!Array.isArray(lista)) throw new Error('Lista inválida');
    return lista.length;
  }

  return { validarCampos, formatarContato, contarContatos };
}));
