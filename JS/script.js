document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    function updateActiveNav() {

        const scrollPos = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {

            if (!section.id) return;

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

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const navbar = document.querySelector(".navbar");

    function navbarScroll() {
        if (!navbar) return;

        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener("scroll", navbarScroll, { passive: true });
    navbarScroll();

    /* =========================
       SCROLL REVEAL (SAFE OPTIMIZED)
    ========================= */

    const revealElements = document.querySelectorAll(
        ".timeline-item, .skill-card, .project-card, .cert-card, .stat-card, .info-card"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));

    /* =========================
       PROJECT IMAGE MODAL
    ========================= */

    const projectImages = document.querySelectorAll(".project-image");
    const modal = document.getElementById("certModal");
    const modalImage = document.getElementById("certImage");

    projectImages.forEach(img => {

        img.style.cursor = "pointer";

        img.addEventListener("click", () => {

            if (!modal || !modalImage) return;

            modalImage.src = img.src;
            modal.style.display = "block";

        });

    });

    /* =========================
       SCROLL TO TOP BUTTON
    ========================= */

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", () => {
            topBtn.style.display = window.scrollY > 400 ? "block" : "none";
        }, { passive: true });

        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =========================
       CONTACT FORM (FORMSPREE / G-SCRIPT)
    ========================= */

    const form = document.querySelector(".contact-form");

    if (form) {

        const SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbwbLx2MyCS4IpgMeKVMw0OVY5Wy9_LqH9hpYteGlh62QL540TQ2SKtm1AWWrA2IjGht/exec";

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const name = form.querySelector("input[name='name']")?.value.trim();
            const email = form.querySelector("input[name='email']")?.value.trim();
            const message = form.querySelector("textarea")?.value.trim();

            const status = document.getElementById("form-status");
            const button = form.querySelector("button");

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                if (status) {
                    status.textContent = "Please fill all fields.";
                    status.className = "error";
                }
                return;
            }

            if (!emailPattern.test(email)) {
                if (status) {
                    status.textContent = "Please enter a valid email.";
                    status.className = "error";
                }
                return;
            }

            button.disabled = true;
            button.textContent = "Sending...";

            try {

                await fetch(SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });

                if (status) {
                    status.textContent = "Message sent successfully!";
                    status.className = "success";
                }

                form.reset();

            } catch (err) {

                console.error(err);

                if (status) {
                    status.textContent = "Failed to send message.";
                    status.className = "error";
                }

            } finally {
                button.disabled = false;
                button.textContent = "Send Message";
            }
        });
    }

});

/* =========================
   CERTIFICATE MODAL
========================= */

function openCert(type) {

    const modal = document.getElementById("certModal");
    const img = document.getElementById("certImage");

    if (!modal || !img) return;

    const certMap = {
        aws: "assets/aws-cert.png",
        oracle: "assets/oracle-cert.png"
    };

    if (!certMap[type]) return;

    img.src = certMap[type];
    modal.style.display = "block";
}

function closeCert() {

    const modal = document.getElementById("certModal");

    if (modal) {
        modal.style.display = "none";
    }
}

window.addEventListener("click", (e) => {

    const modal = document.getElementById("certModal");

    if (modal && e.target === modal) {
        modal.style.display = "none";
    }
});