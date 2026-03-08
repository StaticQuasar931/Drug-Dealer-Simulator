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

      const base = DDS.makeFreshState();
      const merged = Object.assign({}, base, loaded);
      merged.inventory = Object.assign({}, base.inventory, loaded.inventory || {});
      merged.unlockedItems = Object.assign({}, base.unlockedItems, loaded.unlockedItems || {});
      merged.prodProgress = Object.assign({}, base.prodProgress, loaded.prodProgress || {});
      merged.workers = Object.assign({}, base.workers, loaded.workers || {});
      merged.upgrades = Object.assign({}, base.upgrades, loaded.upgrades || {});
      merged.frontsOwned = Object.assign({}, base.frontsOwned, loaded.frontsOwned || {});
      merged.achievementBonuses = Object.assign({}, base.achievementBonuses, loaded.achievementBonuses || {});
      merged.systems = Object.assign({}, base.systems, loaded.systems || {});
      merged.dealer = Object.assign({}, base.dealer, loaded.dealer || {});
      merged.panelState = Object.assign({}, base.panelState, loaded.panelState || {});
      merged.settings = Object.assign({}, base.settings, loaded.settings || {});
      merged.currentSlot = slot;

      DDS.state = merged;
      DDS.game.simulateOffline(safeOffline);
      return true;
    },

    loadOrFresh(slot) {
      const ok = this.load(slot);
      if (ok) return;
      DDS.state = DDS.makeFreshState();
      DDS.state.currentSlot = slot;
    },

    switchToSlot(slot) {
      const target = Number(slot);
      if (target === DDS.state.currentSlot) return;

      this.manualSave();
      this.loadOrFresh(target);
      DDS.ui.resetDisplays();
      DDS.ui.notify(`Switched to slot ${target}.`);
      DDS.ui.buildStaticCards();
      DDS.ui.renderAll();
    },

    resetSlot(slot, silent) {
      localStorage.removeItem(this.key(slot));
      if (!silent) DDS.ui.notify(`Reset slot ${slot}.`);

      if (DDS.state.currentSlot === Number(slot)) {
        DDS.state = DDS.makeFreshState();
        DDS.state.currentSlot = Number(slot);
        DDS.ui.resetDisplays();
        DDS.ui.buildStaticCards();
        DDS.settings.applyToDocument();
        DDS.ui.renderAll();
      } else {
        DDS.ui.updateSlotOptions();
      }
    },

    resetAllSlots() {
      [1, 2, 3].forEach((slot) => this.resetSlot(slot, true));
      DDS.state = DDS.makeFreshState();
      DDS.state.currentSlot = 1;
      DDS.ui.resetDisplays();
      DDS.ui.buildStaticCards();
      DDS.settings.applyToDocument();
      DDS.ui.renderAll();
      DDS.ui.notify('All save slots reset.');
    },

    slotMeta(slot) {
      const raw = localStorage.getItem(this.key(slot));
      if (!raw) {
        return {
          slot,
          empty: true,
          lifetimeSales: 0,
          lastSaveTime: null
        };
      }
      const data = JSON.parse(raw);
      return {
        slot,
        empty: false,
        lifetimeSales: data.lifetimeSales || 0,
        lastSaveTime: data.lastSaveTime || null
      };
    }
  };
})();