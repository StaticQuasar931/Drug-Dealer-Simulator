window.DDS = window.DDS || {};
(function () {
  DDS.laundering = {
    fronts: [
      { id: 'car_wash', name: 'Car Wash', cost: 900, rate: 180, efficiency: 0.82, heatDrop: 1.8, desc: 'Fast, lower efficiency.' },
      { id: 'arcade', name: 'Arcade', cost: 2200, rate: 260, efficiency: 0.86, heatDrop: 1.4, desc: 'Balanced all around.' },
      { id: 'laundromat', name: 'Laundromat', cost: 4800, rate: 410, efficiency: 0.9, heatDrop: 1.7, desc: 'Strong throughput.' },
      { id: 'food_truck', name: 'Food Truck', cost: 8600, rate: 560, efficiency: 0.88, heatDrop: 2.2, desc: 'Great heat relief.' },
      { id: 'car_dealer', name: 'Car Dealership', cost: 18000, rate: 930, efficiency: 0.93, heatDrop: 1.2, desc: 'Best efficiency, expensive.' }
    ],
    buy(frontId) {
      const st = DDS.state;
      const front = this.fronts.find((f) => f.id === frontId);
      if (!front || st.frontsOwned[frontId]) return;
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
      avgEff = (avgEff / count) + (st.workers.accountants || 0) * 0.002 + (st.achievementBonuses.launderBoost || 0);
      avgHeatDrop = avgHeatDrop / count;
      const launderAmount = Math.min(st.dirtyMoney, totalRate * deltaSec);
      const cleanAmount = launderAmount * Math.min(0.98, avgEff);
      st.dirtyMoney -= launderAmount;
      st.cleanMoney += cleanAmount;
      st.lifetimeLaundered += cleanAmount;
      st.heat = Math.max(0, st.heat - avgHeatDrop * deltaSec * 0.08);
    }
  };
})();
