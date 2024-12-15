document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // ScrollReveal Animations
  ScrollReveal().reveal(".hero-content", { delay: 200 });
  ScrollReveal().reveal(".about-content", { delay: 200 });
  ScrollReveal().reveal(".project-card", { delay: 200, interval: 200 });
  ScrollReveal().reveal("#contact-form", { delay: 200 });

  // Initialize EmailJS
  (function () {
    emailjs.init("Aldrinknows"); // Replace with your actual User ID
  })();

  // Form Submission
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading indicator
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Prepare template parameters
    const templateParams = {
      from_name: form.elements.name.value,
      from_email: form.elements.email.value,
      message: form.elements.message.value,
    };

    // Send email using EmailJS
    emailjs
      .send("service_ytstqcd", "template_n5gpw6e", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          form.reset();
          alert("Thank you for your message! I'll get back to you soon.");
        },
        function (error) {
          console.log("FAILED...", error);
          alert(
            "Oops! There was an error sending your message. Please try again later."
          );
        }
      )
      .finally(function () {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  });
  emailjs.init({
    publicKey: "bN2REbuA2TEuMOm1l",
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      list: ["foo@emailjs.com", "bar@emailjs.com"],
      // The variable contains the email address
      watchVariable: "userEmail",
    },
    limitRate: {
      // Set the limit rate for the application
      id: "app",
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });
});
