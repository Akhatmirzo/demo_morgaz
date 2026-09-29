document.addEventListener('DOMContentLoaded', function () {

  /* ---------- ICONS (Lucide) ---------- */
  if (window.lucide) lucide.createIcons();

  /* ---------- MOBILE MENU ---------- */
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');

  function openMobileMenu() { mobileMenu.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeMobileMenu() { mobileMenu.classList.remove('is-open'); document.body.style.overflow = ''; }

  if (burgerBtn) burgerBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMobileMenu);
  });

  /* ---------- MODAL ("Заказать звонок") ---------- */
  var modal = document.getElementById('modal');

  function openModal() { modal.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('is-open'); document.body.style.overflow = ''; }

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal(); closeMobileMenu(); }
  });

  /* ---------- PHONE MASK ---------- */
  document.querySelectorAll('.phone-mask').forEach(function (input) {
    input.addEventListener('input', function () {
      var digits = input.value.replace(/\D/g, '');
      if (digits.startsWith('7')) digits = digits.slice(1);
      if (digits.startsWith('8')) digits = digits.slice(1);
      digits = digits.slice(0, 10);

      var result = '+7';
      if (digits.length > 0) result += ' (' + digits.slice(0, 3);
      if (digits.length >= 3) result += ')';
      if (digits.length > 3) result += ' ' + digits.slice(3, 6);
      if (digits.length > 6) result += '-' + digits.slice(6, 8);
      if (digits.length > 8) result += '-' + digits.slice(8, 10);

      input.value = result;
    });
    input.addEventListener('focus', function () {
      if (!input.value) input.value = '+7 ';
    });
  });

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.accordion__item').forEach(function (item) {
    var head = item.querySelector('.accordion__head');
    var body = item.querySelector('.accordion__body');

    head.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.accordion__item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion__body').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        body.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---------- GAS CALCULATOR ---------- */
  var areaEl = document.getElementById('calcArea');
  var floorsEl = document.getElementById('calcFloors');
  var heatingEl = document.getElementById('calcHeating');
  var waterEl = document.getElementById('calcWater');
  var stoveEl = document.getElementById('calcStove');
  var resVolumeEl = document.getElementById('resVolume');
  var resPowerEl = document.getElementById('resPower');
  var calcSubmit = document.getElementById('calcSubmit');

  function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function runCalc() {
    var area = parseFloat(areaEl.value) || 0;
    var floors = parseFloat(floorsEl.value) || 1;
    var heating = heatingEl.value;
    var water = waterEl.value;
    var stove = stoveEl.value;

    var heatFactor = heating === 'Электрическое' ? 1.5 : heating === 'Твердотопливное' ? 2 : 5.5;
    var waterFactor = water === 'Да' ? 0.4 : 0;
    var stoveFlat = stove === 'Газовая' ? 60 : 0;

    var volume = Math.round((area * (heatFactor + waterFactor) + stoveFlat) / 10) * 10;
    var power = Math.round(area * 0.11 + floors * 1);

    resVolumeEl.textContent = formatNumber(volume);
    resPowerEl.textContent = formatNumber(power);
  }

  [areaEl, floorsEl, heatingEl, waterEl, stoveEl].forEach(function (el) {
    if (el) el.addEventListener('input', runCalc);
  });
  if (calcSubmit) {
    calcSubmit.addEventListener('click', function (e) {
      e.preventDefault();
      runCalc();
      calcSubmit.textContent = 'Расчёт обновлён ✓';
      setTimeout(function () { calcSubmit.textContent = 'Получить точный расчёт'; }, 1800);
    });
  }
  if (areaEl) runCalc();

  /* ---------- LEAD FORMS SUBMIT ---------- */
  document.querySelectorAll('.lead-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      var originalText = btn.textContent;
      btn.textContent = 'Заявка отправлена ✓';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        form.reset();
        closeModal();
      }, 2200);
    });
  });

});
