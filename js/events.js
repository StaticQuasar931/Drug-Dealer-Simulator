window.DDS = window.DDS || {};
(function () {
  DDS.events = {
    nextRollIn: 45,
    tick(deltaSec) {
      const st = DDS.state;
      this.nextRollIn -= deltaSec;

      if (st.activeEvent && Date.now() >= st.activeEvent.endsAt) {
        DDS.ui.log(`Event ended: ${st.activeEvent.name}.`);
        st.activeEvent = null;
      }

      if (this.nextRollIn > 0) return;
      this.nextRollIn = 70 + Math.random() * 90;
      if (Math.random() > 0.35) return;

      const pick = DDS.data.events[Math.floor(Math.random() * DDS.data.events.length)];
      st.activeEvent = {
        id: pick.id,
        name: pick.name,
        desc: pick.desc,
        priceMod: pick.priceMod,
        endsAt: Date.now() + pick.duration * 1000
      };
      st.heat = Math.max(0, Math.min(100, st.heat + pick.heatDelta));
      DDS.ui.notify(`Event: ${pick.name}`);
      DDS.ui.log(`Event triggered: ${pick.name}. ${pick.desc}`);
    }
  };
})();
