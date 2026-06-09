(function(){
  var photos=GALLERY_CONFIG.photos;
  var galleryEl=document.getElementById('gallery');
  var currentIdx=0;
  var lightbox=document.getElementById('lightbox');
  var lbImg=document.getElementById('lb-img');
  var lbCaption=document.getElementById('lb-caption');

  photos.forEach(function(photo,idx){
    var item=document.createElement('div');
    item.className='gallery-item';
    item.tabIndex=0;
    var img=document.createElement('img');
    img.src=photo.src; img.alt=photo.alt||''; img.loading='lazy';
    item.appendChild(img);
    if(photo.caption){var cap=document.createElement('div');cap.className='cap';cap.textContent=photo.caption;item.appendChild(cap);}
    item.addEventListener('click',function(){openLightbox(idx);});
    item.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')openLightbox(idx);});
    galleryEl.appendChild(item);
  });

  window.openLightbox=function(idx){
    currentIdx=idx;
    lbImg.src=photos[idx].src; lbImg.alt=photos[idx].alt||'';
    lbCaption.textContent=photos[idx].caption||'';
    lightbox.classList.add('open'); document.body.style.overflow='hidden';
  };
  window.closeLightbox=function(){lightbox.classList.remove('open');document.body.style.overflow='';};
  window.changePhoto=function(dir){
    currentIdx=(currentIdx+dir+photos.length)%photos.length;
    lbImg.style.opacity='0';
    setTimeout(function(){lbImg.src=photos[currentIdx].src;lbImg.alt=photos[currentIdx].alt||'';lbCaption.textContent=photos[currentIdx].caption||'';lbImg.style.opacity='1';},120);
  };
  lbImg.style.transition='opacity .15s';
  document.addEventListener('keydown',function(e){
    if(!lightbox.classList.contains('open'))return;
    if(e.key==='Escape')closeLightbox();
    if(e.key==='ArrowLeft')changePhoto(-1);
    if(e.key==='ArrowRight')changePhoto(1);
  });

  window.showSection=function(id,linkEl){
    document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active');});
    document.querySelectorAll('.nav-link').forEach(function(l){l.classList.remove('active');});
    document.getElementById(id).classList.add('active');
    if(linkEl)linkEl.classList.add('active');
  };
})();
