const treatmentContent = {
  implantes: { title: 'Implantes', copy: 'A implantodontia restabelece a função de mastigação e a estética quando existe ausência de um ou mais dentes, com planejamento cuidadoso e acompanhamento próximo.' },
  lentes: { title: 'Lentes de contato dental', copy: 'Laminados ultrafinos de porcelana podem transformar o desenho do sorriso com leveza e precisão, sempre respeitando a individualidade de cada paciente.' },
  harmonizacao: { title: 'Harmonização orofacial', copy: 'Procedimentos que buscam equilíbrio entre a estética e a função do sorriso e do rosto, com decisões proporcionais e personalizadas.' },
  ortodontia: { title: 'Ortodontia', copy: 'O tratamento ortodôntico contribui para o alinhamento dos dentes, a oclusão e uma mastigação mais saudável, com um plano adequado à sua rotina.' },
  kids: { title: 'Odontopediatria', copy: 'Um cuidado pensado para as crianças e suas famílias, criando uma relação mais leve, positiva e duradoura com a saúde bucal.' },
  urgencia: { title: 'Urgência', copy: 'Quando a dor aparece, você precisa de orientação e cuidado. Nossa equipe está preparada para acolher e investigar diferentes causas do desconforto.' }
};

const doctorContent = {
  millena: { title: 'Dra. Millena Gomes', copy: 'Especialista em Periodontia. Um olhar cuidadoso para a saúde que sustenta o seu sorriso.', image: 'https://institutodentalsante.com.br/wp-content/uploads/elementor/thumbs/Imagem-do-WhatsApp-de-2025-03-12-as-09.25.03_34a7c783-1-r2rf81o8pwblhz91ddptjzi902xxjkdn2b3esw30ws.webp' },
  renata: { title: 'Dra. Renata Figueiroa', copy: 'Especialista em Canal. Precisão e acolhimento para cuidar de cada etapa do tratamento endodôntico.', image: 'https://institutodentalsante.com.br/wp-content/uploads/elementor/thumbs/Imagem-do-WhatsApp-de-2025-03-12-as-09.25.03_88fe1da1-r2rfxam6aovvcwkqxsm2144zfohvavm2v9xxvgnbrw.webp' },
  marcus: { title: 'Dr. Marcus Barbosa', copy: 'Especialista em Implante. Reabilitação planejada para devolver segurança ao seu sorriso.', image: 'https://institutodentalsante.com.br/wp-content/uploads/elementor/thumbs/Imagem-do-WhatsApp-de-2025-03-12-as-09.25.03_4493e88a-1-r2rfw4bfr59yuga6ssbuewt8pcacohy5pgl3a0e1jw.webp' },
  juliana: { title: 'Dra. Juliana Leite', copy: 'Especialista em Lentes de Contato. Estética com naturalidade, escuta e atenção aos detalhes.', image: 'https://institutodentalsante.com.br/wp-content/uploads/elementor/thumbs/Imagem-do-WhatsApp-de-2025-03-12-as-09.25.03_a3edf2a1-r2rgbe70t86pic3glw0lfk1w7r02rfl4t2850vqqfw.webp' }
};

const header = document.querySelector('[data-header]');
const progress = document.querySelector('.scroll-progress span');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

function updateScrollState() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  header.classList.toggle('scrolled', window.scrollY > 12);
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

function setupDialog(dialog, openButton, fill) {
  openButton.addEventListener('click', () => { fill(); dialog.showModal(); });
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}

const treatmentDialog = document.querySelector('#treatment-dialog');
document.querySelectorAll('[data-treatment]').forEach((button) => setupDialog(treatmentDialog, button, () => {
  const data = treatmentContent[button.dataset.treatment];
  treatmentDialog.querySelector('[data-dialog-title]').textContent = data.title;
  treatmentDialog.querySelector('[data-dialog-copy]').textContent = data.copy;
}));

const doctorDialog = document.querySelector('#doctor-dialog');
document.querySelectorAll('[data-doctor]').forEach((button) => setupDialog(doctorDialog, button, () => {
  const data = doctorContent[button.dataset.doctor];
  doctorDialog.querySelector('[data-doctor-title]').textContent = data.title;
  doctorDialog.querySelector('[data-doctor-copy]').textContent = data.copy;
  const image = doctorDialog.querySelector('[data-doctor-image]');
  image.src = data.image;
  image.alt = data.title;
}));

document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('close', () => document.body.classList.remove('dialog-open')));
document.querySelector('[data-year]').textContent = new Date().getFullYear();
