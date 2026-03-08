window.DDS = window.DDS || {};
(function () {
  function el(id) { return document.getElementById(id); }

  DDS.ui = {
    nodes: {
      market: {},
      production: {},
      workers: {},
      districts: {},
      fronts: {},
      upgrades: {},
      achievements: {}
    },

    displayValues: {
      dirtyMoney: 0,
      cleanMoney: 0,
      lifetimeSales: 0,
      lifetimeLaundered: 0
    },

    dealOptionStamp: '',

    resetDisplays() {
      this.displayValues.dirtyMoney = DDS.state.dirtyMoney || 0;
      this.displayValues.cleanMoney = DDS.state.cleanMoney || 0;
      this.displayValues.lifetimeSales = DDS.state.lifetimeSales || 0;
      this.displayValues.lifetimeLaundered = DDS.state.lifetimeLaundered || 0;
    },
    isTypingTarget(target) {
      if (!target) return false;
      const tag = (target.tagName || '').toLowerCase();
      return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
    },

    openSettings() {
      el('settingsModal').classList.add('active');
      this.renderSettingsSnapshot();
    },

    closeSettings() {
      el('settingsModal').classList.remove('active');
    },

    closeMenus() {
      el('settingsModal').classList.remove('active');
      el('adminPanel').classList.remove('active');
      el('contentWarning').classList.remove('active');
    },    bind() {
      const saveBtn = el('saveBtn');
      const loadBtn = el('loadBtn');
      const slotSelect = el('slotSelect');
      const settingsBtn = el('settingsBtn');
      const settingsClose = el('settingsClose');

      saveBtn.addEventListener('click', () => DDS.save.manualSave());
      loadBtn.addEventListener('click', () => {
        DDS.save.loadOrFresh(DDS.state.currentSlot);
        DDS.settings.applyToDocument();
        this.resetDisplays();
        this.buildStaticCards();
        this.notify(`Loaded slot ${DDS.state.currentSlot}.`);
        this.renderAll();
      });
      slotSelect.addEventListener('change', (e) => DDS.save.switchToSlot(e.target.value));

      settingsBtn.addEventListener('click', () => this.openSettings());
      settingsClose.addEventListener('click', () => this.closeSettings());

      el('runDealBtn').addEventListener('click', () => DDS.game.runStreetDeal());
      el('sellAllBtn').addEventListener('click', () => DDS.production.sellAll());
      el('launderBtn').addEventListener('click', () => DDS.laundering.manualLaunder());
      el('layLowBtn').addEventListener('click', () => {
        DDS.state.layLowUntil = Date.now() + 20000;
        this.notify('Laying low for 20 seconds. Product movement paused.');
      });

      el('dealProductSelect').addEventListener('change', (e) => {
        DDS.game.selectDealItem(e.target.value);
        this.renderDealState();
      });

      el('themeSelect').addEventListener('change', (e) => {
        DDS.state.settings.theme = e.target.value;
        DDS.settings.applyToDocument();
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
      });

      el('resetSlotBtn').addEventListener('click', () => {
        const slot = Number(el('resetSlotSelect').value);
        DDS.save.resetSlot(slot);
      });
      el('resetAllSlotsBtn').addEventListener('click', () => DDS.save.resetAllSlots());

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

      ['settingsModal', 'adminPanel', 'contentWarning'].forEach((id) => {
        const node = el(id);
        node.addEventListener('click', (evt) => {
          if (evt.target !== node) return;
          node.classList.remove('active');
        });
      });

      const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'KeyL', 'KeyA'];
      const input = [];
      window.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        input.push(e.code);
        if (input.length > seq.length) input.shift();
        if (seq.every((code, i) => input[i] === code)) {
          el('adminPanel').classList.add('active');
          this.notify('Debug panel available.');
        }

        if (e.code === 'Escape') {
          e.preventDefault();
          if (el('settingsModal').classList.contains('active') || el('adminPanel').classList.contains('active') || el('contentWarning').classList.contains('active')) {
            this.closeMenus();
          } else {
            this.openSettings();
          }
          return;
        }

        if (e.code === 'KeyE') {
          e.preventDefault();
          this.closeMenus();
          return;
        }

        if (this.isTypingTarget(e.target)) return;

        if (e.code === 'Space') {
          e.preventDefault();
          DDS.game.runStreetDeal();
          return;
        }
        if (e.code === 'KeyS') {
          e.preventDefault();
          DDS.production.sellAll();
          return;
        }
        if (e.code === 'KeyL') {
          e.preventDefault();
          DDS.state.layLowUntil = Date.now() + 20000;
          this.notify('Laying low for 20 seconds. Product movement paused.');
          return;
        }

        const m = e.code.match(/^Digit([1-9])$/);
        if (m) {
          const idx = Number(m[1]) - 1;
          const unlocked = DDS.data.items.filter((item) => DDS.production.isMarketUnlocked(item.id));
          const pick = unlocked[idx];
          if (!pick) return;
          const qty = e.shiftKey ? 10 : 1;
          DDS.production.buySupply(pick.id, qty);
        }
      });

      document.querySelectorAll('[data-tip]').forEach((node) => node.classList.add('tip'));
    },

    money(v) {
      return `$${Math.floor(v).toLocaleString('en-US')}`;
    },    smoothValue(key, target, rate) {
      const current = this.displayValues[key] || 0;
      const diff = target - current;
      if (Math.abs(diff) < 1) {
        this.displayValues[key] = target;
        return target;
      }
      const step = Math.max(1, Math.floor(Math.abs(diff) * rate));
      this.displayValues[key] = current + Math.sign(diff) * step;
      if ((diff > 0 && this.displayValues[key] > target) || (diff < 0 && this.displayValues[key] < target)) {
        this.displayValues[key] = target;
      }
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
      if (type === 'warn') n.classList.add('warn-note');
      n.textContent = msg;
      el('notificationStack').prepend(n);
      setTimeout(() => n.remove(), 3600);
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
      el('resetSlotSelect').value = String(DDS.state.currentSlot);
    },

    buildStaticCards() {
      this.buildMarketRows();
      this.buildProductionCards();
      this.buildWorkerCards();
      this.buildDistrictCards();
      this.buildFrontCards();
      this.buildUpgradeCards();
      this.buildAchievementCards();
      this.updateDealSelector(true);
      this.updateSlotOptions();
    },

    buildMarketRows() {
      const wrap = el('streetMarketList');
      wrap.innerHTML = '';
      this.nodes.market = {};

      DDS.data.items.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'market-row';

        const product = document.createElement('div');
        product.className = 'market-product';
        const icon = document.createElement('img');
        icon.src = item.icon;
        icon.alt = `${item.name} icon`;
        icon.className = 'product-icon';
        const txt = document.createElement('span');
        txt.textContent = `${item.emoji} ${item.name}`;
        product.append(icon, txt);

        const cost = document.createElement('span');
        const bulk = document.createElement('span');
        const retail = document.createElement('span');

        const buyGroup = document.createElement('div');
        buyGroup.className = 'buy-group';
        const buyOne = document.createElement('button');
        buyOne.textContent = '+1';
        buyOne.dataset.tip = 'Buy 1 unit of supply';
        buyOne.className = 'tip';

        const buyTen = document.createElement('button');
        buyTen.textContent = '+10';
        buyTen.dataset.tip = 'Buy 10 units with a bulk discount';
        buyTen.className = 'tip';

        buyGroup.append(buyOne, buyTen);
        row.append(product, cost, bulk, retail, buyGroup);
        wrap.appendChild(row);

        buyOne.addEventListener('click', () => DDS.production.buySupply(item.id, 1));
        buyTen.addEventListener('click', () => DDS.production.buySupply(item.id, 10));

        this.nodes.market[item.id] = { row, product, txt, cost, bulk, retail, buyOne, buyTen };
      });
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
        const lock = document.createElement('div');
        lock.className = 'desc';

        const progWrap = document.createElement('div');
        progWrap.className = 'progress';
        const prog = document.createElement('div');
        progWrap.appendChild(prog);

        const btn = document.createElement('button');
        btn.className = 'tip';

        c.append(row, stats, lock, progWrap, btn);
        wrap.appendChild(c);

        this.nodes.production[item.id] = { c, name, stock, stats, lock, prog, btn };
      });
    },

    buildWorkerCards() {
      const wrap = el('workersList');
      wrap.innerHTML = '';
      this.nodes.workers = {};
      DDS.data.workers.forEach((w) => {
        const c = document.createElement('div');
        c.className = 'card';

        const row = document.createElement('div');
        row.className = 'row';
        const left = document.createElement('div');
        left.className = 'worker-row';
        const face = document.createElement('img');
        face.className = 'worker-face';
        face.src = w.portrait;
        face.alt = `${w.name} portrait`;
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = w.name;
        left.append(face, title);

        const chip = document.createElement('span');
        chip.className = 'stat-chip';
        row.append(left, chip);

        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.textContent = w.desc;

        const lock = document.createElement('div');
        lock.className = 'desc';

        const btn = document.createElement('button');
        btn.className = 'tip';

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
        const c = document.createElement('div');
        c.className = 'card';

        const row = document.createElement('div');
        row.className = 'row';
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = d.name;
        const chip = document.createElement('span');
        chip.className = 'stat-chip';
        chip.textContent = `x${d.saleBonus.toFixed(2)}`;
        row.append(title, chip);

        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.textContent = d.desc;

        const btn = document.createElement('button');
        btn.className = 'tip';

        c.append(row, desc, btn);
        wrap.appendChild(c);
        this.nodes.districts[d.id] = { btn };
      });
    },

    buildFrontCards() {
      const wrap = el('frontList');
      wrap.innerHTML = '';
      this.nodes.fronts = {};
      DDS.laundering.fronts.forEach((f) => {
        const c = document.createElement('div');
        c.className = 'card';

        const row = document.createElement('div');
        row.className = 'row';
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = f.name;
        const chip = document.createElement('span');
        chip.className = 'stat-chip';
        chip.textContent = `${Math.round(f.efficiency * 100)}%`;
        row.append(title, chip);

        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.textContent = `Rate ${f.rate}/s | Heat relief ${f.heatDrop}`;

        const lock = document.createElement('div');
        lock.className = 'desc';

        const btn = document.createElement('button');
        btn.className = 'tip';

        c.append(row, desc, lock, btn);
        wrap.appendChild(c);
        this.nodes.fronts[f.id] = { lock, btn };
      });
    },

    buildUpgradeCards() {
      const wrap = el('upgradesList');
      wrap.innerHTML = '';
      this.nodes.upgrades = {};

      DDS.data.upgrades.forEach((u) => {
        const c = document.createElement('div');
        c.className = 'card';
        const head = document.createElement('div');
        head.className = 'row';
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = u.name;
        const level = document.createElement('span');
        level.className = 'stat-chip';
        head.append(title, level);

        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.textContent = u.desc;

        const lock = document.createElement('div');
        lock.className = 'desc';

        const btn = document.createElement('button');
        btn.className = 'tip';

        c.append(head, desc, lock, btn);
        wrap.appendChild(c);
        this.nodes.upgrades[u.id] = { level, lock, btn };
      });
    },

    buildAchievementCards() {
      const wrap = el('settingsAchievementsList');
      wrap.innerHTML = '';
      this.nodes.achievements = {};

      DDS.data.achievements.forEach((a) => {
        const c = document.createElement('div');
        c.className = 'card';

        const row = document.createElement('div');
        row.className = 'row';
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = a.name;
        const chip = document.createElement('span');
        chip.className = 'stat-chip';
        row.append(title, chip);

        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.textContent = a.desc;

        c.append(row, desc);
        wrap.appendChild(c);
        this.nodes.achievements[a.id] = { c, chip };
      });
    },

    updateDealSelector(force) {
      const select = el('dealProductSelect');
      const items = DDS.data.items.filter((item) => DDS.production.isMarketUnlocked(item.id));
      const stamp = items.map((x) => x.id).join('|');

      if (force || stamp !== this.dealOptionStamp) {
        const selectedBefore = DDS.state.dealer.selectedItemId;
        select.innerHTML = '';

        items.forEach((item) => {
          const op = document.createElement('option');
          op.value = item.id;
          op.textContent = `${item.emoji} ${item.name}`;
          select.appendChild(op);
        });

        if (items.length === 0) return;
        const stillValid = items.some((item) => item.id === selectedBefore);
        DDS.state.dealer.selectedItemId = stillValid ? selectedBefore : items[0].id;
        this.dealOptionStamp = stamp;
      }

      if (DDS.state.dealer.selectedItemId) {
        select.value = DDS.state.dealer.selectedItemId;
      }
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
    nextMilestone() {
      const st = DDS.state;
      const targets = [];

      Object.entries(DDS.progression.systems).forEach(([key, cost]) => {
        if (st.systems[key]) return;
        targets.push({ label: `System: ${key}`, cost });
      });

      Object.entries(DDS.progression.marketItems).forEach(([id, cost]) => {
        if (st.lifetimeSales >= cost) return;
        const item = DDS.data.items.find((x) => x.id === id);
        targets.push({ label: `Market: ${item.name}`, cost });
      });

      Object.entries(DDS.progression.upgrades).forEach(([id, cost]) => {
        if (st.lifetimeSales >= cost) return;
        const u = DDS.data.upgrades.find((x) => x.id === id);
        targets.push({ label: `Upgrade: ${u.name}`, cost });
      });

      targets.sort((a, b) => a.cost - b.cost);
      return targets[0] || null;
    },    updateSystemVisibility() {
      const st = DDS.state;
      document.querySelectorAll('[data-system]').forEach((panel) => {
        const system = panel.dataset.system;
        const unlocked = !!st.systems[system];
        panel.classList.toggle('hidden-panel', !unlocked);
      });

      const now = Date.now();
      const layLowLeft = Math.max(0, st.layLowUntil - now);
      const milestone = this.nextMilestone();
      let focusText = '';
      if (layLowLeft > 0) {
        focusText = `Laying low for ${(layLowLeft / 1000).toFixed(1)}s. Product movement is paused.`;
      } else {
        const best = DDS.game.bestDealItem();
        focusText = best
          ? `Run deals with ${best.name} and wash cash to fund upgrades.`
          : 'Buy stock, run deals, then wash cash into clean funds.';
      }

      if (milestone) {
        el('dealerHint').textContent = `Focus: ${focusText} Next milestone: ${milestone.label} at ${this.money(milestone.cost)} lifetime sales.`;
      } else {
        el('dealerHint').textContent = `Focus: ${focusText} All milestones unlocked.`;
      }

      const nextUpgrade = Object.entries(DDS.progression.upgrades)
        .filter(([, cost]) => st.lifetimeSales < cost)
        .sort((a, b) => a[1] - b[1])[0];

      el('productionHint').textContent = 'Own production lines reduce dependence on market supply.';
      el('workersHint').textContent = 'Hire specialists to automate, protect, and scale your operation.';
      el('districtHint').textContent = 'District routes increase sale multipliers and add risk.';
      el('frontHint').textContent = 'Each front launders at different speed and efficiency.';
      if (nextUpgrade) {
        const u = DDS.data.upgrades.find((x) => x.id === nextUpgrade[0]);
        el('upgradeHint').textContent = `Next upgrade unlock: ${u.name} at ${this.money(nextUpgrade[1])} lifetime sales.`;
      } else {
        el('upgradeHint').textContent = 'All upgrade lines unlocked. Focus on leveling and timing.';
      }

      Object.keys(st.panelState).forEach((panelId) => this.applyPanelState(panelId));

      const unlockedCount = Object.values(st.systems).filter(Boolean).length;
      const board = el('boardRoot');
      if (unlockedCount <= 2) {
        board.dataset.stage = 'starter';
      } else if (unlockedCount <= 4) {
        board.dataset.stage = 'growth';
      } else {
        board.dataset.stage = 'empire';
      }
    },

    renderAll() {
      const st = DDS.state;

      const dirtyDisplay = this.smoothValue('dirtyMoney', st.dirtyMoney, 0.58);
      const cleanDisplay = this.smoothValue('cleanMoney', st.cleanMoney, 0.58);

      el('themeSelect').value = st.settings.theme || 'neon';
      el('graphicsSelect').value = st.settings.graphicsQuality;
      el('animationRange').value = st.settings.animationIntensity;
      el('scaleRange').value = st.settings.resolutionScale;
      el('volumeRange').value = st.settings.soundVolume;
      el('musicToggle').checked = st.settings.musicOn;
      el('dirtyMoney').textContent = this.money(dirtyDisplay);
      el('cleanMoney').textContent = this.money(cleanDisplay);
      el('demand').textContent = `${st.demandIndex.toFixed(2)}x`;
      el('heatPercent').textContent = `${st.heat.toFixed(1)}%`;

      el('heatBar').style.width = `${Math.min(100, st.heat)}%`;
      el('heatStage').textContent = DDS.game.heatStage();
      el('heatStage').className = DDS.game.heatClass();
      el('eventBanner').textContent = st.activeEvent
        ? `${st.activeEvent.name}: ${st.activeEvent.desc}`
        : 'No active event.';

      const progressMax = 500000;
      const pct = Math.min(100, (st.lifetimeSales / progressMax) * 100);
      el('slotProgressBar').style.width = `${pct}%`;
      el('slotProgressText').textContent = `Slot ${st.currentSlot} progression: ${pct.toFixed(1)}%`;

      this.updateSystemVisibility();
      this.updateSlotOptions();
      this.updateDealSelector(false);
      this.renderDealState();

      this.renderMarket();
      this.renderProduction();
      this.renderWorkers();
      this.renderDistricts();
      this.renderFronts();
      this.renderUpgrades();
      this.renderAchievements();
      this.renderSettingsSnapshot();
    },    renderDealState() {
      const st = DDS.state;
      const runBtn = el('runDealBtn');
      const timer = el('runDealTimer');
      const prog = el('runDealProgress');

      const selected = DDS.data.items.find((x) => x.id === st.dealer.selectedItemId) || DDS.data.items[0];
      const selectedStock = st.inventory[selected.id] || 0;
      const best = DDS.game.bestDealItem();
      if (selectedStock <= 0 && best && best.id !== selected.id) {
        st.dealer.selectedItemId = best.id;
        this.updateDealSelector(true);
      }

      const active = DDS.data.items.find((x) => x.id === st.dealer.selectedItemId) || selected;
      const stock = st.inventory[active.id] || 0;
      const now = Date.now();
      const cooldownMs = Math.max(0, st.dealer.cooldownUntil - now);
      const totalMs = Math.max(1, st.dealer.cooldownDurationMs || 1);
      const fill = cooldownMs > 0
        ? Math.max(0, Math.min(100, ((totalMs - cooldownMs) / totalMs) * 100))
        : 0;

      if (cooldownMs > 0) timer.textContent = `${(cooldownMs / 1000).toFixed(1)}s cooldown`;
      else timer.textContent = stock > 0 ? `Ready | Stock ${stock}` : 'Need stock';
      prog.style.width = `${fill}%`;

      const layLow = now < st.layLowUntil;
      runBtn.disabled = layLow || cooldownMs > 0 || stock <= 0;
      runBtn.dataset.tip = `Sell 1 ${active.name} from inventory. Current stock: ${stock}`;

      el('dealerCooldown').textContent = cooldownMs > 0
        ? `Deal Cooldown: ${(cooldownMs / 1000).toFixed(1)}s`
        : `Deal Cooldown: Ready (${active.name})`;
      el('dealerRank').textContent = `Dealer Rank: ${st.dealer.rank} (${DDS.game.rankTitle(st.dealer.rank)})`;

      const sellBtn = el('sellAllBtn');
      const sellCdMs = Math.max(0, st.streetDumpCooldownUntil - now);
      sellBtn.textContent = sellCdMs > 0
        ? `Sell Inventory (${(sellCdMs / 1000).toFixed(1)}s)`
        : 'Sell Inventory';
      sellBtn.disabled = layLow || sellCdMs > 0;
    },    renderMarket() {
      const st = DDS.state;
      const now = Date.now();
      const layLow = now < st.layLowUntil;
      let lockedPreviewShown = false;

      const nextMarket = DDS.data.items
        .map((item) => ({ item, cost: DDS.production.marketUnlockSales(item.id) }))
        .filter((x) => st.lifetimeSales < x.cost)
        .sort((a, b) => a.cost - b.cost)[0];

      if (nextMarket) {
        el('streetMarketHead').textContent = `Street Market | Next: ${nextMarket.item.name} at ${this.money(nextMarket.cost)}`;
      } else {
        el('streetMarketHead').textContent = 'Street Market | All product routes unlocked';
      }

      DDS.data.items.forEach((item) => {
        const n = this.nodes.market[item.id];
        if (!n) return;

        const unlockSales = DDS.production.marketUnlockSales(item.id);
        const unlocked = DDS.production.isMarketUnlocked(item.id);

        if (!unlocked && lockedPreviewShown) {
          n.row.classList.add('hidden-row');
          return;
        }

        n.row.classList.remove('hidden-row');

        if (!unlocked) {
          lockedPreviewShown = true;
          n.cost.textContent = 'Locked';
          n.bulk.textContent = this.money(unlockSales);
          n.retail.textContent = '--';
          n.buyOne.disabled = true;
          n.buyTen.disabled = true;
          n.product.dataset.tip = `Unlocks at ${this.money(unlockSales)} lifetime sales.`;
          n.product.classList.add('tip');
          return;
        }

        const unit = DDS.economy.supplyCost(item, 1);
        const bulk = DDS.economy.supplyCost(item, 10);
        const retail = DDS.economy.unitPrice(item);
        const bulkUnit = bulk / 10;

        n.cost.textContent = this.money(unit);
        n.bulk.textContent = `${this.money(bulk)} (${this.money(bulkUnit)}/u)`;
        n.retail.textContent = this.money(retail);

        n.buyOne.disabled = layLow || st.cleanMoney < unit;
        n.buyTen.disabled = layLow || st.cleanMoney < bulk;

        n.product.dataset.tip = `Stock: ${st.inventory[item.id] || 0} | Tier ${item.tier} | Heat ${item.baseHeat.toFixed(2)}`;
        n.product.classList.add('tip');
      });
    },

    renderProduction() {
      const st = DDS.state;
      let lockedPreviewShown = false;

      DDS.data.items.forEach((item) => {
        const n = this.nodes.production[item.id];
        if (!n) return;

        const unlockedLine = !!st.unlockedItems[item.id];
        const canUnlockLine = DDS.production.canUnlockProductionLine(item.id);
        const unlockSales = DDS.production.productionUnlockSales(item.id);

        if (!unlockedLine && !canUnlockLine && lockedPreviewShown) {
          n.c.classList.add('hidden-row');
          return;
        }

        n.c.classList.remove('hidden-row');
        if (!unlockedLine && !canUnlockLine) lockedPreviewShown = true;

        n.name.textContent = `${item.emoji} ${item.name}`;
        n.stock.textContent = `${st.inventory[item.id] || 0} in stock`;
        n.stats.textContent = `Line time ${item.baseTime}s | Base ${this.money(item.baseValue)} | Heat ${item.baseHeat.toFixed(2)}`;
        n.prog.style.width = `${Math.min(100, (st.prodProgress[item.id] || 0) * 100)}%`;

        if (!st.systems.production) {
          n.lock.textContent = 'Unlock the Products system first.';
          n.btn.textContent = 'Locked';
          n.btn.disabled = true;
          n.btn.onclick = null;
          n.btn.dataset.tip = 'Reach system unlock threshold to access production.';
          return;
        }

        if (unlockedLine) {
          n.lock.textContent = Date.now() < st.layLowUntil ? 'Laying low: line paused.' : 'Production line active.';
          n.btn.textContent = 'Produce +1';
          n.btn.disabled = Date.now() < st.layLowUntil;
          n.btn.onclick = () => DDS.production.clickProduce(item.id);
          n.btn.dataset.tip = `Manual production for ${item.name}.`;
          return;
        }

        if (!canUnlockLine) {
          n.lock.textContent = `Need ${this.money(unlockSales)} lifetime sales.`;
          n.btn.textContent = 'Locked';
          n.btn.disabled = true;
          n.btn.onclick = null;
          n.btn.dataset.tip = 'Keep selling street inventory to unlock this line.';
          return;
        }

        n.lock.textContent = `Unlock line for ${this.money(item.unlockCost)} clean money.`;
        n.btn.textContent = `Unlock ${this.money(item.unlockCost)}`;
        n.btn.disabled = st.cleanMoney < item.unlockCost;
        n.btn.onclick = () => DDS.game.unlockItem(item.id);
        n.btn.dataset.tip = `Unlocks automated and manual production access for ${item.name}.`;
      });
    },

    renderWorkers() {
      DDS.data.workers.forEach((w) => {
        const n = this.nodes.workers[w.id];
        if (!n) return;

        const req = DDS.workers.unlockRequirement(w.id);
        const unlocked = DDS.workers.isUnlocked(w.id);
        const count = DDS.state.workers[w.id] || 0;
        const cost = DDS.workers.cost(w.id);

        n.chip.textContent = `${count}`;
        n.lock.textContent = unlocked
          ? 'Unlocked'
          : `Unlock at ${this.money(req)} lifetime sales`;
        n.btn.textContent = `Hire ${this.money(cost)}`;
        n.btn.disabled = !unlocked || DDS.state.cleanMoney < cost;
        n.btn.onclick = () => DDS.workers.hire(w.id);
        n.btn.dataset.tip = w.desc;
      });
    },

    renderDistricts() {
      DDS.data.districts.forEach((d) => {
        const n = this.nodes.districts[d.id];
        if (!n) return;

        const has = DDS.state.unlockedDistricts.includes(d.id);
        n.btn.textContent = has ? 'Owned' : `Unlock ${this.money(d.unlockCost)}`;
        n.btn.disabled = has || !DDS.state.systems.districts || DDS.state.cleanMoney < d.unlockCost;
        n.btn.onclick = () => DDS.map.unlock(d.id);
        n.btn.dataset.tip = `${d.desc} | Sale x${d.saleBonus.toFixed(2)} | Heat x${d.heatMod.toFixed(2)}`;
      });
    },

    renderFronts() {
      DDS.laundering.fronts.forEach((f) => {
        const n = this.nodes.fronts[f.id];
        if (!n) return;

        const has = !!DDS.state.frontsOwned[f.id];
        const unlocked = DDS.laundering.isUnlocked(f.id);
        const req = DDS.laundering.unlockRequirement(f.id);

        n.lock.textContent = unlocked
          ? f.desc
          : `Unlock at ${this.money(req)} lifetime sales`;
        n.btn.textContent = has ? 'Owned' : `Buy ${this.money(f.cost)}`;
        n.btn.disabled = has || !unlocked || DDS.state.cleanMoney < f.cost;
        n.btn.onclick = () => DDS.laundering.buy(f.id);
        n.btn.dataset.tip = `Rate ${f.rate}/s | Efficiency ${Math.round(f.efficiency * 100)}% | Heat relief ${f.heatDrop}`;
      });
    },

    renderUpgrades() {
      DDS.data.upgrades.forEach((u) => {
        const n = this.nodes.upgrades[u.id];
        if (!n) return;

        const level = DDS.state.upgrades[u.id] || 0;
        const cost = Math.floor(u.baseCost * Math.pow(u.costGrowth, level));
        const req = DDS.progression.upgrades[u.id] || 0;
        const unlocked = DDS.state.systems.upgrades && DDS.state.lifetimeSales >= req;

        n.level.textContent = `Lv ${level}/${u.maxLevel}`;
        n.lock.textContent = unlocked
          ? u.desc
          : `Unlock at ${this.money(req)} lifetime sales`;
        n.btn.textContent = level >= u.maxLevel ? 'Maxed' : `Upgrade ${this.money(cost)}`;
        n.btn.disabled = level >= u.maxLevel || !unlocked || DDS.state.cleanMoney < cost;
        n.btn.onclick = () => DDS.game.buyUpgrade(u.id);
        n.btn.dataset.tip = u.desc;
      });
    },

    renderAchievements() {
      DDS.data.achievements.forEach((a) => {
        const node = this.nodes.achievements[a.id];
        if (!node) return;

        const done = DDS.state.completedAchievements.includes(a.id);
        node.chip.textContent = done ? 'Done' : 'Open';
        node.c.classList.toggle('achievement-done', done);
      });
    },

    renderSettingsSnapshot() {
      const st = DDS.state;
      const host = el('settingsStatusList');
      host.innerHTML = '';

      const rows = [
        ['Device', this.deviceLabel()],
        ['Rank', `${st.dealer.rank} (${DDS.game.rankTitle(st.dealer.rank)})`],
        ['Lifetime Sales', this.money(st.lifetimeSales)],
        ['Total Laundered', this.money(st.lifetimeLaundered)],
        ['Street Deals', `${st.streetDeals}`],
        ['Weed Units Sold', `${st.weedSold}`],
        ['Workers', `${DDS.workers.totalCount()}`],
        ['Districts', `${st.unlockedDistricts.length}/${DDS.data.districts.length}`],
        ['Heat Stage', DDS.game.heatStage()],
        ['Theme', DDS.state.settings.theme || 'neon'],
        ['Graphics', DDS.settings.labelQuality(st.settings.graphicsQuality)]
      ];

      rows.forEach(([k, v]) => {
        const row = document.createElement('div');
        row.className = 'row';
        const key = document.createElement('span');
        key.className = 'snap-key';
        key.textContent = k;
        const val = document.createElement('strong');
        val.textContent = v;
        row.append(key, val);
        host.appendChild(row);
      });
    }
  };
})();
