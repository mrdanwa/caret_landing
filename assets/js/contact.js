// Simple newsletter form integration
document.addEventListener("DOMContentLoaded", function () {
    const newsletterForm = document.querySelector(".newsletter-form");
  
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const inputGroup = this.querySelector(".input-group");
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
  
      // Save original content to restore later
      const originalContent = inputGroup.innerHTML;
  
      // Send the request to the API
      fetch("https://caret-u6dxo.ondigitalocean.app/api/newsletter/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email }),
      }).then(() => {
        inputGroup.innerHTML =
          '<div style="width: 100%; padding: 0.9rem 1.2rem; background-color: #004225; color: white; font-size: 16px; font-weight: bold; text-align: center; border-radius: 6px;">¡Gracias por suscribirte!</div>';
  
        setTimeout(() => {
          inputGroup.innerHTML = originalContent;
          inputGroup.querySelector('input[type="email"]').value = "";
        }, 3000);
      });
    });
  });
  
  // Contact form integration
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const feedbackDiv = contactForm.querySelector(".zform-feedback");
  
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const name = document.getElementById("contact-name").value.trim();
      const phone = document.getElementById("contact-phone").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const message = document.getElementById("contact-message").value.trim();
  
      // Save original content to restore later
      const originalContent = contactForm.innerHTML;
  
      // Send the request to the API
      fetch("https://caret-u6dxo.ondigitalocean.app/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          message: message,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          // Show success message
          feedbackDiv.innerHTML =
            '<div>Enviado</div>';
  
          // Reset form
          contactForm.reset();
  
          // Restore original content after 3 seconds
          setTimeout(() => {
            feedbackDiv.innerHTML = "";
          }, 3000);
        })
        .catch((error) => {
          // Show error message
          feedbackDiv.innerHTML =
            '<div>Error</div>';
          
          // Clear error message after 3 seconds
          setTimeout(() => {
            feedbackDiv.innerHTML = "";
          }, 3000);
        });
    });
  });
  