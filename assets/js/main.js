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

// Navbar dropdown
$(document).ready(function () {
  // Make the navbar fixed position from the start
  $(".navbar-elixir").addClass("fixed-navbar");

  // Handle dropdown menu opening without pushing content
  $(".navbar-toggler").on("click", function () {
    if (!$(".navbar-elixir").hasClass("scrolled")) {
      $(".navbar-elixir").addClass("open-dropdown");
    }
  });
});

// Script para el botón de cambio de idioma
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("language-toggle");
  const languageOptions = document.getElementById("language-options");

  // Mostrar/ocultar opciones de idioma
  languageToggle.addEventListener("click", function () {
    languageOptions.classList.toggle("show");
  });

  // Cerrar el menú al hacer clic fuera
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".language-switcher")) {
      languageOptions.classList.remove("show");
    }
  });
});

// Script para cambiar la apariencia del header al hacer scroll
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar-elixir");
  const logoIcon1 = document.getElementById("logo-icon1");
  const logoIcon2 = document.getElementById("logo-icon2");

  // Get the base URL from a base tag if it exists, or construct a relative path
  const getBasePath = function () {
    // Check if base tag exists
    const baseTag = document.querySelector("base");
    if (baseTag && baseTag.href) {
      return baseTag.href;
    }

    // If no base tag, try to determine from script location
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src.includes("/assets/js/")) {
        return src.split("/assets/js/")[0] + "/";
      }
    }

    // Fallback to relative path
    return "../";
  };

  const basePath = getBasePath();

  // Set initial logo state (white when at top)
  if (logoIcon1) {
    logoIcon1.setAttribute("src", basePath + "assets/images/logo/logo5.png");
  }
  if (logoIcon2) {
    logoIcon2.setAttribute("src", basePath + "assets/images/logo/logo8.png");
  }

  function checkScroll() {
    const headerHeight = navbar.offsetHeight;
    let heroSection;

    if (document.querySelector(".flexslider")) {
      heroSection = document.querySelector(".flexslider");
    } else if (document.querySelector(".background-holder.overlay")) {
      heroSection = document.querySelector("section:first-of-type");
    }

    const threshold = heroSection
      ? heroSection.offsetHeight - headerHeight
      : 100;

    if (window.scrollY > threshold) {
      navbar.classList.add("scrolled");
      // Change logo to colored version when scrolled
      if (logoIcon1) {
        logoIcon1.setAttribute(
          "src",
          basePath + "assets/images/logo/logo4.png"
        );
      }
      if (logoIcon2) {
        logoIcon2.setAttribute(
          "src",
          basePath + "assets/images/logo/logo7.png"
        );
      }
    } else {
      navbar.classList.remove("scrolled");
      // Change logo to white version when at top
      if (logoIcon1) {
        logoIcon1.setAttribute(
          "src",
          basePath + "assets/images/logo/logo5.png"
        );
      }
      if (logoIcon2) {
        logoIcon2.setAttribute(
          "src",
          basePath + "assets/images/logo/logo8.png"
        );
      }
    }
  }

  // Run on page load
  checkScroll();

  // Add event listeners
  window.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);
});

