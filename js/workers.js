window.DDS = window.DDS || {};
(function () {
  DDS.workers = {
    unlockRequirement(workerId) {
      return DDS.progression.workers[workerId] || 0;
    },
    isUnlocked(workerId) {
      if (!DDS.state.systems.workers) return false;
      return DDS.state.lifetimeSales >= this.unlockRequirement(workerId);
    },
    cost(workerId) {
      const st = DDS.state;
      const def = DDS.data.workers.find((w) => w.id === workerId);
      const count = st.workers[workerId] || 0;
      return Math.floor(def.baseCost * Math.pow(def.costGrowth, count));
    },
    hire(workerId) {
      const st = DDS.state;
      if (!this.isUnlocked(workerId)) {
        DDS.ui.notify('Worker not unlocked yet.', 'warn');
        return;
      }
      const price = this.cost(workerId);
      if (st.cleanMoney < price) {
        DDS.ui.notify('Not enough clean money.', 'warn');
        return;
      }
      st.cleanMoney -= price;
      st.workers[workerId] = (st.workers[workerId] || 0) + 1;
      DDS.ui.log(`Hired ${workerId}.`);
    },
    totalCount() {
      return Object.values(DDS.state.workers).reduce((a, b) => a + b, 0);
    }
  };
})();
