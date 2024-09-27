// Function to fetch all JSON data
async function fetchJSONData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/CeluTaumos/proyectoCilsa2024/refs/heads/fix-simplify-dncampo/data/vehicles.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
}


// Function to dynamically populate the car data into the DOM
async function populateVehicles(condition, vehicle) {
    vehicleData = await fetchJSONData();  // Get the car data from the JSON object
    let idDiv = "row-" + condition + "-" + vehicle;
    const vehicleContainer = document.getElementById(idDiv);  // Get the container where the cars will be added

    // Loop through each car in the data and create DOM elements
    vehicleData[vehicle][condition].forEach(vehicle => {
        console.log(vehicle);
        let encodedVehicle = encodeURIComponent(JSON.stringify(vehicle));
        console.log("enconde: ")
        console.log(encodedVehicle);
        const colDiv = document.createElement('div');  // Create a new div for each car
        colDiv.classList.add('col-md-4');  // Add Bootstrap classes for layout

        // Create the card structure for each car
        const card = `
        <article class="box-card-cars">
            <div class="card box-cars">
                <img src="${car.image}" class="card-img-top" alt="${car.title}">
                <div class="card-body d-flex flex-column body-cars">
                    <h4 class="card-title">${car.title}</h4>
                    <p class="card-text">${car.description}</p>
                    <a href="${car.link}" class="mt-auto btn btn-dark">Ver más</a>
                </div>
            </div>
        </article>
        `;

        // Add the card content to the column
        colDiv.innerHTML = card;

        // Append the column to the car container
        vehicleContainer.appendChild(colDiv);
    });
}

// Ensure the function runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    //fetch the data for cars and motos, news and used
    populateVehicles("new", "cars");
    populateVehicles("used", "cars");
    populateVehicles("new", "motos");
    populateVehicles("used", "motos");
});
