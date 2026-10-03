document.addEventListener("DOMContentLoaded", () => {
    
    // 1. انتخاب خودکار عناصر برای انیمیشن
    
    // الف) عناصر تک ستونه (حرکت عمودی)
    // با اضافه کردن :not(.no-animate) به جاوا اسکریپت میگیم عکس هایی که این کلاس رو دارن رو انیمیشن نده
    const verticalElements = document.querySelectorAll(`
        .bottom-card, 
        .content-image:not(.no-animate), 
        .full-width-image, 
        .final-box, 
        .charts-wrapper, 
        .about-product-section .card-white:not(.grid-2 .card-white)
    `);
    
    verticalElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-vertical', 'from-bottom');
    });

    // ب) عناصر دو ستونه یا سمت چپ
    const leftElements = document.querySelectorAll(`
        .top-card:nth-child(1),
        .projects-grid-2 .small-project-card:nth-child(odd),
        .projects-grid-3 .small-project-card:nth-child(1),
        .grid-2 > div:nth-child(odd),
        .square-card:nth-child(odd)
    `);
    
    leftElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-left');
    });

    // ج) عناصر دو ستونه یا سمت راست
    const rightElements = document.querySelectorAll(`
        .top-card:nth-child(2),
        .projects-grid-2 .small-project-card:nth-child(even),
        .projects-grid-3 .small-project-card:nth-child(3),
        .grid-2 > div:nth-child(even),
        .square-card:nth-child(even)
    `);
    
    rightElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-right');
    });

    // د) کارت وسطی در صفحات وب دیزاین در صفحات داخلی
    const middleElements = document.querySelectorAll('.projects-grid-3 .small-project-card:nth-child(2)');
    middleElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-vertical', 'from-bottom');
    });

    // 2. راه اندازی Intersection Observer برای اجرای انیمیشن ها
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
                if (entry.target.classList.contains('fade-vertical')) {
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove('from-top');
                        entry.target.classList.add('from-bottom');
                    } else {
                        entry.target.classList.remove('from-bottom');
                        entry.target.classList.add('from-top');
                    }
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

});
    // =========================================
    // Hero Title Letter Animation (Anime.js)
    // =========================================
    const heroText = document.querySelector('.hero-text');
    
    if (heroText && typeof anime !== 'undefined') {
        
        // تابع هوشمند برای جداسازی حروف بدون آسیب به هایلایت های زرد و سبز
        function wrapLettersPreservingHTML(element) {
            element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.nodeValue;
                    const fragment = document.createDocumentFragment();
                    for (let char of text) {
                        if (char.trim() === '') {
                            fragment.appendChild(document.createTextNode(char));
                        } else {
                            const span = document.createElement('span');
                            span.classList.add('letter');
                            span.textContent = char;
                            fragment.appendChild(span);
                        }
                    }
                    node.parentNode.replaceChild(fragment, node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    wrapLettersPreservingHTML(node); // پیمایش داخل اسپان های هایلایت
                }
            });
        }

        // تفکیک حروف
        wrapLettersPreservingHTML(heroText);

        // اجرای انیمیشن فرود حروف (بدون لوپ)
        anime({
            targets: '.hero-text .letter',
            rotateY: [-90, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: (el, i) => 30 * i, // فاصله زمانی چرخیدن هر حرف
            loop: false // بدون لوپ و تکرار
        });
    }
