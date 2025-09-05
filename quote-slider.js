// JavaScript for Mandela Quote Slider
document.addEventListener('DOMContentLoaded', function() {
    // Select the existing quote section
    const quoteSection = document.querySelector('.section.quote');
    if (!quoteSection) return;
    
    // Modify the quote section to be a slider
    const quoteBox = quoteSection.querySelector('.quote-box');
    if (!quoteBox) return;
    
    // Create the slider structure around the existing quote
    const sliderHTML = `
        <div class="quote-slider">
            <div class="quote-slides-container">
                ${quoteBox.outerHTML}
                <div class="quote-slide">
                    <i class="fas fa-quote-left"></i>
                    <p class="quote-text">The function of education is to teach one to think intensively and to think critically.</p>
                    <p class="quote-author">- Martin Luther King Jr.</p>
                </div>
                <div class="quote-slide">
                    <i class="fas fa-quote-left"></i>
                    <p class="quote-text">Education is not the filling of a pail, but the lighting of a fire.</p>
                    <p class="quote-author">- William Butler Yeats</p>
                </div>
                <div class="quote-slide">
                    <i class="fas fa-quote-left"></i>
                    <p class="quote-text">Education is the most powerful weapon which you can use to change the world.</p>
                    <p class="quote-author">- Nelson Mandela</p>
                </div>
            </div>
            <div class="quote-nav prev">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="quote-nav next">
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="quote-controls">
                <div class="quote-dot active" data-index="0"></div>
                <div class="quote-dot" data-index="1"></div>
                <div class="quote-dot" data-index="2"></div>
            </div>
        </div>
    `;
    
    // Replace the quote box with the slider
    quoteBox.outerHTML = sliderHTML;
    
    // Add the CSS for the quote slider
    const style = document.createElement('style');
    style.textContent = `
        .quote-slider {
            position: relative;
            height: 220px;
            overflow: hidden;
            margin: 2rem 0;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .quote-slides-container {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .quote-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            background: linear-gradient(135deg, #967969 0%, #967969 100%);
            color: #ffffff;
            text-align: center;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.8s ease;
            border-radius: 16px;
        }

        .quote-slide:first-child {
            opacity: 1;
            transform: translateX(0);
        }

        .quote-slide.active {
            opacity: 1;
            transform: translateX(0);
        }

        .quote-slide.prev {
            transform: translateX(-100%);
        }

        .quote-slide i {
            font-size: 2.5rem;
            color: #c8a971;
            margin-bottom: 1rem;
        }

        .quote-slide .quote-text {
            font-size: 1.5rem;
            font-style: italic;
            margin-bottom: 1rem;
            line-height: 1.6;
            font-family: 'Playfair Display', serif;
        }

        .quote-slide .quote-author {
            font-weight: 600;
            color: #c8a971;
            font-size: 1.1rem;
        }

        .quote-controls {
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
        }

        .quote-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ffffffff;
            opacity: 0.5;
            margin: 0 0.5rem;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .quote-dot.active {
            opacity: 1;
            transform: scale(1.2);
            background-color: #c8a971;
        }

        .quote-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 10;
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(5px);
        }

        .quote-nav:hover {
            background-color: #c8a971;
        }

        .quote-nav.prev {
            left: 15px;
        }

        .quote-nav.next {
            right: 15px;
        }

        @media (max-width: 768px) {
            .quote-slide .quote-text {
                font-size: 1.2rem;
            }
            
            .quote-slide {
                padding: 1.5rem;
            }
            
            .quote-nav {
                width: 35px;
                height: 35px;
            }
        }
    `;
    document.head.appendChild(style);

    // Slider functionality
    const quotes = document.querySelectorAll('.quote-slide');
    const dots = document.querySelectorAll('.quote-dot');
    const prevBtn = document.querySelector('.quote-nav.prev');
    const nextBtn = document.querySelector('.quote-nav.next');
    let currentIndex = 0;

    function showQuote(index) {
        // Remove active class from all quotes and dots
        quotes.forEach(quote => quote.classList.remove('active', 'prev'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current quote and dot
        quotes[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        // Add prev class to previous quote for transition effect
        if (index > 0) {
            quotes[index - 1].classList.add('prev');
        } else {
            quotes[quotes.length - 1].classList.add('prev');
        }
        
        currentIndex = index;
    }

    // Initialize first quote
    showQuote(0);

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= quotes.length) nextIndex = 0;
            showQuote(nextIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = quotes.length - 1;
            showQuote(prevIndex);
        });
    }

    // Dot navigation
    if (dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                let index = parseInt(this.getAttribute('data-index'));
                showQuote(index);
            });
        });
    }

    // Auto slide every 8 seconds
    setInterval(function() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= quotes.length) nextIndex = 0;
        showQuote(nextIndex);
    }, 8000);
});