window.DDS = window.DDS || {};
(function () {
  DDS.production = {
    clickProduce(itemId) {
      const st = DDS.state;
      if (!st.unlockedItems[itemId]) return;
      const item = DDS.data.items.find((x) => x.id === itemId);
      st.inventory[itemId] += 1;
      const heatMod = 1 - (st.upgrades.quiet_drops || 0) * 0.06;
      st.heat += item.baseHeat * Math.max(0.3, heatMod) * DDS.map.heatMultiplier();
      DDS.ui.log(`Produced 1 ${item.name}.`);
    },
    tick(deltaSec) {
      const st = DDS.state;
      const chemists = st.workers.chemists || 0;
      const dealers = st.workers.dealers || 0;
      const autoUpgrade = st.upgrades.auto_dispatch || 0;
      const prodSpeed = 1 + chemists * 0.03 + (st.upgrades.mixing_tables || 0) * 0.11;

      DDS.data.items.forEach((item) => {
        if (!st.unlockedItems[item.id]) return;
        st.prodProgress[item.id] = st.prodProgress[item.id] || 0;
        st.prodProgress[item.id] += (deltaSec * prodSpeed) / item.baseTime;

        const autoByDealers = Math.floor(dealers * 0.04);
        const autoAmount = autoByDealers + autoUpgrade;
        if (autoAmount <= 0) return;

        while (st.prodProgress[item.id] >= 1) {
          st.prodProgress[item.id] -= 1;
          st.inventory[item.id] += autoAmount;
          const heatMod = 1 - (st.upgrades.quiet_drops || 0) * 0.06;
          st.heat += item.baseHeat * Math.max(0.3, heatMod) * 0.35;
        }
      });

      st.heat = Math.max(0, Math.min(100, st.heat));
    },
    sellAll() {
      const st = DDS.state;
      let sale = 0;
      DDS.data.items.forEach((item) => {
        const qty = st.inventory[item.id] || 0;
        if (!qty) return;
        sale += qty * DDS.economy.unitPrice(item);
        st.inventory[item.id] = 0;
      });
      if (sale <= 0) {
        DDS.ui.notify('No inventory to sell.', 'warn');
        return;
      }
      const securityMitigation = (st.workers.security || 0) * 0.003;
      st.dirtyMoney += sale;
      st.lifetimeSales += sale;
      st.heat += Math.max(0.8, 3.4 - securityMitigation * 10);
      DDS.ui.notify(`Sold inventory for ${DDS.ui.money(sale)} dirty cash.`);
      DDS.ui.log(`Market sale completed: ${DDS.ui.money(sale)}.`);
    }
  };
})();
