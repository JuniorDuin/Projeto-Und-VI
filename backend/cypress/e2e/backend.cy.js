// cypress/e2e/backend.cy.js
// Testes de API do Backend — Agenda de Contatos

describe('Agenda de Contatos — Backend (API)', () => {

  const baseUrl = 'http://localhost:3001'

  // ── GET /contatos ───────────────────────────────────────────────
  describe('GET /contatos', () => {
    it('deve retornar status 200', () => {
      cy.request('GET', `${baseUrl}/contatos`)
        .its('status').should('eq', 200)
    })

    it('deve retornar um array', () => {
      cy.request('GET', `${baseUrl}/contatos`)
        .its('body').should('be.an', 'array')
    })
  })

  // ── POST /contatos ──────────────────────────────────────────────
  describe('POST /contatos', () => {
    it('deve criar um contato e retornar status 201', () => {
      cy.request('POST', `${baseUrl}/contatos`, {
        nome: 'Teste API',
        email: `api_${Date.now()}@email.com`,
        telefone: '(85) 98888-0001'
      }).its('status').should('eq', 201)
    })

    it('deve retornar o contato criado com id', () => {
      cy.request('POST', `${baseUrl}/contatos`, {
        nome: 'Contato Com ID',
        email: `id_${Date.now()}@email.com`,
        telefone: '(85) 98888-0002'
      }).then(res => {
        expect(res.body).to.have.property('id')
        expect(res.body.nome).to.eq('Contato Com ID')
      })
    })

    it('deve retornar 400 ao enviar sem nome', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/contatos`,
        body: { email: 'semNome@email.com', telefone: '(85) 90000-0001' },
        failOnStatusCode: false
      }).its('status').should('eq', 400)
    })

    it('deve retornar 400 ao enviar sem email', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/contatos`,
        body: { nome: 'Sem Email', telefone: '(85) 90000-0002' },
        failOnStatusCode: false
      }).its('status').should('eq', 400)
    })

    it('deve retornar 400 ao enviar sem telefone', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/contatos`,
        body: { nome: 'Sem Telefone', email: 'semTel@email.com' },
        failOnStatusCode: false
      }).its('status').should('eq', 400)
    })

    it('deve retornar 400 ao enviar email inválido', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/contatos`,
        body: { nome: 'Email Ruim', email: 'emailinvalido', telefone: '(85) 90000-0003' },
        failOnStatusCode: false
      }).its('status').should('eq', 400)
    })

    it('deve retornar 400 ao cadastrar email duplicado', () => {
      const email = `dup_${Date.now()}@email.com`
      cy.request('POST', `${baseUrl}/contatos`, {
        nome: 'Duplicado 1', email, telefone: '(85) 90000-0004'
      })
      cy.request({
        method: 'POST',
        url: `${baseUrl}/contatos`,
        body: { nome: 'Duplicado 2', email, telefone: '(85) 90000-0005' },
        failOnStatusCode: false
      }).its('status').should('eq', 400)
    })
  })

  // ── GET /contatos/:id ───────────────────────────────────────────
  describe('GET /contatos/:id', () => {
    it('deve retornar o contato pelo id', () => {
      cy.request('POST', `${baseUrl}/contatos`, {
        nome: 'Busca Por ID',
        email: `busca_${Date.now()}@email.com`,
        telefone: '(85) 97777-0001'
      }).then(res => {
        const id = res.body.id
        cy.request(`${baseUrl}/contatos/${id}`)
          .its('body.nome').should('eq', 'Busca Por ID')
      })
    })

    it('deve retornar 404 para id inexistente', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/contatos/999999`,
        failOnStatusCode: false
      }).its('status').should('eq', 404)
    })
  })

  // ── DELETE /contatos/:id ────────────────────────────────────────
  describe('DELETE /contatos/:id', () => {
    it('deve deletar um contato e retornar sucesso', () => {
      cy.request('POST', `${baseUrl}/contatos`, {
        nome: 'Deletar Esse',
        email: `del_${Date.now()}@email.com`,
        telefone: '(85) 96666-0001'
      }).then(res => {
        cy.request('DELETE', `${baseUrl}/contatos/${res.body.id}`)
          .its('status').should('eq', 200)
      })
    })

    it('deve retornar 404 ao deletar id inexistente', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/contatos/999999`,
        failOnStatusCode: false
      }).its('status').should('eq', 404)
    })
  })
})
