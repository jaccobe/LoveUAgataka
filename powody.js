document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("reasons-grid");
  if (!grid) return;

  //jakbym zagubil linijke z referencja do bazy 
  if (typeof powodyTekst === 'undefined' || typeof powodyZdjecia === 'undefined') {
    console.error("Brak bazy danych! Upewnij się, że plik powody-baza.js jest podpięty w HTML nad plikiem powody.js");
    return;
  }

  for (let i = 1; i <= 50; i++) {
    const tile = document.createElement("div");
    tile.className = "bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center opacity-0 overflow-hidden";
    tile.style.animation = `fadeIn 0.5s ease forwards ${i * 0.05}s`;
    
    const reasonText = powodyTekst[i - 1] || `${i}`; // po orze jest defalutowa wartość która wpisze w pusty kafelek dla wygladu
    const imageName = powodyZdjecia[i];
    let imageHtml = "";

    if (imageName) {
      imageHtml = `
        <img src="reasons/${imageName}" 
             alt="Nasze wspomnienie" 
             class="w-full h-48 object-cover rounded-xl mb-4 border border-rosegold/10 shadow-sm cursor-pointer transition-transform duration-300 ease-out hover:scale-102 active:scale-102" />
      `;
    }
    
    tile.innerHTML = `
      <span class="font-serif text-rosegold text-2xl mb-3 font-bold">#${i}</span>
      ${imageHtml}
      <p class="text-graphite/90 font-serif text-lg leading-relaxed">${reasonText}</p>
    `;
    grid.appendChild(tile);
  }
});