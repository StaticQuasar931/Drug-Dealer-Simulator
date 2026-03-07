window.DDS = window.DDS || {};
(function () {
  DDS.save = {
    key(slot) {
      return `dds2_save_slot_${slot}`;
    },
    manualSave() {
      const st = DDS.state;
      st.lastSaveTime = Date.now();
      st.lastTrustedTime = Date.now();
      localStorage.setItem(this.key(st.currentSlot), JSON.stringify(st));
      DDS.ui.notify(`Saved slot ${st.currentSlot}.`);
    },
    autoSave() {
      const st = DDS.state;
      st.lastSaveTime = Date.now();
      st.lastTrustedTime = Date.now();
      localStorage.setItem(this.key(st.currentSlot), JSON.stringify(st));
    },
    load(slot) {
      const raw = localStorage.getItem(this.key(slot));
      if (!raw) return false;
      const loaded = JSON.parse(raw);
      const safeOffline = DDS.antiCheat.computeSafeOfflineSeconds(Date.now(), loaded.lastSaveTime, loaded.lastTrustedTime);
      DDS.state = Object.assign(DDS.makeFreshState(), loaded);
      DDS.state.currentSlot = slot;
      DDS.game.simulateOffline(safeOffline);
      return true;
    },
    switchSlot() {
      const next = DDS.state.currentSlot === 3 ? 1 : DDS.state.currentSlot + 1;
      this.manualSave();
      if (!this.load(next)) {
        DDS.state = DDS.makeFreshState();
        DDS.state.currentSlot = next;
      }
      DDS.ui.notify(`Switched to slot ${next}.`);
    }
  };
})();
