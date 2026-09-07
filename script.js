const page = document.body.dataset.page || 'casamento';
const dataEvento = page === 'festa' ? new Date('2026-10-17T10:00:00-03:00') : new Date('2026-10-16T10:00:00-03:00');

function atualizarContagem() {
  if (!document.getElementById('days')) return;
  const restante = Math.max(0, dataEvento.getTime() - Date.now());
  const valores = {
    days: Math.floor(restante / 86400000),
    hours: Math.floor(restante / 3600000 % 24),
    minutes: Math.floor(restante / 60000 % 60),
    seconds: Math.floor(restante / 1000 % 60)
  };
  Object.entries(valores).forEach(([id, valor]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(valor).padStart(2, '0');
  });
}
if (document.getElementById('days')) {
  atualizarContagem();
  setInterval(atualizarContagem, 1000);
}

const copyBtn = document.getElementById('copyButton');
if (copyBtn) {
  copyBtn.addEventListener('click', async (event) => {
    const endereco = event.currentTarget.dataset.address || 'Rua Itabuna, 148, Rio Vermelho, Salvador';
    await navigator.clipboard.writeText(endereco);
    event.currentTarget.textContent = 'Endereço copiado';
    setTimeout(() => event.currentTarget.textContent = 'Copiar endereço', 1800);
  });
}

const waBtn = document.getElementById('whatsappButton');
if (waBtn) {
  waBtn.addEventListener('click', () => {
    const mensagem = page === 'festa'
      ? 'Olá, Bruno e Beatriz! Confirmo minha presença na *festa de casamento* de vocês no dia 17 de outubro. 🕺'
      : 'Olá, Bruno e Beatriz! Confirmo minha presença no *casamento* de vocês no dia 16 de outubro. 🖤';
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
  });
}

// Funções de Compartilhamento do Share Hub (index.html)
function compartilharWhatsapp(titulo, texto, url) {
  const mensagemCompleta = `${texto}\n\n${url}`;
  
  if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    navigator.share({
      title: titulo,
      text: texto,
      url: url
    }).catch(() => {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensagemCompleta)}`, '_blank');
    });
  } else {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensagemCompleta)}`, '_blank');
  }
}

const shareCerimoniaBtn = document.getElementById('shareCerimonia');
if (shareCerimoniaBtn) {
  shareCerimoniaBtn.addEventListener('click', () => {
    compartilharWhatsapp(
      'Beatriz & Bruno · Cerimônia do Casamento',
      'Você está convidado(a) para a cerimônia de casamento de Beatriz & Bruno! 💒✨',
      'https://brunoeduardo45.github.io/ConviteCasamento/Casamento.html?convite=1'
    );
  });
}

const shareFestaBtn = document.getElementById('shareFesta');
if (shareFestaBtn) {
  shareFestaBtn.addEventListener('click', () => {
    compartilharWhatsapp(
      'Beatriz & Bruno · Festa do Casamento',
      'Você está convidado(a) para a festa de casamento de Beatriz & Bruno! 🕺✨',
      'https://brunoeduardo45.github.io/ConviteCasamento/Festa.html?convite=1'
    );
  });
}

function configurarBotaoCopiar(id) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const url = btn.dataset.url;
    try {
      await navigator.clipboard.writeText(url);
      const span = btn.querySelector('span');
      const originalText = span.textContent;
      span.textContent = 'Link Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        span.textContent = originalText;
        btn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  });
}

configurarBotaoCopiar('copyCerimonia');
configurarBotaoCopiar('copyFesta');

