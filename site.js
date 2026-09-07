document.addEventListener("DOMContentLoaded", function () {

    /* ================= PAGE LOADER ================= */

    const pageLoader = document.getElementById("pageLoader");

    document.body.classList.add("no-scroll");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (pageLoader) {
                pageLoader.classList.add("hide");
            }

            document.body.classList.remove("no-scroll");

            document.querySelectorAll(".hero .reveal")
                .forEach(function (element) {

                    element.classList.add("show");

                });

        }, 1800);

    });


    /* ================= MOBILE MENU ================= */

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const isOpen =
                navLinks.classList.contains("active");

            menuButton.innerHTML =
                isOpen ? "✕" : "☰";

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });


        navLinks.querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    navLinks.classList.remove("active");

                    menuButton.innerHTML = "☰";

                    menuButton.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                });

            });

    }


    /* ================= DARK MODE ================= */

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("rupomTheme");


    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        if (themeToggle) {
            themeToggle.innerHTML = "☀️";
        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            const lightMode =
                document.body.classList.contains("light-mode");


            themeToggle.innerHTML =
                lightMode ? "☀️" : "🌙";


            localStorage.setItem(
                "rupomTheme",
                lightMode ? "light" : "dark"
            );

        });

    }


    /* ================= TYPING EFFECT ================= */

    const typingText =
        document.getElementById("typingText");


    const words = [
        "Web Developer",
        "Frontend Developer",
        "ASP.NET Developer",
        "Creative Developer"
    ];


    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;


    function typeEffect() {

        if (!typingText) {
            return;
        }


        const currentWord =
            words[wordIndex];


        if (!deleting) {

            typingText.textContent =
                currentWord.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;


            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1500
                );

                return;

            }

        } else {

            typingText.textContent =
                currentWord.substring(
                    0,
                    charIndex - 1
                );

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
            deleting ? 50 : 95
        );

    }


    typeEffect();


    /* ================= SCROLL PROGRESS ================= */

    const scrollProgress =
        document.getElementById("scrollProgress");


    window.addEventListener("scroll", function () {

        if (!scrollProgress) {
            return;
        }


        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;


        if (documentHeight <= 0) {
            return;
        }


        const percentage =
            (scrollTop / documentHeight) * 100;


        scrollProgress.style.width =
            percentage + "%";

    });


    /* ================= REVEAL ANIMATION ================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

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
                    threshold: 0.12
                }

            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("show");

        });

    }


    /* ================= SKILL PROGRESS ================= */

    const skillSection =
        document.getElementById("skills");


    const progressBars =
        document.querySelectorAll(".progress-bar");


    if (
        skillSection &&
        "IntersectionObserver" in window
    ) {

        const skillObserver =
            new IntersectionObserver(

                function (entries) {

                    if (entries[0].isIntersecting) {

                        progressBars.forEach(function (bar) {

                            const width =
                                bar.getAttribute(
                                    "data-width"
                                );

                            bar.style.width =
                                width || "0%";

                        });


                        skillObserver.disconnect();

                    }

                },

                {
                    threshold: 0.2
                }

            );


        skillObserver.observe(skillSection);

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
                button.getAttribute(
                    "data-filter"
                );


            projects.forEach(function (project) {

                const category =
                    project.getAttribute(
                        "data-category"
                    );


                const shouldShow =
                    filter === "all" ||
                    category === filter;


                project.style.display =
                    shouldShow ? "" : "none";

            });

        });

    });


    /* ================= PROJECT MODAL ================= */

    const projectModal =
        document.getElementById("projectModal");


    const modalClose =
        document.getElementById("modalClose");


    const modalTitle =
        document.getElementById("modalTitle");


    const modalDescription =
        document.getElementById("modalDescription");


    const modalTag =
        document.getElementById("modalTag");


    const modalTech =
        document.getElementById("modalTech");


    const projectData = {

        ecommerce: {

            tag: "PRACTICE PROJECT",

            title: "E-Commerce Website",

            description:
                "A practice e-commerce interface created to demonstrate responsive layout, product presentation, navigation and modern web design.",

            tech:
                "HTML • CSS • JavaScript"

        },


        student: {

            tag: "PRACTICE PROJECT",

            title: "Student Management System",

            description:
                "A practice management concept for organising student information, academic records and structured database-driven content.",

            tech:
                "ASP.NET Core • C# • SQL"

        },


        portfolio: {

            tag: "PERSONAL PROJECT",

            title: "Personal Portfolio",

            description:
                "A responsive personal portfolio designed to present my background, skills, learning journey and development work.",

            tech:
                "HTML • CSS • JavaScript"

        }

    };


    document.querySelectorAll(".project-link")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const projectKey =
                    button.getAttribute(
                        "data-project"
                    );


                const data =
                    projectData[projectKey];


                if (!data || !projectModal) {
                    return;
                }


                modalTag.textContent =
                    data.tag;


                modalTitle.textContent =
                    data.title;


                modalDescription.textContent =
                    data.description;


                modalTech.textContent =
                    data.tech;


                projectModal.classList.add("show");

                document.body.classList.add(
                    "no-scroll"
                );

            });

        });


    function closeProjectModal() {

        if (!projectModal) {
            return;
        }


        projectModal.classList.remove("show");

        document.body.classList.remove(
            "no-scroll"
        );

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (projectModal) {

        projectModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === projectModal
                ) {

                    closeProjectModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeProjectModal();

            }

        }
    );


    /* ================= BACK TO TOP ================= */

    const backToTop =
        document.getElementById("backToTop");


    window.addEventListener("scroll", function () {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }

});
