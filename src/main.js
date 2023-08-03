document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector(".submitButton");

  const formContainer = document.getElementById("form");

  const liftSimulationContainer = document.querySelector(".floor-wrapper");
  //   const buttonContainer = document.querySelector(".button-container");
  const floorContainer = document.getElementById("floorContainer");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const numLifts = document.getElementById("liftnumber").value;
    const numFloors = document.getElementById("floornumber").value;

    if (numLifts.trim() === "" || numFloors.trim() === "") {
      alert("Please fill in both input boxes.");
    } else if (numLifts < 0 || numFloors < 0) {
      alert("Enter positive numbers");
      return false;
    } else if (numLifts > numFloors) {
      alert("no. of lift can not be more than no. of floors");
      return;
    }

    // Hide the input form
    formContainer.style.display = "none";

    // Show the lift simulation UI

    liftSimulationContainer.style.display = "block";
    // buttonContainer.style.display = "flex";

    floorContainer.innerHTML = "";

    for (let i = 1; i <= numFloors; i++) {
      const floorElement = document.createElement("div");
      floorElement.className = "floor";

      floorElement.innerHTML = `
      <button class="floor-button up-button">↑</button>
      <span class="floor-number">Floor ${i}</span>
      <button class="floor-button down-button">↓</button>
    `;
      floorContainer.appendChild(floorElement);
    }
  });
});
