// Conversion rate: 1 USD = 82 INR
const conversionRate = 82;

// Dummy data for available cars (prices in USD)
let cars = [
    { carId: "C001", brand: "Toyota", model: "Camry", pricePerDay: 60, isAvailable: true },
    { carId: "C002", brand: "Honda", model: "Accord", pricePerDay: 70, isAvailable: true },
    { carId: "C003", brand: "Mahindra", model: "Thar", pricePerDay: 150, isAvailable: true }
];

// Function to display available cars in the table
function displayCars() {
    const table = document.querySelector("#cars-table tbody");
    table.innerHTML = ""; // Clear existing rows

    cars.forEach(car => {
        const priceInRupees = car.pricePerDay * conversionRate;
        const row = `
            <tr>
                <td>${car.carId}</td>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>₹${priceInRupees.toFixed(2)}</td>
                <td>${car.isAvailable ? `<button onclick="selectCar('${car.carId}')">Select</button>` : "Rented"}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Function to handle car selection for renting
function selectCar(carId) {
    document.getElementById("car-id").value = carId;
}

// Handle form submission for renting a car
document.getElementById("rental-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const carId = document.getElementById("car-id").value;
    const days = parseInt(document.getElementById("days").value);

    const car = cars.find(c => c.carId === carId);

    if (car && car.isAvailable) {
        const totalPriceInRupees = car.pricePerDay * days * conversionRate;
        alert(`Thank you, ${name}! You have rented the ${car.brand} ${car.model} for ${days} days. Total price: ₹${totalPriceInRupees.toFixed(2)}.`);
        car.isAvailable = false; // Mark car as rented
        displayCars();
    } else {
        alert("Invalid car ID or the car is not available.");
    }

    document.getElementById("rental-form").reset();
});

// Handle form submission for returning a car
document.getElementById("car-return-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const carId = document.getElementById("return-car-id").value;
    const car = cars.find(c => c.carId === carId);

    if (car && !car.isAvailable) {
        car.isAvailable = true; // Mark the specific car as available
        alert(`The car ${car.brand} ${car.model} has been returned successfully.`);
        displayCars();
    } else {
        alert("Invalid car ID or the car is not currently rented.");
    }

    document.getElementById("car-return-form").reset();
});

// Initial display of cars
displayCars();
