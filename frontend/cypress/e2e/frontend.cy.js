// cypress/e2e/frontend.cy.js
// Testes E2E do Frontend — Agenda de Contatos

describe('Agenda de Contatos — Frontend (E2E)', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  // ── Renderização inicial ────────────────────────────────────────
  describe('Renderização da página', () => {
    it('deve exibir o título Agenda', () => {
      cy.get('h1').should('contain.text', 'Agenda')
    })

    it('deve exibir o campo Nome', () => {
      cy.get('#nome').should('be.visible')
    })

    it('deve exibir o campo E-mail', () => {
      cy.get('#email').should('be.visible')
    })

    it('deve exibir o campo Telefone', () => {
      cy.get('#telefone').should('be.visible')
    })

    it('deve exibir o botão Salvar Contato', () => {
      cy.get('#btnSalvar').should('contain.text', 'Salvar Contato')
    })

    it('deve exibir o contador zerado', () => {
      cy.get('#totalContatos').should('have.text', '0')
    })
  })

  // ── Validação de campos ─────────────────────────────────────────
  describe('Validação de formulário', () => {
    it('deve exibir erro ao tentar salvar com campos vazios', () => {
      cy.get('#btnSalvar').click()
      cy.get('#mensagem').should('contain.text', 'Preencha todos os campos')
    })

    it('deve exibir erro ao deixar apenas o nome preenchido', () => {
      cy.get('#nome').type('João')
      cy.get('#btnSalvar').click()
      cy.get('#mensagem').should('contain.text', 'Preencha todos os campos')
    })
  })

  // ── Cadastro de contato ─────────────────────────────────────────
  describe('Cadastro de contato', () => {
    it('deve cadastrar um contato com sucesso', () => {
      cy.get('#nome').type('Maria Silva')
      cy.get('#email').type(`maria${Date.now()}@email.com`)
      cy.get('#telefone').type('(85) 99999-0001')
      cy.get('#btnSalvar').click()
      cy.get('#mensagem').should('contain.text', 'sucesso')
    })

    it('deve limpar os campos após cadastro', () => {
      cy.get('#nome').type('Carlos Souza')
      cy.get('#email').type(`carlos${Date.now()}@email.com`)
      cy.get('#telefone').type('(85) 99999-0002')
      cy.get('#btnSalvar').click()
      cy.get('#nome').should('have.value', '')
      cy.get('#email').should('have.value', '')
      cy.get('#telefone').should('have.value', '')
    })

    it('deve exibir o contato cadastrado na lista', () => {
      cy.get('#nome').type('Ana Lima')
      cy.get('#email').type(`ana${Date.now()}@email.com`)
      cy.get('#telefone').type('(85) 99999-0003')
      cy.get('#btnSalvar').click()
      cy.get('#listaContatos').should('contain.text', 'Ana Lima')
    })

    it('deve incrementar o contador ao cadastrar', () => {
      cy.get('#nome').type('Pedro Costa')
      cy.get('#email').type(`pedro${Date.now()}@email.com`)
      cy.get('#telefone').type('(85) 99999-0004')
      cy.get('#btnSalvar').click()
      cy.get('#totalContatos').invoke('text').then(Number).should('be.greaterThan', 0)
    })
  })

  // ── Remoção de contato ──────────────────────────────────────────
  describe('Remoção de contato', () => {
    it('deve exibir o botão de remover em cada contato', () => {
      cy.get('#nome').type('Contato Temporário')
      cy.get('#email').type(`temp${Date.now()}@email.com`)
      cy.get('#telefone').type('(85) 99999-0099')
      cy.get('#btnSalvar').click()
      cy.get('.btn-deletar').last().should('be.visible')
    })

    it('deve remover o contato ao clicar em Remover', () => {
      cy.get('#nome').type('Contato Temporário2')
      cy.get('#email').type(`temp2${Date.now()}@email.com`)
      cy.get('#telefone').type('(85) 99999-0098')
      cy.get('#btnSalvar').click()
      cy.get('.contato-card').last().find('.btn-deletar').click()
      cy.get('.contato-card').last().should('not.contain.text', 'Contato Temporário2')
    })
  })

  // ── Fluxo completo ──────────────────────────────────────────────
  describe('Fluxo completo do usuário', () => {
    it('deve cadastrar múltiplos contatos e exibir todos', () => {
      const ts = Date.now()
      const contatos = [
        { nome: 'Lucas Alves', email: `lucas${ts}@email.com`, tel: '(85) 91111-0001' },
        { nome: 'Beatriz Nunes', email: `beatriz${ts}@email.com`, tel: '(85) 92222-0002' },
      ]

      contatos.forEach(c => {
        cy.get('#nome').clear().type(c.nome)
        cy.get('#email').clear().type(c.email)
        cy.get('#telefone').clear().type(c.tel)
        cy.get('#btnSalvar').click()
        cy.get('#mensagem').should('contain.text', 'sucesso')
      })

      cy.get('#listaContatos').should('contain.text', 'Lucas Alves')
      cy.get('#listaContatos').should('contain.text', 'Beatriz Nunes')
    })
  })
})
