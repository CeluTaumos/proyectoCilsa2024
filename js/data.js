// Function to fetch all JSON data
async function fetchJSONData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/CeluTaumos/proyectoCilsa2024/refs/heads/fix-simplify-dncampo/data/vehicles.json"
    );
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
  carData = await fetchJSONData();
  let idDiv = "row-" + condition + "-" + vehicle;
  const carContainer = document.getElementById(idDiv);

  carData[vehicle][condition].forEach((car) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4");

    const card = `
        <article class="box-card-cars">
            <div class="card box-cars">
                <img src="${car.image}" class="card-img-top" alt="${car.title}">
                <div class="card-body d-flex flex-column body-cars">
                    <h4 class="card-title">${car.title}</h4>
                    <p class="card-text">${car.description}</p>
                    <p class="card-text">${car.precio}</p>
            <a href="/pages/producto.html?id=${car.id}" class="mt-auto btn btn-secondary">Ver más</a>


                </div>
            </div>
        </article>
        `;

    colDiv.innerHTML = card;

    carContainer.appendChild(colDiv);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  populateVehicles("new", "cars");
  populateVehicles("used", "cars");
});
