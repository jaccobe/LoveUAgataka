document.addEventListener("DOMContentLoaded", () => {
  // --- GENEROWANIE SLAJDÓW Z BAZY DANYCH ---
  const slider = document.getElementById('history-slider');
  
  if (slider && typeof naszaHistoria !== 'undefined') {
    // TRIK NA MNIEJSZĄ CZUŁOŚĆ: Dodajemy fizyczny dystans między kafelkami
    // Odstęp sprawia, że trzeba wykonać dłuższy ruch palcem, by zmienić slajd
    slider.classList.add('gap-16');

    naszaHistoria.forEach((wspomnienie) => {
      let mediaHtml = '';
      
      // Zdjęcia i filmy zajmują 85% szerokości ekranu
      if (wspomnienie.typ === 'film') {
        mediaHtml = `
          <video src="zdjecia/${wspomnienie.media}" autoplay loop muted playsinline class="w-[85%] sm:w-[90%] shrink-0 max-h-[45vh] object-cover rounded-2xl border border-rosegold/40 mb-8 shadow-md">
            <div class="w-full h-full flex items-center justify-center bg-graphite/10 rounded-2xl aspect-[4/5]"><span class="text-graphite/50 font-sans">Brak pliku wideo</span></div>
          </video>`;
      } else {
        mediaHtml = `
          <img src="zdjecia/${wspomnienie.media}" alt="${wspomnienie.tytul}" class="w-[85%] sm:w-[90%] shrink-0 max-h-[45vh] object-cover rounded-2xl border border-rosegold/40 mb-8 shadow-md" onerror="this.outerHTML='<div class=\\'w-[85%] sm:w-[90%] shrink-0 max-h-[45vh] aspect-[4/5] bg-graphite/10 rounded-2xl border border-rosegold/40 flex items-center justify-center mb-8 shadow-md\\'><span class=\\'text-graphite/50 font-sans text-center px-4\\'>Brak zdjęcia:<br/>${wspomnienie.media}</span></div>'" />`;
      }

      // Usunięto 'snap-always' - przeskakiwanie kilku kafelków znów jest możliwe
      const slajdHTML = `
        <section class="min-w-full h-full snap-center p-6 flex justify-center items-center" data-date="${wspomnienie.data}">
          <div class="w-full h-full max-w-md overflow-y-auto hide-scrollbar flex flex-col items-center pt-20 pb-36">
            <h3 class="font-script text-6xl sm:text-7xl text-ink mb-8 text-center drop-shadow-md shrink-0 leading-tight">${wspomnienie.tytul}</h3>
            ${mediaHtml}
            <p class="font-serif text-[#D2042D] text-xl text-center italic leading-relaxed drop-shadow-sm">${wspomnienie.opis}</p>
          </div>
        </section>
      `;
      
      slider.insertAdjacentHTML('beforeend', slajdHTML);
    });
  }

  // --- MAGIA CZĄSTECZEK (PARTICLES - MAŁE SERDUSZKA) ---
  const wrapper = document.getElementById('history-wrapper');
  if (wrapper) {
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle text-[#B76E79]'; 
      
      const size = Math.random() * 8 + 7; 
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      `;
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
      // Data pozostaje ostra w wyznaczonym oknie aktywacji
      if (absOffset < windowWidth * 0.12) {
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