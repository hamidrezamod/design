document.addEventListener("DOMContentLoaded", () => {
    
    // 1. انتخاب خودکار عناصر برای انیمیشن
    
    // الف) عناصر تک ستونه (حرکت عمودی از پایین/بالا)
    const verticalElements = document.querySelectorAll(`
        .bottom-card, 
        .content-image, 
        .full-width-image, 
        .final-box, 
        .charts-wrapper, 
        .about-product-section .card-white:not(.grid-2 .card-white)
    `);
    
    verticalElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-vertical', 'from-bottom');
    });

    // ب) عناصر دو ستونه یا سمت چپ (حرکت از چپ به راست)
    // شامل کارت اول تورب/مووی نایت، و المان های فرد در گرید پرسونا و ستون های چپ
    const leftElements = document.querySelectorAll(`
        .top-card:nth-child(1),
        .projects-grid-2 .small-project-card:nth-child(odd),
        .projects-grid-3 .small-project-card:nth-child(1),
        .grid-2 > div:nth-child(odd)
    `);
    
    leftElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-left');
    });

    // ج) عناصر دو ستونه یا سمت راست (حرکت از راست به چپ)
    // شامل کارت دوم، و المان های زوج در گرید پرسونا و ستون های راست
    const rightElements = document.querySelectorAll(`
        .top-card:nth-child(2),
        .projects-grid-2 .small-project-card:nth-child(even),
        .projects-grid-3 .small-project-card:nth-child(3),
        .grid-2 > div:nth-child(even)
    `);
    
    rightElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-right');
    });

    // د) کارت وسطی در صفحات وب دیزاین (حرکت عمودی)
    const middleElements = document.querySelectorAll('.projects-grid-3 .small-project-card:nth-child(2)');
    middleElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-vertical', 'from-bottom');
    });


    // 2. راه اندازی Intersection Observer برای اجرای انیمیشن ها
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // وقتی 15 درصد عنصر دیده شد انیمیشن اجرا بشه
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                // وقتی عنصر وارد صفحه میشه
                entry.target.classList.add('is-visible');
            } else {
                // وقتی عنصر از صفحه خارج میشه (برای اینکه وقتی برگشتیم دوباره انیمیشن اجرا بشه)
                entry.target.classList.remove('is-visible');
                
                // جادوی تغییر جهت تک ستونه ها!
                // بررسی می کنیم عنصر از بالا خارج شده یا از پایین
                if (entry.target.classList.contains('fade-vertical')) {
                    if (entry.boundingClientRect.top > 0) {
                        // عنصر از پایین صفحه خارج شده (یعنی کاربر رفت بالا) -> دفعه بعد باید از پایین بیاد
                        entry.target.classList.remove('from-top');
                        entry.target.classList.add('from-bottom');
                    } else {
                        // عنصر از بالای صفحه خارج شده (یعنی کاربر رفت پایین) -> دفعه بعد باید از بالا بیاد
                        entry.target.classList.remove('from-bottom');
                        entry.target.classList.add('from-top');
                    }
                }
            }
        });
    }, observerOptions);

    // اعمال آبزرور روی تمام عناصری که کلاس انیمیشن گرفتند
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

});
