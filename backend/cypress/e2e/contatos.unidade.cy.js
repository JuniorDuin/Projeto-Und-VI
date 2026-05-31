// cypress/e2e/contatos.unidade.cy.js
//
// Testes de UNIDADE: importamos o módulo diretamente
// e testamos as funções sem abrir o navegador.

const Contatos = require('../../contatos.js')

describe('Contatos — lógica pura (Unitários)', () => {

  // ── validarNome() ─────────────────────────────────────────────
  describe('validarNome()', () => {
    it('aceita nome válido', () => {
      expect(Contatos.validarNome('Maria Silva')).to.equal('Maria Silva')
    })

    it('remove espaços extras do nome', () => {
      expect(Contatos.validarNome('  João  ')).to.equal('João')
    })

    it('lança erro para nome vazio', () => {
      expect(() => Contatos.validarNome('')).to.throw('Nome inválido')
    })

    it('lança erro para nome nulo', () => {
      expect(() => Contatos.validarNome(null)).to.throw('Nome inválido')
    })

    it('lança erro para nome com tipo inválido', () => {
      expect(() => Contatos.validarNome(123)).to.throw('Nome inválido')
    })
  })

  // ── validarEmail() ────────────────────────────────────────────
  describe('validarEmail()', () => {
    it('aceita email válido', () => {
      expect(Contatos.validarEmail('joao@email.com')).to.equal('joao@email.com')
    })

    it('remove espaços extras do email', () => {
      expect(Contatos.validarEmail('  ana@email.com  ')).to.equal('ana@email.com')
    })

    it('lança erro para email sem @', () => {
      expect(() => Contatos.validarEmail('emailinvalido')).to.throw('E-mail inválido')
    })

    it('lança erro para email nulo', () => {
      expect(() => Contatos.validarEmail(null)).to.throw('E-mail inválido')
    })

    it('lança erro para email vazio', () => {
      expect(() => Contatos.validarEmail('')).to.throw('E-mail inválido')
    })
  })

  // ── validarTelefone() ─────────────────────────────────────────
  describe('validarTelefone()', () => {
    it('aceita telefone válido', () => {
      expect(Contatos.validarTelefone('(85) 99999-0001')).to.equal('(85) 99999-0001')
    })

    it('remove espaços extras do telefone', () => {
      expect(Contatos.validarTelefone('  85999990001  ')).to.equal('85999990001')
    })

    it('lança erro para telefone vazio', () => {
      expect(() => Contatos.validarTelefone('')).to.throw('Telefone inválido')
    })

    it('lança erro para telefone nulo', () => {
      expect(() => Contatos.validarTelefone(null)).to.throw('Telefone inválido')
    })
  })

  // ── criarContato() ────────────────────────────────────────────
  describe('criarContato()', () => {
    it('cria contato com todos os campos válidos', () => {
      const c = Contatos.criarContato(1, 'Pedro Costa', 'pedro@email.com', '(85) 98888-0001')
      expect(c.id).to.equal(1)
      expect(c.nome).to.equal('Pedro Costa')
      expect(c.email).to.equal('pedro@email.com')
      expect(c.telefone).to.equal('(85) 98888-0001')
    })

    it('retorna objeto com as propriedades corretas', () => {
      const c = Contatos.criarContato(2, 'Lucia Ferreira', 'lucia@email.com', '85911110001')
      expect(c).to.have.property('id')
      expect(c).to.have.property('nome')
      expect(c).to.have.property('email')
      expect(c).to.have.property('telefone')
    })

    it('lança erro se nome for inválido', () => {
      expect(() => Contatos.criarContato(3, '', 'valido@email.com', '85911110002')).to.throw('Nome inválido')
    })

    it('lança erro se email for inválido', () => {
      expect(() => Contatos.criarContato(4, 'Nome Válido', 'emailerrado', '85911110003')).to.throw('E-mail inválido')
    })

    it('lança erro se telefone for inválido', () => {
      expect(() => Contatos.criarContato(5, 'Nome Válido', 'valido@email.com', '')).to.throw('Telefone inválido')
    })
  })
})
