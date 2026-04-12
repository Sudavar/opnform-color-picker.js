<script>(function() {
  const colorPairs = [
    { name: 'Cloud', bg: '#F8FAFC', btn: '#0F172A' },
    { name: 'Sand', bg: '#FAF7F2', btn: '#78716C' },
    { name: 'Dawn', bg: '#FFF7ED', btn: '#EA580C' },
    { name: 'Mist', bg: '#F0F9FF', btn: '#0284C7' },
    { name: 'Lavender', bg: '#FAF5FF', btn: '#7C3AED' },
    { name: 'Jade', bg: '#ECFDF5', btn: '#047857' },
    { name: 'Blush', bg: '#FDF2F8', btn: '#DB2777' },
    { name: 'Oasis', bg: '#F0FDFA', btn: '#0D9488' },
    { name: 'Ivory', bg: '#FEFDFB', btn: '#B45309' },
    { name: 'Slate', bg: '#F1F5F9', btn: '#334155' },
    { name: 'Rose', bg: '#FFF1F2', btn: '#BE123C' },
    { name: 'Sage', bg: '#F0FDF4', btn: '#15803D' },
  ];

  function applyTheme(pair) {
    const app = document.getElementById('app');
    if (app) app.style.backgroundColor = pair.bg;
    
    const formContainer = document.querySelector('.open-complete-form');
    if (formContainer) {
      formContainer.style.setProperty('--form-color', pair.btn);
      formContainer.style.setProperty('--color-form', pair.btn);
    }
    
    toggle.style.background = pair.btn;
    panel.style.setProperty('--btn-color', pair.btn);
  }

  const defaultTheme = colorPairs.find(p => p.name === 'Slate') || colorPairs[0];

  const style = document.createElement('style');
  style.textContent = `
    #color-picker-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #3B82F6;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    #color-picker-panel {
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: white;
      padding: 12px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      display: none;
      z-index: 9999;
      gap: 8px;
      flex-wrap: wrap;
      max-width: 192px;
    }
    #color-picker-panel.open { display: flex; }
    .color-swatch {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: transform 0.15s, border-color 0.15s;
    }
    .color-swatch:hover { transform: scale(1.1); border-color: var(--btn-color); }
  `;
  document.head.appendChild(style);

  const toggle = document.createElement('button');
  toggle.id = 'color-picker-toggle';
  toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><circle cx="12" cy="12" r="11" fill="none" stroke="#2C3E50" stroke-width="0.5" /><rect x="7" y="8" width="6" height="9" rx="0.5" transform="rotate(-15 10 12.5)" fill="#2C3E50" /><rect x="11" y="8" width="6" height="9" rx="0.5" transform="rotate(10 14 12.5)" fill="#D4AF37" /><rect x="9" y="10" width="6" height="9" rx="0.5" fill="#E5E4E2" stroke="#2C3E50" stroke-width="0.2" /><circle cx="12" cy="4" r="1" fill="#D4AF37" /></svg>';
  document.body.appendChild(toggle);

  const panel = document.createElement('div');
  panel.id = 'color-picker-panel';
  colorPairs.forEach(pair => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = pair.bg;
    swatch.title = pair.name;
    swatch.addEventListener('click', () => applyTheme(pair));
    panel.appendChild(swatch);
  });
  document.body.appendChild(panel);

  toggle.addEventListener('click', () => panel.classList.toggle('open'));

  applyTheme(defaultTheme);
})();
</script>
