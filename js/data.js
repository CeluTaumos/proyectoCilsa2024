async function fetchJSONData() {
  try {
    const response = await fetch("../data/vehicles.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Unable to fetch data:", error);
  }
}

async function populateVehicles(condition, vehicle) {
  // Obtenemos los datos del JSON
  const carData = await fetchJSONData();

  // Identificamos el contenedor donde se añadirán los coches
  let idDiv = "row-" + condition + "-" + vehicle;
  const carContainer = document.getElementById(idDiv);

  // Iteramos sobre los coches de acuerdo a su condición y tipo
  carData[vehicle][condition].forEach((car) => {
    console.log(car);
    // Creamos un div para la columna del coche
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4");

    // Creamos la estructura de la tarjeta de cada coche con el enlace al detalle
    const card = `
        <article class="box-card-cars">
          <div class="card box-cars">
            <img src="${car.image}" class="card-img-top" alt="${car.title}">
            <div class="card-body d-flex flex-column body-cars">
              <h4 class="card-title">${car.title}</h4>
              <p class="card-text">${car.description}</p>
              <p class="card-text">${car.precio}</p>
              <!-- Aquí está el enlace que lleva a la página de detalles con el id del coche -->
              <a href="/pages/producto.html?id=${car.id}" class="mt-auto btn btn-secondary">Ver más</a>
            </div>
          </div>
        </article>
      `;

    // Insertamos la tarjeta dentro del div de la columna
    colDiv.innerHTML = card;

    // Añadimos la columna con el coche al contenedor de coches
    carContainer.appendChild(colDiv);
  });
}

// Cuando el DOM esté cargado, llamamos a la función para poblar los coches
document.addEventListener("DOMContentLoaded", function () {
  populateVehicles("new", "cars");
  populateVehicles("used", "cars");
});
