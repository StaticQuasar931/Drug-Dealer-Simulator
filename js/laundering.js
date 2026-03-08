window.DDS = window.DDS || {};
(function () {
  DDS.laundering = {
    fronts: [
      { id: 'car_wash', name: 'Car Wash', cost: 2400, rate: 90, efficiency: 0.76, heatDrop: 1.5, desc: 'Cheapest front. Slow and inefficient.' },
      { id: 'arcade', name: 'Arcade', cost: 6600, rate: 170, efficiency: 0.82, heatDrop: 1.3, desc: 'Balanced throughput and profile.' },
      { id: 'laundromat', name: 'Laundromat', cost: 15000, rate: 300, efficiency: 0.87, heatDrop: 1.7, desc: 'Strong volume and low profile.' },
      { id: 'food_truck', name: 'Food Truck', cost: 32000, rate: 450, efficiency: 0.86, heatDrop: 2.1, desc: 'Strong heat management.' },
      { id: 'car_dealer', name: 'Car Dealership', cost: 76000, rate: 800, efficiency: 0.93, heatDrop: 1.1, desc: 'Best efficiency and scale.' }
    ],
    unlockRequirement(frontId) {
      return DDS.progression.fronts[frontId] || 0;
    },
    isUnlocked(frontId) {
      if (!DDS.state.systems.fronts) return false;
      return DDS.state.lifetimeSales >= this.unlockRequirement(frontId);
    },
    manualLaunder() {
      const st = DDS.state;
      if (st.dirtyMoney <= 0) {
        DDS.ui.notify('No dirty money to wash.', 'warn');
        return;
      }
      const cap = 420 + (st.workers.accountants || 0) * 35;
      const amount = Math.min(st.dirtyMoney, cap);
      const efficiency = 0.33 + (st.workers.accountants || 0) * 0.004;
      const cleaned = amount * Math.min(0.6, efficiency);
      st.dirtyMoney -= amount;
      st.cleanMoney += cleaned;
      st.lifetimeLaundered += cleaned;
      st.heat = Math.max(0, st.heat - 1.1);
      DDS.ui.notify(`Washed ${DDS.ui.money(cleaned)} clean money.`);
    },
    buy(frontId) {
      const st = DDS.state;
      const front = this.fronts.find((f) => f.id === frontId);
      if (!front || st.frontsOwned[frontId]) return;
      if (!this.isUnlocked(frontId)) {
        DDS.ui.notify('Front not unlocked yet.', 'warn');
        return;
      }
      if (st.cleanMoney < front.cost) {
        DDS.ui.notify('Not enough clean money for front.', 'warn');
        return;
      }
      st.cleanMoney -= front.cost;
      st.frontsOwned[frontId] = true;
      DDS.ui.log(`Purchased front: ${front.name}.`);
    },
    tick(deltaSec) {
      const st = DDS.state;
      if (!st.systems.fronts) return;
      let totalRate = 0;
      let avgEff = 0;
      let avgHeatDrop = 0;
      let count = 0;
      this.fronts.forEach((f) => {
        if (!st.frontsOwned[f.id]) return;
        totalRate += f.rate;
        avgEff += f.efficiency;
        avgHeatDrop += f.heatDrop;
        count += 1;
      });
      if (!count || st.dirtyMoney <= 0) return;
      avgEff = (avgEff / count) + (st.workers.accountants || 0) * 0.0015 + (st.achievementBonuses.launderBoost || 0);
      avgHeatDrop = avgHeatDrop / count;
      const launderAmount = Math.min(st.dirtyMoney, totalRate * deltaSec);
      const cleanAmount = launderAmount * Math.min(0.97, avgEff);
      st.dirtyMoney -= launderAmount;
      st.cleanMoney += cleanAmount;
      st.lifetimeLaundered += cleanAmount;
      st.heat = Math.max(0, st.heat - avgHeatDrop * deltaSec * 0.06);
    }
  };
})();
