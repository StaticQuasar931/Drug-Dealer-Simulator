window.DDS = window.DDS || {};
(function () {
  DDS.data = {
    items: [
      { id: 'mids_cannabis', name: 'Cannabis (Mids)', tier: 1, baseTime: 10, baseValue: 12, baseHeat: 0.45, quality: 1, emoji: '🌿', icon: 'assets/icons/product-cannabis.svg', unlockCost: 0 },
      { id: 'kush_cannabis', name: 'Cannabis (Kush)', tier: 2, baseTime: 16, baseValue: 28, baseHeat: 0.7, quality: 1, emoji: '🍃', icon: 'assets/icons/product-kush.svg', unlockCost: 1200 },
      { id: 'haze_cannabis', name: 'Cannabis (Haze)', tier: 3, baseTime: 22, baseValue: 44, baseHeat: 0.95, quality: 1, emoji: '🌱', icon: 'assets/icons/product-haze.svg', unlockCost: 4200 },
      { id: 'cocaine', name: 'Cocaine', tier: 4, baseTime: 35, baseValue: 135, baseHeat: 2.1, quality: 1, emoji: '⚪', icon: 'assets/icons/product-cocaine.svg', unlockCost: 18000 },
      { id: 'methamphetamine', name: 'Methamphetamine', tier: 5, baseTime: 48, baseValue: 330, baseHeat: 3.6, quality: 1, emoji: '🧊', icon: 'assets/icons/product-methamphetamine.svg', unlockCost: 52000 },
      { id: 'heroin', name: 'Heroin', tier: 6, baseTime: 60, baseValue: 760, baseHeat: 5.2, quality: 1, emoji: '🩹', icon: 'assets/icons/product-heroin.svg', unlockCost: 120000 },
      { id: 'lsd', name: 'LSD', tier: 7, baseTime: 74, baseValue: 1500, baseHeat: 6.8, quality: 1, emoji: '🌈', icon: 'assets/icons/product-lsd.svg', unlockCost: 240000 },
      { id: 'mdma', name: 'MDMA', tier: 8, baseTime: 88, baseValue: 2500, baseHeat: 8.3, quality: 1, emoji: '💊', icon: 'assets/icons/product-mdma.svg', unlockCost: 420000 }
    ],
    upgrades: [
      { id: 'mixing_tables', name: 'Mixing Tables', desc: '+10% production speed', baseCost: 800, costGrowth: 1.56, maxLevel: 20 },
      { id: 'sealed_kits', name: 'Sealed Kits', desc: '+7% sale value', baseCost: 1400, costGrowth: 1.61, maxLevel: 22 },
      { id: 'quiet_drops', name: 'Quiet Drops', desc: '-6% heat generation', baseCost: 2100, costGrowth: 1.65, maxLevel: 18 },
      { id: 'auto_dispatch', name: 'Auto Dispatch', desc: '+1 auto batch', baseCost: 3600, costGrowth: 1.78, maxLevel: 14 },
      { id: 'premium_cut', name: 'Premium Cut', desc: '+0.05 quality', baseCost: 4800, costGrowth: 1.9, maxLevel: 12 }
    ],
    workers: [
      { id: 'dealers', name: 'Dealers', baseCost: 220, costGrowth: 1.2, desc: 'Automates low-tier street flow.', portrait: 'assets/characters/worker-dealer.png' },
      { id: 'chemists', name: 'Chemists', baseCost: 900, costGrowth: 1.24, desc: 'Increases production speed.', portrait: 'assets/characters/worker-chemist.png' },
      { id: 'smugglers', name: 'Smugglers', baseCost: 1800, costGrowth: 1.28, desc: 'Boosts district route multipliers.', portrait: 'assets/characters/worker-smuggler.png' },
      { id: 'accountants', name: 'Accountants', baseCost: 2500, costGrowth: 1.31, desc: 'Improves laundering efficiency.', portrait: 'assets/characters/worker-accountant.png' },
      { id: 'security', name: 'Security', baseCost: 2200, costGrowth: 1.29, desc: 'Reduces heat and raid impact.', portrait: 'assets/characters/worker-security.png' },
      { id: 'hackers', name: 'Hackers', baseCost: 5000, costGrowth: 1.34, desc: 'Stabilizes demand and event risk.', portrait: 'assets/characters/worker-hacker.png' }
    ],
    districts: [
      { id: 'school', name: 'School Grounds', unlockCost: 0, saleBonus: 1.0, heatMod: 1.0, desc: 'Starter local route.' },
      { id: 'downtown', name: 'Downtown', unlockCost: 8500, saleBonus: 1.08, heatMod: 1.08, desc: 'Dense customer flow.' },
      { id: 'industrial', name: 'Industrial District', unlockCost: 24000, saleBonus: 1.14, heatMod: 1.12, desc: 'Storage and logistics.' },
      { id: 'harbor', name: 'Harbor', unlockCost: 68000, saleBonus: 1.21, heatMod: 1.19, desc: 'Wide routes, higher patrols.' },
      { id: 'airport', name: 'Airport', unlockCost: 165000, saleBonus: 1.31, heatMod: 1.28, desc: 'High margin expansion lane.' },
      { id: 'underground', name: 'Underground Market', unlockCost: 340000, saleBonus: 1.45, heatMod: 1.36, desc: 'Top-tier buyers and risk.' }
    ],
    events: [
      { id: 'inspection_scare', name: 'Inspection Scare', duration: 75, desc: 'Patrol pressure rises.', heatDelta: 9, priceMod: 0.95 },
      { id: 'market_boom', name: 'Market Boom', duration: 100, desc: 'Demand spikes city-wide.', heatDelta: 4, priceMod: 1.22 },
      { id: 'supply_shortage', name: 'Supply Shortage', duration: 95, desc: 'Scarcity raises prices.', heatDelta: 6, priceMod: 1.14 },
      { id: 'security_breach', name: 'Security Breach', duration: 70, desc: 'Operational leak adds risk.', heatDelta: 14, priceMod: 0.92 },
      { id: 'big_party', name: 'Big Party', duration: 85, desc: 'Weekend demand surge.', heatDelta: 7, priceMod: 1.17 },
      { id: 'supply_glut', name: 'Supply Glut', duration: 95, desc: 'Oversupply weakens margins.', heatDelta: -3, priceMod: 0.88 }
    ],
    achievements: [
      { id: 'first_sale', name: 'First Exchange', desc: 'Make your first sale.', goal: 'lifetimeSales', target: 120, rewardType: 'cleanMoney', reward: 100 },
      { id: 'street_grinder', name: 'Street Grinder', desc: 'Run 40 street deals.', goal: 'streetDeals', target: 40, rewardType: 'cleanMoney', reward: 250 },
      { id: 'starter_growth', name: 'Street Presence', desc: 'Reach $7,500 total sales.', goal: 'lifetimeSales', target: 7500, rewardType: 'priceBoost', reward: 0.02 },
      { id: 'front_owner', name: 'Front Owner', desc: 'Buy your first laundering front.', goal: 'frontsOwned', target: 1, rewardType: 'cleanMoney', reward: 900 },
      { id: 'district_climber', name: 'Territory Runner', desc: 'Unlock 3 districts.', goal: 'districtsOwned', target: 3, rewardType: 'heatDown', reward: 9 },
      { id: 'workforce', name: 'Crew Builder', desc: 'Hire 40 workers total.', goal: 'workersTotal', target: 40, rewardType: 'cleanMoney', reward: 4800 },
      { id: 'launder_legend', name: 'Clean Ledger', desc: 'Launder $200,000 total.', goal: 'lifetimeLaundered', target: 200000, rewardType: 'launderBoost', reward: 0.1 },
      { id: 'empire_core', name: 'Empire Core', desc: 'Own 100 workers and all districts.', goal: 'empireCore', target: 1, rewardType: 'saleBoost', reward: 0.08 }
    ]
  };

  DDS.progression = {
    systems: {
      production: 1500,
      workers: 3000,
      districts: 6000,
      fronts: 9000,
      upgrades: 12000,
      events: 18000
    },
    workers: {
      dealers: 3000,
      chemists: 9000,
      security: 12000,
      smugglers: 18000,
      accountants: 30000,
      hackers: 60000
    },
    upgrades: {
      mixing_tables: 12000,
      sealed_kits: 16000,
      quiet_drops: 22000,
      auto_dispatch: 36000,
      premium_cut: 52000
    },
    fronts: {
      car_wash: 9000,
      arcade: 22000,
      laundromat: 50000,
      food_truck: 110000,
      car_dealer: 220000
    }
  };

  DDS.makeFreshState = function () {
    const settings = Object.assign({}, DDS.settings.defaults);
    const inventory = {};
    const unlockedItems = {};
    const prodProgress = {};
    DDS.data.items.forEach((it) => {
      inventory[it.id] = 0;
      prodProgress[it.id] = 0;
      unlockedItems[it.id] = false;
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
      streetDeals: 0,
      dealer: {
        rank: 1,
        cooldownUntil: 0
      },
      systems: {
        production: false,
        workers: false,
        districts: false,
        fronts: false,
        upgrades: false,
        events: false
      },
      settings,
      currentSlot: 1,
      lastSaveTime: Date.now(),
      lastTrustedTime: Date.now()
    };
  };

  DDS.state = DDS.makeFreshState();

  DDS.game = {
    runStreetDeal() {
      const st = DDS.state;
      const now = Date.now();
      if (now < st.dealer.cooldownUntil) {
        DDS.ui.notify('Deal is on cooldown.', 'warn');
        return;
      }
      const base = 18 + st.dealer.rank * 3;
      const swing = 0.85 + Math.random() * 0.4;
      const total = base * swing * st.demandIndex;
      st.dirtyMoney += total;
      st.lifetimeSales += total;
      st.streetDeals += 1;
      st.heat = Math.min(100, st.heat + 1.05);

      if (st.streetDeals % 15 === 0) {
        st.dealer.rank += 1;
        DDS.ui.notify(`Dealer rank up: ${st.dealer.rank}`);
      }

      const cooldownSec = Math.max(1.5, 5 - st.dealer.rank * 0.08);
      st.dealer.cooldownUntil = now + cooldownSec * 1000;
      DDS.ui.log(`Street deal completed: ${DDS.ui.money(total)}.`);
    },

    unlockSystems() {
      const st = DDS.state;
      const thresholds = DDS.progression.systems;
      const unlockMessages = {
        production: 'Production unlocked. You can now handle stock directly.',
        workers: 'Workers unlocked. Crew hiring is now available.',
        districts: 'District map unlocked. Territory expansion is now available.',
        fronts: 'Laundering fronts unlocked. Passive wash is now available.',
        upgrades: 'Upgrades unlocked. Efficiency scaling is now available.',
        events: 'Market events unlocked. Volatility is now active.'
      };

      Object.keys(thresholds).forEach((key) => {
        if (st.systems[key]) return;
        if (st.lifetimeSales < thresholds[key]) return;
        st.systems[key] = true;
        if (key === 'production') st.unlockedItems.mids_cannabis = true;
        DDS.ui.notify(unlockMessages[key]);
        DDS.ui.log(unlockMessages[key]);
      });
    },

    unlockItem(id) {
      const item = DDS.data.items.find((x) => x.id === id);
      if (!item || DDS.state.unlockedItems[id]) return;
      if (!DDS.state.systems.production) {
        DDS.ui.notify('Production system not unlocked yet.', 'warn');
        return;
      }
      if (DDS.state.cleanMoney < item.unlockCost) {
        DDS.ui.notify('Not enough clean money.', 'warn');
        return;
      }
      DDS.state.cleanMoney -= item.unlockCost;
      DDS.state.unlockedItems[id] = true;
      DDS.ui.log(`Unlocked product line: ${item.name}.`);
    },

    buyUpgrade(id) {
      if (!DDS.state.systems.upgrades) {
        DDS.ui.notify('Upgrades are not unlocked yet.', 'warn');
        return;
      }
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
        DDS.state.heat = Math.max(0, DDS.state.heat - 0.62 * deltaSec);
      }
      DDS.production.tick(deltaSec);
      DDS.laundering.tick(deltaSec);
      DDS.economy.tick(deltaSec);
      if (DDS.state.systems.events) DDS.events.tick(deltaSec);
      DDS.achievements.check();
      this.unlockSystems();
      this.raidCheck();

      DDS.state.heat = Math.min(100, Math.max(0, DDS.state.heat));
      if (!offline) DDS.ui.renderAll();
    },

    uiRefreshMs() {
      const q = DDS.state.settings.graphicsQuality;
      if (q === 'low') return 460;
      if (q === 'high') return 120;
      return 220;
    },

    start() {
      const hasAck = localStorage.getItem('dds2_warning_ack') === '1';
      if (hasAck) document.getElementById('contentWarning').classList.remove('active');

      DDS.save.loadOrFresh(1);
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
