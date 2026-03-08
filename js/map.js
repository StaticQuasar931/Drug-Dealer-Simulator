window.DDS = window.DDS || {};
(function () {
  DDS.map = {
    unlock(districtId) {
      const st = DDS.state;
      if (!st.systems.districts) {
        DDS.ui.notify('District expansion not unlocked yet.', 'warn');
        return;
      }
      const d = DDS.data.districts.find((x) => x.id === districtId);
      if (!d || st.unlockedDistricts.includes(districtId)) return;
      if (st.cleanMoney < d.unlockCost) {
        DDS.ui.notify('Not enough clean money for district unlock.', 'warn');
        return;
      }
      st.cleanMoney -= d.unlockCost;
      st.unlockedDistricts.push(districtId);
      DDS.ui.log(`Unlocked district: ${d.name}.`);
    },
    saleMultiplier() {
      const st = DDS.state;
      let best = 1;
      st.unlockedDistricts.forEach((id) => {
        const d = DDS.data.districts.find((x) => x.id === id);
        if (d) best = Math.max(best, d.saleBonus);
      });
      return best * (1 + (st.workers.smugglers || 0) * 0.011);
    },
    heatMultiplier() {
      const st = DDS.state;
      let maxHeat = 1;
      st.unlockedDistricts.forEach((id) => {
        const d = DDS.data.districts.find((x) => x.id === id);
        if (d) maxHeat = Math.max(maxHeat, d.heatMod);
      });
      return maxHeat;
    }
  };
})();
