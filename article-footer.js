// Shared article utilities
(function(){
  // Reading time progress bar
  var bar = document.createElement('div');
  bar.id = 'readingProgress';
  bar.style.cssText = 'position:fixed;top:0;left:0;width:0%;height:3px;background:linear-gradient(90deg,#0d9488,#14b8a6);z-index:9999;transition:width 0.1s ease';
  document.body.appendChild(bar);
  
  window.addEventListener('scroll', function(){
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  });
  
  // Back to top button
  var backBtn = document.createElement('button');
  backBtn.innerHTML = 'â†â€Ëœ';
  backBtn.id = 'backToTop';
  backBtn.style.cssText = 'position:fixed;bottom:80px;right:20px;width:44px;height:44px;border-radius:50%;background:rgba(13,148,136,0.9);color:#fff;border:none;font-size:1.2rem;cursor:pointer;opacity:0;transform:translateY(20px);transition:all 0.3s ease;z-index:9998;box-shadow:0 4px 15px rgba(0,0,0,0.3)';
  document.body.appendChild(backBtn);
  
  window.addEventListener('scroll', function(){
    if(window.scrollY > 500) {
      backBtn.style.opacity = '1';
      backBtn.style.transform = 'translateY(0)';
    } else {
      backBtn.style.opacity = '0';
      backBtn.style.transform = 'translateY(20px)';
    }
  });
  
  backBtn.addEventListener('click', function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
  
  // Track reading completion
  var readingStarted = Date.now();
  window.addEventListener('beforeunload', function(){
    try {
      var completed = (window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 200;
      var reads = JSON.parse(localStorage.getItem('article_reads') || '[]');
      reads.push({
        page: window.location.pathname,
        time_spent: Math.round((Date.now() - readingStarted) / 1000),
        completed: completed,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('article_reads', JSON.stringify(reads.slice(-100)));
    } catch(e){}
  });
})();
