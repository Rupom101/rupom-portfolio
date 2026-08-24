document.addEventListener("DOMContentLoaded", function () {


    /* ================= MOBILE MENU ================= */

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {
                menuButton.innerHTML = "✕";
            } else {
                menuButton.innerHTML = "☰";
            }

        });

    }


    /* ================= CLOSE MOBILE MENU ================= */

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            if (menuButton) {
                menuButton.innerHTML = "☰";
            }

        });

    });


    /* ================= DARK / LIGHT MODE ================= */

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("rupomTheme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        themeToggle.innerHTML = "☀️";

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {

                themeToggle.innerHTML = "☀️";

                localStorage.setItem("rupomTheme", "light");

            } else {

                themeToggle.innerHTML = "🌙";

                localStorage.setItem("rupomTheme", "dark");

            }

        });

    }


    /* ================= TYPING ANIMATION ================= */

    const typingText = document.getElementById("typingText");

    const words = [
        "ASP.NET Web Developer",
        "Web Developer",
        "Programmer",
        "Creative Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;


    function typeEffect() {

        if (!typingText) {
            return;
        }


        const currentWord = words[wordIndex];


        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;


            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1600);

                return;

            }

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;


            if (charIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }

            }

        }


        setTimeout(
            typeEffect,
            deleting ? 50 : 100
        );

    }


    typeEffect();


    /* ================= SCROLL PROGRESS ================= */

    const scrollProgress =
        document.getElementById("scrollProgress");


    window.addEventListener("scroll", function () {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percentage =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width =
            percentage + "%";

    });


    /* ================= REVEAL ANIMATION ================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* ================= SKILL PROGRESS ================= */

    const skillSection =
        document.getElementById("skills");

    const progressBars =
        document.querySelectorAll(".progress-bar");


    const skillObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        progressBars.forEach(function (bar) {

                            bar.style.width =
                                bar.getAttribute("data-width");

                        });

                        skillObserver.disconnect();

                    }

                });

            },

            {
                threshold: 0.25
            }

        );


    if (skillSection) {
        skillObserver.observe(skillSection);
    }


    /* ================= STATISTICS ================= */

    const statNumbers =
        document.querySelectorAll(".stat-number");


    let statsStarted = false;


    function animateStats() {

        if (statsStarted) {
            return;
        }

        statsStarted = true;


        statNumbers.forEach(function (counter) {

            const target =
                Number(counter.getAttribute("data-target"));

            let current = 0;

            const increment =
                Math.max(1, Math.ceil(target / 60));


            const timer =
                setInterval(function () {

                    current += increment;


                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }


                    counter.textContent =
                        current;

                }, 25);

        });

    }


    const statsSection =
        document.querySelector(".stats-section");


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(

                function (entries) {

                    if (entries[0].isIntersecting) {

                        animateStats();

                        statsObserver.disconnect();

                    }

                },

                {
                    threshold: 0.3
                }

            );

        statsObserver.observe(statsSection);

    }


    /* ================= PROJECT FILTER ================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projects =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const filter =
                button.getAttribute("data-filter");


            projects.forEach(function (project) {

                const category =
                    project.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    project.style.display = "block";

                } else {

                    project.style.display = "none";

                }

            });

        });

    });


    /* ================= BACK TO TOP ================= */

    const backToTop =
        document.getElementById("backToTop");


    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= DOWNLOAD PROFILE ================= */

    const downloadProfile =
        document.getElementById("downloadProfile");


    if (downloadProfile) {

        downloadProfile.addEventListener("click", function () {

            window.print();

        });

    }


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (
                name === "" ||
                email === "" ||
                phone === "" ||
                message === ""
            ) {

                formMessage.textContent =
                    "Please fill in all fields.";

                return;

            }


            formMessage.textContent =
                "✓ Message information is ready. Thank you!";


            /*
             * This is currently a front-end demo form.
             * To actually receive messages,
             * connect this form to an ASP.NET Controller
             * and database/email service.
             */


            contactForm.reset();


            document.getElementById("name").value =
                "Mr Rupom Ahmed";

            document.getElementById("email").value =
                "rupom129@gmail.com";

            document.getElementById("phone").value =
                "01991003861";

        });

    }


});