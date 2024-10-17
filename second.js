// Custom smooth scroll function with adjustable duration
function smoothScrollTo(container, targetPosition, duration) {
    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);

        container.scrollTop = run;

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Scroll to the target section when clicking a nav link with slower smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Get the target section ID
        const targetElement = document.querySelector(`#${targetId}`);
        const targetPosition = targetElement.offsetTop - container.offsetTop; // Calculate the target position relative to the container
        
        smoothScrollTo(container, targetPosition, 2000); // Use custom smooth scroll with 2s duration
    });
});

// Add active class to the correct nav item based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li');
const container = document.getElementById('website-container');

// Function to add active class on page load for Home section
function setInitialActiveLink() {
    navLinks.forEach((li, index) => {
        li.classList.remove('active');
        if (index === 0) {
            li.classList.add('active'); // Set Home as active initially
        }
    });
}

// Function to update the active link on scroll
function updateActiveLinkOnScroll() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - container.offsetTop; // Calculate the top of the section relative to the container
        const sectionHeight = section.clientHeight;
        const scrollPosition = container.scrollTop; // Get scroll position of the container

        if (scrollPosition >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(li => {
        li.classList.remove('active');
        if (li.querySelector('a').getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });

    // Special case for the last section (Contact), when scrolled to the bottom
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href').includes('contact')) {
                li.classList.add('active');
            }
        });
    }
}

// Set initial active link on page load
setInitialActiveLink();

// Update active link on scroll (within the container)
container.addEventListener('scroll', updateActiveLinkOnScroll);


window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingCounter = document.getElementById('loading-counter');
    const chaiGif = document.getElementById('chai-gif'); // Select the GIF image

    // Reset the GIF animation by reassigning the src attribute
    chaiGif.src = chaiGif.src;

    let percentage = 0;

    // Update the loading bar width and counter every 50ms
    const interval = setInterval(() => {
        percentage += 2; // Increment the percentage value
        loadingBar.style.width = `${percentage}%`; // Increase width in percentage
        loadingCounter.textContent = `${percentage}%`; // Update the counter text

        // Once the percentage reaches 100%, stop the interval
        if (percentage >= 100) {
            clearInterval(interval);

            // After loading completes, fade out the loading screen
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');

                // Remove the loading screen from the DOM after the fade-out
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000); // Wait for 1 second for the fade-out to finish
            }, 600); // Add a slight delay to synchronize the animation
        }
    }, 50); // Update every 50 milliseconds, so it reaches 100% in 5 seconds
});


// bouncy effect

/*document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top;
            const startPosition = window.pageYOffset;
            const distance = targetPosition;
            const duration = 1500; // You can adjust this for slower or faster scroll + bounce
            let start = null;

            window.requestAnimationFrame(function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const scrollPosition = easeOutBounce(progress, startPosition, distance, duration);
                window.scrollTo(0, scrollPosition);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            });
        }
    });
});

// Easing function for bounce effect
function easeOutBounce(t, b, c, d) {
    t /= d;
    if (t < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        t -= (1.5 / 2.75);
        return c * (7.5625 * t * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
        t -= (2.25 / 2.75);
        return c * (7.5625 * t * t + .9375) + b;
    } else {
        t -= (2.625 / 2.75);
        return c * (7.5625 * t * t + .984375) + b;
    }
}
*/