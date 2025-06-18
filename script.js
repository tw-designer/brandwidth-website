// Testimonials Carousel Logic

document.addEventListener('DOMContentLoaded', function () {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let current = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            card.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
        current = index;
    }

    prevBtn.addEventListener('click', function () {
        let newIndex = (current - 1 + testimonials.length) % testimonials.length;
        showTestimonial(newIndex);
    });

    nextBtn.addEventListener('click', function () {
        let newIndex = (current + 1) % testimonials.length;
        showTestimonial(newIndex);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', function () {
            showTestimonial(i);
        });
    });

    // Optional: swipe support for mobile
    let startX = 0;
    let endX = 0;
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        });
        carousel.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                // swipe left
                let newIndex = (current + 1) % testimonials.length;
                showTestimonial(newIndex);
            } else if (endX - startX > 50) {
                // swipe right
                let newIndex = (current - 1 + testimonials.length) % testimonials.length;
                showTestimonial(newIndex);
            }
        });
    }

    // Initialize
    showTestimonial(0);
}); 