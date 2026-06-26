document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // NAV LINKS SMOOTH SCROLL
    // =========================

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    navLinks.forEach(link => {
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

    function updateActiveNav() {

        let scrollPos = window.scrollY + 120;

        sections.forEach(section => {

            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {

                navLinks.forEach(link => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${section.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });

    updateActiveNav();

    // =========================
    // SCROLL REVEAL ANIMATION
    // =========================

    const revealElements = document.querySelectorAll(
        ".timeline-item, .skill-card, .project-card, .cert-card, .edu-card"
    );

    function revealOnScroll() {

        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {

            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                el.classList.add("show");
            }

        });

    }

    window.addEventListener("scroll", revealOnScroll, { passive: true });

    revealOnScroll();

});


// =========================
// CERTIFICATE MODAL (GLOBAL)
// =========================

function openCert(type) {

    const modal = document.getElementById("certModal");
    const img = document.getElementById("certImage");

    if (!modal || !img) return;

    if (type === "aws") {
        img.src = "assets/aws-cert.png";
    }

    if (type === "oracle") {
        img.src = "assets/oracle-cert.png";
    }

    modal.style.display = "block";
}

function closeCert() {
    const modal = document.getElementById("certModal");
    if (modal) modal.style.display = "none";
}

// close modal when clicking outside image
window.addEventListener("click", function (e) {

    const modal = document.getElementById("certModal");

    if (modal && e.target === modal) {
        modal.style.display = "none";
    }
});