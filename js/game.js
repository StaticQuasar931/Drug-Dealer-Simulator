window.DDS = window.DDS || {};
(function () {
  DDS.data = {
    items: [
      { id: 'baggie_weed', name: 'Weed Baggies', tier: 1, baseTime: 8, baseValue: 12, baseHeat: 0.35, quality: 1, emoji: '\uD83C\uDF3F', icon: 'assets/icons/product-weed-baggie.svg', unlockCost: 500 },
      { id: 'pre_roll_joints', name: 'Pre-Rolled Joints', tier: 2, baseTime: 13, baseValue: 24, baseHeat: 0.5, quality: 1, emoji: '\uD83D\uDEAC', icon: 'assets/icons/product-joint.svg', unlockCost: 1600 },
      { id: 'thc_edibles', name: 'THC Edibles', tier: 3, baseTime: 18, baseValue: 36, baseHeat: 0.65, quality: 1, emoji: '\uD83C\uDF6C', icon: 'assets/icons/product-edibles.svg', unlockCost: 4200 },
      { id: 'thc_vape_carts', name: 'THC Vape Carts', tier: 4, baseTime: 23, baseValue: 53, baseHeat: 0.82, quality: 1, emoji: '\uD83D\uDCA8', icon: 'assets/icons/product-thc-vape.svg', unlockCost: 9800 },
      { id: 'nicotine_pods', name: 'Nicotine Pods', tier: 5, baseTime: 28, baseValue: 69, baseHeat: 0.95, quality: 1, emoji: '\uD83D\uDEAD', icon: 'assets/icons/product-nicotine.svg', unlockCost: 18000 },
      { id: 'mdma_ecstasy', name: 'MDMA / Ecstasy', tier: 6, baseTime: 37, baseValue: 138, baseHeat: 1.8, quality: 1, emoji: '\uD83D\uDC8A', icon: 'assets/icons/product-mdma.svg', unlockCost: 38000 },
      { id: 'lsd_tabs', name: 'LSD Tabs', tier: 7, baseTime: 46, baseValue: 235, baseHeat: 2.4, quality: 1, emoji: '\uD83C\uDF08', icon: 'assets/icons/product-lsd.svg', unlockCost: 62000 },
      { id: 'cocaine', name: 'Cocaine', tier: 8, baseTime: 58, baseValue: 425, baseHeat: 3.8, quality: 1, emoji: '\u26AA', icon: 'assets/icons/product-cocaine.svg', unlockCost: 120000 },
      { id: 'methamphetamine', name: 'Methamphetamine', tier: 9, baseTime: 72, baseValue: 765, baseHeat: 5.5, quality: 1, emoji: '\uD83E\uDDCA', icon: 'assets/icons/product-methamphetamine.svg', unlockCost: 220000 },
      { id: 'heroin', name: 'Heroin', tier: 10, baseTime: 86, baseValue: 1320, baseHeat: 7.1, quality: 1, emoji: '\uD83E\uDE79', icon: 'assets/icons/product-heroin.svg', unlockCost: 360000 }
    ],
    upgrades: [
      { id: 'mixing_tables', name: 'Prep Tables', desc: '+9% production speed', baseCost: 900, costGrowth: 1.56, maxLevel: 18 },
      { id: 'sealed_kits', name: 'Packaging Kits', desc: '+7% sale value', baseCost: 1600, costGrowth: 1.61, maxLevel: 20 },
      { id: 'quiet_drops', name: 'Quiet Drops', desc: '-6% heat generation', baseCost: 2200, costGrowth: 1.64, maxLevel: 16 },
      { id: 'auto_dispatch', name: 'Auto Dispatch', desc: '+1 auto batch', baseCost: 3800, costGrowth: 1.75, maxLevel: 12 },
      { id: 'premium_cut', name: 'Premium Quality', desc: '+0.05 quality', baseCost: 5200, costGrowth: 1.88, maxLevel: 10 }
    ],
    workers: [
      { id: 'dealers', name: 'Dealers', baseCost: 260, costGrowth: 1.2, desc: 'Automates low-tier flow.', portrait: 'assets/characters/worker-dealer.png' },
      { id: 'chemists', name: 'Chemists', baseCost: 980, costGrowth: 1.24, desc: 'Increases production speed.', portrait: 'assets/characters/worker-chemist.png' },
      { id: 'smugglers', name: 'Smugglers', baseCost: 1900, costGrowth: 1.28, desc: 'Boosts route multipliers.', portrait: 'assets/characters/worker-smuggler.png' },
      { id: 'accountants', name: 'Accountants', baseCost: 2700, costGrowth: 1.31, desc: 'Improves laundering efficiency.', portrait: 'assets/characters/worker-accountant.png' },
      { id: 'security', name: 'Security', baseCost: 2400, costGrowth: 1.29, desc: 'Cuts heat and raid losses.', portrait: 'assets/characters/worker-security.png' },
      { id: 'hackers', name: 'Hackers', baseCost: 5600, costGrowth: 1.34, desc: 'Stabilizes markets and events.', portrait: 'assets/characters/worker-hacker.png' }
    ],
    districts: [
      { id: 'school', name: 'School Grounds', unlockCost: 0, saleBonus: 1.0, heatMod: 1.0, desc: 'Starter local route.' },
      { id: 'downtown', name: 'Downtown', unlockCost: 11000, saleBonus: 1.08, heatMod: 1.08, desc: 'Dense customer flow.' },
      { id: 'industrial', name: 'Industrial District', unlockCost: 30000, saleBonus: 1.14, heatMod: 1.12, desc: 'Storage and logistics.' },
      { id: 'harbor', name: 'Harbor', unlockCost: 82000, saleBonus: 1.21, heatMod: 1.19, desc: 'Wide routes, higher patrols.' },
      { id: 'airport', name: 'Airport', unlockCost: 190000, saleBonus: 1.31, heatMod: 1.28, desc: 'High margin expansion lane.' },
      { id: 'underground', name: 'Underground Market', unlockCost: 380000, saleBonus: 1.45, heatMod: 1.36, desc: 'Top-tier buyers and risk.' }
    ],
    events: [
      { id: 'inspection_scare', name: 'Inspection Scare', duration: 75, desc: 'Patrol pressure rises.', heatDelta: 9, priceMod: 0.95 },
      { id: 'market_boom', name: 'Market Boom', duration: 100, desc: 'Demand spikes city-wide.', heatDelta: 4, priceMod: 1.2 },
      { id: 'supply_shortage', name: 'Supply Shortage', duration: 95, desc: 'Scarcity raises prices.', heatDelta: 6, priceMod: 1.13 },
      { id: 'security_breach', name: 'Security Breach', duration: 70, desc: 'Operational leak adds risk.', heatDelta: 14, priceMod: 0.92 },
      { id: 'big_party', name: 'Big Party', duration: 85, desc: 'Weekend demand surge.', heatDelta: 7, priceMod: 1.17 },
      { id: 'supply_glut', name: 'Supply Glut', duration: 95, desc: 'Oversupply weakens margins.', heatDelta: -3, priceMod: 0.88 }
    ],
    achievements: [
      { id: 'first_sale', name: 'First Exchange', desc: 'Make your first sale.', goal: 'lifetimeSales', target: 120, rewardType: 'cleanMoney', reward: 100 },
      { id: 'street_grinder', name: 'Street Grinder', desc: 'Run 40 street deals.', goal: 'streetDeals', target: 40, rewardType: 'cleanMoney', reward: 250 },
      { id: 'weed_runner', name: 'Local Green', desc: 'Sell 600 units of weed products.', goal: 'weedSold', target: 600, rewardType: 'cleanMoney', reward: 900 },
      { id: 'starter_growth', name: 'Street Presence', desc: 'Reach $9,000 total sales.', goal: 'lifetimeSales', target: 9000, rewardType: 'priceBoost', reward: 0.02 },
      { id: 'front_owner', name: 'Front Owner', desc: 'Buy your first laundering front.', goal: 'frontsOwned', target: 1, rewardType: 'cleanMoney', reward: 1000 },
      { id: 'district_climber', name: 'Territory Runner', desc: 'Unlock 3 districts.', goal: 'districtsOwned', target: 3, rewardType: 'heatDown', reward: 9 },
      { id: 'workforce', name: 'Crew Builder', desc: 'Hire 40 workers total.', goal: 'workersTotal', target: 40, rewardType: 'cleanMoney', reward: 5200 },
      { id: 'launder_legend', name: 'Clean Ledger', desc: 'Launder $220,000 total.', goal: 'lifetimeLaundered', target: 220000, rewardType: 'launderBoost', reward: 0.1 },
      { id: 'empire_core', name: 'Empire Core', desc: 'Own 100 workers and all districts.', goal: 'empireCore', target: 1, rewardType: 'saleBoost', reward: 0.08 }
    ]
  };

  DDS.progression = {
    systems: {
      production: 3200,
      workers: 7500,
      districts: 14000,
      fronts: 19000,
      upgrades: 25000,
      events: 32000
    },
    marketItems: {
      baggie_weed: 0,
      pre_roll_joints: 700,
      thc_edibles: 2400,
      thc_vape_carts: 7000,
      nicotine_pods: 14000,
      mdma_ecstasy: 30000,
      lsd_tabs: 52000,
      cocaine: 90000,
      methamphetamine: 170000,
      heroin: 280000
    },
    productionItems: {
      baggie_weed: 3200,
      pre_roll_joints: 7500,
      thc_edibles: 13000,
      thc_vape_carts: 22000,
      nicotine_pods: 33000,
      mdma_ecstasy: 52000,
      lsd_tabs: 74000,
      cocaine: 120000,
      methamphetamine: 210000,
      heroin: 320000
    },
    workers: {
      dealers: 7500,
      chemists: 16000,
      security: 24000,
      smugglers: 36000,
      accountants: 52000,
      hackers: 90000
    },
    upgrades: {
      mixing_tables: 25000,
      sealed_kits: 30000,
      quiet_drops: 37000,
      auto_dispatch: 50000,
      premium_cut: 68000
    },
    fronts: {
      car_wash: 19000,
      arcade: 36000,
      laundromat: 70000,
      food_truck: 140000,
      car_dealer: 280000
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
      cleanMoney: 180,
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
      weedSold: 0,
      dealer: {
        rank: 1,
        selectedItemId: 'baggie_weed',
        cooldownUntil: 0,
        cooldownStartedAt: 0,
        cooldownDurationMs: 0,
        lineRef: 'r17'
      },
      systems: {
        production: false,
        workers: false,
        districts: false,
        fronts: false,
        upgrades: false,
        events: false
      },
      panelState: {
        production: false,
        workers: false,
        districts: false,
        fronts: false,
        upgrades: false,
        heat: false
      },
      settings,
      currentSlot: 1,
      lastSaveTime: Date.now(),
      lastTrustedTime: Date.now(),
      meterToken: 473
    };
  };

  DDS.state = DDS.makeFreshState();

  DDS.game = {
    selectDealItem(itemId) {
      const item = DDS.data.items.find((x) => x.id === itemId);
      if (!item) return;
      DDS.state.dealer.selectedItemId = itemId;
    },

    runStreetDeal() {
      const st = DDS.state;
      const now = Date.now();

      if (now < st.dealer.cooldownUntil) {
        DDS.ui.notify('Deal is cooling down.', 'warn');
        return;
      }

      const selectedId = st.dealer.selectedItemId || 'baggie_weed';
      const item = DDS.data.items.find((x) => x.id === selectedId);
      if (!item) return;

      if (!DDS.production.isMarketUnlocked(item.id)) {
        DDS.ui.notify('This product is not unlocked for your street route yet.', 'warn');
        return;
      }

      const stock = st.inventory[item.id] || 0;
      if (stock <= 0) {
        DDS.ui.notify(`No ${item.name} in stock. Buy supply first.`, 'warn');
        return;
      }

      st.inventory[item.id] -= 1;

      const rankBonus = 1 + st.dealer.rank * 0.018;
      const swing = 0.93 + Math.random() * 0.18;
      const saleValue = DDS.economy.unitPrice(item) * rankBonus * swing;
      st.dirtyMoney += saleValue;
      st.lifetimeSales += saleValue;
      st.streetDeals += 1;
      if (item.tier <= 4) st.weedSold += 1;

      const quietCut = 1 - (st.upgrades.quiet_drops || 0) * 0.06;
      const layLowMod = now < st.layLowUntil ? 0.82 : 1;
      const heatGain = item.baseHeat * (0.52 + item.tier * 0.04) * Math.max(0.32, quietCut) * DDS.map.heatMultiplier() * layLowMod;
      st.heat = Math.min(100, st.heat + heatGain);

      const nextRankSales = st.dealer.rank * 7000;
      if (st.streetDeals % 18 === 0 || st.lifetimeSales >= nextRankSales) {
        st.dealer.rank += 1;
        DDS.ui.notify(`Dealer rank up: ${st.dealer.rank}`);
      }

      let cooldownSec = Math.max(1.35, 5.6 + item.tier * 0.24 - st.dealer.rank * 0.11);
      if (now < st.layLowUntil) cooldownSec *= 1.08;
      st.dealer.cooldownStartedAt = now;
      st.dealer.cooldownDurationMs = cooldownSec * 1000;
      st.dealer.cooldownUntil = now + st.dealer.cooldownDurationMs;

      DDS.ui.log(`Street deal: 1 ${item.name} sold for ${DDS.ui.money(saleValue)}.`);
    },

    unlockSystems() {
      const st = DDS.state;
      const thresholds = DDS.progression.systems;
      const unlockMessages = {
        production: 'Products unlocked. You can start your own production lines.',
        workers: 'Crew unlocked. Hiring is now available.',
        districts: 'Districts unlocked. Territory expansion is now available.',
        fronts: 'Fronts unlocked. Passive laundering is now available.',
        upgrades: 'Upgrades unlocked. Efficiency scaling is now available.',
        events: 'Market events unlocked.'
      };

      Object.keys(thresholds).forEach((key) => {
        if (st.systems[key]) return;
        if (st.lifetimeSales < thresholds[key]) return;
        st.systems[key] = true;
        st.panelState[key] = false;
        if (key === 'production') st.unlockedItems.baggie_weed = true;
        DDS.ui.notify(unlockMessages[key]);
        DDS.ui.log(unlockMessages[key]);
      });
    },

    unlockItem(id) {
      const item = DDS.data.items.find((x) => x.id === id);
      if (!item || DDS.state.unlockedItems[id]) return;

      if (!DDS.state.systems.production) {
        DDS.ui.notify('Products are not unlocked yet.', 'warn');
        return;
      }

      if (!DDS.production.canUnlockProductionLine(id)) {
        const needed = DDS.production.productionUnlockSales(id);
        DDS.ui.notify(`Need ${DDS.ui.money(needed)} lifetime sales for this line.`, 'warn');
        return;
      }

      if (DDS.state.cleanMoney < item.unlockCost) {
        DDS.ui.notify('Not enough clean money.', 'warn');
        return;
      }

      DDS.state.cleanMoney -= item.unlockCost;
      DDS.state.unlockedItems[id] = true;
      DDS.ui.log(`Unlocked production line: ${item.name}.`);
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

    togglePanel(panelId) {
      const st = DDS.state;
      st.panelState[panelId] = !st.panelState[panelId];
      DDS.ui.applyPanelState(panelId);
    },

    simulateOffline(seconds) {
      if (!seconds) return;
      const loops = Math.min(2400, Math.floor(seconds));
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
      if (Math.random() > 0.026) return;
      const sec = st.workers.security || 0;
      const lossScale = Math.max(0.18, 1 - sec * 0.01);
      const dirtyLoss = st.dirtyMoney * (0.16 * lossScale);
      st.dirtyMoney -= dirtyLoss;
      st.heat = Math.max(48, st.heat - 23);
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
      DDS.ui.notify('Debug action applied.');
    },

    tick(deltaSec, offline) {
      const st = DDS.state;

      if (Date.now() < st.layLowUntil) {
        st.heat = Math.max(0, st.heat - 0.62 * deltaSec);
      }

      const passiveCool = 0.04 + (st.workers.security || 0) * 0.0012;
      st.heat = Math.max(0, st.heat - passiveCool * deltaSec);

      DDS.production.tick(deltaSec);
      DDS.laundering.tick(deltaSec);
      DDS.economy.tick(deltaSec);
      if (st.systems.events) DDS.events.tick(deltaSec);
      DDS.achievements.check();
      this.unlockSystems();
      this.raidCheck();

      st.heat = Math.min(100, Math.max(0, st.heat));
      if (!offline) DDS.ui.renderAll();
    },

    uiRefreshMs() {
      const q = DDS.state.settings.graphicsQuality;
      if (q === 'low') return 480;
      if (q === 'high') return 110;
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