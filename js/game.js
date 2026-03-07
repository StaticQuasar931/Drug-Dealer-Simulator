window.DDS = window.DDS || {};
(function () {
  DDS.data = {
    items: [
      { id: 'cannabis', name: 'Cannabis', tier: 1, baseTime: 9, baseValue: 14, baseHeat: 0.7, quality: 1, emoji: '🌿', icon: 'assets/icons/product-cannabis.svg', unlockCost: 0 },
      { id: 'cocaine', name: 'Cocaine', tier: 2, baseTime: 18, baseValue: 58, baseHeat: 1.8, quality: 1, emoji: '⚪', icon: 'assets/icons/product-cocaine.svg', unlockCost: 2200 },
      { id: 'methamphetamine', name: 'Methamphetamine', tier: 3, baseTime: 29, baseValue: 170, baseHeat: 3.1, quality: 1, emoji: '🧊', icon: 'assets/icons/product-methamphetamine.svg', unlockCost: 9800 },
      { id: 'heroin', name: 'Heroin', tier: 4, baseTime: 42, baseValue: 430, baseHeat: 4.7, quality: 1, emoji: '🩹', icon: 'assets/icons/product-heroin.svg', unlockCost: 32000 },
      { id: 'lsd', name: 'LSD', tier: 5, baseTime: 54, baseValue: 920, baseHeat: 6.0, quality: 1, emoji: '🌈', icon: 'assets/icons/product-lsd.svg', unlockCost: 86000 },
      { id: 'mdma', name: 'MDMA', tier: 6, baseTime: 70, baseValue: 1750, baseHeat: 7.6, quality: 1, emoji: '💊', icon: 'assets/icons/product-mdma.svg', unlockCost: 180000 }
    ],
    upgrades: [
      { id: 'mixing_tables', name: 'Mixing Tables', desc: '+11% global production speed', baseCost: 240, costGrowth: 1.56, maxLevel: 24 },
      { id: 'sealed_kits', name: 'Sealed Kits', desc: '+8% sale value', baseCost: 650, costGrowth: 1.61, maxLevel: 25 },
      { id: 'quiet_drops', name: 'Quiet Drops', desc: '-6% heat generation', baseCost: 980, costGrowth: 1.65, maxLevel: 20 },
      { id: 'auto_dispatch', name: 'Auto Dispatch', desc: '+1 auto batch for unlocked items', baseCost: 1800, costGrowth: 1.78, maxLevel: 16 },
      { id: 'premium_cut', name: 'Premium Cut', desc: '+0.05 quality to all items', baseCost: 2800, costGrowth: 1.9, maxLevel: 14 }
    ],
    workers: [
      { id: 'dealers', name: 'Dealers', baseCost: 120, costGrowth: 1.21, desc: 'Automates low-tier production.' },
      { id: 'chemists', name: 'Chemists', baseCost: 520, costGrowth: 1.25, desc: 'Increases production speed.' },
      { id: 'smugglers', name: 'Smugglers', baseCost: 1200, costGrowth: 1.29, desc: 'Improves district route multiplier.' },
      { id: 'accountants', name: 'Accountants', baseCost: 1700, costGrowth: 1.32, desc: 'Improves laundering efficiency.' },
      { id: 'security', name: 'Security', baseCost: 1500, costGrowth: 1.3, desc: 'Reduces heat and raid impact.' },
      { id: 'hackers', name: 'Hackers', baseCost: 3400, costGrowth: 1.35, desc: 'Improves market volatility handling.' }
    ],
    districts: [
      { id: 'school', name: 'School Grounds', unlockCost: 0, saleBonus: 1.0, heatMod: 1.0, desc: 'Starter local route.' },
      { id: 'downtown', name: 'Downtown', unlockCost: 6500, saleBonus: 1.08, heatMod: 1.08, desc: 'Dense customer flow.' },
      { id: 'industrial', name: 'Industrial District', unlockCost: 18500, saleBonus: 1.13, heatMod: 1.12, desc: 'Warehousing and logistics.' },
      { id: 'harbor', name: 'Harbor', unlockCost: 52000, saleBonus: 1.19, heatMod: 1.17, desc: 'Strong routes, stronger patrols.' },
      { id: 'airport', name: 'Airport', unlockCost: 128000, saleBonus: 1.28, heatMod: 1.25, desc: 'High margin network.' },
      { id: 'underground', name: 'Underground Market', unlockCost: 285000, saleBonus: 1.42, heatMod: 1.34, desc: 'Top-tier global buyers.' }
    ],
    events: [
      { id: 'inspection_scare', name: 'Inspection Scare', duration: 75, desc: 'Patrol pressure rises.', heatDelta: 9, priceMod: 0.95 },
      { id: 'market_boom', name: 'Market Boom', duration: 100, desc: 'Demand spikes city-wide.', heatDelta: 4, priceMod: 1.22 },
      { id: 'supply_shortage', name: 'Supply Shortage', duration: 95, desc: 'Scarcity increases prices.', heatDelta: 6, priceMod: 1.14 },
      { id: 'security_breach', name: 'Security Breach', duration: 70, desc: 'Operational leak adds risk.', heatDelta: 14, priceMod: 0.92 },
      { id: 'big_party', name: 'Big Party', duration: 85, desc: 'Demand surge over weekend.', heatDelta: 7, priceMod: 1.17 },
      { id: 'supply_glut', name: 'Supply Glut', duration: 95, desc: 'Oversupply weakens margins.', heatDelta: -3, priceMod: 0.88 }
    ],
    achievements: [
      { id: 'first_sale', name: 'First Exchange', desc: 'Make your first sale.', goal: 'lifetimeSales', target: 120, rewardType: 'cleanMoney', reward: 100 },
      { id: 'starter_growth', name: 'Street Presence', desc: 'Reach $7,500 total sales.', goal: 'lifetimeSales', target: 7500, rewardType: 'priceBoost', reward: 0.02 },
      { id: 'front_owner', name: 'Front Owner', desc: 'Buy your first laundering front.', goal: 'frontsOwned', target: 1, rewardType: 'cleanMoney', reward: 900 },
      { id: 'district_climber', name: 'Territory Runner', desc: 'Unlock 3 districts.', goal: 'districtsOwned', target: 3, rewardType: 'heatDown', reward: 9 },
      { id: 'workforce', name: 'Crew Builder', desc: 'Hire 40 workers total.', goal: 'workersTotal', target: 40, rewardType: 'cleanMoney', reward: 4800 },
      { id: 'risk_manager', name: 'Risk Manager', desc: 'Reach Raid Risk then cool below 15.', goal: 'raidThenCool', target: 1, rewardType: 'cleanMoney', reward: 8000 },
      { id: 'launder_legend', name: 'Clean Ledger', desc: 'Launder $200,000 total.', goal: 'lifetimeLaundered', target: 200000, rewardType: 'launderBoost', reward: 0.1 },
      { id: 'empire_core', name: 'Empire Core', desc: 'Own 100 workers and all districts.', goal: 'empireCore', target: 1, rewardType: 'saleBoost', reward: 0.08 }
    ]
  };

  DDS.progression = {
    workers: {
      dealers: 0,
      chemists: 3500,
      security: 7000,
      smugglers: 12000,
      accountants: 22000,
      hackers: 45000
    },
    upgrades: {
      mixing_tables: 0,
      sealed_kits: 3500,
      quiet_drops: 8000,
      auto_dispatch: 18000,
      premium_cut: 28000
    },
    fronts: {
      car_wash: 5000,
      arcade: 13000,
      laundromat: 30000,
      food_truck: 65000,
      car_dealer: 140000
    }
  };

  DDS.makeFreshState = function () {
    const settings = Object.assign({}, DDS.settings.defaults);
    const inventory = {};
    const unlockedItems = {};
    const prodProgress = {};
    DDS.data.items.forEach((it, idx) => {
      inventory[it.id] = 0;
      prodProgress[it.id] = 0;
      unlockedItems[it.id] = idx === 0;
    });
    const workers = {};
    DDS.data.workers.forEach((w) => { workers[w.id] = 0; });
    const upgrades = {};
    DDS.data.upgrades.forEach((u) => { upgrades[u.id] = 0; });

    return {
      dirtyMoney: 0,
      cleanMoney: 0,
      inventory,
      unlockedItems,
      prodProgress,
      workers,
      unlockedDistricts: ['school'],
      frontsOwned: {},
      upgrades,
      completedAchievements: [],
      achievementBonuses: { launderBoost: 0, saleBoost: 0 },
      heat: 0,
      hasReachedRaidRisk: false,
      demandIndex: 1,
      activeEvent: null,
      layLowUntil: 0,
      lifetimeSales: 0,
      lifetimeLaundered: 0,
      settings,
      currentSlot: 1,
      lastSaveTime: Date.now(),
      lastTrustedTime: Date.now()
    };
  };

  DDS.state = DDS.makeFreshState();

  DDS.game = {
    unlockItem(id) {
      const item = DDS.data.items.find((x) => x.id === id);
      if (!item || DDS.state.unlockedItems[id]) return;
      if (DDS.state.cleanMoney < item.unlockCost) {
        DDS.ui.notify('Not enough clean money.', 'warn');
        return;
      }
      DDS.state.cleanMoney -= item.unlockCost;
      DDS.state.unlockedItems[id] = true;
      DDS.ui.log(`Unlocked product line: ${item.name}.`);
    },
    buyUpgrade(id) {
      const req = DDS.progression.upgrades[id] || 0;
      if (DDS.state.lifetimeSales < req) {
        DDS.ui.notify('Upgrade not unlocked yet.', 'warn');
        return;
      }
      const u = DDS.data.upgrades.find((x) => x.id === id);
      const lv = DDS.state.upgrades[id] || 0;
      if (!u || lv >= u.maxLevel) return;
      const cost = Math.floor(u.baseCost * Math.pow(u.costGrowth, lv));
      if (DDS.state.cleanMoney < cost) {
        DDS.ui.notify('Not enough clean money.', 'warn');
        return;
      }
      DDS.state.cleanMoney -= cost;
      DDS.state.upgrades[id] += 1;
      DDS.ui.log(`Upgraded ${u.name} to level ${DDS.state.upgrades[id]}.`);
    },
    simulateOffline(seconds) {
      if (!seconds) return;
      const loops = Math.min(2000, Math.floor(seconds));
      for (let i = 0; i < loops; i += 1) this.tick(1, true);
      DDS.ui.notify(`Offline progress: ${Math.floor(seconds)}s simulated.`);
    },
    heatStage() {
      const h = DDS.state.heat;
      if (h < 25) return 'Suspicion';
      if (h < 50) return 'Investigation';
      if (h < 75) return 'Surveillance';
      return 'Raid Risk';
    },
    heatClass() {
      const h = DDS.state.heat;
      if (h < 25) return 'heat0';
      if (h < 50) return 'heat1';
      if (h < 75) return 'heat2';
      return 'heat3';
    },
    raidCheck() {
      const st = DDS.state;
      if (st.heat < 75) return;
      st.hasReachedRaidRisk = true;
      if (Math.random() > 0.028) return;
      const sec = st.workers.security || 0;
      const lossScale = Math.max(0.15, 1 - sec * 0.01);
      const dirtyLoss = st.dirtyMoney * (0.17 * lossScale);
      st.dirtyMoney -= dirtyLoss;
      st.heat = Math.max(48, st.heat - 25);
      DDS.ui.notify(`Raid pressure hit. Lost ${DDS.ui.money(dirtyLoss)} dirty cash.`, 'warn');
      DDS.ui.log('Raid risk event applied.');
    },
    adminAction(action) {
      const st = DDS.state;
      if (action === 'dirty') st.dirtyMoney += 50000;
      if (action === 'clean') st.cleanMoney += 50000;
      if (action === 'cool') st.heat = Math.max(0, st.heat - 30);
      if (action === 'districts') st.unlockedDistricts = DDS.data.districts.map((d) => d.id);
      if (action === 'achievements') st.completedAchievements = DDS.data.achievements.map((a) => a.id);
      DDS.ui.notify(`Admin action: ${action}`);
    },
    tick(deltaSec, offline) {
      if (Date.now() < DDS.state.layLowUntil) {
        DDS.state.heat = Math.max(0, DDS.state.heat - 0.6 * deltaSec);
        DDS.production.tick(deltaSec * 0.45);
      } else {
        DDS.production.tick(deltaSec);
      }
      DDS.laundering.tick(deltaSec);
      DDS.economy.tick(deltaSec);
      DDS.events.tick(deltaSec);
      DDS.achievements.check();
      this.raidCheck();
      DDS.state.heat = Math.min(100, Math.max(0, DDS.state.heat));
      if (!offline) DDS.ui.renderAll();
    },
    uiRefreshMs() {
      const q = DDS.state.settings.graphicsQuality;
      if (q === 'low') return 420;
      if (q === 'high') return 120;
      return 220;
    },
    start() {
      const hasAck = localStorage.getItem('dds2_warning_ack') === '1';
      if (hasAck) document.getElementById('contentWarning').classList.remove('active');
      const loaded = DDS.save.load(1);
      if (!loaded) DDS.state = DDS.makeFreshState();

      DDS.ui.bind();
      DDS.ui.buildStaticCards();
      DDS.settings.applyToDocument();

      document.getElementById('graphicsSelect').value = DDS.state.settings.graphicsQuality;
      document.getElementById('animationRange').value = DDS.state.settings.animationIntensity;
      document.getElementById('scaleRange').value = DDS.state.settings.resolutionScale;
      document.getElementById('volumeRange').value = DDS.state.settings.soundVolume;
      document.getElementById('musicToggle').checked = DDS.state.settings.musicOn;
      DDS.ui.renderAll();

      let simLast = performance.now();
      let uiLast = performance.now();
      const loop = (now) => {
        const dt = Math.min(0.6, (now - simLast) / 1000);
        simLast = now;
        DDS.game.tick(dt, true);
        if ((now - uiLast) >= DDS.game.uiRefreshMs()) {
          DDS.ui.renderAll();
          uiLast = now;
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);

      setInterval(() => DDS.save.autoSave(), 15000);
      window.addEventListener('beforeunload', () => DDS.save.autoSave());
    }
  };

  window.addEventListener('load', () => DDS.game.start());
})();

