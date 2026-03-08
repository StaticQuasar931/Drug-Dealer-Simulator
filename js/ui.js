window.DDS = window.DDS || {};
(function () {
  function el(id) { return document.getElementById(id); }

  DDS.ui = {
    nodes: {
      production: {}, workers: {}, districts: {}, fronts: {}, upgrades: {}, achievements: {}
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

    updateSystemVisibility() {
      const st = DDS.state;
      const systemReq = DDS.progression.systems;

      el('productionList').style.display = st.systems.production ? 'grid' : 'none';
      el('workersList').style.display = st.systems.workers ? 'grid' : 'none';
      el('districtList').style.display = st.systems.districts ? 'grid' : 'none';
      el('frontList').style.display = st.systems.fronts ? 'grid' : 'none';
      el('upgradesList').style.display = st.systems.upgrades ? 'grid' : 'none';

      el('productionHint').textContent = st.systems.production
        ? 'Production unlocked. Start with weed lines and scale upward.'
        : `Locked. Reach ${this.money(systemReq.production)} lifetime sales to open production.`;
      el('workersHint').textContent = st.systems.workers
        ? 'Workers unlocked. Build your crew.'
        : `Locked. Reach ${this.money(systemReq.workers)} lifetime sales to recruit workers.`;
      el('districtHint').textContent = st.systems.districts
        ? 'District map unlocked. Expand territory.'
        : `Locked. Reach ${this.money(systemReq.districts)} lifetime sales to expand territory.`;
      el('frontHint').textContent = st.systems.fronts
        ? 'Fronts unlocked. Passive laundering is active when owned.'
        : `Locked. Reach ${this.money(systemReq.fronts)} lifetime sales to open fronts.`;
      el('upgradeHint').textContent = st.systems.upgrades
        ? 'Upgrades unlocked. Improve efficiency.'
        : `Locked. Reach ${this.money(systemReq.upgrades)} lifetime sales to access upgrades.`;
    },

    renderAll() {
      const st = DDS.state;
      el('dirtyMoney').textContent = this.money(st.dirtyMoney);
      el('cleanMoney').textContent = this.money(st.cleanMoney);
      el('demand').textContent = `${st.demandIndex.toFixed(2)}x`;
      el('heatPercent').textContent = `${st.heat.toFixed(1)}%`;
      el('heatBar').style.width = `${Math.min(100, st.heat)}%`;
      el('heatStage').textContent = DDS.game.heatStage();
      el('heatStage').className = DDS.game.heatClass();
      el('eventBanner').textContent = st.activeEvent ? `${st.activeEvent.name}: ${st.activeEvent.desc}` : 'No active event.';
      el('deviceType').textContent = this.deviceLabel();
      el('lifetimeSales').textContent = this.money(st.lifetimeSales);
      el('lifetimeLaundered').textContent = this.money(st.lifetimeLaundered);
      el('dealerRank').textContent = `Dealer Rank: ${st.dealer.rank}`;

      const cooldownMs = Math.max(0, st.dealer.cooldownUntil - Date.now());
      el('dealerCooldown').textContent = cooldownMs > 0
        ? `Deal Cooldown: ${(cooldownMs / 1000).toFixed(1)}s`
        : 'Deal Cooldown: Ready';

      const progressMax = 340000;
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

