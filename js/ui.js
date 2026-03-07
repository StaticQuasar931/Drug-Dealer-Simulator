window.DDS = window.DDS || {};
(function () {
  function el(id) { return document.getElementById(id); }

  DDS.ui = {
    bind() {
      el('saveBtn').addEventListener('click', () => DDS.save.manualSave());
      el('loadBtn').addEventListener('click', () => {
        DDS.save.load(DDS.state.currentSlot);
        this.notify(`Loaded slot ${DDS.state.currentSlot}.`);
      });
      el('slotBtn').addEventListener('click', () => DDS.save.switchSlot());
      el('settingsBtn').addEventListener('click', () => el('settingsModal').classList.add('active'));
      el('settingsClose').addEventListener('click', () => el('settingsModal').classList.remove('active'));
      el('sellAllBtn').addEventListener('click', () => DDS.production.sellAll());
      el('launderBtn').addEventListener('click', () => DDS.laundering.tick(5));
      el('layLowBtn').addEventListener('click', () => {
        DDS.state.layLowUntil = Date.now() + 20000;
        this.notify('Laying low for 20s. Production slowed, heat reduced.');
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
    money(v) {
      return `$${Math.floor(v).toLocaleString('en-US')}`;
    },
    log(msg) {
      const d = document.createElement('div');
      d.textContent = `${new Date().toLocaleTimeString()} - ${msg}`;
      const panel = el('logPanel');
      panel.prepend(d);
      while (panel.children.length > 80) panel.removeChild(panel.lastChild);
    },
    notify(msg, type) {
      const n = document.createElement('div');
      n.className = 'note';
      if (type === 'warn') n.style.background = 'rgba(145,35,53,0.3)';
      n.textContent = msg;
      el('notificationStack').prepend(n);
      setTimeout(() => n.remove(), 4200);
    },
    deviceLabel() {
      const w = window.innerWidth;
      if (w <= 620) return 'Mobile';
      if (w <= 1100) return 'Tablet';
      return 'Desktop';
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
      el('slotLabel').textContent = String(st.currentSlot);
      el('deviceType').textContent = this.deviceLabel();
      el('lifetimeSales').textContent = this.money(st.lifetimeSales);
      el('lifetimeLaundered').textContent = this.money(st.lifetimeLaundered);

      this.renderProduction();
      this.renderWorkers();
      this.renderDistricts();
      this.renderFronts();
      this.renderUpgrades();
      this.renderAchievements();
    },
    renderProduction() {
      const wrap = el('productionList');
      wrap.innerHTML = '';
      DDS.data.items.forEach((item) => {
        const unlocked = DDS.state.unlockedItems[item.id];
        const qty = DDS.state.inventory[item.id] || 0;
        const price = DDS.economy.unitPrice(item);
        const prog = (DDS.state.prodProgress[item.id] || 0) * 100;
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<div class="row"><div class="title">${item.emoji} ${item.name}</div><span class="stat-chip">${qty} in stock</span></div>
          <div class="desc">Time ${item.baseTime}s | Base ${this.money(item.baseValue)} | Heat ${item.baseHeat.toFixed(1)}</div>
          <div class="desc">Market ${this.money(price)}</div>
          <div class="progress"><div style="width:${Math.min(100, prog)}%"></div></div>`;
        const b = document.createElement('button');
        if (unlocked) {
          b.textContent = 'Produce';
          b.addEventListener('click', () => DDS.production.clickProduce(item.id));
        } else {
          b.textContent = `Unlock ${this.money(item.unlockCost)}`;
          b.addEventListener('click', () => DDS.game.unlockItem(item.id));
        }
        c.appendChild(b);
        wrap.appendChild(c);
      });
    },
    renderWorkers() {
      const wrap = el('workersList');
      wrap.innerHTML = '';
      DDS.data.workers.forEach((w) => {
        const count = DDS.state.workers[w.id] || 0;
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<div class="row"><div class="title">${w.name}</div><span class="stat-chip">${count}</span></div><div class="desc">${w.desc}</div>`;
        const b = document.createElement('button');
        b.textContent = `Hire ${this.money(DDS.workers.cost(w.id))}`;
        b.addEventListener('click', () => DDS.workers.hire(w.id));
        c.appendChild(b);
        wrap.appendChild(c);
      });
    },
    renderDistricts() {
      const wrap = el('districtList');
      wrap.innerHTML = '';
      DDS.data.districts.forEach((d) => {
        const has = DDS.state.unlockedDistricts.includes(d.id);
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<div class="row"><div class="title">${d.name}</div><span class="stat-chip">x${d.saleBonus.toFixed(2)}</span></div><div class="desc">${d.desc}</div>`;
        const b = document.createElement('button');
        b.textContent = has ? 'Owned' : `Unlock ${this.money(d.unlockCost)}`;
        b.disabled = has;
        b.addEventListener('click', () => DDS.map.unlock(d.id));
        c.appendChild(b);
        wrap.appendChild(c);
      });
    },
    renderFronts() {
      const wrap = el('frontList');
      wrap.innerHTML = '';
      DDS.laundering.fronts.forEach((f) => {
        const has = !!DDS.state.frontsOwned[f.id];
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<div class="row"><div class="title">${f.name}</div><span class="stat-chip">${f.efficiency}</span></div>
          <div class="desc">Rate ${f.rate}/s | Heat relief ${f.heatDrop}</div><div class="desc">${f.desc}</div>`;
        const b = document.createElement('button');
        b.textContent = has ? 'Owned' : `Buy ${this.money(f.cost)}`;
        b.disabled = has;
        b.addEventListener('click', () => DDS.laundering.buy(f.id));
        c.appendChild(b);
        wrap.appendChild(c);
      });
    },
    renderUpgrades() {
      const wrap = el('upgradesList');
      wrap.innerHTML = '';
      DDS.data.upgrades.forEach((u) => {
        const level = DDS.state.upgrades[u.id] || 0;
        const cost = Math.floor(u.baseCost * Math.pow(u.costGrowth, level));
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<div class="row"><div class="title">${u.name}</div><span class="stat-chip">Lv ${level}/${u.maxLevel}</span></div><div class="desc">${u.desc}</div>`;
        const b = document.createElement('button');
        b.textContent = level >= u.maxLevel ? 'Maxed' : `Upgrade ${this.money(cost)}`;
        b.disabled = level >= u.maxLevel;
        b.addEventListener('click', () => DDS.game.buyUpgrade(u.id));
        c.appendChild(b);
        wrap.appendChild(c);
      });
    },
    renderAchievements() {
      const wrap = el('achievementsList');
      wrap.innerHTML = '';
      DDS.data.achievements.forEach((a) => {
        const done = DDS.state.completedAchievements.includes(a.id);
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<div class="row"><div class="title">${a.name}</div><span class="stat-chip">${done ? 'Done' : 'Open'}</span></div><div class="desc">${a.desc}</div>`;
        wrap.appendChild(c);
      });
    }
  };
})();
