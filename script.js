(function() {
  var loadEl = document.getElementById('load');
  var loadNo = loadEl.querySelector('#load-no div');
  var pct = 0;
  var interval = setInterval(function() {
    pct += Math.floor(Math.random() * 12) + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      loadNo.textContent = '100%';
      setTimeout(function() {
        loadEl.style.transition = 'opacity .6s ease';
        loadEl.style.opacity = '0';
        setTimeout(function() {
          loadEl.style.display = 'none';
        }, 600);
      }, 400);
      return;
    }
    loadNo.textContent = pct + '%';
  }, 120);
})();