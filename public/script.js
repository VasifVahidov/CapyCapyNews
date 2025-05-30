let currentLang = 'en';

const texts = {
  en: {
    tagline: "News Tagged by the Chillest Rodent Alive.",
    source: "Source",
    left: "Left",
    center: "Center",
    right: "Right",
    bias: {
      left: "🔴 This outlet is classified as <strong>Left</strong>.",
      center: "🟡 This outlet is classified as <strong>Center</strong>.",
      right: "🔵 This outlet is classified as <strong>Right</strong>."
    },
    toggle: "🇬🇧 English"
  },
  de: {
    tagline: "Nachrichten, markiert vom chilligsten Nager der Welt.",
    source: "Quelle",
    left: "Links",
    center: "Zentrum",
    right: "Rechts",
    bias: {
      left: "🔴 Dieses Medium wird als <strong>Links</strong> eingestuft.",
      center: "🟡 Dieses Medium wird als <strong>Zentrum</strong> eingestuft.",
      right: "🔵 Dieses Medium wird als <strong>Rechts</strong> eingestuft."
    },
    toggle: "🇩🇪 Deutsch"
  }
};

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'de' : 'en';
  document.getElementById("tagline").textContent = texts[currentLang].tagline;
  document.getElementById("lang-toggle").textContent = texts[currentLang].toggle;
  renderArticles();
}

function renderArticles() {
  const container = document.getElementById("articles");
  container.innerHTML = "";

  articles.forEach((article) => {
    const biasLabel = article.bias;
    const biasColors = {
      left: "bg-red-500 text-white",
      center: "bg-yellow-400 text-black",
      right: "bg-blue-500 text-white"
    };

    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded-xl p-5 mb-6";

    card.innerHTML = `
      <h2 class="text-xl font-bold mb-1 text-gray-900">${article.headline[currentLang]}</h2>
      <p class="text-sm text-gray-500 mb-2">
        ${texts[currentLang].source}: 
        <a href="${article.url}" target="_blank" class="underline text-blue-500">${article.source}</a> · ${article.date}
      </p>

      <div class="mt-4">
        <div class="relative h-6 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner text-xs font-medium">
          <div class="absolute inset-y-0 left-0 w-1/3 ${biasColors.left} flex items-center justify-center" id="left-label">${texts[currentLang].left}</div>
          <div class="absolute inset-y-0 left-1/3 w-1/3 ${biasColors.center} flex items-center justify-center" id="center-label">${texts[currentLang].center}</div>
          <div class="absolute inset-y-0 right-0 w-1/3 ${biasColors.right} flex items-center justify-center" id="right-label">${texts[currentLang].right}</div>
        </div>
        <div class="mt-2 text-sm text-gray-700" id="bias-label">${texts[currentLang].bias[biasLabel]}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderArticles);
