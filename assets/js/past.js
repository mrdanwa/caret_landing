// Script para cargar dinámicamente los proyectos

document.addEventListener("DOMContentLoaded", function () {
  // Array para almacenar todos los proyectos
  let allProjects = [];

  // Función para obtener todos los proyectos (recursiva para manejar paginación)
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
        displayPastProjects();
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

  // Función para mostrar los proyectos pasados
  function displayPastProjects() {
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

    // Ocultar el indicador de carga
    document.getElementById("loading-indicator").style.display = "none";

    // Contenedor de proyectos
    const projectsContainer = document.getElementById("projects-container");

    // En lugar de crear filas manualmente, dejar que Bootstrap maneje el flujo de columnas
    const row = document.createElement("div");
    row.className = "row mt-4";
    projectsContainer.appendChild(row);

    // Añadir todos los proyectos a una única fila
    pastProjects.forEach((project) => {
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
