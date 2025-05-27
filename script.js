gsap.registerPlugin(ScrollTrigger);

// Ensure body overflow is hidden but doesn’t animate
gsap.set("body", { overflow: "hidden" });

// Animate grid boxes when they come into view
gsap.utils.toArray(".grid-box").forEach((box) => {
    gsap.from(box, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// Smooth scrolling effect for keywords
gsap.to(".keywords", {
    xPercent: -100, // Moves left infinitely
    duration: 10,
    repeat: -1,
    ease: "linear"
});

document.addEventListener("DOMContentLoaded", function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true
    });

    // Sync Locomotive Scroll with GSAP
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length
                ? scroll.scrollTo(value, 0, 0)
                : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
    });

    scroll.on("scroll", ScrollTrigger.update);

    const darkModeBtn = document.querySelector(".dark-mode-btn");
    const body = document.body;

    function applyDarkMode() {
        if (localStorage.getItem("dark-mode") === "enabled") {
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
        }
    }

    applyDarkMode(); // Apply dark mode on load

    if (!darkModeBtn) {
        console.error("Dark mode button not found!");
        return;
    }

    darkModeBtn.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Reapply dark mode after Locomotive Scroll initializes
    setTimeout(applyDarkMode, 100);
});
