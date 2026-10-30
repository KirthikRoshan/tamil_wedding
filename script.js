(() => {
  'use strict';
  const moment = new Date('2026-11-16T05:45:00+05:30').getTime();
  const fields = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  function tick() {
    const left = Math.max(0, moment - Date.now());
    const parts = [Math.floor(left / 86400000), Math.floor(left % 86400000 / 3600000), Math.floor(left % 3600000 / 60000), Math.floor(left % 60000 / 1000)];
    fields.forEach((field, i) => { if (field) field.textContent = String(parts[i]).padStart(2, '0'); });
  }
  tick(); setInterval(tick, 1000);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold: .1});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  let toastTimer;
  function toast(message) {
    const el = document.getElementById('toast');
    clearTimeout(toastTimer); el.textContent = message; el.classList.add('show');
    toastTimer = setTimeout(() => el.classList.remove('show'), 3100);
  }
  document.getElementById('copy-address').addEventListener('click', async () => {
    const address = 'Swarna Mahal, Covai to Salem NH Road, Chengappalli, Tiruppur, Tamil Nadu, India';
    try { await navigator.clipboard.writeText(address); toast('முகவரி நகலெடுக்கப்பட்டது! 📍'); }
    catch { toast(address); }
  });
  const wishes = ['மணமக்களுக்கு இனிய நல்வாழ்த்துகள்! 🌸', 'அன்பும் மகிழ்ச்சியும் என்றும் நிலைக்கட்டும்! 💛', 'பல்லாண்டு வாழ்க! ✨'];
  let wishIndex = 0;
  document.getElementById('shower').addEventListener('click', () => {
    document.getElementById('wish').textContent = wishes[(wishIndex++) % wishes.length];
    toast('உங்கள் வாழ்த்துகள் மலர்களாக மலரட்டும்! ♡');
    if (reduced) return;
    const layer = document.getElementById('petals');
    for (let i = 0; i < 36; i++) {
      const item = document.createElement('span');
      item.className = 'petal'; item.textContent = ['🌸', '❀', '🌼', '✿'][Math.floor(Math.random() * 4)];
      item.style.left = (Math.random() * 100) + 'vw';
      item.style.fontSize = (15 + Math.random() * 18) + 'px';
      item.style.animationDelay = (Math.random() * .9) + 's';
      item.style.setProperty('--duration', (3.4 + Math.random() * 2.4) + 's');
      item.style.setProperty('--drift', ((Math.random() - .5) * 230) + 'px');
      layer.appendChild(item); setTimeout(() => item.remove(), 7500);
    }
  });
  const share = document.getElementById('share');
  const link = location.origin + location.pathname;
  const message = 'அன்புடன் அழைக்கிறோம்! 💍\n\nகிர்திக் ரோஷன் ♥ நிக்கிலா தேவி திருமணம்\nவரவேற்பு: 15.11.2026, மாலை 6:30–9:00\nமுகூர்த்தம்: 16.11.2026, காலை 5:45–7:00\nஇடம்: ஸ்வர்ண மஹால், செங்கப்பள்ளி.\n\nதிருமண அழைப்பிதழ்: ' + link;
  share.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message);
})();
