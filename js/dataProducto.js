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

function getCarIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

async function loadCarDetails() {
  const carId = getCarIdFromURL();
  const carData = await fetchJSONData();

  if (carData) {
    const car = Object.values(carData.cars.new)
      .concat(Object.values(carData.cars.used))
      .find((car) => car.id === carId);

    if (car) {
      document.getElementById("car-title").innerText = car.title;
      document.getElementById("car-description").innerText = car.description;
      document.getElementById("car-price").innerText = `Precio: $${car.precio}`;

      document.getElementById("car-image").src = car.image;

      const technicalDetails = document.getElementById("car-technical-details");
      technicalDetails.innerHTML = "";
      for (const [key, value] of Object.entries(car.technicals)) {
        const listItem = document.createElement("li");
        listItem.className =
          "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `<span class="material-icons">info</span> ${
          key.charAt(0).toUpperCase() + key.slice(1)
        }: ${value}`;
        technicalDetails.appendChild(listItem);
      }
    } else {
      console.error("Car not found");
    }
  }
}

document.addEventListener("DOMContentLoaded", loadCarDetails);
