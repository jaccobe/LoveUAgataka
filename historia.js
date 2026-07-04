document.addEventListener("DOMContentLoaded", () => {
  // --- GENEROWANIE SLAJDÓW Z BAZY DANYCH ---
  const slider = document.getElementById('history-slider');
  if (slider && typeof naszaHistoria !== 'undefined') {
    naszaHistoria.forEach((wspomnienie) => {
      let mediaHtml = '';
      
      // Sprawdzanie czy to obraz czy film (z zabezpieczeniem placeholderami)
      if (wspomnienie.typ === 'film') {
        mediaHtml = `
          <video src="zdjecia/${wspomnienie.media}" autoplay loop muted playsinline class="w-full shrink-0 max-h-[45vh] object-cover rounded-2xl border border-rosegold/40 mb-6 shadow-[0_4px_20px_rgba(183,110,121,0.2)]">
            <div class="w-full h-full flex items-center justify-center bg-graphite/10"><span class="text-graphite/50 font-sans">Brak pliku wideo</span></div>
          </video>`;
      } else {
        mediaHtml = `
          <img src="zdjecia/${wspomnienie.media}" alt="${wspomnienie.tytul}" class="w-full shrink-0 max-h-[45vh] object-cover rounded-2xl border border-rosegold/40 mb-6 shadow-[0_4px_20px_rgba(183,110,121,0.2)]" onerror="this.outerHTML='<div class=\\'w-full shrink-0 max-h-[45vh] aspect-[4/5] bg-graphite/10 rounded-2xl border border-rosegold/40 flex items-center justify-center mb-6 shadow-sm\\'><span class=\\'text-graphite/50 font-sans\\'>Zdjęcie: ${wspomnienie.media}</span></div>'" />`;
      }

      const slajdHTML = `
        <section class="min-w-full h-full snap-center p-6 flex justify-center items-center" data-date="${wspomnienie.data}">
          <div class="w-full h-full max-w-md overflow-y-auto hide-scrollbar flex flex-col items-center pt-20 pb-36">
            <h3 class="font-serif text-4xl sm:text-6xl text-ink mb-6 text-center drop-shadow-sm shrink-0 leading-tight">${wspomnienie.tytul}</h3>
            ${mediaHtml}
            <p class="text-[#D2042D] font-serif text-xl text-center italic leading-relaxed">${wspomnienie.opis}</p>
          </div>
        </section>
      `;
      slider.insertAdjacentHTML('beforeend', slajdHTML);
    });
  }

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
  const slides = document.querySelectorAll('#history-slider section');
  const timelineContainer = document.getElementById('dynamic-timeline');
  const dotElements = [];

  if (!slider || !slides.length || !timelineContainer) return;

  slides.forEach((slide) => {
    const dateText = slide.getAttribute('data-date');
    const dotWrapper = document.createElement('div');
    dotWrapper.className = 'absolute top-0 w-10 h-full transform -translate-x-1/2';
    dotWrapper.innerHTML = `
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D2042D] heartbeat"></div>
      <p class="absolute top-1/2 left-1/2 mt-5 transform -translate-x-1/2 text-[#D2042D] font-serif font-bold text-2xl drop-shadow-sm transition-all duration-300 whitespace-nowrap opacity-0 blur-sm">
        ${dateText}
      </p>
    `;
    timelineContainer.appendChild(dotWrapper);
    dotElements.push({ slide: slide, wrapper: dotWrapper, textNode: dotWrapper.querySelector('p') });
  });

  function updateTimeline() {
    const windowWidth = window.innerWidth;
    dotElements.forEach((item) => {
      const rect = item.slide.getBoundingClientRect();
      const offset = rect.left + (rect.width / 2) - (windowWidth / 2);
      let positionPct = 50 - (offset / windowWidth) * 50;
      item.wrapper.style.left = `${positionPct}%`;

      const absOffset = Math.abs(offset);
      if (absOffset < windowWidth * 0.15) {
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
  
  window.addEventListener('resize', updateTimeline);
  updateTimeline();
});