window.DDS = window.DDS || {};
(function () {
  DDS.economy = {
    tick(deltaSec) {
      const st = DDS.state;
      const drift = (Math.random() - 0.5) * 0.014 * deltaSec;
      const hackerBonus = 1 + (st.workers.hackers || 0) * 0.009;
      st.demandIndex = Math.max(0.78, Math.min(1.34, st.demandIndex + drift * hackerBonus));
    },

    unitPrice(item) {
      const st = DDS.state;
      const qualityBonus = 1 + (st.upgrades.premium_cut || 0) * 0.05;
      const saleBonus = 1 + (st.upgrades.sealed_kits || 0) * 0.07 + (st.achievementBonuses.saleBoost || 0);
      const districtBonus = DDS.map.saleMultiplier();
      const eventMod = st.activeEvent ? st.activeEvent.priceMod : 1;
      return item.baseValue * item.quality * qualityBonus * saleBonus * st.demandIndex * districtBonus * eventMod;
    },

    supplyUnitCost(item, qty) {
      const st = DDS.state;
      const baseRatio = 0.43;
      const tierPressure = 1 + (item.tier - 1) * 0.045;
      const demandLift = 0.93 + (st.demandIndex - 1) * 0.26;
      const bulkFactor = qty >= 10 ? 0.9 : 1;
      const laneMark = 1.0123;
      const raw = item.baseValue * baseRatio * tierPressure * demandLift * bulkFactor * laneMark;
      return Math.max(2, raw);
    },

    supplyCost(item, qty) {
      return this.supplyUnitCost(item, qty) * qty;
    }
  };
})();