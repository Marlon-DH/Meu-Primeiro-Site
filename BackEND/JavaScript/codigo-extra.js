/*

Essa é a parte que fara as coisas acontecerem
Onde suas escolhas afetaram o Código
Onde o codigo ganha vida!

*/

const root = document.documentElement;

const siteTitle = document.getElementById("siteTitle");
const personName = document.getElementById("personName");
const about = document.getElementById("about");
const highlight = document.getElementById("highlight");
const imageInput = document.getElementById("imageInput");

const previewSiteTitle = document.getElementById("previewSiteTitle");
const previewPersonName = document.getElementById("previewPersonName");
const previewAbout = document.getElementById("previewAbout");
const previewHighlight = document.getElementById("previewHighlight");
const footerName = document.getElementById("footerName");
const charCount = document.getElementById("charCount");

const previewImage = document.getElementById("previewImage");
const photoPlaceholder = document.getElementById("photoPlaceholder");

const publishModal = document.getElementById("publishModal");
const sitePreview = document.getElementById("sitePreview");

let selectedColor = "#6c5ce7";
let imageData = "";

function updatePreview() {
  previewSiteTitle.textContent = siteTitle.value.trim() || "Meu Espaço";
  previewPersonName.textContent =
    personName.value.trim() || "Olá, eu sou você!";
  previewAbout.textContent =
    about.value.trim() ||
    "Este é o meu primeiro site. Estou aprendendo coisas novas!";
  previewHighlight.textContent =
    highlight.value.trim() || "✨ Uma coisa que eu gosto";
  footerName.textContent = (personName.value.trim() || "você").replace(
    /^Olá,\s*/i,
    "",
  );
  charCount.textContent = about.value.length;

  root.style.setProperty("--primary", selectedColor);
  root.style.setProperty("--primary-dark", shadeColor(selectedColor, -12));
  sitePreview.style.setProperty("--site-primary", selectedColor);
}

function shadeColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
  let b = (num & 0x0000ff) + Math.round(2.55 * percent);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

[siteTitle, personName, about, highlight].forEach((input) => {
  input.addEventListener("input", updatePreview);
});

document.querySelectorAll(".color-option").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".color-option")
      .forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    selectedColor = button.dataset.color;
    updatePreview();
  });
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Escolha uma imagem.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    imageData = event.target.result;
    previewImage.src = imageData;
    previewImage.style.display = "block";
    photoPlaceholder.style.display = "none";
  };
  reader.readAsDataURL(file);
});

document.getElementById("publishBtn").addEventListener("click", () => {
  publishModal.classList.remove("hidden");
});

function closeModal() {
  publishModal.classList.add("hidden");
}

document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("againBtn").addEventListener("click", closeModal);

publishModal.addEventListener("click", (event) => {
  if (event.target === publishModal) closeModal();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  siteTitle.value = "Meu Espaço";
  personName.value = "Olá, eu sou Alex!";
  about.value =
    "Este é o meu primeiro site! Estou aprendendo coisas novas e descobrindo o mundo da tecnologia.";
  highlight.value = "🎮 Tecnologia e jogos";
  imageInput.value = "";
  imageData = "";
  previewImage.src = "";
  previewImage.style.display = "none";
  photoPlaceholder.style.display = "flex";

  document
    .querySelectorAll(".color-option")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelector('.color-option[data-color="#6c5ce7"]')
    .classList.add("active");
  selectedColor = "#6c5ce7";

  updatePreview();
});

document.getElementById("fullscreenBtn").addEventListener("click", () => {
  sitePreview.classList.toggle("fullscreen-preview");

  if (sitePreview.classList.contains("fullscreen-preview")) {
    sitePreview.style.position = "fixed";
    sitePreview.style.inset = "20px";
    sitePreview.style.zIndex = "50";
    sitePreview.style.height = "calc(100vh - 40px)";
  } else {
    sitePreview.style.position = "";
    sitePreview.style.inset = "";
    sitePreview.style.zIndex = "";
    sitePreview.style.height = "";
  }
});

function escapeHTML(text) {
  return text.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
}

document.getElementById("downloadBtn").addEventListener("click", () => {
  const title = escapeHTML(siteTitle.value.trim() || "Meu Espaço");
  const name = escapeHTML(personName.value.trim() || "Olá, eu sou você!");
  const bio = escapeHTML(about.value.trim() || "Este é o meu primeiro site!");
  const interest = escapeHTML(
    highlight.value.trim() || "✨ Uma coisa que eu gosto",
  );
  const color = selectedColor;

  const imageHTML = imageData
    ? `<img src="${imageData}" alt="Minha imagem">`
    : `<div class="placeholder">📷<small>Minha imagem</small></div>`;

  const finalHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;color:#202238;background:#f8f8fc}
nav{height:70px;background:#fff;border-bottom:1px solid #eee;display:flex;align-items:center;padding:0 8%;gap:25px}
nav strong{margin-right:auto;color:${color};font-size:20px}nav span{color:#777;font-size:13px}
main{max-width:1050px;margin:auto;min-height:calc(100vh - 130px);display:flex;align-items:center;padding:50px 8%}
.hero{display:grid;grid-template-columns:1fr 220px;gap:60px;align-items:center;width:100%}
.tag{display:inline-block;background:${color}18;color:${color};padding:8px 11px;border-radius:8px;font-size:11px;font-weight:bold}
h1{font-size:50px;line-height:1.05;margin:18px 0 15px;letter-spacing:-2px}p{color:#777;line-height:1.8;max-width:600px}.interest{display:inline-block;background:#eeeef4;padding:11px 14px;border-radius:10px;font-size:13px}
.photo img,.placeholder{width:200px;height:200px;border-radius:50%;object-fit:cover;background:${color}18;border:8px solid ${color}12;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:38px;color:${color}}
.placeholder small{font-size:11px;margin-top:5px}
footer{text-align:center;padding:20px;color:#999;font-size:11px;background:#fff;border-top:1px solid #eee}
@media(max-width:650px){.hero{grid-template-columns:1fr;text-align:center}.photo{order:-1}main{padding:35px 8%}h1{font-size:38px}nav span{display:none}}
</style>
</head>
<body>
<nav><strong>${title}</strong><span>Início</span><span>Sobre mim</span></nav>
<main><div class="hero"><div><span class="tag">MEU PRIMEIRO SITE ✨</span><h1>${name}</h1><p>${bio}</p><div class="interest">${interest}</div></div><div class="photo">${imageHTML}</div></div></main>
<footer>Feito por ${escapeHTML(personName.value.trim() || "você")} ✨</footer>
</body>
</html>`;

  const blob = new Blob([finalHTML], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "meu-primeiro-site.html";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

updatePreview();
