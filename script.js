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

    // Hero Carousel Logic
    function setHeroCarousel(index) {
        const cards = document.querySelectorAll('.carousel-card');
        const dots = document.querySelectorAll('.carousel-dot');
        let total = cards.length;
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            if (i === index) {
                card.classList.add('active');
            } else if (i === (index - 1 + total) % total) {
                card.classList.add('prev');
            } else if (i === (index + 1) % total) {
                card.classList.add('next');
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function initHeroCarousel() {
        const cards = document.querySelectorAll('.carousel-card');
        const upBtn = document.querySelector('.carousel-arrow.up');
        const downBtn = document.querySelector('.carousel-arrow.down');
        const dots = document.querySelectorAll('.carousel-dot');
        let current = 0;
        let autoInterval = null;
        let isPaused = false;
        if (!cards.length) return;
        setHeroCarousel(current);

        function next() {
            current = (current + 1) % cards.length;
            setHeroCarousel(current);
        }
        function prev() {
            current = (current - 1 + cards.length) % cards.length;
            setHeroCarousel(current);
        }
        function startAuto() {
            if (autoInterval) clearInterval(autoInterval);
            autoInterval = setInterval(() => {
                if (!isPaused) next();
            }, 5000);
        }
        function pauseAuto() {
            isPaused = true;
        }
        function resumeAuto() {
            isPaused = false;
        }
        upBtn.addEventListener('click', function () {
            prev();
            pauseAuto();
        });
        downBtn.addEventListener('click', function () {
            next();
            pauseAuto();
        });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', function () {
                current = i;
                setHeroCarousel(current);
                pauseAuto();
            });
        });
        // Optional: swipe support for mobile
        let startY = 0;
        let endY = 0;
        const stack = document.querySelector('.carousel-stack');
        if (stack) {
            stack.addEventListener('touchstart', function (e) {
                startY = e.touches[0].clientY;
            });
            stack.addEventListener('touchend', function (e) {
                endY = e.changedTouches[0].clientY;
                if (startY - endY > 40) {
                    next();
                    pauseAuto();
                } else if (endY - startY > 40) {
                    prev();
                    pauseAuto();
                }
            });
            stack.addEventListener('mouseenter', pauseAuto);
            stack.addEventListener('mouseleave', resumeAuto);
        }
        // Pause on hover/interact
        cards.forEach(card => {
            card.addEventListener('mouseenter', pauseAuto);
            card.addEventListener('mouseleave', resumeAuto);
        });
        // 3D perspective tilt effect on active card
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                if (!card.classList.contains('active')) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * 10;
                const rotateY = ((x - centerX) / centerX) * 16;
                card.style.transform = `perspective(1200px) scale(1) translateY(0) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
            });
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
        startAuto();
    }

    if (document.querySelector('.carousel-stack')) {
        initHeroCarousel();
    }
}); 