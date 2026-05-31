# 📒 Agenda de Contatos

Aplicação web fullstack de cadastro de contatos com testes automatizados usando Cypress.

## 🗂️ Estrutura do Projeto

```
Projeto-Und-VI/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── package.json
│   ├── cypress.config.js
│   └── cypress/
│       └── e2e/
│           └── frontend.cy.js
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── cypress.config.js
│   └── cypress/
│       └── e2e/
│           └── backend.cy.js
└── .github/
    └── workflows/
        ├── test-frontend.yml
        └── test-backend.yml
```

## 🚀 Como executar

### Backend
```bash
cd backend
npm install
npm start
# Servidor rodando em http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npx http-server . -p 5500 -c-1
# Abrir http://localhost:5500
```

## 🧪 Como rodar os testes

### Testes do Frontend (em dois terminais)
```bash
# Terminal 1 — sobe o backend
cd backend && npm start

# Terminal 2 — sobe o frontend e roda os testes
cd frontend
npx http-server . -p 5500 -c-1 &
npx cypress run --spec "cypress/e2e/frontend.cy.js"
```

### Testes do Backend
```bash
# Terminal 1 — sobe o backend
cd backend && npm start

# Terminal 2 — roda os testes de API
cd backend
npx cypress run --spec "cypress/e2e/backend.cy.js"
```

## 🔗 API — Endpoints

| Método | Rota             | Descrição           |
|--------|------------------|---------------------|
| GET    | /contatos        | Lista todos         |
| GET    | /contatos/:id    | Busca por ID        |
| POST   | /contatos        | Cria novo contato   |
| DELETE | /contatos/:id    | Remove contato      |

## ⚙️ GitHub Actions

Os workflows disparam automaticamente a cada `push`:
- **test-frontend.yml** → executa os testes E2E do frontend
- **test-backend.yml** → executa os testes de API do backend
