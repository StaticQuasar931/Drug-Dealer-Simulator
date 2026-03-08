window.DDS = window.DDS || {};
(function () {
  function el(id) { return document.getElementById(id); }

  DDS.ui = {
    nodes: {
      production: {}, workers: {}, districts: {}, fronts: {}, upgrades: {}, achievements: {}
    },
    displayValues: {
      dirtyMoney: 0,
      cleanMoney: 0,
      lifetimeSales: 0,
      lifetimeLaundered: 0
    },

    bind() {
      el('saveBtn').addEventListener('click', () => DDS.save.manualSave());
      el('loadBtn').addEventListener('click', () => {
        DDS.save.loadOrFresh(DDS.state.currentSlot);
        this.buildStaticCards();
        this.notify(`Loaded slot ${DDS.state.currentSlot}.`);
        this.renderAll();
      });
      el('slotSelect').addEventListener('change', (e) => DDS.save.switchToSlot(e.target.value));
      el('settingsBtn').addEventListener('click', () => el('settingsModal').classList.add('active'));
      el('settingsClose').addEventListener('click', () => el('settingsModal').classList.remove('active'));

      el('runDealBtn').addEventListener('click', () => DDS.game.runStreetDeal());
      el('sellAllBtn').addEventListener('click', () => DDS.production.sellAll());
      el('launderBtn').addEventListener('click', () => DDS.laundering.manualLaunder());
      el('layLowBtn').addEventListener('click', () => {
        DDS.state.layLowUntil = Date.now() + 20000;
        this.notify('Laying low for 20s. Heat falls faster.');
      });

      el('graphicsSelect').addEventListener('change', (e) => {
        DDS.state.settings.graphicsQuality = e.target.value;
        DDS.settings.applyToDocument();
      });
      el('animationRange').addEventListener('input', (e) => {
        DDS.state.settings.animationIntensity = Number(e.target.value);
        DDS.settings.applyToDocument();
      });
      el('scaleRange').addEventListener('input', (e) => {
        DDS.state.settings.resolutionScale = Number(e.target.value);
        DDS.settings.applyToDocument();
      });
      el('volumeRange').addEventListener('input', (e) => {
        DDS.state.settings.soundVolume = Number(e.target.value);
      });
      el('musicToggle').addEventListener('change', (e) => {
        DDS.state.settings.musicOn = Boolean(e.target.checked);
        DDS.settings.applyToDocument();
      });

      el('continueBtn').addEventListener('click', () => {
        if (el('dontShowAgain').checked) localStorage.setItem('dds2_warning_ack', '1');
        el('contentWarning').classList.remove('active');
      });
      el('learnMoreBtn').addEventListener('click', () => el('learnMoreCopy').classList.toggle('hidden'));

      el('adminClose').addEventListener('click', () => el('adminPanel').classList.remove('active'));
      document.querySelectorAll('[data-admin]').forEach((btn) => {
        btn.addEventListener('click', () => DDS.game.adminAction(btn.dataset.admin));
      });

      document.querySelectorAll('[data-toggle-panel]').forEach((btn) => {
        btn.addEventListener('click', () => DDS.game.togglePanel(btn.dataset.togglePanel));
      });

      const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'KeyL', 'KeyA'];
      const input = [];
      window.addEventListener('keydown', (e) => {
        input.push(e.code);
        if (input.length > seq.length) input.shift();
        if (seq.every((code, i) => input[i] === code)) {
          el('adminPanel').classList.add('active');
          this.notify('Admin panel unlocked.');
        }
      });
    },

    money(v) { return `$${Math.floor(v).toLocaleString('en-US')}`; },

    smoothValue(key, target, rate) {
      const current = this.displayValues[key] || 0;
      const next = current + (target - current) * rate;
      this.displayValues[key] = Math.abs(target - next) < 0.6 ? target : next;
      return this.displayValues[key];
    },

    log(msg) {
      const d = document.createElement('div');
      d.textContent = `${new Date().toLocaleTimeString()} - ${msg}`;
      const panel = el('logPanel');
      panel.prepend(d);
      while (panel.children.length > 120) panel.removeChild(panel.lastChild);
    },

    notify(msg, type) {
      const n = document.createElement('div');
      n.className = 'note';
      if (type === 'warn') n.style.background = 'rgba(145,35,53,0.34)';
      n.textContent = msg;
      el('notificationStack').prepend(n);
      setTimeout(() => n.remove(), 3800);
    },

    deviceLabel() {
      const w = window.innerWidth;
      if (w <= 620) return 'Mobile';
      if (w <= 1100) return 'Tablet';
      return 'Desktop';
    },

    updateSlotOptions() {
      const select = el('slotSelect');
      [1, 2, 3].forEach((slot) => {
        const meta = DDS.save.slotMeta(slot);
        const op = select.querySelector(`option[value="${slot}"]`);
        if (!op) return;
        op.textContent = meta.empty
          ? `Slot ${slot} (Empty)`
          : `Slot ${slot} (${this.money(meta.lifetimeSales)} sales)`;
      });
      select.value = String(DDS.state.currentSlot);
    },

    buildStaticCards() {
      this.buildProductionCards();
      this.buildWorkerCards();
      this.buildDistrictCards();
      this.buildFrontCards();
      this.buildUpgradeCards();
      this.buildAchievementCards();
      this.updateSlotOptions();
    },

    buildProductionCards() {
      const wrap = el('productionList');
      wrap.innerHTML = '';
      this.nodes.production = {};
      DDS.data.items.forEach((item) => {
        const c = document.createElement('div');
        c.className = 'card';
        const icon = document.createElement('img');
        icon.className = 'product-icon';
        icon.src = item.icon;
        icon.alt = `${item.name} icon`;
        const name = document.createElement('div');
        name.className = 'title';
        const nameWrap = document.createElement('div');
        nameWrap.className = 'name-wrap';
        nameWrap.append(icon, name);
        const stock = document.createElement('span');
        stock.className = 'stat-chip';
        const row = document.createElement('div');
        row.className = 'row';
        row.append(nameWrap, stock);
        const stats = document.createElement('div');
        stats.className = 'desc';
        const market = document.createElement('div');
        market.className = 'desc';
        const progWrap = document.createElement('div');
        progWrap.className = 'progress';
        const prog = document.createElement('div');
        progWrap.appendChild(prog);
        const btn = document.createElement('button');
        c.append(row, stats, market, progWrap, btn);
        wrap.appendChild(c);
        this.nodes.production[item.id] = { c, name, stock, stats, market, prog, btn, unlock: null };
      });
    },

    buildWorkerCards() {
      const wrap = el('workersList');
      wrap.innerHTML = '';
      this.nodes.workers = {};
      DDS.data.workers.forEach((w) => {
        const c = document.createElement('div'); c.className = 'card';
        const row = document.createElement('div'); row.className = 'row';
        const left = document.createElement('div'); left.className = 'worker-row';
        const face = document.createElement('img'); face.className = 'worker-face'; face.src = w.portrait; face.alt = `${w.name} portrait`;
        const title = document.createElement('div'); title.className = 'title'; title.textContent = w.name;
        left.append(face, title);
        const chip = document.createElement('span'); chip.className = 'stat-chip';
        row.append(left, chip);
        const desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = w.desc;
        const lock = document.createElement('div'); lock.className = 'desc';
        const btn = document.createElement('button');
        c.append(row, desc, lock, btn);
        wrap.appendChild(c);
        this.nodes.workers[w.id] = { chip, lock, btn };
      });
    },

    buildDistrictCards() {
      const wrap = el('districtList');
      wrap.innerHTML = '';
      this.nodes.districts = {};
      DDS.data.districts.forEach((d) => {
        const c = document.createElement('div'); c.className = 'card';
        c.innerHTML = `<div class="row"><div class="title">${d.name}</div><span class="stat-chip">x${d.saleBonus.toFixed(2)}</span></div><div class="desc">${d.desc}</div>`;
        const btn = document.createElement('button');
        c.appendChild(btn);
        wrap.appendChild(c);
        this.nodes.districts[d.id] = { btn };
      });
    },

    buildFrontCards() {
      const wrap = el('frontList');
      wrap.innerHTML = '';
      this.nodes.fronts = {};
      DDS.laundering.fronts.forEach((f) => {
        const c = document.createElement('div'); c.className = 'card';
        c.innerHTML = `<div class="row"><div class="title">${f.name}</div><span class="stat-chip">${f.efficiency}</span></div><div class="desc">Rate ${f.rate}/s | Heat relief ${f.heatDrop}</div><div class="desc">${f.desc}</div>`;
        const lock = document.createElement('div'); lock.className = 'desc';
        const btn = document.createElement('button');
        c.append(lock, btn);
        wrap.appendChild(c);
        this.nodes.fronts[f.id] = { lock, btn };
      });
    },

    buildUpgradeCards() {
      const wrap = el('upgradesList');
      wrap.innerHTML = '';
      this.nodes.upgrades = {};
      DDS.data.upgrades.forEach((u) => {
        const c = document.createElement('div'); c.className = 'card';
        const head = document.createElement('div'); head.className = 'row';
        const title = document.createElement('div'); title.className = 'title'; title.textContent = u.name;
        const level = document.createElement('span'); level.className = 'stat-chip';
        head.append(title, level);
        const desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = u.desc;
        const lock = document.createElement('div'); lock.className = 'desc';
        const btn = document.createElement('button');
        c.append(head, desc, lock, btn);
        wrap.appendChild(c);
        this.nodes.upgrades[u.id] = { level, lock, btn };
      });
    },

    buildAchievementCards() {
      const wrap = el('achievementsList');
      wrap.innerHTML = '';
      this.nodes.achievements = {};
      DDS.data.achievements.forEach((a) => {
        const c = document.createElement('div'); c.className = 'card';
        const row = document.createElement('div'); row.className = 'row';
        const title = document.createElement('div'); title.className = 'title'; title.textContent = a.name;
        const chip = document.createElement('span'); chip.className = 'stat-chip';
        row.append(title, chip);
        const desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = a.desc;
        c.append(row, desc);
        wrap.appendChild(c);
        this.nodes.achievements[a.id] = { chip };
      });
    },

    applyPanelState(panelId) {
      const panel = document.querySelector(`[data-panel="${panelId}"]`);
      if (!panel) return;
      const collapsed = !!DDS.state.panelState[panelId];
      panel.classList.toggle('collapsed', collapsed);
      const button = panel.querySelector(`[data-toggle-panel="${panelId}"]`);
      if (button) {
        button.textContent = collapsed ? 'Show' : 'Hide';
        button.setAttribute('aria-expanded', String(!collapsed));
      }
    },

    updateSystemVisibility() {
      const st = DDS.state;
      document.querySelectorAll('[data-system]').forEach((panel) => {
        const system = panel.dataset.system;
        const unlocked = !!st.systems[system];
        panel.classList.toggle('hidden-panel', !unlocked);
      });

      const nextSystem = Object.entries(DDS.progression.systems)
        .filter(([, cost]) => st.lifetimeSales < cost)
        .sort((a, b) => a[1] - b[1])[0];

      if (nextSystem) {
        const [name, cost] = nextSystem;
        const labelMap = {
          production: 'Products',
          workers: 'Crew',
          districts: 'Districts',
          fronts: 'Laundering Fronts',
          upgrades: 'Upgrades',
          events: 'Market Events'
        };
        el('dealerHint').textContent = `Current focus: build street cash. Next unlock: ${labelMap[name]} at ${this.money(cost)} lifetime sales.`;
      } else {
        el('dealerHint').textContent = 'All systems unlocked. Focus on efficiency and risk management.';
      }

      el('productionHint').textContent = 'Build inventory lines from weed to advanced products.';
      el('workersHint').textContent = 'Recruit a specialized crew to automate and stabilize operations.';
      el('districtHint').textContent = 'Unlock districts for stronger route multipliers.';
      el('frontHint').textContent = 'Use fronts to convert dirty cash with different tradeoffs.';
      el('upgradeHint').textContent = 'Upgrade carefully to scale without overheating.';

      Object.keys(st.panelState).forEach((panelId) => this.applyPanelState(panelId));

      const visibleSystemPanels = document.querySelectorAll('[data-system]:not(.hidden-panel)').length;
      const board = el('boardRoot');
      board.classList.toggle('early-layout', visibleSystemPanels <= 1);

    },

    renderAll() {
      const st = DDS.state;
      const dirtyDisplay = this.smoothValue('dirtyMoney', st.dirtyMoney, 0.3);
      const cleanDisplay = this.smoothValue('cleanMoney', st.cleanMoney, 0.3);
      const salesDisplay = this.smoothValue('lifetimeSales', st.lifetimeSales, 0.2);
      const launderDisplay = this.smoothValue('lifetimeLaundered', st.lifetimeLaundered, 0.2);

      el('dirtyMoney').textContent = this.money(dirtyDisplay);
      el('cleanMoney').textContent = this.money(cleanDisplay);
      el('demand').textContent = `${st.demandIndex.toFixed(2)}x`;
      el('heatPercent').textContent = `${st.heat.toFixed(1)}%`;
      el('heatBar').style.width = `${Math.min(100, st.heat)}%`;
      el('heatStage').textContent = DDS.game.heatStage();
      el('heatStage').className = DDS.game.heatClass();
      el('eventBanner').textContent = st.activeEvent ? `${st.activeEvent.name}: ${st.activeEvent.desc}` : 'No active event.';
      el('deviceType').textContent = this.deviceLabel();
      el('lifetimeSales').textContent = this.money(salesDisplay);
      el('lifetimeLaundered').textContent = this.money(launderDisplay);
      el('dealerRank').textContent = `Dealer Rank: ${st.dealer.rank}`;

      const cooldownMs = Math.max(0, st.dealer.cooldownUntil - Date.now());
      el('dealerCooldown').textContent = cooldownMs > 0
        ? `Deal Cooldown: ${(cooldownMs / 1000).toFixed(1)}s`
        : 'Deal Cooldown: Ready';
      el('runDealBtn').disabled = cooldownMs > 0;

      const progressMax = 450000;
      const pct = Math.min(100, (st.lifetimeSales / progressMax) * 100);
      el('slotProgressBar').style.width = `${pct}%`;
      el('slotProgressText').textContent = `Slot ${st.currentSlot} progression: ${pct.toFixed(1)}%`;

      this.updateSystemVisibility();
      this.updateSlotOptions();

      this.renderProduction();
      this.renderWorkers();
      this.renderDistricts();
      this.renderFronts();
      this.renderUpgrades();
      this.renderAchievements();
    },

    renderProduction() {
      DDS.data.items.forEach((item) => {
        const node = this.nodes.production[item.id];
        const unlocked = DDS.state.unlockedItems[item.id];
        node.name.textContent = `${item.emoji} ${item.name}`;
        node.stock.textContent = `${DDS.state.inventory[item.id] || 0} in stock`;
        node.stats.textContent = `Time ${item.baseTime}s | Base ${this.money(item.baseValue)} | Heat ${item.baseHeat.toFixed(2)}`;
        node.market.textContent = `Market ${this.money(DDS.economy.unitPrice(item))}`;
        node.prog.style.width = `${Math.min(100, (DDS.state.prodProgress[item.id] || 0) * 100)}%`;

        if (node.unlock !== unlocked) {
          node.btn.replaceWith(node.btn.cloneNode(true));
          node.btn = node.c.querySelector('button:last-child');
          if (unlocked) {
            node.btn.textContent = 'Produce';
            node.btn.addEventListener('click', () => DDS.production.clickProduce(item.id));
          } else {
            node.btn.textContent = `Unlock ${this.money(item.unlockCost)}`;
            node.btn.addEventListener('click', () => DDS.game.unlockItem(item.id));
          }
          node.unlock = unlocked;
        } else if (!unlocked) {
          node.btn.textContent = `Unlock ${this.money(item.unlockCost)}`;
        }
        node.btn.disabled = !DDS.state.systems.production;
      });
    },

    renderWorkers() {
      DDS.data.workers.forEach((w) => {
        const n = this.nodes.workers[w.id];
        const req = DDS.workers.unlockRequirement(w.id);
        const unlocked = DDS.workers.isUnlocked(w.id);
        const count = DDS.state.workers[w.id] || 0;
        const cost = DDS.workers.cost(w.id);
        n.chip.textContent = `${count}`;
        n.lock.textContent = unlocked ? 'Unlocked' : `Unlock at ${this.money(req)} lifetime sales`;
        n.btn.textContent = `Hire ${this.money(cost)}`;
        n.btn.disabled = !unlocked;
        n.btn.onclick = () => DDS.workers.hire(w.id);
      });
    },

    renderDistricts() {
      DDS.data.districts.forEach((d) => {
        const n = this.nodes.districts[d.id];
        const has = DDS.state.unlockedDistricts.includes(d.id);
        n.btn.textContent = has ? 'Owned' : `Unlock ${this.money(d.unlockCost)}`;
        n.btn.disabled = has || !DDS.state.systems.districts;
        n.btn.onclick = () => DDS.map.unlock(d.id);
      });
    },

    renderFronts() {
      DDS.laundering.fronts.forEach((f) => {
        const n = this.nodes.fronts[f.id];
        const has = !!DDS.state.frontsOwned[f.id];
        const unlocked = DDS.laundering.isUnlocked(f.id);
        const req = DDS.laundering.unlockRequirement(f.id);
        n.lock.textContent = unlocked ? 'Unlocked' : `Unlock at ${this.money(req)} lifetime sales`;
        n.btn.textContent = has ? 'Owned' : `Buy ${this.money(f.cost)}`;
        n.btn.disabled = has || !unlocked;
        n.btn.onclick = () => DDS.laundering.buy(f.id);
      });
    },

    renderUpgrades() {
      DDS.data.upgrades.forEach((u) => {
        const n = this.nodes.upgrades[u.id];
        const level = DDS.state.upgrades[u.id] || 0;
        const cost = Math.floor(u.baseCost * Math.pow(u.costGrowth, level));
        const req = DDS.progression.upgrades[u.id] || 0;
        const unlocked = DDS.state.systems.upgrades && DDS.state.lifetimeSales >= req;
        n.level.textContent = `Lv ${level}/${u.maxLevel}`;
        n.lock.textContent = unlocked ? 'Unlocked' : `Unlock at ${this.money(req)} lifetime sales`;
        n.btn.textContent = level >= u.maxLevel ? 'Maxed' : `Upgrade ${this.money(cost)}`;
        n.btn.disabled = level >= u.maxLevel || !unlocked;
        n.btn.onclick = () => DDS.game.buyUpgrade(u.id);
      });
    },

    renderAchievements() {
      DDS.data.achievements.forEach((a) => {
        const done = DDS.state.completedAchievements.includes(a.id);
        this.nodes.achievements[a.id].chip.textContent = done ? 'Done' : 'Open';
      });
    }
  };
})();


