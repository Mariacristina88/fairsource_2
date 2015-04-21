var elm = getElementsByClassName('logo');
$(window).on('scroll.reached', placeLoadingGIF);

function placeLoadingGIF(){ 
   if( elm.getBoundingClientRect().top < 0 ){
       var img = new Image();
       img.src = 'fairsource-logo.gif';
       elm.appendChild(img);
       $(window).off('scroll.reached');
   }
}