document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    function updateActiveNav() {

        let scrollPos =
            window.scrollY +
            window.innerHeight / 3;

        sections.forEach(section => {

            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {

                navLinks.forEach(link =>
                    link.classList.remove("active")
                );

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${section.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const navbar =
        document.querySelector(".navbar");

    function navbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        navbarScroll,
        { passive: true }
    );

    navbarScroll();

    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".timeline-item, .skill-card, .project-card, .cert-card, .edu-card, .stat-card, .info-card"
        );

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    /* =========================
       PROJECT IMAGE MODAL
    ========================= */

    const projectImages =
        document.querySelectorAll(".project-image");

    const modal =
        document.getElementById("certModal");

    const modalImage =
        document.getElementById("certImage");

    projectImages.forEach(image => {

        image.style.cursor = "pointer";

        image.addEventListener("click", () => {

            if (!modal || !modalImage) return;

            modalImage.src = image.src;

            modal.style.display = "block";

        });

    });

    /* =========================
       DYNAMIC FOOTER YEAR
    ========================= */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

    /* =========================
       SCROLL TO TOP BUTTON
    ========================= */

    const topBtn =
        document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener(
            "scroll",
            () => {

                topBtn.style.display =
                    window.scrollY > 400
                        ? "block"
                        : "none";

            },
            { passive: true }
        );

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    /* =========================
       CONTACT FORM
    ========================= */

    const form =
        document.querySelector(".contact-form");

    if (form) {

        const SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbwbLx2MyCS4IpgMeKVMw0OVY5Wy9_LqH9hpYteGlh62QL540TQ2SKtm1AWWrA2IjGht/exec";

        form.addEventListener(
            "submit",
            async (e) => {

                e.preventDefault();

                const name =
                    form.querySelector(
                        "input[type='text']"
                    ).value.trim();

                const email =
                    form.querySelector(
                        "input[type='email']"
                    ).value.trim();

                const message =
                    form.querySelector(
                        "textarea"
                    ).value.trim();

                const status =
                    document.getElementById(
                        "form-status"
                    );

                const button =
                    form.querySelector(
                        "button"
                    );

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (status) {

                        status.textContent =
                            "Please fill all fields.";

                        status.className =
                            "error";

                    }

                    return;

                }

                if (
                    !emailPattern.test(email)
                ) {

                    if (status) {

                        status.textContent =
                            "Please enter a valid email.";

                        status.className =
                            "error";

                    }

                    return;

                }

                button.disabled = true;
                button.textContent = "Sending...";

                try {

                    await fetch(
                        SCRIPT_URL,
                        {
                            method: "POST",
                            mode: "no-cors",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                name,
                                email,
                                message
                            })
                        }
                    );

                    if (status) {

                        status.textContent =
                            "✅ Message sent successfully!";

                        status.className =
                            "success";

                    }

                    form.reset();

                } catch (error) {

                    console.error(error);

                    if (status) {

                        status.textContent =
                            "❌ Failed to send message.";

                        status.className =
                            "error";

                    }

                } finally {

                    button.disabled = false;
                    button.textContent = "Send";

                }

            }
        );

    }

});

/* =========================
   CERTIFICATE MODAL
========================= */

function openCert(type) {

    const modal =
        document.getElementById("certModal");

    const img =
        document.getElementById("certImage");

    if (!modal || !img) return;

    switch (type) {

        case "aws":
            img.src =
                "assets/aws-cert.png";
            break;

        case "oracle":
            img.src =
                "assets/oracle-cert.png";
            break;

        default:
            return;

    }

    modal.style.display = "block";

}

function closeCert() {

    const modal =
        document.getElementById("certModal");

    if (modal) {

        modal.style.display = "none";

    }

}

window.addEventListener("click", (e) => {

    const modal =
        document.getElementById("certModal");

    if (
        modal &&
        e.target === modal
    ) {

        modal.style.display = "none";

    }

});