(function () {
  'use strict';

  function formatPhone(input) {
    var digits = input.value.replace(/\D/g, '');
    if (digits.charAt(0) === '7' || digits.charAt(0) === '8') digits = digits.slice(1);
    digits = digits.slice(0, 10);

    var value = '+7';
    if (digits.length > 0) value += ' (' + digits.slice(0, 3);
    if (digits.length >= 3) value += ')';
    if (digits.length > 3) value += ' ' + digits.slice(3, 6);
    if (digits.length > 6) value += '-' + digits.slice(6, 8);
    if (digits.length > 8) value += '-' + digits.slice(8, 10);
    input.value = value;
  }

  document.addEventListener('input', function (e) {
    if (e.target.classList && e.target.classList.contains('eg-phone-mask')) formatPhone(e.target);
  });

  document.addEventListener('focusin', function (e) {
    if (e.target.classList && e.target.classList.contains('eg-phone-mask') && !e.target.value) {
      e.target.value = '+7 ';
    }
  });
})();
