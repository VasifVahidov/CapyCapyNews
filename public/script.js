let currentLang = 'en';

const texts = {
  en: {
    tagline: "News Tagged by the Chillest Rodent Alive.",
    source: "Source",
    left: "Left",
    center: "Center",
    right: "Right",
    bias: {
      "far-left": "🔴 This article leans: <strong>Far-Left</strong>.",
      "left": "🔴 This article leans: <strong>Center-Left</strong>.",
      "center-left": "🟥 This article leans: <strong>Center-Left</strong>.",
      "center": "🟡 This article leans: <strong>Center</strong>.",
      "center-right": "🟦 This article leans: <strong>Center-Right</strong>.",
      "right": "🔵 This article leans: <strong>Right</strong>.",
      "far-right": "🔵 This article leans: <strong>Far-Right</strong>."
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
      "far-left": "🔴 Dieser Artikel tendiert zu: <strong>radikale Linke</strong>",
      "left": "🔴 Dieser Artikel tendiert zu: <strong>Mitte-Links</strong>",
      "center-left": "🟥 Dieser Artikel tendiert zu: <strong>Mitte-Links</strong>",
      "center": "🟡 Dieser Artikel tendiert zu: <strong>politische Mitte</strong>",
      "center-right": "🟦 Dieser Artikel tendiert zu: <strong>Mitte-Rechts</strong>",
      "right": "🔵 Dieser Artikel tendiert zu: <strong>Rechte</strong>",
      "far-right": "🔵 Dieser Artikel tendiert zu: <strong>extreme Rechte</strong>"
    },
    toggle: "🇩🇪 Deutsch"
  }
};

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'de' : 'en';
  document.getElementById("tagline").textContent = texts[currentLang].tagline;
  document.getElementById("lang-toggle").textContent = texts[currentLang].toggle;
  document.getElementById("spectrum-title").textContent =
  currentLang === 'en'
    ? "❓ What does “left” and “right” mean?"
    : "❓ Was bedeutet „links“ und „rechts“?";

  document.getElementById("spectrum-list-en").classList.toggle("hidden", currentLang !== 'en');
  document.getElementById("spectrum-list-de").classList.toggle("hidden", currentLang !== 'de');

  renderArticles();
}

function renderArticles() {
  const container = document.getElementById("articles");
  container.innerHTML = "";

  articles.forEach((article) => {
    const biasLabel = article.bias;
    const biasColors = {
      "far-left": "bg-red-700",
      "left": "bg-red-500",
      "center-left": "bg-red-400",
      "center": "bg-yellow-400",
      "center-right": "bg-blue-400",
      "right": "bg-blue-500",
      "far-right": "bg-blue-700"
    };

    const biasPositions = {
      "far-left": "left: 0%; width: 16.66%",
      "left": "left: 0%; width: 33.33%",
      "center-left": "left: 0%; width: 50%",
      "center": "left: 33.33%; width: 33.33%",
      "center-right": "left: 50%; width: 50%",
      "right": "left: 66.66%; width: 33.33%",
      "far-right": "left: 83.33%; width: 16.66%"
    };

    const tooltipText = {
      "far-left": "Far-Left / Radikale Linke",
      "left": "Center-Left / Mitte-Links",
      "center-left": "Center-Left / Mitte-Links",
      "center": "Center / Politische Mitte",
      "center-right": "Center-Right / Mitte-Rechts",
      "right": "Right / Rechte",
      "far-right": "Far-Right / Extreme Rechte"
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
        <div class="relative h-10 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner text-xs font-medium flex items-center justify-between px-3">
          <!-- Overlay Fill Bar -->
          <div class="absolute top-0 bottom-0 ${biasColors[biasLabel]} opacity-70 rounded-full z-0" style="${biasPositions[biasLabel]}"></div>

          <!-- Labels -->
          <div class="relative z-10 w-1/3 text-center">
            <span class="font-semibold">${texts[currentLang].left}</span>
          </div>
          <div class="relative z-10 w-1/3 text-center">
            <span class="font-semibold">${texts[currentLang].center}</span>
          </div>
          <div class="relative z-10 w-1/3 text-center">
            <span class="font-semibold">${texts[currentLang].right}</span>
          </div>
        </div>
        <div class="mt-2 text-sm text-gray-700">${texts[currentLang].bias[biasLabel]}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderArticles);
