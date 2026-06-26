document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // SMOOTH SCROLL ACTIVE NAV
    // =========================

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================
    // ACTIVE NAV ON SCROLL
    // =========================

    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {

        let scrollPos = window.scrollY + 100;

        sections.forEach(section => {

            if (
                scrollPos >= section.offsetTop &&
                scrollPos < section.offsetTop + section.offsetHeight
            ) {
                document.querySelectorAll(".nav-links a").forEach(a => {
                    a.classList.remove("active");

                    if (a.getAttribute("href") === `#${section.id}`) {
                        a.classList.add("active");
                    }
                });
            }

        });

    });

    // =========================
    // SCROLL REVEAL EFFECT
    // =========================

    const revealElements = document.querySelectorAll(
        ".timeline-item, .skill-card, .project-card, .cert-card, .edu-card"
    );

    const revealOnScroll = () => {

        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {

            const boxTop = el.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                el.classList.add("show");
            }

        });

    };

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();
    
});
