window.DDS = window.DDS || {};
(function () {
  const defaults = {
    graphicsQuality: 'balanced',
    animationIntensity: 100,
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
      const s = DDS.state.settings;
      document.body.dataset.quality = s.graphicsQuality;
      document.body.style.transform = `scale(${s.resolutionScale / 100})`;
      document.getElementById('graphicsMode').textContent = this.labelQuality(s.graphicsQuality);
      document.getElementById('animationValue').textContent = `${s.animationIntensity}%`;
      document.getElementById('scaleValue').textContent = `${s.resolutionScale}%`;
      document.getElementById('musicValue').textContent = s.musicOn ? 'On' : 'Off';
    },
    labelQuality(v) {
      return v.charAt(0).toUpperCase() + v.slice(1);
    }
  };
})();
