// Script para cargar dinámicamente los proyectos pasados con paginación

document.addEventListener("DOMContentLoaded", function () {
  // Array para almacenar todos los proyectos
  let allProjects = [];

  // Configuración de la paginación
  const projectsPerPage = 18;
  let currentPage = 1;
  let totalPages = 0;

  // Función para obtener todos los proyectos (recursiva para manejar paginación de la API)
  async function fetchAllProjects(
    url = "https://caret-u6dxo.ondigitalocean.app/api/projects/"
  ) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener los proyectos");
      }

      const data = await response.json();

      // Añadir los resultados actuales al array de todos los proyectos
      allProjects = allProjects.concat(data.results);

      // Si hay una página siguiente, seguir obteniendo proyectos
      if (data.next) {
        await fetchAllProjects(data.next);
      } else {
        // Una vez que se han cargado todos los proyectos, filtrar y mostrar los pasados
        prepareProjects();
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("loading-indicator").innerHTML = `
        <div class="alert alert-danger" role="alert">
          Error al cargar los proyectos. Por favor, intente nuevamente más tarde.
        </div>
      `;
    }
  }

  // Función para preparar los proyectos filtrados y configurar la paginación
  function prepareProjects() {
    // Filtrar solo los proyectos pasados
    const pastProjects = allProjects.filter(
      (project) => project.status === "past"
    );

    // Si no hay proyectos pasados, mostrar mensaje
    if (pastProjects.length === 0) {
      document.getElementById("loading-indicator").innerHTML = `
        <div class="alert alert-info" role="alert">
          No se encontraron proyectos pasados.
        </div>
      `;
      return;
    }

    // Calcular el número total de páginas
    totalPages = Math.ceil(pastProjects.length / projectsPerPage);

    // Mostrar los proyectos de la página actual
    displayProjectsPage(pastProjects, currentPage);

    // Crear la paginación
    createPagination(totalPages, currentPage, pastProjects);
  }

  // Función para mostrar los proyectos de la página actual
  function displayProjectsPage(projects, page) {
    // Calcular los índices de inicio y fin para la página actual
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = Math.min(startIndex + projectsPerPage, projects.length);

    // Proyectos que se mostrarán en la página actual
    const projectsToShow = projects.slice(startIndex, endIndex);

    // Ocultar el indicador de carga
    document.getElementById("loading-indicator").style.display = "none";

    // Contenedor de proyectos
    const projectsContainer = document.getElementById("projects-container");

    // Limpiar el contenedor antes de añadir nuevos proyectos
    projectsContainer.innerHTML = "";

    // Crear fila para los proyectos
    const row = document.createElement("div");
    row.className = "row";
    projectsContainer.appendChild(row);

    // Añadir los proyectos a la fila
    projectsToShow.forEach((project) => {
      // Crear elemento de columna para cada proyecto
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4 py-0 mt-4";

      // Añadir el HTML del proyecto a la columna
      col.innerHTML = createProjectHTML(project);

      // Añadir la columna a la fila
      row.appendChild(col);
    });

    // Reinicializar animaciones y otros componentes del tema
    if (typeof window.reInitializeComponents === "function") {
      window.reInitializeComponents();
    }
  }

  // Función para crear la paginación
  function createPagination(totalPages, currentPage, projects) {
    // Contenedor para la paginación
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "d-flex justify-content-center mt-5";

    // Crear el elemento de navegación de la paginación
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Paginación de proyectos pasados");

    // Crear la lista de paginación
    const ul = document.createElement("ul");
    ul.className = "pagination";
    nav.appendChild(ul);

    // Botón "Anterior"
    const prevButton = document.createElement("li");
    prevButton.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevButton.innerHTML = `<a class="page-link" href="#" aria-label="Anterior">
                              <span aria-hidden="true">&laquo;</span>
                            </a>`;

    // Añadir evento al botón "Anterior"
    if (currentPage > 1) {
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          displayProjectsPage(projects, currentPage);
          createPagination(totalPages, currentPage, projects);
        }
      });
    }

    ul.appendChild(prevButton);

    // Mostrar un máximo de 5 páginas en la paginación
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Ajustar el inicio si estamos cerca del final
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Añadir números de página
    for (let i = startPage; i <= endPage; i++) {
      const pageItem = document.createElement("li");
      pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;

      // Añadir evento a cada número de página
      if (i !== currentPage) {
        pageItem.addEventListener("click", () => {
          currentPage = i;
          displayProjectsPage(projects, currentPage);
          createPagination(totalPages, currentPage, projects);
        });
      }

      ul.appendChild(pageItem);
    }

    // Botón "Siguiente"
    const nextButton = document.createElement("li");
    nextButton.className = `page-item ${
      currentPage === totalPages ? "disabled" : ""
    }`;
    nextButton.innerHTML = `<a class="page-link" href="#" aria-label="Siguiente">
                              <span aria-hidden="true">&raquo;</span>
                            </a>`;

    // Añadir evento al botón "Siguiente"
    if (currentPage < totalPages) {
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          displayProjectsPage(projects, currentPage);
          createPagination(totalPages, currentPage, projects);
        }
      });
    }

    ul.appendChild(nextButton);

    // Añadir la navegación al contenedor de paginación
    paginationContainer.appendChild(nav);

    // Añadir el contenedor de paginación al final del contenedor principal
    const projectsContainer = document.getElementById("projects-container");

    // Verificar si ya existe un paginador y eliminarlo
    const existingPagination = document.querySelector(".pagination-container");
    if (existingPagination) {
      existingPagination.remove();
    }

    // Añadir clase para facilitar la identificación
    paginationContainer.classList.add("pagination-container");

    // Añadir el paginador después del contenedor de proyectos
    projectsContainer.parentNode.insertBefore(
      paginationContainer,
      projectsContainer.nextSibling
    );
  }

  // Función para crear HTML de un proyecto
  function createProjectHTML(project) {
    // Formatear los valores numéricos con puntos y comas apropiados para español
    const formattedArea = parseFloat(project.area).toLocaleString("es-ES", {
      maximumFractionDigits: 0,
    });
    const formattedBuyPrice = parseFloat(project.buy_price).toLocaleString(
      "es-ES",
      {
        maximumFractionDigits: 0,
      }
    );
    const formattedSellPrice = parseFloat(project.sell_price).toLocaleString(
      "es-ES",
      {
        maximumFractionDigits: 0,
      }
    );
    const formattedMargin = parseFloat(project.margin).toLocaleString("es-ES", {
      maximumFractionDigits: 0,
    });
    const formattedIRR = parseFloat(project.irr).toLocaleString("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    const formattedExpenses = parseFloat(project.expenses).toLocaleString(
      "es-ES",
      {
        maximumFractionDigits: 0,
      }
    );
    const buyDate = `${project.buy_month}/${project.buy_year}`;
    const sellDate = project.sell_month
      ? `${project.sell_month}/${project.sell_year}`
      : `${project.sell_year}`;

    return `
      <div class="background-white pb-4 h-100 radius-secondary" style="display: flex; flex-direction: column;">
        <img
          class="w-100 radius-tr-secondary radius-tl-secondary"
          src="${
            project.image ? project.image : "../assets/images/images/caret.png"
          }"
          alt="${project.name}"
          onerror="this.src='../assets/images/images/caret.png';"
          style="height: 225px; object-fit: cover;"
        />
        <div class="px-4 pt-4" style="flex-grow: 1; display: flex; flex-direction: column;">
          <div class="overflow-hidden">
            <a href="pastproject.html?id=${project.id}">
              <h5>${project.name}</h5>
            </a>
          </div>
          <div class="overflow-hidden">
            <p class="color-7">${project.location}</p>
          </div>
          <div class="overflow-hidden">
            <p class="mt-3">
              Proyecto de ${project.type.toLowerCase()} de ${formattedArea} m² realizado en ${buyDate}. El precio de compra es de ${formattedBuyPrice} €, con gastos asociados de ${formattedExpenses} €. Se espera un retorno de ${formattedSellPrice} € en ${sellDate}, generando un margen de ${formattedMargin} € y una TIR del ${formattedIRR}%.
            </p>
          </div>
          <div class="overflow-hidden" style="margin-top: auto;">
            <div class="d-inline-block">
              <a class="d-flex align-items-center" href="pastproject.html?id=${
                project.id
              }"
                >Más Información
                <div class="overflow-hidden ml-2">
                  <span class="d-inline-block">&xrarr;</span>
                </div></a
              >
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Iniciar la carga de proyectos
  fetchAllProjects();
});