// Handle hamburger menu and scrolling behaviors with consistent logo states
$(document).ready(function () {
  const navbar = $(".navbar-elixir");
  const navbarCollapse = $(".navbar-collapse");
  const logoIcon1 = $("#logo-icon1");
  const logoIcon2 = $("#logo-icon2");

  // Get the base URL from a base tag if it exists, or construct a relative path
  const getBasePath = function () {
    // Check if base tag exists
    const baseTag = document.querySelector("base");
    if (baseTag && baseTag.href) {
      return baseTag.href;
    }

    // If no base tag, try to determine from script location
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src.includes("/assets/js/")) {
        return src.split("/assets/js/")[0] + "/";
      }
    }

    // Fallback to relative path
    return "../";
  };

  const basePath = getBasePath();

  // Define logo paths
  const whiteLogo1 = basePath + "assets/images/logo/logo5.png";
  const whiteLogo2 = basePath + "assets/images/logo/logo8.png";
  const coloredLogo1 = basePath + "assets/images/logo/logo4.png";
  const coloredLogo2 = basePath + "assets/images/logo/logo7.png";

  let isNavbarOpen = false;

  // Set logos to colored version
  function setColoredLogos() {
    logoIcon1.attr("src", coloredLogo1);
    logoIcon2.attr("src", coloredLogo2);
  }

  // Set logos to white version
  function setWhiteLogos() {
    logoIcon1.attr("src", whiteLogo1);
    logoIcon2.attr("src", whiteLogo2);
  }

  // When hamburger is clicked
  $(".navbar-toggler").on("click", function () {
    isNavbarOpen = !navbarCollapse.hasClass("show");

    if (isNavbarOpen) {
      // Menu is being opened - always add scrolled class and use colored logos
      navbar.addClass("scrolled");
      setColoredLogos();
    } else {
      // Menu is being closed
      // Only remove scrolled class if we're at the top of the page
      if (window.scrollY <= 100) {
        navbar.removeClass("scrolled");
        setWhiteLogos();
      }
    }
  });

  // Handle scrolling - this will be ignored when dropdown is open
  let originalScrollHandler = function () {
    // Skip this logic if the navbar is open
    if (isNavbarOpen) {
      return;
    }

    const headerHeight = navbar.outerHeight();
    let heroSection;

    if ($(".flexslider").length) {
      heroSection = $(".flexslider");
    } else if ($(".background-holder.overlay").length) {
      heroSection = $("section:first-of-type");
    }

    const threshold = heroSection
      ? heroSection.outerHeight() - headerHeight
      : 100;

    if (window.scrollY > threshold) {
      navbar.addClass("scrolled");
      setColoredLogos();
    } else {
      navbar.removeClass("scrolled");
      setWhiteLogos();
    }
  };

  // Create a debounced version of the scroll handler to improve performance
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  const debouncedScrollHandler = debounce(function () {
    if (!isNavbarOpen) {
      originalScrollHandler();
    }
  }, 10);

  // Apply the scroll handler
  $(window).on("scroll", function () {
    // Always maintain scrolled state when navbar is open
    if (isNavbarOpen) {
      navbar.addClass("scrolled");
      setColoredLogos();
    } else {
      debouncedScrollHandler();
    }
  });

  // Handle resize events
  $(window).on("resize", function () {
    if (window.innerWidth > 991) {
      // Bootstrap's lg breakpoint
      // If we resize to desktop view and the dropdown was open, reset state
      if (isNavbarOpen) {
        isNavbarOpen = false;

        // Apply normal scroll logic
        if (window.scrollY <= 100) {
          navbar.removeClass("scrolled");
          setWhiteLogos();
        }
      }
    }
  });

  // Run on page load
  if (navbarCollapse.hasClass("show")) {
    isNavbarOpen = true;
    navbar.addClass("scrolled");
    setColoredLogos();
  } else {
    // Initial scroll check
    originalScrollHandler();
  }
});

