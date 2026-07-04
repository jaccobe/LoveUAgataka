document.addEventListener("DOMContentLoaded", () => {
  // --- MAGIA CZĄSTECZEK (PARTICLES) ---
  const wrapper = document.getElementById('history-wrapper');
  if (wrapper) {
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 5 + 2; 
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      wrapper.appendChild(particle);
    }
  }

  // --- ZAAWANSOWANA INTERAKTYWNA OŚ CZASU ---
  const slider = document.getElementById('history-slider');
  const slides = document.querySelectorAll('#history-slider section');
  const timelineContainer = document.getElementById('dynamic-timeline');
  const dotElements = [];

  if (!slider || !slides.length || !timelineContainer) return;

  // Generowanie kropek i dat dla każdego slajdu osobno
  slides.forEach((slide) => {
    const dateText = slide.getAttribute('data-date');
    const dotWrapper = document.createElement('div');
    
    // Ustawienia absolutne, by móc sterować jej położeniem Left (w %)
    dotWrapper.className = 'absolute top-0 w-10 h-full transform -translate-x-1/2';
    dotWrapper.innerHTML = `
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D2042D] heartbeat"></div>
      <p class="absolute top-1/2 left-1/2 mt-5 transform -translate-x-1/2 text-[#D2042D] font-serif font-bold text-2xl drop-shadow-sm transition-all duration-300 whitespace-nowrap opacity-0 blur-sm">
        ${dateText}
      </p>
    `;
    
    timelineContainer.appendChild(dotWrapper);
    dotElements.push({
      slide: slide,
      wrapper: dotWrapper,
      textNode: dotWrapper.querySelector('p')
    });
  });

  // Funkcja przeliczająca pozycje (matematyka powiązana ze scrollowaniem)
  function updateTimeline() {
    const windowWidth = window.innerWidth;
    
    dotElements.forEach((item) => {
      const rect = item.slide.getBoundingClientRect();
      // Odległość środka slajdu od środka ekranu
      const offset = rect.left + (rect.width / 2) - (windowWidth / 2);

      // Mapowanie odległości na pozycję w % szerokości ekranu
      // Gdy offset = 0 (środek), kropka jest na 50%
      // Gdy offset = windowWidth (poza ekranem z prawej), kropka wjeżdża z 0% (lewa)
      // Gdy offset = -windowWidth (poza ekranem z lewej), kropka zjeżdża na 100% (prawa)
      let positionPct = 50 - (offset / windowWidth) * 50;
      
      // Optymalizacja renderowania kropki
      item.wrapper.style.left = `${positionPct}%`;

      // Logika wyświetlania daty - tylko gdy kropka jest bardzo blisko środka
      const absOffset = Math.abs(offset);
      if (absOffset < windowWidth * 0.15) { // w obszarze 15% od centrum
        item.textNode.style.opacity = 1;
        item.textNode.style.filter = 'blur(0px)';
        item.textNode.style.transform = 'translate(-50%, 0) scale(1)';
      } else {
        item.textNode.style.opacity = 0;
        item.textNode.style.filter = 'blur(4px)';
        item.textNode.style.transform = 'translate(-50%, 10px) scale(0.95)';
      }
    });
  }

  // Nasłuchiwanie przewijania z użyciem requestAnimationFrame dla najwyższej płynności
  let isScrolling = false;
  slider.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateTimeline();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
  
  // Odpal na start i przy zmianie okna
  window.addEventListener('resize', updateTimeline);
  updateTimeline();
});