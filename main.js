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
if (typeof anime !== 'undefined') {
    const heroTitles = document.querySelectorAll('.hero-text, .text-h1');

    function wrapLettersPreservingHTML(element) {
        // نکته کلیدی: استفاده از Array.from باعث میشه جاوا اسکریپت با دیدن تگ های هایلایت متوقف نشه
        Array.from(element.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue;
                
                // اگر فقط فضای خالی (Enter/Tab) بین تگ هاست، نادیده بگیر
                if (text.trim() === '') return;

                const fragment = document.createDocumentFragment();
                for (let char of text) {
                    if (char === ' ') {
                        // حفظ دقیق فاصله ها بین کلمات
                        fragment.appendChild(document.createTextNode(' '));
                    } else {
                        // قرار دادن هر حرف داخل یک اسپان
                        const span = document.createElement('span');
                        span.classList.add('letter');
                        span.textContent = char;
                        fragment.appendChild(span);
                    }
                }
                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // وقتی به کلمات هایلایت شده رسید، بره داخلشون و حروف اون ها رو هم جدا کنه
                wrapLettersPreservingHTML(node);
            }
        });
    }

    heroTitles.forEach(heroTitle => {
        wrapLettersPreservingHTML(heroTitle);

        anime({
            targets: heroTitle.querySelectorAll('.letter'),
            rotateY: [-90, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: (el, i) => 25 * i, // تاخیر بین حروف. هرچی عدد کمتر بشه سریع تر تموم میشه
            loop: false
        });
    });
}
