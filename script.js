// Animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const animateElements = document.querySelectorAll(".fade-in, .slide-up");

  function checkIfInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state
  animateElements.forEach((element) => {
    element.style.opacity = 0;
    if (element.classList.contains("slide-up")) {
      element.style.transform = "translateY(30px)";
    }
    element.style.transition =
      "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
  });

  // Check on load
  window.addEventListener("load", checkIfInView);
  // Check on scroll
  window.addEventListener("scroll", checkIfInView);
});

// Scroll to top button
const topButton = document.getElementById("topBtn");
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    topButton.style.display = "flex";
  } else {
    topButton.style.display = "none";
  }
};

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Set initial state of top button
topButton.style.display = "none";

// Dark mode toggle
const darkToggle = document.getElementById("darkToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

// Check for saved user preference
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

// If user has a saved preference, use it, otherwise use system preference
if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark-mode");
  moonIcon.style.display = "none";
} else {
  document.body.classList.remove("dark-mode");
  sunIcon.style.display = "none";
}
darkToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
  } else {
    localStorage.setItem("theme", "light");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }
});
// Handle contact form submission without page redirect
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission

      // Show loading state
      const btnText = contactForm.querySelector(".btn-text");
      const btnLoading = contactForm.querySelector(".btn-loading");
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      btnText.style.display = "none";
      btnLoading.style.display = "inline-block";
      submitBtn.disabled = true;

      // Hide any existing messages
      document.getElementById("form-success").style.display = "none";
      document.getElementById("form-error").style.display = "none";

      // Collect form data
      const formData = new FormData(contactForm);

      // Submit the form using fetch API
      fetch("https://formspree.io/f/xyzeobpq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Reset form loading state
          btnText.style.display = "inline-block";
          btnLoading.style.display = "none";
          submitBtn.disabled = false;

          if (data.ok) {
            // Show success message
            document.getElementById("form-success").style.display = "block";

            // Reset the form
            contactForm.reset();

            // Scroll to success message
            document
              .getElementById("form-success")
              .scrollIntoView({ behavior: "smooth" });
          } else {
            // Show error message
            document.getElementById("form-error").style.display = "block";
            console.error("Form submission error:", data);
          }
        })
        .catch((error) => {
          // Reset form loading state
          btnText.style.display = "inline-block";
          btnLoading.style.display = "none";
          submitBtn.disabled = false;

          // Show error message
          document.getElementById("form-error").style.display = "block";
          console.error("Form submission error:", error);
        });
    });
  }
});
