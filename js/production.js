window.DDS = window.DDS || {};
(function () {
  DDS.production = {
    clickProduce(itemId) {
      const st = DDS.state;
      if (!st.unlockedItems[itemId]) return;
      const item = DDS.data.items.find((x) => x.id === itemId);
      st.inventory[itemId] += 1;
      const heatMod = 1 - (st.upgrades.quiet_drops || 0) * 0.08;
      st.heat += item.baseHeat * Math.max(0.2, heatMod) * DDS.map.heatMultiplier();
      DDS.ui.log(`Produced ${item.name}.`);
    },
    tick(deltaSec) {
      const st = DDS.state;
      const chemists = st.workers.chemists || 0;
      const autoUpgrade = st.upgrades.auto_dispatch || 0;
      const prodSpeed = 1 + chemists * 0.04 + (st.upgrades.mixing_tables || 0) * 0.15;
      DDS.data.items.forEach((item) => {
        if (!st.unlockedItems[item.id]) return;
        st.prodProgress[item.id] = st.prodProgress[item.id] || 0;
        st.prodProgress[item.id] += (deltaSec * prodSpeed) / item.baseTime;
        const autoByDealers = Math.floor((st.workers.dealers || 0) * 0.06);
        const autoAmount = autoByDealers + autoUpgrade;
        while (st.prodProgress[item.id] >= 1) {
          st.prodProgress[item.id] -= 1;
          st.inventory[item.id] += Math.max(1, autoAmount);
          const heatMod = 1 - (st.upgrades.quiet_drops || 0) * 0.08;
          st.heat += item.baseHeat * Math.max(0.2, heatMod) * 0.55;
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
        const unitPrice = DDS.economy.unitPrice(item);
        sale += qty * unitPrice;
        st.inventory[item.id] = 0;
      });
      if (sale <= 0) {
        DDS.ui.notify('No inventory to sell.', 'warn');
        return;
      }
      const securityMitigation = (st.workers.security || 0) * 0.002;
      st.dirtyMoney += sale;
      st.lifetimeSales += sale;
      st.heat += Math.max(1, 5 - securityMitigation * 12);
      DDS.ui.notify(`Sold inventory for ${DDS.ui.money(sale)} dirty cash.`);
      DDS.ui.log(`Market sale completed: ${DDS.ui.money(sale)}.`);
    }
  };
})();
