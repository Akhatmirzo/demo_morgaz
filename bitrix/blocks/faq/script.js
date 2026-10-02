(function () {
  'use strict';

  function init() {
    var items = document.querySelectorAll('.eg-accordion__item');

    Array.prototype.forEach.call(items, function (item) {
      var head = item.querySelector('.eg-accordion__head');
      var body = item.querySelector('.eg-accordion__body');
      if (!head || !body) return;

      head.addEventListener('click', function () {
        var isOpen = item.classList.contains('eg-is-open');

        Array.prototype.forEach.call(items, function (other) {
          if (other === item || !other.classList.contains('eg-is-open')) return;
          other.classList.remove('eg-is-open');
          other.querySelector('.eg-accordion__body').style.maxHeight = null;
        });

        item.classList.toggle('eg-is-open', !isOpen);
        body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
