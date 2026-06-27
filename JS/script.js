document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // NAVIGATION SMOOTH SCROLL
    // =========================

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    navLinks.forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const targetId = link.getAttribute("href");
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
    // ACTIVE NAVIGATION
    // =========================

    function updateActiveNav() {

        let scrollPos = window.scrollY + 150;

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

    window.addEventListener("scroll", updateActiveNav, {
        passive: true
    });

    updateActiveNav();

    // =========================
    // SCROLL REVEAL ANIMATION
    // =========================

    const revealElements = document.querySelectorAll(
        ".timeline-item, .skill-card, .project-card, .cert-card, .edu-card"
    );

    function revealOnScroll() {

        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {

            const elementTop =
                element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add("show");
            }

        });

    }

    window.addEventListener("scroll", revealOnScroll, {
        passive: true
    });

    revealOnScroll();

    // =========================
    // PROJECT IMAGE CLICK
    // =========================

    const projectImages =
        document.querySelectorAll(".project-image");

    projectImages.forEach(image => {

        image.style.cursor = "pointer";

        image.addEventListener("click", () => {

            window.open(image.src, "_blank");

        });

    });

});


// =========================
// CERTIFICATE MODAL
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

    const modal =
        document.getElementById("certModal");

    if (modal) {
        modal.style.display = "none";
    }

}

window.addEventListener("click", (e) => {

    const modal =
        document.getElementById("certModal");

    if (modal && e.target === modal) {
        modal.style.display = "none";
    }

});


// =========================
// CONTACT FORM
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.querySelector(".contact-form");

    if (!form) return;

    const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbwbLx2MyCS4IpgMeKVMw0OVY5Wy9_LqH9hpYteGlh62QL540TQ2SKtm1AWWrA2IjGht/exec";

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name =
            form.querySelector("input[type='text']").value.trim();

        const email =
            form.querySelector("input[type='email']").value.trim();

        const message =
            form.querySelector("textarea").value.trim();

        const status =
            document.getElementById("form-status");

        if (!name || !email || !message) {

            if (status) {

                status.textContent =
                    "Please fill all fields.";

                status.className = "error";
            }

            return;
        }

        try {

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            if (status) {

                status.textContent =
                    "✅ Message sent successfully!";

                status.className = "success";
            }

            form.reset();

        } catch (error) {

            console.error(error);

            if (status) {

                status.textContent =
                    "❌ Failed to send message.";

                status.className = "error";
            }

        }

    });

});