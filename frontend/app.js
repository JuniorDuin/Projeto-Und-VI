const API = 'http://localhost:3001/contatos';

async function carregarContatos() {
  try {
    const res = await fetch(API);
    const contatos = await res.json();
    renderizarLista(contatos);
  } catch {
    renderizarLista([]);
  }
}

function renderizarLista(contatos) {
  const lista = document.getElementById('listaContatos');
  const total = document.getElementById('totalContatos');
  total.textContent = contatos.length;

  if (contatos.length === 0) {
    lista.innerHTML = '<p class="lista-vazia">Nenhum contato cadastrado ainda.</p>';
    return;
  }

  lista.innerHTML = contatos.map(c => `
    <div class="contato-card" data-id="${c.id}">
      <div class="contato-info">
        <p class="contato-nome">${c.nome}</p>
        <p class="contato-detalhe">${c.email} · ${c.telefone}</p>
      </div>
      <button class="btn-deletar" onclick="deletarContato(${c.id})">Remover</button>
    </div>
  `).join('');
}

async function deletarContato(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  carregarContatos();
}

document.getElementById('formContato').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('mensagem');
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (!nome || !email || !telefone) {
    msg.textContent = 'Preencha todos os campos.';
    msg.className = 'mensagem erro';
    return;
  }

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone })
    });

    if (res.ok) {
      msg.textContent = 'Contato salvo com sucesso!';
      msg.className = 'mensagem sucesso';
      e.target.reset();
      carregarContatos();
    } else {
      const data = await res.json();
      msg.textContent = data.erro || 'Erro ao salvar.';
      msg.className = 'mensagem erro';
    }
  } catch {
    msg.textContent = 'Não foi possível conectar ao servidor.';
    msg.className = 'mensagem erro';
  }

  setTimeout(() => { msg.textContent = ''; msg.className = 'mensagem'; }, 3000);
});

carregarContatos();
