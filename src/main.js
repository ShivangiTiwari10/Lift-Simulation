const form = document.querySelector("#form");
const simulation = document.querySelector("#simulation");
const submitButton = form.querySelector(".submitButton");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const numLifts = parseInt(document.querySelector("#liftnumber").value);
  const numFloors = parseInt(document.querySelector("#floornumber").value);

  if (!isNaN(numLifts) && !isNaN(numFloors)) {
    generateSimulationUI(numFloors, numLifts);
    form.style.display = "none";
    simulation.style.display = "block";
    console.log(`Lifts: ${numLifts}, Floors: ${numFloors}`);
  } else {
    alert("Please enter valid numbers for lifts and floors.");
  }
});

function generateSimulationUI(numFloors, numLifts) {
  const simulationContainer = document.createElement("div");
  simulationContainer.classList.add("simulation-container");

  for (let floor = numFloors; floor >= 1; floor--) {
    const floorContainer = document.createElement("div");
    floorContainer.classList.add("floor-container");

    const floorNumber = document.createElement("span");
    floorNumber.classList.add("floor-number");
    floorNumber.textContent = `Floor ${floor}`;

    const upButton = document.createElement("button");
    upButton.classList.add("floor-button");
    upButton.textContent = "▲";

    const downButton = document.createElement("button");
    downButton.classList.add("floor-button");
    downButton.textContent = "▼";

    floorContainer.appendChild(floorNumber);
    floorContainer.appendChild(upButton);
    floorContainer.appendChild(downButton);

    simulationContainer.appendChild(floorContainer);
  }

  simulation.appendChild(simulationContainer);
}
