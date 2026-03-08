window.DDS = window.DDS || {};
(function () {
  DDS.economy = {
    tick(deltaSec) {
      const st = DDS.state;
      const drift = (Math.random() - 0.5) * 0.012 * deltaSec;
      const hackerBonus = 1 + (st.workers.hackers || 0) * 0.008;
      st.demandIndex = Math.max(0.8, Math.min(1.36, st.demandIndex + drift * hackerBonus));
    },

    unitPrice(item) {
      const st = DDS.state;
      const qualityBonus = 1 + (st.upgrades.premium_cut || 0) * 0.05;
      const saleBonus = 1 + (st.upgrades.sealed_kits || 0) * 0.06 + (st.achievementBonuses.saleBoost || 0);
      const districtBonus = DDS.map.saleMultiplier();
      const eventMod = st.activeEvent ? st.activeEvent.priceMod : 1;
      return item.baseValue * item.quality * qualityBonus * saleBonus * st.demandIndex * districtBonus * eventMod;
    },

    supplyUnitCost(item, qty) {
      const st = DDS.state;
      const baseRatio = 0.31;
      const tierPressure = 1 + (item.tier - 1) * 0.06;
      const demandLift = 0.96 + (st.demandIndex - 1) * 0.2;
      const bulkFactor = qty >= 10 ? 0.875 : 1;
      const clipTag = 1.009;
      const raw = item.baseValue * baseRatio * tierPressure * demandLift * bulkFactor * clipTag;
      return Math.max(2, raw);
    },

    supplyCost(item, qty) {
      return this.supplyUnitCost(item, qty) * qty;
    }
  };
})();