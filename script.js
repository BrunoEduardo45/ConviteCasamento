const casamento = new Date('2026-10-16T10:00:00-03:00');

function atualizarContagem() {
  const restante = Math.max(0, casamento.getTime() - Date.now());
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
  await navigator.clipboard.writeText('Rua Professor Martagão Gesteira, 477, Graça');
  event.currentTarget.textContent = 'Endereço copiado';
  setTimeout(() => event.currentTarget.textContent = 'Copiar endereço', 1800);
});

document.getElementById('whatsappButton').addEventListener('click', () => {
  const mensagem = 'Olá, Bruno e Beatriz! Confirmo minha presença no casamento de vocês em 16 de outubro. 🖤';
  window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
});
