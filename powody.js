// ===============================================
// TUTAJ WPISZ SWOJE POWODY I DODAJ ZDJĘCIA
// ===============================================
const reasonsList = [
  { 
    text: "Jesteś najbardziej opiekuńczą osobą na świecie." 
    // Brak zdjęcia - wygeneruje się sam tekst
  },
  { 
    text: "Nasz pierwszy wspólny wyjazd był magiczny.", 
    image: "zdjecia/wspomnienie1.jpg" // Dodane zdjęcie!
  },
  { 
    text: "Razem potrafimy śmiać się z największych głupot." 
  },
  { 
    text: "Zawsze potrafisz mnie wysłuchać i zrozumieć.", 
    image: "zdjecia/usmiech.jpg" 
  },
  { 
    text: "Uwielbiam Twoje poczucie humoru." 
  }
  // Dopisuj kolejne powody poniżej, używając powyższego formatu: { text: "...", image: "..." }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("reasons-grid");
  if (!grid) return;

  for (let i = 1; i <= 50; i++) {
    const tile = document.createElement("div");
    // Dodano overflow-hidden, aby zdjęcia nie wystawały poza zaokrąglone rogi
    tile.className = "bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center opacity-0 overflow-hidden";
    tile.style.animation = `fadeIn 0.5s ease forwards ${i * 0.05}s`;
    
    // Pobieranie danych lub ustawianie domyślnego tekstu
    const reasonData = reasonsList[i - 1];
    let reasonText = `Tu wpisz swój powód numer ${i} w pliku powody.js!`;
    let imageHtml = "";

    if (reasonData) {
      if (typeof reasonData === 'object') {
        // Jeśli dodano nasz nowy format (obiekt)
        reasonText = reasonData.text || reasonText;
        if (reasonData.image) {
          // Kod HTML dla zdjęcia - usunięto fioletową poświatę, zachowano jedynie subtelny zoom (hover/active)
          imageHtml = `
            <img src="${reasonData.image}" 
                 alt="Nasze wspomnienie" 
                 class="w-full h-48 object-cover rounded-xl mb-4 border border-rosegold/10 shadow-sm cursor-pointer transition-transform duration-300 ease-out hover:scale-102 active:scale-102" />
          `;
        }
      } else {
        // Zabezpieczenie: jeśli wpiszesz stary format (sam tekst w cudzysłowie)
        reasonText = reasonData;
      }
    }
    
    // Składanie całego kafelka w całość (z zachowaniem Twojej czcionki książkowej font-serif)
    tile.innerHTML = `
      <span class="font-serif text-rosegold text-2xl mb-3 font-bold">#${i}</span>
      ${imageHtml}
      <p class="text-graphite/90 font-serif text-lg leading-relaxed">${reasonText}</p>
    `;
    grid.appendChild(tile);
  }
});