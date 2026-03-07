window.DDS = window.DDS || {};
(function () {
  DDS.antiCheat = {
    maxOfflineSeconds: 8 * 3600,
    computeSafeOfflineSeconds(nowMs, lastSaveMs, lastTrustedMs) {
      if (!lastSaveMs || !lastTrustedMs) return 0;
      const wallDelta = Math.floor((nowMs - lastSaveMs) / 1000);
      const trustedDelta = Math.floor((nowMs - lastTrustedMs) / 1000);
      if (wallDelta < 0 || trustedDelta < 0) return 0;
      return Math.max(0, Math.min(this.maxOfflineSeconds, Math.min(wallDelta, trustedDelta)));
    }
  };
})();
