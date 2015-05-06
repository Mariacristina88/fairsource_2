var Carousel = function (frameSelector, sliderSelector, slidesSelector, btnLeftSelector, btnRightSelector) {
	    var leftPosition = 0;
	    
	    var frame = document.querySelector(frameSelector);
	    
	    var slides = document.querySelectorAll(slidesSelector);
	        
	    var slidesNumber = slides.length;
	    
	    var leftButton = document.querySelector(btnLeftSelector);
	    
	    var rightButton = document.querySelector(btnRightSelector);
	    
	    var slider = document.querySelector(sliderSelector);

	    frame.classList.add('frame');

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

		        highlightCity(Math.abs(leftPosition/100));     
	    };

	    var highlightCity = function (value)
		    {    
		        if (value === 1)
		        {
		        	removeActive('#oxford', '#denhaag', '#milan');
					makeActive('manchester');
		        }   
		        else if (value === 2)
		        {
					removeActive('#manchester', '#denhaag', '#milan');
					makeActive('oxford');
		        }
		        else if (value === 3)
		        {
					removeActive('#manchester', '#oxford', '#milan');
					makeActive('denhaag');
		        }
		        else if (value === 4)
		        {
					removeActive('#manchester', '#oxford', '#denhaag');
					makeActive('milan');
		        }
		        else
		        {
					removeActive('#manchester', '#oxford', '#milan');
		        }
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
					highlightCity(0); 
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
					highlightCity(4);
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
		removeActive('#oxford', '#denhaag', '#milan');
		makeActive('manchester');
		carousel.moveToSlide(-1); 
	});

	document.querySelector('#oxford').addEventListener("click", function(){ 
		removeActive('#manchester', '#denhaag', '#milan');
		makeActive('oxford');
		carousel.moveToSlide(-2); 
	});

	document.querySelector('#denhaag').addEventListener("click", function(){ 
		removeActive('#manchester', '#oxford', '#milan');
		makeActive('denhaag');
		carousel.moveToSlide(-3); 
	});

	document.querySelector('#milan').addEventListener("click", function(){ 
		removeActive('#manchester', '#oxford', '#denhaag');
		makeActive('milan');
		carousel.moveToSlide(-4); 
	});

	function makeActive(city) {
		document.querySelector('#' + city).style.color = '#fcdb3d';
		document.querySelector('#' + city).style.background = 'url("../img/' + city + '-hover.png") center top no-repeat';
	}

	function removeActive(city1, city2, city3) {
		document.querySelector(city1).removeAttribute('style');
	    document.querySelector(city2).removeAttribute('style');
		document.querySelector(city3).removeAttribute('style');
	}


