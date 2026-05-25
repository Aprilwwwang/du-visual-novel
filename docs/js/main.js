/**
 * Main Entry - 《你是我藏在教案下的一场大雨》 Visual Novel
 */

let engine;

function updateTitleEndings() {
  const container = document.getElementById('ending-collection');
  if (!container) return;
  const endings = engine.unlockedEndings || {};
  const names = {
    'true': '渡', 'good': '光', 'bad': '沉', 'hidden': '雨'
  };
  let html = '已解锁结局：';
  let hasAny = false;
  for (const [key, label] of Object.entries(names)) {
    const unlocked = endings[key];
    if (unlocked) hasAny = true;
    html += `<span class="ending-dot${unlocked ? ' unlocked' : ''}${key === 'hidden' ? ' hidden-ending' : ''}">◆ ${label}</span>`;
  }
  if (!hasAny) html += '<span class="ending-dot">暂无</span>';
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  engine = new VNEngine();
  engine.loadScript(STORY_SCRIPT);

  // Add ending collection display to title screen
  const titleContent = document.querySelector('.title-content');
  const endingDiv = document.createElement('div');
  endingDiv.id = 'ending-collection';
  endingDiv.className = 'ending-collection';
  const titleFooter = document.querySelector('.title-footer');
  titleContent.insertBefore(endingDiv, titleFooter);

  // Add route indicator to game screen
  const routeDiv = document.createElement('div');
  routeDiv.id = 'route-indicator';
  routeDiv.className = 'route-indicator';
  document.getElementById('game-screen').appendChild(routeDiv);

  // === Title Screen Buttons ===
  document.getElementById('btn-start').addEventListener('click', () => {
    updateTitleEndings();
    engine.start();
  });

  document.getElementById('btn-load').addEventListener('click', () => {
    engine.showScreen('game-screen');
    engine.showLoadPanel();
  });

  document.getElementById('btn-settings').addEventListener('click', () => {
    engine.showSettings();
  });

  // === Quick Menu Buttons ===
  document.getElementById('btn-save').addEventListener('click', () => {
    engine.showSavePanel();
  });

  document.getElementById('btn-load-game').addEventListener('click', () => {
    engine.showLoadPanel();
  });

  document.getElementById('btn-history').addEventListener('click', () => {
    engine.showHistory();
  });

  document.getElementById('btn-auto').addEventListener('click', () => {
    engine.toggleAuto();
  });

  document.getElementById('btn-skip').addEventListener('click', () => {
    engine.toggleSkip();
  });

  document.getElementById('btn-title').addEventListener('click', () => {
    if (confirm('确定要回到标题画面吗？未保存的进度将会丢失。')) {
      engine.clearTyping();
      engine.hideAllCharacters();
      engine.stopRain();
      engine.isAuto = false;
      engine.isSkipping = false;
      document.getElementById('btn-auto').textContent = '自动';
      document.getElementById('btn-skip').textContent = '快进';
      document.getElementById('text-box').classList.remove('dim');
      updateTitleEndings();
      engine.showScreen('title-screen');
    }
  });

  // === Close/Settings Buttons ===
  document.getElementById('btn-close-settings').addEventListener('click', () => {
    engine.hideSettings();
  });

  document.getElementById('btn-close-save').addEventListener('click', () => {
    engine.hideSavePanel();
    if (!engine.currentLine) {
      updateTitleEndings();
      engine.showScreen('title-screen');
    }
  });

  // === History close on click ===
  document.getElementById('history-panel').addEventListener('click', () => {
    engine.hideHistory();
  });

  // === Settings close on click outside ===
  document.getElementById('settings-panel').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) engine.hideSettings();
  });

  // === Save panel close on click outside ===
  document.getElementById('save-panel').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) engine.hideSavePanel();
  });

  // === Ending restart button ===
  document.getElementById('btn-restart').addEventListener('click', () => {
    updateTitleEndings();
    engine.showScreen('title-screen');
  });

  // === Settings inputs ===
  document.getElementById('text-speed').addEventListener('input', (e) => {
    engine.textSpeed = parseInt(e.target.value);
  });

  document.getElementById('auto-play').addEventListener('change', (e) => {
    if (e.target.checked) {
      if (!engine.isAuto) engine.toggleAuto();
    } else {
      if (engine.isAuto) engine.toggleAuto();
    }
  });

  document.getElementById('auto-speed').addEventListener('input', (e) => {
    engine.autoSpeed = parseInt(e.target.value);
  });

  // === Keyboard shortcuts ===
  document.addEventListener('keydown', (e) => {
    const gameScreen = document.getElementById('game-screen');
    const isGameActive = gameScreen.classList.contains('active');

    if (e.key === 'Escape') {
      if (!document.getElementById('settings-panel').classList.contains('hidden')) {
        engine.hideSettings();
      } else if (!document.getElementById('save-panel').classList.contains('hidden')) {
        engine.hideSavePanel();
      } else if (!document.getElementById('history-panel').classList.contains('hidden')) {
        engine.hideHistory();
      }
    }

    if (isGameActive && !engine.isTyping) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        engine.skipToEnd();
      }
      if (e.key === 'a' || e.key === 'A') {
        engine.toggleAuto();
      }
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        engine.showSavePanel();
      }
    }
  });

  // === Prevent right-click on game area ===
  document.getElementById('game-screen').addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // === Update ending collection on title screen ===
  updateTitleEndings();
});
