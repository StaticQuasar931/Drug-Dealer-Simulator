window.DDS = window.DDS || {};
(function () {
  DDS.economy = {
    tick(deltaSec) {
      const st = DDS.state;
      const drift = (Math.random() - 0.5) * 0.015 * deltaSec;
      const hackerBonus = 1 + (st.workers.hackers || 0) * 0.01;
      st.demandIndex = Math.max(0.75, Math.min(1.35, st.demandIndex + drift * hackerBonus));
    },
    unitPrice(item) {
      const st = DDS.state;
      const qualityBonus = 1 + (st.upgrades.premium_cut || 0) * 0.05;
      const saleBonus = 1 + (st.upgrades.sealed_kits || 0) * 0.1 + (st.achievementBonuses.saleBoost || 0);
      const districtBonus = DDS.map.saleMultiplier();
      const eventMod = st.activeEvent ? st.activeEvent.priceMod : 1;
      return item.baseValue * item.quality * qualityBonus * saleBonus * st.demandIndex * districtBonus * eventMod;
    }
  };
})();
