// Preloader
$.holdReady(true);

$("body").imagesLoaded({ background: ".background-holder" }, function () {
  $("#preloader").removeClass("loading");
  $.holdReady(false);
  setTimeout(function () {
    $("#preloader").remove();
  }, 800);
});

// Zanimation
$(window).on("load", function () {
  $("*[data-inertia]").each(function () {
    $(this).inertia();
  });
});

// Script para cambiar la apariencia del header al hacer scroll
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionamos el header
  const navbar = document.querySelector(".navbar-elixir");

  // Función para verificar la posición de scroll y actualizar el header
  function checkScroll() {
    // Calculamos la altura del slider o imagen principal
    // Podemos usar las clases que ya están en el HTML
    const headerHeight = navbar.offsetHeight;
    let heroSection;

    // Verificamos qué elemento está presente (slider o imagen de sección)
    if (document.querySelector(".flexslider")) {
      heroSection = document.querySelector(".flexslider");
    } else if (document.querySelector(".background-holder.overlay")) {
      heroSection = document.querySelector("section:first-of-type");
    }

    // Si no hay ninguno, usamos un valor predeterminado
    const threshold = heroSection
      ? heroSection.offsetHeight - headerHeight
      : 100;

    // Comprobamos si hemos pasado el umbral
    if (window.scrollY > threshold) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Ejecutamos la función al cargar la página
  checkScroll();

  // Añadimos la función al evento de scroll
  window.addEventListener("scroll", checkScroll);

  // También recomprobamos en caso de redimensionamiento
  window.addEventListener("resize", checkScroll);
});
