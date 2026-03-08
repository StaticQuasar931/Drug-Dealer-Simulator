window.DDS = window.DDS || {};
(function () {
  const defaults = {
    graphicsQuality: 'balanced',
    animationIntensity: 90,
    resolutionScale: 100,
    soundVolume: 65,
    musicOn: true,
    showWarning: true
  };

  DDS.settings = {
    defaults,
    get() {
      return DDS.state.settings;
    },
    applyToDocument() {
      const s = DDS.state.settings || defaults;
      const animFactor = Math.max(0, Math.min(1.2, s.animationIntensity / 100));
      const scale = Math.max(0.7, Math.min(1, s.resolutionScale / 100));

      document.body.dataset.quality = s.graphicsQuality;
      document.documentElement.style.setProperty('--anim-factor', String(animFactor));
      document.documentElement.style.setProperty('--ui-scale', String(scale));

      if ('zoom' in document.body.style) {
        document.body.style.zoom = `${Math.round(scale * 100)}%`;
      } else {
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = 'top center';
      }
    },
    labelQuality(v) {
      return v.charAt(0).toUpperCase() + v.slice(1);
    }
  };
})();