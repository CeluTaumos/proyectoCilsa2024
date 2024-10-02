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

// Función para obtener el ID de la URL
function getCarIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Función para cargar los detalles del producto
async function loadCarDetails() {
  const carId = getCarIdFromURL();
  const carData = await fetchJSONData();

  if (carData) {
    // Asegúrate de que carData no sea null
    // Encuentra el coche correspondiente en la base de datos
    const car = Object.values(carData.cars.new)
      .concat(Object.values(carData.cars.used))
      .find((car) => car.id === carId);

    if (car) {
      // Llenar la información en la página
      document.getElementById("car-title").innerText = car.title;
      document.getElementById("car-description").innerText = car.description;
      document.getElementById("car-price").innerText = car.precio;
      document.getElementById("car-image").src = car.image;
    } else {
      console.error("Car not found");
    }
  }
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", loadCarDetails);
