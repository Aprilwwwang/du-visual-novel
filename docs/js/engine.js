/**
 * Visual Novel Engine - 《渡》
 */

class VNEngine {
  constructor() {
    this.currentLine = 0;
    this.script = [];
    this.history = [];
    this.isTyping = false;
    this.isAuto = false;
    this.isSkipping = false;
    this.autoTimer = null;
    this.typeTimer = null;
    this.textSpeed = 3; // 1-5, lower = faster
    this.autoSpeed = 5; // 1-10, higher = faster
    this.saveSlots = Array(9).fill(null);
    this.currentChoices = [];
    this.flags = {}; // branching flags
    this.currentBg = '';
    this.rainActive = false;
    this.unlockedEx = {}; // EX scene unlock tracking
    this.unlockedEndings = {}; // ending collection tracking
    this.routeName = ''; // current route display name

    this.loadSaveData();
    this.loadUnlockedEndings();
  }

  loadScript(scriptData) {
    this.script = scriptData;
  }

  // === Display Management ===
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }

  // === Background ===
  setBackground(bg) {
    if (bg === this.currentBg) return;
    this.currentBg = bg;
    const bgEl = document.getElementById('scene-bg');
    bgEl.className = 'scene-bg ' + bg;
  }

  // === Character Sprites ===
  showCharacter(position, name, mood) {
    const el = document.getElementById('character-' + position);
    if (!el) return;
    el.className = 'character-sprite ' + position + ' active fade-in';
    el.style.background = this.getCharacterArt(name, mood);
  }

  hideCharacter(position) {
    const el = document.getElementById('character-' + position);
    if (el) el.className = 'character-sprite ' + position;
  }

  hideAllCharacters() {
    ['left', 'right', 'center'].forEach(p => this.hideCharacter(p));
  }

  getCharacterArt(name, mood) {
    // CSS-based abstract character portraits
    const palette = {
      'shen': { // 沈临渡 - cool tones, dark hair, pale
        base: 'linear-gradient(180deg, rgba(60,70,100,0.15) 0%, rgba(40,50,80,0.1) 15%, rgba(180,190,210,0.12) 15%, rgba(180,190,210,0.12) 16%, rgba(200,200,215,0.35) 16%, rgba(200,200,215,0.35) 30%, rgba(50,55,70,0.25) 30%, rgba(50,55,70,0.25) 31%, rgba(200,195,210,0.4) 31%, rgba(200,195,210,0.4) 45%, rgba(60,65,80,0.3) 45%, rgba(60,65,80,0.3) 46%, rgba(210,205,220,0.38) 46%, rgba(210,205,220,0.38) 100%)',
        shadow: '0 0 30px rgba(100,120,160,0.15)'
      },
      'lu': { // 陆砚 - warm scholarly tones
        base: 'linear-gradient(180deg, rgba(80,70,60,0.15) 0%, rgba(60,55,50,0.1) 15%, rgba(190,180,170,0.1) 15%, rgba(190,180,170,0.1) 16%, rgba(215,205,195,0.35) 16%, rgba(215,205,195,0.35) 30%, rgba(70,65,55,0.25) 30%, rgba(70,65,55,0.25) 31%, rgba(220,210,200,0.4) 31%, rgba(220,210,200,0.4) 45%, rgba(80,75,65,0.3) 45%, rgba(80,75,65,0.3) 46%, rgba(225,215,205,0.38) 46%, rgba(225,215,205,0.38) 100%)',
        shadow: '0 0 30px rgba(140,120,100,0.1)'
      },
      'pei_ting': { // 裴听 - gentle brown tones
        base: 'linear-gradient(180deg, rgba(100,80,70,0.15) 0%, rgba(80,65,55,0.1) 15%, rgba(200,180,160,0.1) 15%, rgba(200,180,160,0.1) 16%, rgba(220,200,180,0.35) 16%, rgba(220,200,180,0.35) 30%, rgba(90,75,60,0.25) 30%, rgba(90,75,60,0.25) 31%, rgba(225,205,185,0.4) 31%, rgba(225,205,185,0.4) 45%, rgba(100,85,70,0.3) 45%, rgba(100,85,70,0.3) 46%, rgba(230,210,190,0.38) 46%, rgba(230,210,190,0.38) 100%)',
        shadow: '0 0 25px rgba(160,130,100,0.1)'
      },
      'pei_yuan': { // 裴苑 - elegant, refined
        base: 'linear-gradient(180deg, rgba(50,45,60,0.15) 0%, rgba(40,35,50,0.1) 15%, rgba(160,150,170,0.1) 15%, rgba(160,150,170,0.1) 16%, rgba(195,185,200,0.35) 16%, rgba(195,185,200,0.35) 30%, rgba(55,50,65,0.25) 30%, rgba(55,50,65,0.25) 31%, rgba(200,190,205,0.4) 31%, rgba(200,190,205,0.4) 45%, rgba(65,60,75,0.3) 45%, rgba(65,60,75,0.3) 46%, rgba(205,195,210,0.38) 46%, rgba(205,195,210,0.38) 100%)',
        shadow: '0 0 30px rgba(130,120,150,0.12)'
      },
      'peihaisheng': { // 裴海生 - darker, more threatening
        base: 'linear-gradient(180deg, rgba(40,35,45,0.2) 0%, rgba(30,25,35,0.15) 15%, rgba(140,130,145,0.15) 15%, rgba(140,130,145,0.15) 16%, rgba(170,160,175,0.35) 16%, rgba(170,160,175,0.35) 30%, rgba(45,40,50,0.3) 30%, rgba(45,40,50,0.3) 31%, rgba(175,165,180,0.4) 31%, rgba(175,165,180,0.4) 45%, rgba(55,50,60,0.35) 45%, rgba(55,50,60,0.35) 46%, rgba(180,170,185,0.38) 46%, rgba(180,170,185,0.38) 100%)',
        shadow: '0 0 20px rgba(80,60,70,0.15)'
      },
      'song': { // 宋知远
        base: 'linear-gradient(180deg, rgba(70,65,75,0.15) 0%, rgba(55,50,60,0.1) 15%, rgba(175,165,180,0.1) 15%, rgba(175,165,180,0.1) 16%, rgba(200,190,205,0.35) 16%, rgba(200,190,205,0.35) 30%, rgba(65,60,70,0.25) 30%, rgba(65,60,70,0.25) 31%, rgba(205,195,210,0.4) 31%, rgba(205,195,210,0.4) 45%, rgba(75,70,80,0.3) 45%, rgba(75,70,80,0.3) 46%, rgba(210,200,215,0.38) 46%, rgba(210,200,215,0.38) 100%)',
        shadow: '0 0 25px rgba(130,120,140,0.1)'
      }
    };
    const entry = palette[name] || palette['shen'];
    return entry.base;
  }

  // === Rain Effect ===
  startRain() {
    if (this.rainActive) return;
    this.rainActive = true;
    const container = document.createElement('div');
    container.className = 'rain-container';
    container.id = 'rain-container';
    for (let i = 0; i < 80; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (0.5 + Math.random() * 0.8) + 's';
      drop.style.animationDelay = Math.random() * 1.5 + 's';
      drop.style.height = (8 + Math.random() * 16) + 'px';
      container.appendChild(drop);
    }
    document.getElementById('game-screen').appendChild(container);
  }

  stopRain() {
    this.rainActive = false;
    const container = document.getElementById('rain-container');
    if (container) container.remove();
  }

  // === Script Execution ===
  runLine(index) {
    if (index >= this.script.length) {
      this.showEnding('default');
      return;
    }
    this.currentLine = index;
    const cmd = this.script[index];
    if (!cmd) return;

    switch (cmd.type) {
      case 'bg': this.setBackground(cmd.value); this.runNext(); break;
      case 'char_show': this.showCharacter(cmd.pos, cmd.name, cmd.mood || 'default'); this.runNext(); break;
      case 'char_hide': this.hideCharacter(cmd.pos); this.runNext(); break;
      case 'char_hide_all': this.hideAllCharacters(); this.runNext(); break;
      case 'rain_start': this.startRain(); this.runNext(); break;
      case 'rain_stop': this.stopRain(); this.runNext(); break;
      case 'music': /* placeholder */ this.runNext(); break;
      case 'sfx': /* placeholder */ this.runNext(); break;
      case 'narration': this.displayNarration(cmd.text); break;
      case 'dialogue': this.displayDialogue(cmd.speaker, cmd.text); break;
      case 'thought': this.displayThought(cmd.speaker, cmd.text); break;
      case 'choice': this.displayChoice(cmd.choices); break;
      case 'jump': this.runLine(this.findLabel(cmd.label)); break;
      case 'label': this.runNext(); break;
      case 'flag_set': this.flags[cmd.flag] = cmd.value; this.runNext(); break;
      case 'flag_check': this.handleFlagCheck(cmd); break;
      case 'ending': this.showEnding(cmd.ending); break;
      case 'wait': setTimeout(() => this.runNext(), cmd.duration); break;
      case 'transition': this.transition(cmd.effect, () => this.runNext()); break;
      default: this.runNext(); break;
    }
  }

  runNext() {
    if (this.isSkipping) {
      // Skip narration/dialogue rapidly
      const cmd = this.script[this.currentLine + 1];
      if (cmd && (cmd.type === 'narration' || cmd.type === 'dialogue' || cmd.type === 'thought')) {
        this.clearTyping();
        this.currentLine++;
        setTimeout(() => this.runLine(this.currentLine), 30);
        return;
      }
    }
    this.runLine(this.currentLine + 1);
  }

  findLabel(label) {
    for (let i = 0; i < this.script.length; i++) {
      if (this.script[i].type === 'label' && this.script[i].name === label) return i;
    }
    return this.script.length;
  }

  handleFlagCheck(cmd) {
    const val = this.flags[cmd.flag];
    for (const branch of cmd.branches) {
      if (branch.value === val) {
        this.runLine(this.findLabel(branch.label));
        return;
      }
    }
    if (cmd.default) this.runLine(this.findLabel(cmd.default));
    else this.runNext();
  }

  // === Display Methods ===
  displayNarration(text) {
    this.clearTyping();
    this.hideChoicePanel();
    const box = document.getElementById('text-box');
    box.classList.add('dim');
    document.getElementById('speaker-tag').textContent = '';
    this.typeText('dialogue-text', text, () => {
      this.waitForClick(() => { box.classList.remove('dim'); this.runNext(); });
    });
  }

  displayDialogue(speaker, text) {
    this.clearTyping();
    this.hideChoicePanel();
    const box = document.getElementById('text-box');
    box.classList.remove('dim');
    document.getElementById('speaker-tag').textContent = '—— ' + speaker;
    this.typeText('dialogue-text', text, () => {
      this.waitForClick(() => { this.runNext(); });
    });
  }

  displayThought(speaker, text) {
    this.clearTyping();
    this.hideChoicePanel();
    const box = document.getElementById('text-box');
    box.classList.add('dim');
    document.getElementById('speaker-tag').textContent = '（' + speaker + '）';
    this.typeText('dialogue-text', text, () => {
      this.waitForClick(() => { box.classList.remove('dim'); this.runNext(); });
    });
  }

  displayChoice(choices) {
    this.clearTyping();
    this.currentChoices = choices;
    const panel = document.getElementById('choice-panel');
    const btns = document.getElementById('choice-buttons');
    panel.classList.remove('hidden');
    btns.innerHTML = '';
    choices.forEach((ch, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = ch.text;
      btn.addEventListener('click', () => {
        panel.classList.add('hidden');
        if (ch.flag) {
          this.flags[ch.flag] = ch.value;
          // Track route for display
          if (ch.flag === 'route') {
            const routeNames = { 'pei_ting': '裴听路线 · 笔记本的传递', 'lu_yan': '自渡路线 · 河堤', 'pei_yuan': '裴苑路线 · 律师名片' };
            this.routeName = routeNames[ch.value] || '';
            const indicator = document.getElementById('route-indicator');
            if (indicator) indicator.textContent = '◆ ' + this.routeName;
          }
          // Track EX unlocks
          if (ch.flag === 'lu_token_1' || ch.flag === 'lu_token_2' || ch.flag === 'lu_token_3') {
            this.unlockedEx['ex01'] = true;
          }
          if (ch.flag === 'meirui_seen' && ch.value === true) {
            this.unlockedEx['meirui'] = true;
          }
        }
        this.addHistory('【选择】', ch.text);
        if (ch.jump) this.runLine(this.findLabel(ch.jump));
        else this.runNext();
      });
      btns.appendChild(btn);
    });
  }

  hideChoicePanel() {
    document.getElementById('choice-panel').classList.add('hidden');
  }

  // === Typewriter Effect ===
  typeText(elementId, text, callback) {
    const el = document.getElementById(elementId);
    const speedMap = [8, 16, 32, 48, 64];
    const speed = speedMap[this.textSpeed - 1] || 32;

    this.isTyping = true;
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;

    const type = () => {
      if (!this.isTyping) {
        el.textContent = text;
        el.classList.remove('typing');
        if (callback) callback();
        return;
      }
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        this.typeTimer = setTimeout(type, this.isSkipping ? 1 : speed);
      } else {
        el.classList.remove('typing');
        this.isTyping = false;
        if (callback) callback();
        if (this.isAuto) this.scheduleAutoAdvance();
      }
    };
    type();
  }

  clearTyping() {
    this.isTyping = false;
    if (this.typeTimer) clearTimeout(this.typeTimer);
    document.getElementById('dialogue-text').classList.remove('typing');
  }

  skipToEnd() {
    if (this.isTyping) {
      this.clearTyping();
      const cmd = this.script[this.currentLine];
      if (cmd) {
        const text = cmd.text || '';
        document.getElementById('dialogue-text').textContent = text;
      }
      if (this.isAuto) this.scheduleAutoAdvance();
    } else {
      this.runNext();
    }
  }

  // === Click Handling ===
  waitForClick(callback) {
    const box = document.getElementById('text-box');
    const handler = (e) => {
      e.stopPropagation();
      box.removeEventListener('click', handler);
      if (this.isTyping) {
        this.skipToEnd();
      } else {
        if (this.autoTimer) clearTimeout(this.autoTimer);
        this.addCurrentToHistory();
        callback();
      }
    };
    box.addEventListener('click', handler);
  }

  addCurrentToHistory() {
    const cmd = this.script[this.currentLine];
    if (!cmd) return;
    if (cmd.type === 'dialogue') this.addHistory(cmd.speaker, cmd.text);
    else if (cmd.type === 'narration' || cmd.type === 'thought') this.addHistory('', cmd.text);
  }

  addHistory(speaker, text) {
    this.history.push({ speaker, text });
  }

  // === Auto Mode ===
  scheduleAutoAdvance() {
    if (!this.isAuto) return;
    const speedMap = [3000, 2500, 2000, 1600, 1300, 1000, 800, 600, 500, 400];
    const delay = speedMap[this.autoSpeed - 1] || 2000;
    this.autoTimer = setTimeout(() => {
      this.addCurrentToHistory();
      this.runNext();
    }, delay);
  }

  toggleAuto() {
    this.isAuto = !this.isAuto;
    const btn = document.getElementById('btn-auto');
    btn.textContent = this.isAuto ? '自动:开' : '自动';
    if (this.isAuto) {
      btn.style.color = 'rgba(200,180,240,0.9)';
      if (!this.isTyping) this.scheduleAutoAdvance();
    } else {
      btn.style.color = '';
      if (this.autoTimer) clearTimeout(this.autoTimer);
    }
  }

  toggleSkip() {
    this.isSkipping = !this.isSkipping;
    const btn = document.getElementById('btn-skip');
    btn.textContent = this.isSkipping ? '快进:开' : '快进';
    if (this.isSkipping) {
      btn.style.color = 'rgba(200,180,240,0.9)';
      this.clearTyping();
      // Skip current line
      const cmd = this.script[this.currentLine];
      if (cmd && (cmd.type === 'dialogue' || cmd.type === 'narration' || cmd.type === 'thought')) {
        if (cmd.text) document.getElementById('dialogue-text').textContent = cmd.text;
      }
    } else {
      btn.style.color = '';
    }
  }

  // === Save/Load ===
  saveGame(slot) {
    const data = {
      line: this.currentLine,
      flags: { ...this.flags },
      history: [...this.history].slice(-50),
      date: new Date().toLocaleString('zh-CN'),
      preview: this.getSavePreview()
    };
    this.saveSlots[slot] = data;
    localStorage.setItem('vn_saves_' + slot, JSON.stringify(data));
    this.refreshSaveSlots(true);
  }

  loadGame(slot) {
    const data = this.saveSlots[slot];
    if (!data) return;
    this.flags = { ...data.flags };
    this.history = [...data.history];
    this.hideAllCharacters();
    this.stopRain();
    this.clearTyping();
    this.isAuto = false;
    this.isSkipping = false;
    document.getElementById('btn-auto').textContent = '自动';
    document.getElementById('btn-skip').textContent = '快进';
    document.getElementById('save-panel').classList.add('hidden');
    document.getElementById('text-box').classList.remove('dim');
    this.showScreen('game-screen');
    this.runLine(data.line);
  }

  getSavePreview() {
    for (let i = this.currentLine; i >= 0; i--) {
      const cmd = this.script[i];
      if (cmd && (cmd.type === 'dialogue' || cmd.type === 'narration')) {
        const preview = cmd.text || '';
        return preview.length > 30 ? preview.substring(0, 30) + '...' : preview;
      }
    }
    return '——';
  }

  loadSaveData() {
    for (let i = 0; i < 9; i++) {
      const raw = localStorage.getItem('vn_saves_' + i);
      if (raw) {
        try { this.saveSlots[i] = JSON.parse(raw); } catch(e) { this.saveSlots[i] = null; }
      }
    }
  }

  refreshSaveSlots(isSave) {
    const container = document.getElementById('save-slots');
    container.innerHTML = '';
    document.getElementById('save-panel-title').textContent = isSave ? '保存进度' : '读取进度';

    for (let i = 0; i < 9; i++) {
      const slot = document.createElement('div');
      slot.className = 'save-slot';
      const data = this.saveSlots[i];
      slot.innerHTML = `
        <span class="slot-num">No.${i + 1}</span>
        <span class="slot-info">${data ? data.preview : '—— 空 ——'}</span>
        <span class="slot-date">${data ? data.date : ''}</span>
      `;
      slot.addEventListener('click', () => {
        if (isSave) this.saveGame(i);
        else this.loadGame(i);
      });
      container.appendChild(slot);
    }
  }

  showSavePanel() {
    this.refreshSaveSlots(true);
    document.getElementById('save-panel').classList.remove('hidden');
  }

  showLoadPanel() {
    this.refreshSaveSlots(false);
    document.getElementById('save-panel').classList.remove('hidden');
  }

  hideSavePanel() {
    document.getElementById('save-panel').classList.add('hidden');
  }

  // === History ===
  showHistory() {
    const content = document.getElementById('history-content');
    content.innerHTML = this.history.map(h => {
      if (h.speaker) {
        return `<div class="history-speaker">—— ${h.speaker}</div><div>${h.text}</div>`;
      }
      return `<div style="opacity:0.7; font-style:italic;">${h.text}</div>`;
    }).join('');
    document.getElementById('history-panel').classList.remove('hidden');
  }

  hideHistory() {
    document.getElementById('history-panel').classList.add('hidden');
  }

  // === Settings ===
  showSettings() {
    document.getElementById('settings-panel').classList.remove('hidden');
  }

  hideSettings() {
    document.getElementById('settings-panel').classList.add('hidden');
  }

  // === Ending ===
  showEnding(type) {
    this.clearTyping();
    this.stopRain();
    this.hideAllCharacters();
    this.showScreen('ending-screen');

    const endings = {
      'true': { title: '渡', sub: '我的世界不止一种颜色了。\n\n—— 你是我藏在教案下的一场大雨 ——' },
      'good': { title: '光', sub: '有些相遇不是结果，是转折。\n笔记本上的那些字，已经说完了所有能说的话。' },
      'bad': { title: '沉', sub: '这不是结局。这是选择的重量。\n那个对你说"这个世界不止一种颜色"的人，还站在原处。' },
      'hidden': { title: '雨', sub: '那场雨没有停。\n他把教案翻开，里面是干的。' },
      'default': { title: '终', sub: '故事到此结束。\n感谢您的阅读。' }
    };

    const e = endings[type] || endings['default'];
    document.getElementById('ending-title').textContent = e.title;
    document.getElementById('ending-subtitle').textContent = e.sub;

    // Track unlocked endings
    if (type !== 'default') {
      this.unlockedEndings[type] = true;
      try { localStorage.setItem('vn_endings', JSON.stringify(this.unlockedEndings)); } catch(e) {}
    }
  }

  // === Transition ===
  transition(effect, callback) {
    const el = document.getElementById('game-screen');
    if (effect === 'fade') {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.6s ease';
      setTimeout(() => {
        if (callback) callback();
        el.style.opacity = '1';
      }, 600);
    } else if (effect === 'flash') {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.15s ease';
      setTimeout(() => { el.style.opacity = '1'; if (callback) callback(); }, 150);
    } else {
      if (callback) callback();
    }
  }

  // === Start Game ===
  start() {
    this.flags = {};
    this.history = [];
    this.currentChoices = [];
    this.routeName = '';
    document.getElementById('route-indicator').textContent = '';
    this.hideAllCharacters();
    this.stopRain();
    this.isAuto = false;
    this.isSkipping = false;
    document.getElementById('btn-auto').textContent = '自动';
    document.getElementById('btn-skip').textContent = '快进';
    document.getElementById('text-box').classList.remove('dim');
    this.showScreen('game-screen');
    this.runLine(0);
  }

  loadUnlockedEndings() {
    try {
      const raw = localStorage.getItem('vn_endings');
      if (raw) this.unlockedEndings = JSON.parse(raw);
    } catch(e) { this.unlockedEndings = {}; }
  }

  showSceneTitle(title) {
    // Flash a scene title overlay
    const overlay = document.getElementById('scene-overlay');
    if (!overlay) return;
    overlay.textContent = title;
    overlay.style.opacity = '1';
    overlay.style.transition = 'none';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.fontSize = '24px';
    overlay.style.color = 'rgba(255,255,255,0.7)';
    overlay.style.letterSpacing = '0.2em';
    setTimeout(() => {
      overlay.style.transition = 'opacity 1s ease';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        overlay.textContent = '';
        overlay.style.fontSize = '';
        overlay.style.color = '';
      }, 1000);
    }, 1500);
  }
}

// Export
window.VNEngine = VNEngine;
