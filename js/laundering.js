window.DDS = window.DDS || {};
(function () {
  DDS.laundering = {
    fronts: [
      { id: 'car_wash', name: 'Car Wash', cost: 2400, rate: 85, efficiency: 0.75, heatDrop: 1.5, desc: 'Cheap front, lower pass rate.' },
      { id: 'arcade', name: 'Arcade', cost: 6600, rate: 165, efficiency: 0.81, heatDrop: 1.3, desc: 'Balanced pass-through and cover.' },
      { id: 'laundromat', name: 'Laundromat', cost: 15000, rate: 300, efficiency: 0.87, heatDrop: 1.7, desc: 'Strong volume with low profile.' },
      { id: 'food_truck', name: 'Food Truck', cost: 32000, rate: 450, efficiency: 0.85, heatDrop: 2.1, desc: 'Good heat management, mobile cover.' },
      { id: 'car_dealer', name: 'Car Dealership', cost: 76000, rate: 780, efficiency: 0.93, heatDrop: 1.1, desc: 'Best volume and efficiency.' }
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

      const cap = 420 + (st.workers.accountants || 0) * 40;
      const amount = Math.min(st.dirtyMoney, cap);
      const fixerCut = Math.max(0.08, 0.22 - (st.workers.accountants || 0) * 0.002);
      const streetTax = 0.06;
      const cleanRate = Math.max(0.52, 1 - fixerCut - streetTax);
      const cleaned = amount * cleanRate;

      st.dirtyMoney -= amount;
      st.cleanMoney += cleaned;
      st.lifetimeLaundered += cleaned;
      st.heat = Math.max(0, st.heat - 1.2);

      DDS.ui.notify(`Fixer washed ${DDS.ui.money(cleaned)} after ${Math.round((1 - cleanRate) * 100)}% cut.`);
      DDS.ui.log(`Manual wash route used. Fixer cut ${Math.round(fixerCut * 100)}%, tax ${Math.round(streetTax * 100)}%.`);
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
        DDS.ui.notify('Not enough clean money for this front.', 'warn');
        return;
      }
      st.cleanMoney -= front.cost;
      st.frontsOwned[frontId] = true;
      DDS.ui.log(`Purchased laundering front: ${front.name}.`);
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

      avgEff = (avgEff / count) + (st.workers.accountants || 0) * 0.0018 + (st.achievementBonuses.launderBoost || 0);
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