window.DDS = window.DDS || {};
(function () {
  DDS.achievements = {
    reward(a) {
      const st = DDS.state;
      if (a.rewardType === 'cleanMoney') st.cleanMoney += a.reward;
      if (a.rewardType === 'priceBoost') st.achievementBonuses.saleBoost += a.reward;
      if (a.rewardType === 'heatDown') st.heat = Math.max(0, st.heat - a.reward);
      if (a.rewardType === 'launderBoost') st.achievementBonuses.launderBoost += a.reward;
      if (a.rewardType === 'saleBoost') st.achievementBonuses.saleBoost += a.reward;
    },
    check() {
      const st = DDS.state;
      DDS.data.achievements.forEach((a) => {
        if (st.completedAchievements.includes(a.id)) return;
        let met = false;
        if (a.goal === 'lifetimeSales') met = st.lifetimeSales >= a.target;
        if (a.goal === 'frontsOwned') met = Object.values(st.frontsOwned).filter(Boolean).length >= a.target;
        if (a.goal === 'districtsOwned') met = st.unlockedDistricts.length >= a.target;
        if (a.goal === 'workersTotal') met = DDS.workers.totalCount() >= a.target;
        if (a.goal === 'raidThenCool') met = st.hasReachedRaidRisk && st.heat <= 15;
        if (a.goal === 'lifetimeLaundered') met = st.lifetimeLaundered >= a.target;
        if (a.goal === 'empireCore') met = DDS.workers.totalCount() >= 100 && st.unlockedDistricts.length === DDS.data.districts.length;
        if (!met) return;
        st.completedAchievements.push(a.id);
        this.reward(a);
        DDS.ui.notify(`Achievement unlocked: ${a.name}`);
        DDS.ui.log(`Achievement reward applied: ${a.name}.`);
      });
    }
  };
})();
