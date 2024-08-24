document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animation]');
    const revealElements = document.querySelectorAll('.reveal, .content');
    const header = document.querySelector('header');
    const typingText = document.getElementById('typing-text');
    const upButton = document.getElementById('up-button');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector(".navbar"); 

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.hasAttribute('data-animation')) {
                    const animation = element.dataset.animation;
                    const delay = element.dataset.delay || 0;
                    setTimeout(() => {
                        element.classList.add('animated', animation);
                    }, delay);
                } else {
                    element.classList.add('active', 'reveal');
                }
                animateOnScroll.unobserve(element);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    [...animatedElements, ...revealElements].forEach(element => {
        animateOnScroll.observe(element);
    });

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            
            header.classList.add('hide');
        } else {
            
            header.classList.remove('hide');
        }
        lastScrollTop = scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    
        upButton.style.display = scrollTop > 300 ? 'block' : 'none';
    });

    if (typingText) {
        const text = "Launch your career with hands-on experience at Cognifyz Technologies with us!";
        let index = 0;
        function type() {
            if (index < text.length) {
                typingText.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 56);
            }
        }
        type();
    }

    upButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    navbarToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navbarToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navbarToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
           
            navLinks.classList.remove('active');
            navbarToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
});

navbarToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  