(function () {
  'use strict';

  function init() {
    var modal = document.getElementById('eg-modal');
    if (!modal) return;

    function open() {
      modal.classList.add('eg-is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      if (!modal.classList.contains('eg-is-open')) return;
      modal.classList.remove('eg-is-open');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-eg-open-modal]')) {
        e.preventDefault();
        open();
      } else if (e.target.closest('[data-eg-close-modal]')) {
        close();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
