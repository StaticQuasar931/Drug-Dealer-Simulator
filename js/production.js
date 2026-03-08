window.DDS = window.DDS || {};
(function () {
  DDS.production = {
    marketUnlockSales(itemId) {
      return DDS.progression.marketItems[itemId] || 0;
    },

    isMarketUnlocked(itemId) {
      const item = DDS.data.items.find((x) => x.id === itemId);
      if (!item) return false;
      return DDS.state.lifetimeSales >= this.marketUnlockSales(itemId);
    },

    productionUnlockSales(itemId) {
      return DDS.progression.productionItems[itemId] || 0;
    },

    canUnlockProductionLine(itemId) {
      if (!DDS.state.systems.production) return false;
      return DDS.state.lifetimeSales >= this.productionUnlockSales(itemId);
    },

    buySupply(itemId, qty) {
      const st = DDS.state;
      const item = DDS.data.items.find((x) => x.id === itemId);
      if (!item) return;
      if (!this.isMarketUnlocked(itemId)) {
        DDS.ui.notify('This product is not available yet.', 'warn');
        return;
      }

      const amount = Math.max(1, Math.floor(qty));
      const cost = DDS.economy.supplyCost(item, amount);
      if (st.cleanMoney < cost) {
        DDS.ui.notify('Not enough clean money for this buy.', 'warn');
        return;
      }

      st.cleanMoney -= cost;
      st.inventory[item.id] += amount;
      const heatLift = item.baseHeat * 0.11 * Math.sqrt(amount);
      st.heat = Math.min(100, st.heat + heatLift);
      DDS.ui.log(`Bought ${amount} ${item.name} for ${DDS.ui.money(cost)}.`);
    },

    clickProduce(itemId) {
      const st = DDS.state;
      if (!st.systems.production) {
        DDS.ui.notify('Products are not unlocked yet.', 'warn');
        return;
      }
      if (!st.unlockedItems[itemId]) {
        DDS.ui.notify('Unlock this production line first.', 'warn');
        return;
      }

      const item = DDS.data.items.find((x) => x.id === itemId);
      st.inventory[itemId] += 1;
      const heatMod = 1 - (st.upgrades.quiet_drops || 0) * 0.06;
      st.heat += item.baseHeat * Math.max(0.3, heatMod) * DDS.map.heatMultiplier();
      DDS.ui.log(`Produced 1 ${item.name}.`);
    },

    tick(deltaSec) {
      const st = DDS.state;
      if (!st.systems.production) return;

      const chemists = st.workers.chemists || 0;
      const dealers = st.workers.dealers || 0;
      const autoUpgrade = st.upgrades.auto_dispatch || 0;
      const prodSpeed = 1 + chemists * 0.028 + (st.upgrades.mixing_tables || 0) * 0.09;

      DDS.data.items.forEach((item) => {
        if (!st.unlockedItems[item.id]) return;

        st.prodProgress[item.id] = st.prodProgress[item.id] || 0;
        st.prodProgress[item.id] += (deltaSec * prodSpeed) / item.baseTime;

        const autoByDealers = Math.floor(dealers * 0.028);
        const autoAmount = autoByDealers + autoUpgrade;
        if (autoAmount <= 0) return;

        while (st.prodProgress[item.id] >= 1) {
          st.prodProgress[item.id] -= 1;
          st.inventory[item.id] += autoAmount;
          const heatMod = 1 - (st.upgrades.quiet_drops || 0) * 0.06;
          st.heat += item.baseHeat * Math.max(0.3, heatMod) * 0.33;
        }
      });

      st.heat = Math.max(0, Math.min(100, st.heat));
    },

    sellAll() {
      const st = DDS.state;
      let sale = 0;
      let weedUnits = 0;

      DDS.data.items.forEach((item) => {
        const qty = st.inventory[item.id] || 0;
        if (!qty) return;
        const itemSale = qty * DDS.economy.unitPrice(item);
        sale += itemSale;
        if (item.tier <= 4) weedUnits += qty;
        st.inventory[item.id] = 0;
      });

      if (sale <= 0) {
        DDS.ui.notify('No inventory to sell.', 'warn');
        return;
      }

      const securityMitigation = (st.workers.security || 0) * 0.003;
      st.dirtyMoney += sale;
      st.lifetimeSales += sale;
      st.weedSold += weedUnits;
      st.heat += Math.max(0.9, 3.1 - securityMitigation * 10);
      DDS.ui.notify(`Sold inventory for ${DDS.ui.money(sale)} dirty cash.`);
      DDS.ui.log(`Bulk inventory sale completed: ${DDS.ui.money(sale)}.`);
    }
  };
})();