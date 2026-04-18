(function() {
  const colorPairs = [
    { name: 'Sand', bg: '#FAF7F2', btn: '#78716C' },
    { name: 'Dawn', bg: '#FFF7ED', btn: '#EA580C' },
    { name: 'Mist', bg: '#F0F9FF', btn: '#0284C7' },
    { name: 'Lavender', bg: '#FAF5FF', btn: '#7C3AED' },
    { name: 'Jade', bg: '#ECFDF5', btn: '#047857' },
    { name: 'Ivory', bg: '#FEFDFB', btn: '#B45309' },
    { name: 'Slate', bg: '#F1F5F9', btn: '#334155' },
    { name: 'Rose', bg: '#FFF1F2', btn: '#BE123C' },
    { name: 'Sage', bg: '#F0FDF4', btn: '#15803D' },
  ];

  const darkColorPairs = [
    { name: 'Midnight', bg: '#0F172A', btn: '#60A5FA' },
    { name: 'Charcoal', bg: '#1C1917', btn: '#A78BFA' },
    { name: 'Ocean', bg: '#0C1929', btn: '#22D3EE' },
  ];

  function applyTheme(pair, isDark) {
    const app = document.getElementById('app');
    if (app) app.style.backgroundColor = pair.bg;
    
    const formContainer = document.querySelector('.open-complete-form');
    if (formContainer) {
      formContainer.style.setProperty('--form-color', pair.btn);
      formContainer.style.setProperty('--color-form', pair.btn);
    }
    
    applyTextStyles(isDark);
    
    toggle.style.background = pair.btn;
    panel.style.setProperty('--btn-color', pair.btn);
    
    const textColor = isDark ? '#F3F4F6' : '#374151';
    const mutedColor = isDark ? '#9CA3AF' : '#9CA3AF';
    const borderColor = isDark ? '#374151' : '#E5E7EB';
    const panelBg = isDark ? '#1F2937' : '#FFFFFF';
    
    panel.style.background = panelBg;
    panel.querySelector('.panel-title').style.color = textColor;
    panel.querySelector('.panel-divider').style.background = borderColor;
    panel.querySelectorAll('.panel-section-title').forEach(el => el.style.color = mutedColor);
    
    localStorage.setItem('form-theme', pair.name);
    localStorage.setItem('form-theme-dark', isDark ? 'true' : 'false');
  }

  function applyTextStyles(isDark) {
    const darkCss = `
      .form-description { color: var(--ui-color-neutral-200) !important; }
      .text-block div h1, .text-block div h2, .text-block div h3, 
      .text-block div h4, .text-block div p { color: var(--ui-color-neutral-100) !important; }
    `;
    const lightCss = `
      .form-description { color: var(--ui-color-neutral-700) !important; }
      .text-block div h1, .text-block div h2, .text-block div h3, 
      .text-block div h4, .text-block div p { color: var(--ui-color-neutral-900) !important; }
    `;
    
    let styleTag = document.getElementById('form-theme-override');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'form-theme-override';
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = isDark ? darkCss : lightCss;
    
    const fieldHelp = document.querySelectorAll('.field-help p');
    fieldHelp.forEach(el => el.style.color = isDark ? '#F3F4F6' : '');
  }

  const savedThemeName = localStorage.getItem('form-theme');
  const savedThemeDark = localStorage.getItem('form-theme-dark') === 'true';
  const savedTheme = [...colorPairs, ...darkColorPairs].find(p => p.name === savedThemeName);
  const defaultTheme = savedTheme || colorPairs.find(p => p.name === 'Slate') || colorPairs[0];

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
      max-width: 148px;
    }
    #color-picker-panel.open { display: flex; }
    #color-picker-panel .panel-title {
      width: 100%;
      font-size: 12px;
      font-weight: 600;
      color: #374151;
      text-align: center;
      margin-bottom: 4px;
      padding-bottom: 8px;
      border-bottom: 1px solid #E5E7EB;
    }
    #color-picker-panel .panel-divider {
      width: 100%;
      height: 1px;
      background: #E5E7EB;
      margin: 6px 0;
    }
    #color-picker-panel .panel-section-title {
      width: 100%;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      text-align: center;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }
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
  
  const title = document.createElement('div');
  title.className = 'panel-title';
  title.textContent = 'Form Style';
  panel.appendChild(title);
  
  const lightTitle = document.createElement('div');
  lightTitle.className = 'panel-section-title';
  lightTitle.textContent = 'Light';
  panel.appendChild(lightTitle);
  
  colorPairs.forEach(pair => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = pair.bg;
    swatch.title = pair.name;
    swatch.addEventListener('click', () => applyTheme(pair, false));
    panel.appendChild(swatch);
  });
  
  const divider = document.createElement('div');
  divider.className = 'panel-divider';
  panel.appendChild(divider);
  
  const darkTitle = document.createElement('div');
  darkTitle.className = 'panel-section-title';
  darkTitle.textContent = 'Dark';
  panel.appendChild(darkTitle);
  
  darkColorPairs.forEach(pair => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = pair.bg;
    swatch.title = pair.name;
    swatch.addEventListener('click', () => applyTheme(pair, true));
    panel.appendChild(swatch);
  });
  
  document.body.appendChild(panel);

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  const isDarkDefault = savedThemeDark || darkColorPairs.some(p => p.name === defaultTheme.name);
  applyTheme(defaultTheme, isDarkDefault);

  const observer = new MutationObserver(() => {
    const currentThemeName = localStorage.getItem('form-theme');
    const currentThemeDark = localStorage.getItem('form-theme-dark') === 'true';
    const currentTheme = [...colorPairs, ...darkColorPairs].find(p => p.name === currentThemeName);
    if (currentTheme) {
      applyTextStyles(currentThemeDark);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();

