(function () {
  'use strict';

  // Ориентировочный расчёт: расход газа (м³/год) и мощность котла (кВт).
  function init() {
    var area = document.getElementById('eg-calc-area');
    if (!area) return;

    var floors = document.getElementById('eg-calc-floors');
    var heating = document.getElementById('eg-calc-heating');
    var water = document.getElementById('eg-calc-water');
    var stove = document.getElementById('eg-calc-stove');
    var resVolume = document.getElementById('eg-res-volume');
    var resPower = document.getElementById('eg-res-power');

    function format(n) {
      return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    function calc() {
      var a = parseFloat(area.value) || 0;
      var f = parseFloat(floors.value) || 1;
      var heatFactor = heating.value === 'Электрическое' ? 1.5 : heating.value === 'Твердотопливное' ? 2 : 5.5;
      var waterFactor = water.value === 'Да' ? 0.4 : 0;
      var stoveFlat = stove.value === 'Газовая' ? 60 : 0;

      resVolume.textContent = format(Math.round((a * (heatFactor + waterFactor) + stoveFlat) / 10) * 10);
      resPower.textContent = format(Math.round(a * 0.11 + f));
    }

    [area, floors, heating, water, stove].forEach(function (el) {
      el.addEventListener('input', calc);
      el.addEventListener('change', calc);
    });
    calc();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