// Script para cargar datos del proyecto
document.addEventListener("DOMContentLoaded", function () {
  // Obtener ID del proyecto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  if (!projectId) {
    // Si no hay ID de proyecto, mostrar mensaje de error
    document.getElementById("loading-indicator").innerHTML = `
<div class="alert alert-danger" role="alert">
  No se ha especificado un proyecto. Por favor, vuelva a la <a href="current.html">lista de proyectos</a>.
</div>
`;
    return;
  }

  // URL de la API
  const apiUrl = `https://caret-u6dxo.ondigitalocean.app/api/projects/${projectId}/`;

  // Cargar datos del proyecto
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el proyecto");
      }
      return response.json();
    })
    .then((project) => {
      // Actualizar título y breadcrumb
      document.getElementById("project-title").textContent = project.name;
      document.getElementById("breadcrumb-project-name").textContent =
        project.name;
      document.title = `Caret Capital | ${project.name}`;

      // Actualizar detalles del proyecto
      document.getElementById("detail-project-name").textContent = project.name;
      document.getElementById("project-location").textContent =
        project.location;
      document.getElementById("project-type").textContent = project.type;
      document.getElementById("project-area").textContent = `${parseFloat(
        project.area
      ).toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} m²`;

      // Establecer la descripción del proyecto
      if (project.description) {
        document.getElementById("project-description").textContent =
          project.description;
      } else {
        document.getElementById("project-description").style.display = "none";
      }

      // Establecer fecha de compra
      const buyDate = formatDate(project.buy_year, project.buy_month);
      document.getElementById("project-buy-date").textContent = buyDate;

      // Formatear valores numéricos
      const buyPrice = parseFloat(project.buy_price).toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      document.getElementById(
        "project-buy-price"
      ).textContent = `${buyPrice} €`;

      // Formatear gastos si existen
      if (project.expenses) {
        const expenses = parseFloat(project.expenses).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        document.getElementById(
          "project-expenses"
        ).textContent = `${expenses} €`;
      } else {
        document.getElementById("project-expenses").textContent = "N/A";
      }

      // Formatear precio de venta
      const sellPrice = parseFloat(project.sell_price).toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      document.getElementById(
        "project-sell-price"
      ).textContent = `${sellPrice} €`;

      // Establecer fecha de venta si existe
      if (project.sell_year && project.sell_month) {
        const sellDate = formatDate(project.sell_year, project.sell_month);
        document.getElementById("project-sell-date").textContent = sellDate;
      } else if (!project.sell_month) {
        document.getElementById("project-sell-date").textContent =
          project.sell_year;
      } else {
        document.getElementById("project-sell-date").textContent = "";
      }

      // Formatear margen e IRR
      document.getElementById("project-margin").textContent = `${parseFloat(
        project.margin
      ).toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} €`;

      document.getElementById("project-irr").textContent = `${parseFloat(
        project.irr
      ).toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}%`;

      // Establecer clase de estado
      const statusElement = document.getElementById("project-status");
      if (project.status === "current") {
        statusElement.classList.add("status-current");
        statusElement.textContent = "En Curso";
      } else {
        statusElement.classList.add("status-past");
        statusElement.textContent = "Finalizado";
      }

      // Cargar imágenes en el carrusel
      const carouselInner = document.getElementById("carousel-items");
      const carouselIndicators = document.getElementById("carousel-indicators");
      let carouselItems = "";
      let indicators = "";

      // Añadir la imagen principal
      const mainImage = project.image
        ? project.image
        : "../assets/images/images/caret.png";
      carouselItems += `
  <div class="carousel-item active">
    <img src="${mainImage}" class="d-block w-100" alt="${project.name}">
  </div>
`;

      // Añadir el primer indicador (activo)
      indicators += `<li data-target="#project-carousel" data-slide-to="0" class="active"></li>`;

      // Añadir imágenes adicionales
      if (project.additional_images && project.additional_images.length > 0) {
        project.additional_images.forEach((imgObj, index) => {
          carouselItems += `
      <div class="carousel-item">
        <img src="${imgObj.image}" class="d-block w-100" alt="${project.name} - Imagen adicional">
      </div>
    `;

          // Añadir indicadores para imágenes adicionales
          indicators += `<li data-target="#project-carousel" data-slide-to="${
            index + 1
          }"></li>`;
        });
      }

      carouselInner.innerHTML = carouselItems;
      carouselIndicators.innerHTML = indicators;

      // Mostrar el contenido y ocultar el indicador de carga
      document.getElementById("loading-indicator").style.display = "none";
      document.getElementById("project-content").style.display = "block";

      // Inicializar el carrusel con todas las imágenes
      initializeCarousel();
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("loading-indicator").innerHTML = `
  <div class="alert alert-danger" role="alert">
    Error al cargar los detalles del proyecto. Por favor, intente nuevamente más tarde o vuelva a la <a href="current.html">lista de proyectos</a>.
  </div>
`;
    });
});

// Función para formatear fecha (año y mes)
function formatDate(year, month) {
  if (!year || !month) return "N/A";

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Ajustar el mes (si viene en formato 1-12)
  const monthIndex = parseInt(month) - 1;
  if (monthIndex >= 0 && monthIndex < 12) {
    return `${months[monthIndex]} ${year}`;
  }

  return `${month} ${year}`;
}

// Inicializar el carrusel
function initializeCarousel() {
  // Asegurar que las imágenes están cargadas antes de inicializar el carrusel
  const carouselImages = document.querySelectorAll("#carousel-items img");
  let imagesLoaded = 0;

  function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === carouselImages.length) {
      // Todas las imágenes están cargadas, ahora inicializamos el carrusel
      $("#project-carousel").carousel();

      // Asegurar que los botones de navegación funcionen
      const prevButton = document.querySelector(".carousel-control-prev");
      const nextButton = document.querySelector(".carousel-control-next");

      // Quitar los atributos href que causan el desplazamiento
      prevButton.removeAttribute("href");
      nextButton.removeAttribute("href");

      // Agregar listeners para los botones manualmente
      prevButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation(); // Detener la propagación del evento
        $("#project-carousel").carousel("prev");
      });

      nextButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation(); // Detener la propagación del evento
        $("#project-carousel").carousel("next");
      });

      // Reinicializar animaciones si es necesario
      if (typeof window.reInitializeComponents === "function") {
        window.reInitializeComponents();
      }
    }
  }

  // Si no hay imágenes, inicializar de todos modos
  if (carouselImages.length === 0) {
    $("#project-carousel").carousel();
  } else {
    // Esperar a que cada imagen se cargue
    carouselImages.forEach((img) => {
      if (img.complete) {
        checkAllImagesLoaded();
      } else {
        img.addEventListener("load", checkAllImagesLoaded);
        img.addEventListener("error", checkAllImagesLoaded); // Manejar errores de carga
      }
    });
  }
}
