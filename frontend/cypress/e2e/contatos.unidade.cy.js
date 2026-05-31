// cypress/e2e/contatos.unidade.cy.js
//
// Testes de UNIDADE: importamos o módulo diretamente
// e testamos as funções sem abrir o navegador.

const Util = require('../../contatos-util.js')

describe('Contatos — lógica do frontend (Unitários)', () => {

  // ── validarCampos() ───────────────────────────────────────────
  describe('validarCampos()', () => {
    it('retorna true para campos válidos', () => {
      expect(Util.validarCampos('Ana Lima', 'ana@email.com', '(85) 99999-0001')).to.equal(true)
    })

    it('lança erro quando nome está vazio', () => {
      expect(() => Util.validarCampos('', 'ana@email.com', '(85) 99999-0001')).to.throw('Preencha todos os campos')
    })

    it('lança erro quando email está vazio', () => {
      expect(() => Util.validarCampos('Ana Lima', '', '(85) 99999-0001')).to.throw('Preencha todos os campos')
    })

    it('lança erro quando telefone está vazio', () => {
      expect(() => Util.validarCampos('Ana Lima', 'ana@email.com', '')).to.throw('Preencha todos os campos')
    })

    it('lança erro quando algum campo é nulo', () => {
      expect(() => Util.validarCampos(null, 'ana@email.com', '85999990001')).to.throw('Preencha todos os campos')
    })

    it('lança erro para email sem @', () => {
      expect(() => Util.validarCampos('Ana Lima', 'emailerrado', '85999990001')).to.throw('E-mail inválido')
    })
  })

  // ── formatarContato() ─────────────────────────────────────────
  describe('formatarContato()', () => {
    it('formata contato corretamente', () => {
      const c = Util.formatarContato(1, 'Carlos Souza', 'carlos@email.com', '(85) 98888-0001')
      expect(c.id).to.equal(1)
      expect(c.nome).to.equal('Carlos Souza')
      expect(c.email).to.equal('carlos@email.com')
      expect(c.telefone).to.equal('(85) 98888-0001')
    })

    it('remove espaços extras dos campos', () => {
      const c = Util.formatarContato(2, '  Pedro  ', '  pedro@email.com  ', '  85911110001  ')
      expect(c.nome).to.equal('Pedro')
      expect(c.email).to.equal('pedro@email.com')
      expect(c.telefone).to.equal('85911110001')
    })

    it('retorna objeto com todas as propriedades', () => {
      const c = Util.formatarContato(3, 'Lucia', 'lucia@email.com', '85922220001')
      expect(c).to.have.property('id')
      expect(c).to.have.property('nome')
      expect(c).to.have.property('email')
      expect(c).to.have.property('telefone')
    })
  })

  // ── contarContatos() ──────────────────────────────────────────
  describe('contarContatos()', () => {
    it('retorna 0 para lista vazia', () => {
      expect(Util.contarContatos([])).to.equal(0)
    })

    it('retorna o número correto de contatos', () => {
      const lista = [
        { id: 1, nome: 'A', email: 'a@a.com', telefone: '111' },
        { id: 2, nome: 'B', email: 'b@b.com', telefone: '222' },
        { id: 3, nome: 'C', email: 'c@c.com', telefone: '333' },
      ]
      expect(Util.contarContatos(lista)).to.equal(3)
    })

    it('lança erro para valor não array', () => {
      expect(() => Util.contarContatos('invalido')).to.throw('Lista inválida')
    })

    it('lança erro para null', () => {
      expect(() => Util.contarContatos(null)).to.throw('Lista inválida')
    })
  })
})
