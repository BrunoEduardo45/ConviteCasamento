const page = document.body.dataset.page || 'casamento';
const dataEvento = page === 'festa' ? new Date('2026-10-17T10:00:00-03:00') : new Date('2026-10-16T10:00:00-03:00');

function atualizarContagem() {
  const restante = Math.max(0, dataEvento.getTime() - Date.now());
  const valores = {
    days: Math.floor(restante / 86400000),
    hours: Math.floor(restante / 3600000 % 24),
    minutes: Math.floor(restante / 60000 % 60),
    seconds: Math.floor(restante / 1000 % 60)
  };
  Object.entries(valores).forEach(([id, valor]) => {
    document.getElementById(id).textContent = String(valor).padStart(2, '0');
  });
}
atualizarContagem();
setInterval(atualizarContagem, 1000);

document.getElementById('copyButton').addEventListener('click', async (event) => {
  const endereco = event.currentTarget.dataset.address || 'Rua Itabuna, 148, Rio Vermelho, Salvador';
  await navigator.clipboard.writeText(endereco);
  event.currentTarget.textContent = 'Endereço copiado';
  setTimeout(() => event.currentTarget.textContent = 'Copiar endereço', 1800);
});

document.getElementById('whatsappButton').addEventListener('click', () => {
  const mensagem = page === 'festa'
    ? 'Olá, Bruno e Beatriz! Confirmo minha presença na *festa de casamento* de vocês no dia 17 de outubro. 🕺'
    : 'Olá, Bruno e Beatriz! Confirmo minha presença no *casamento* de vocês no dia 16 de outubro. 🖤';
  window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
});
