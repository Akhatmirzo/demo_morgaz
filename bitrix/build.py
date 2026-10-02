"""Сборка preview.html и preview-bootstrap.html из блоков. Для Bitrix не нужен."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent

PAGE = [
    "header", "hero", "services", "analysis", "advantages", "estimate", "steps",
    "audit", "calculator", "equipment", "refusals", "faq", "cta", "footer", "modal",
]

HEAD = """<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Проектирование газификации дома — НИП Энергогаз</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
{css}<style>body { margin: 0; background: #fff; }</style>
{extra}</head>
<body>
"""

# Bootstrap 4.6 и стили body как на сайте, подключены после стилей блоков
BOOTSTRAP = """<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
<style>body { font-family: "Stolzl", serif; font-weight: 300; color: #000; }</style>
"""

# Имитация отправки форм, только для просмотра
DEMO_SUBMIT = """<script>
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('[data-eg-form]');
    if (!form) return;
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    var text = btn.textContent;
    btn.textContent = 'Заявка отправлена ✓';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = text;
      btn.disabled = false;
      form.reset();
    }, 2000);
  });
</script>
"""


def assets(ext, tag):
    files = [f"common/eg-base.{ext}"]
    files += [f"blocks/{b}/{'style' if ext == 'css' else 'script'}.{ext}" for b in PAGE
              if (ROOT / "blocks" / b / f"{'style' if ext == 'css' else 'script'}.{ext}").exists()]
    return "".join(tag.format(f) + "\n" for f in files)


def build(name, extra=""):
    head = HEAD.replace("{css}", assets("css", '<link rel="stylesheet" href="{}">')).replace("{extra}", extra)
    body = "\n".join((ROOT / "blocks" / b / "template.html").read_text(encoding="utf-8") for b in PAGE)
    html = head + body + "\n" + assets("js", '<script src="{}"></script>') + DEMO_SUBMIT + "</body>\n</html>\n"
    (ROOT / name).write_text(html, encoding="utf-8")


build("preview.html")
build("preview-bootstrap.html", BOOTSTRAP)
