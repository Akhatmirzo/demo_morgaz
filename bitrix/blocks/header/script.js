(function () {
  'use strict';

  var OPEN = 'eg-is-open';

  function initMobileMenu() {
    var menu = document.getElementById('eg-mobile-menu');
    if (!menu) return;

    function open() {
      menu.classList.add(OPEN);
      document.body.style.overflow = 'hidden';
    }
    function close() {
      if (!menu.classList.contains(OPEN)) return;
      menu.classList.remove(OPEN);
      document.body.style.overflow = '';
    }

    var burger = document.getElementById('eg-burger-btn');
    var closeBtn = document.getElementById('eg-mobile-menu-close');
    if (burger) burger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    menu.addEventListener('click', function (e) {
      var toggle = e.target.closest('.eg-mobile-menu__toggle');
      if (toggle) {
        var item = toggle.closest('.eg-mobile-menu__parent');
        var expanded = item.classList.toggle(OPEN);
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        return;
      }
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  // Устройства без hover: первый тап по пункту с подменю открывает его, второй — переход по ссылке.
  function initTouchDropdowns() {
    var nav = document.getElementById('eg-navbar');
    if (!nav || !window.matchMedia) return;
    var noHover = window.matchMedia('(hover: none)');

    function closeAll(except) {
      Array.prototype.forEach.call(nav.querySelectorAll('.' + OPEN), function (el) {
        if (!except || !el.contains(except)) el.classList.remove(OPEN);
      });
    }

    nav.addEventListener('click', function (e) {
      if (!noHover.matches) return;
      var link = e.target.closest('a');
      if (!link) return;
      var item = link.parentElement;
      if (!item.matches('.eg-has-dropdown, .eg-has-sub') || item.classList.contains(OPEN)) return;
      e.preventDefault();
      closeAll(item);
      item.classList.add(OPEN);
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) closeAll();
    });
  }

  function init() {
    initMobileMenu();
    initTouchDropdowns();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
