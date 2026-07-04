function updateCounter() {
  const counterEl = document.getElementById("time-counter");
  if (!counterEl) return; // Zabezpieczenie, jeśli skrypt załaduje się na innej stronie

  const now = new Date();
  // Szuka ostatniego 20 grudnia, godzina 04:00
  let start = new Date(now.getFullYear(), 11, 20, 4, 0, 0); 
  if (start > now) start = new Date(now.getFullYear() - 1, 11, 20, 4, 0, 0);
  
  let diff = Math.max(0, now - start);
  const min = Math.floor(diff / 60000) % 60;
  const hrs = Math.floor(diff / 3600000) % 24;
  const days = Math.floor(diff / 86400000);
  
  const pl = (n, o, f, m) => n===1 ? o : (n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? f : m);
  
  counterEl.textContent = 
    `${days} ${pl(days,"dzień","dni","dni")}, ${hrs} ${pl(hrs,"godzina","godziny","godzin")} i ${min} ${pl(min,"minuta","minuty","minut")}`;
}

// Uruchamiamy od razu i odświeżamy co 60 sekund
updateCounter(); 
setInterval(updateCounter, 60000);