window.DDS = window.DDS || {};
(function () {
  DDS.data = {
    items: [
      { id: 'street_green', name: 'Street Green', tier: 1, baseTime: 4, baseValue: 18, baseHeat: 0.8, quality: 1, emoji: '🍃', unlockCost: 0 },
      { id: 'hydro_bud', name: 'Hydro Bud', tier: 2, baseTime: 8, baseValue: 55, baseHeat: 1.4, quality: 1, emoji: '🌿', unlockCost: 600 },
      { id: 'night_resin', name: 'Night Resin', tier: 3, baseTime: 14, baseValue: 160, baseHeat: 2.6, quality: 1, emoji: '🧪', unlockCost: 3500 },
      { id: 'pulse_tabs', name: 'Pulse Tabs', tier: 4, baseTime: 22, baseValue: 480, baseHeat: 4.4, quality: 1, emoji: '💠', unlockCost: 18000 },
      { id: 'ghost_crystal', name: 'Ghost Crystal', tier: 5, baseTime: 34, baseValue: 1450, baseHeat: 6.9, quality: 1, emoji: '🔷', unlockCost: 90000 }
    ],
    upgrades: [
      { id: 'mixing_tables', name: 'Mixing Tables', desc: '+15% global production speed', baseCost: 250, costGrowth: 1.58, maxLevel: 20 },
      { id: 'sealed_kits', name: 'Sealed Kits', desc: '+10% sale value', baseCost: 520, costGrowth: 1.62, maxLevel: 25 },
      { id: 'quiet_drops', name: 'Quiet Drops', desc: '-8% heat generation', baseCost: 760, costGrowth: 1.64, maxLevel: 20 },
      { id: 'auto_dispatch', name: 'Auto Dispatch', desc: '+1 auto batch for unlocked items', baseCost: 1200, costGrowth: 1.9, maxLevel: 30 },
      { id: 'premium_cut', name: 'Premium Cut', desc: '+0.05 quality to all items', baseCost: 2100, costGrowth: 1.95, maxLevel: 15 }
    ],
    workers: [
      { id: 'dealers', name: 'Dealers', baseCost: 180, costGrowth: 1.22, desc: 'Automates sales volume.' },
      { id: 'chemists', name: 'Chemists', baseCost: 420, costGrowth: 1.26, desc: 'Boosts production efficiency.' },
      { id: 'smugglers', name: 'Smugglers', baseCost: 680, costGrowth: 1.31, desc: 'Improves district route bonus.' },
      { id: 'accountants', name: 'Accountants', baseCost: 980, costGrowth: 1.34, desc: 'Improves laundering conversion.' },
      { id: 'security', name: 'Security', baseCost: 760, costGrowth: 1.29, desc: 'Reduces heat and raid losses.' },
      { id: 'hackers', name: 'Hackers', baseCost: 1400, costGrowth: 1.36, desc: 'Improves market insight.' }
    ],
    districts: [
      { id: 'school', name: 'School Grounds', unlockCost: 0, saleBonus: 1, heatMod: 1, desc: 'Starter local route.' },
      { id: 'downtown', name: 'Downtown', unlockCost: 2500, saleBonus: 1.08, heatMod: 1.07, desc: 'Dense customer flow.' },
      { id: 'industrial', name: 'Industrial District', unlockCost: 9000, saleBonus: 1.12, heatMod: 1.1, desc: 'Cheap warehousing.' },
      { id: 'harbor', name: 'Harbor', unlockCost: 28000, saleBonus: 1.18, heatMod: 1.16, desc: 'Strong logistics, stronger patrols.' },
      { id: 'airport', name: 'Airport', unlockCost: 82000, saleBonus: 1.24, heatMod: 1.22, desc: 'High margin routes.' },
      { id: 'underground', name: 'Underground Market', unlockCost: 180000, saleBonus: 1.35, heatMod: 1.28, desc: 'Elite demand network.' }
    ],
    events: [
      { id: 'inspection_scare', name: 'Inspection Scare', duration: 75, desc: 'Local patrols rise.', heatDelta: 12, priceMod: 0.95 },
      { id: 'market_boom', name: 'Market Boom', duration: 90, desc: 'Demand spikes city-wide.', heatDelta: 4, priceMod: 1.2 },
      { id: 'supply_shortage', name: 'Supply Shortage', duration: 95, desc: 'Input scarcity raises prices.', heatDelta: 6, priceMod: 1.14 },
      { id: 'security_breach', name: 'Security Breach', duration: 70, desc: 'Loose ends create risk.', heatDelta: 16, priceMod: 0.92 },
      { id: 'big_party', name: 'Big Party', duration: 80, desc: 'Weekend demand surge.', heatDelta: 8, priceMod: 1.16 },
      { id: 'supply_glut', name: 'Supply Glut', duration: 85, desc: 'Oversupply weakens margins.', heatDelta: -4, priceMod: 0.86 }
    ],
    achievements: [
      { id: 'first_sale', name: 'First Exchange', desc: 'Make your first sale.', goal: 'lifetimeSales', target: 100, rewardType: 'cleanMoney', reward: 120 },
      { id: 'starter_growth', name: 'Street Presence', desc: 'Reach $5,000 total sales.', goal: 'lifetimeSales', target: 5000, rewardType: 'priceBoost', reward: 0.03 },
      { id: 'front_owner', name: 'Front Owner', desc: 'Buy your first laundering front.', goal: 'frontsOwned', target: 1, rewardType: 'cleanMoney', reward: 750 },
      { id: 'district_climber', name: 'Territory Runner', desc: 'Unlock 3 districts.', goal: 'districtsOwned', target: 3, rewardType: 'heatDown', reward: 8 },
      { id: 'workforce', name: 'Crew Builder', desc: 'Hire 40 workers total.', goal: 'workersTotal', target: 40, rewardType: 'cleanMoney', reward: 3500 },
      { id: 'risk_manager', name: 'Risk Manager', desc: 'Reduce heat under 15 after reaching Raid Risk once.', goal: 'raidThenCool', target: 1, rewardType: 'cleanMoney', reward: 5000 },
      { id: 'launder_legend', name: 'Clean Ledger', desc: 'Launder $150,000 total.', goal: 'lifetimeLaundered', target: 150000, rewardType: 'launderBoost', reward: 0.12 },
      { id: 'empire_core', name: 'Empire Core', desc: 'Own 100 workers and all districts.', goal: 'empireCore', target: 1, rewardType: 'saleBoost', reward: 0.08 }
    ]
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
      cleanMoney: 250,
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
      if (Math.random() > 0.03) return;
      const sec = st.workers.security || 0;
      const lossScale = Math.max(0.2, 1 - sec * 0.01);
      const dirtyLoss = st.dirtyMoney * (0.15 * lossScale);
      st.dirtyMoney -= dirtyLoss;
      st.heat = Math.max(45, st.heat - 28);
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
        DDS.state.heat = Math.max(0, DDS.state.heat - 0.5 * deltaSec);
        DDS.production.tick(deltaSec * 0.35);
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
    start() {
      const hasAck = localStorage.getItem('dds2_warning_ack') === '1';
      if (hasAck) document.getElementById('contentWarning').classList.remove('active');
      const loaded = DDS.save.load(1);
      if (!loaded) DDS.state = DDS.makeFreshState();
      DDS.ui.bind();
      DDS.settings.applyToDocument();
      document.getElementById('graphicsSelect').value = DDS.state.settings.graphicsQuality;
      document.getElementById('animationRange').value = DDS.state.settings.animationIntensity;
      document.getElementById('scaleRange').value = DDS.state.settings.resolutionScale;
      document.getElementById('volumeRange').value = DDS.state.settings.soundVolume;
      document.getElementById('musicToggle').checked = DDS.state.settings.musicOn;
      DDS.ui.renderAll();

      const tickMs = () => {
        const q = DDS.state.settings.graphicsQuality;
        if (q === 'low') return 320;
        if (q === 'high') return 120;
        return 200;
      };

      let last = performance.now();
      setInterval(() => {
        const now = performance.now();
        const dt = Math.min(1.2, (now - last) / 1000);
        last = now;
        DDS.game.tick(dt, false);
      }, tickMs());

      setInterval(() => DDS.save.autoSave(), 15000);
      window.addEventListener('beforeunload', () => DDS.save.autoSave());
    }
  };

  window.addEventListener('load', () => DDS.game.start());
})();
