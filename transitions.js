document.addEventListener("DOMContentLoaded", () => {
  // Szukamy wszystkich linków prowadzących do naszych podstron (.html)
  const links = document.querySelectorAll('a[href$=".html"]');
  
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault(); // Zatrzymujemy standardowe, natychmiastowe przejście
      const targetUrl = this.href; // Zapisujemy, dokąd chcemy iść
      
      // Odpalamy animację znikania całej strony
      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");
      
      // Czekamy 400 milisekund (tyle co animacja w CSS) i idziemy na nową stronę
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400); 
    });
  });
});