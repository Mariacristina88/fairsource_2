var Carousel = function (frameSelector, sliderSelector, slidesSelector, btnLeftSelector, btnRightSelector) {
	    var leftPosition = 0;
	    
	    var frame = document.querySelector(frameSelector);
	    
	    var slides = document.querySelectorAll(slidesSelector);
	        
	    var slidesNumber = slides.length;
	    
	    var leftButton = document.querySelector(btnLeftSelector);
	    
	    var rightButton = document.querySelector(btnRightSelector);
	    
	    var slider = document.querySelector(sliderSelector);

	    frame.classList.add('frame');

	    var visibleBackground = true;

	    leftButton.addEventListener("click", function(){ 
	    	carousel.previous(); 
	    });

		rightButton.addEventListener("click", function(){ 
			carousel.next(); 
		});

	    
	    for (var i = 0; i < slidesNumber; i++) 
		{
	        slides[i].classList.add('slide');
	    }
	    
	    leftButton.innerHTML = '<<';
	    leftButton.style.visibility = 'visible';
	    
	    rightButton.innerHTML = '>>';
	    rightButton.style.visibility = 'visible';
	    
	    var moveSlide = function (value)
	    {    
	        leftPosition += value*100;
	        slider.style.left = leftPosition + '%';     
	    };
	    
	    return {
	        next: function() {
	            if(leftPosition > (slidesNumber-1)*-100)
	            {
	                moveSlide(-1);
	            }
				else
				{
					leftPosition = 0;
					slider.style.left = leftPosition + '%';  
				}
	        },
	        previous: function() {
	            if(leftPosition !== 0)
	            {
	                 moveSlide(1);
	            }
				else
				{
					leftPosition = (slidesNumber-1)*-100;
					slider.style.left = leftPosition + '%';  
				}
	        },
	        moveToSlide: function (value)
		    {    
		        leftPosition = value*100;
		        slider.style.left = leftPosition + '%';     
		    }
	    };
	};

	var carousel = new Carousel('#frame', '#slider', '#slider .slide', '.left', '.right');

	document.querySelector('#manchester').addEventListener("click", function(){ 
		carousel.moveToSlide(-1); 
	});

	document.querySelector('#oxford').addEventListener("click", function(){ 
		carousel.moveToSlide(-2); 
	});

	document.querySelector('#denhaag').addEventListener("click", function(){ 
		carousel.moveToSlide(-3); 
	});

	document.querySelector('#milan').addEventListener("click", function(){ 
		carousel.moveToSlide(-4); 
	});
