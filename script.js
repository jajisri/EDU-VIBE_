
/* =========================
   MOBILE NAVIGATION
========================= */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});


/* =========================
   FOOTER YEAR
========================= */
document.getElementById("year").textContent = new Date().getFullYear();


/* =========================
   COURSE CATEGORY FILTER
========================= */
const categoryButtons = document.querySelectorAll(".category");
const courseCards = document.querySelectorAll(".course-card");
const noResults = document.getElementById("noResults");
const courseSearch = document.getElementById("courseSearch");

let activeCategory = "all";

function filterCourses() {
    const searchText = courseSearch.value.toLowerCase().trim();
    let visibleCount = 0;

    courseCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.dataset.title.toLowerCase();

        const matchesCategory =
            activeCategory === "all" || category === activeCategory;

        const matchesSearch = title.includes(searchText);

        if (matchesCategory && matchesSearch) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        activeCategory = button.dataset.category;
        filterCourses();
    });
});

courseSearch.addEventListener("input", filterCourses);


/* =========================
   ENROLLMENT MODAL
========================= */
const enrollModal = document.getElementById("enrollModal");
const closeModalButton = document.getElementById("closeModal");
const selectedCourse = document.getElementById("selectedCourse");
const enrollForm = document.getElementById("enrollForm");
const enrollMessage = document.getElementById("enrollMessage");

const enrollButtons = document.querySelectorAll(".enroll-btn");

enrollButtons.forEach(button => {
    button.addEventListener("click", () => {
        const course = button.dataset.course;
        const price = button.dataset.price;

        selectedCourse.textContent = course + " — " + price;

        enrollMessage.textContent = "";
        enrollForm.reset();

        enrollModal.classList.add("show");
        document.body.style.overflow = "hidden";
    });
});

function closeEnrollModal() {
    enrollModal.classList.remove("show");
    document.body.style.overflow = "";
}

closeModalButton.addEventListener("click", closeEnrollModal);

enrollModal.addEventListener("click", event => {
    if (event.target === enrollModal) {
        closeEnrollModal();
    }
});


/* =========================
   ENROLLMENT FORM
========================= */
enrollForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();

    if (name && email) {
        enrollMessage.textContent =
            "Welcome, " + name + "! Your enrollment request is successful. Happy learning! 🎉";

        enrollForm.reset();
    }
});


/* =========================
   LOGIN MODAL
========================= */
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const loginClose = document.querySelector(".login-close");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginBtn.addEventListener("click", () => {
    loginMessage.textContent = "";
    loginForm.reset();
    loginModal.classList.add("show");
    document.body.style.overflow = "hidden";
});

function closeLoginModal() {
    loginModal.classList.remove("show");
    document.body.style.overflow = "";
}

loginClose.addEventListener("click", closeLoginModal);

loginModal.addEventListener("click", event => {
    if (event.target === loginModal) {
        closeLoginModal();
    }
});

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    loginMessage.textContent = "Demo login successful! Welcome to EduVibe. ✨";
    loginForm.reset();
});


/* =========================
   ESCAPE KEY
========================= */
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeEnrollModal();
        closeLoginModal();
    }
});
