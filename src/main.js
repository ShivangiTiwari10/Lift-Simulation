const form = document.querySelector("#form");
const simulation = document.querySelector("#simulation");
const submitButton = form.querySelector(".submitButton");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const numLifts = parseInt(document.querySelector("#liftnumber").value);
  const numFloors = parseInt(document.querySelector("#floornumber").value);

  if (validateInput(numFloors, numLifts)) {
    generateSimulationUI(numFloors, numLifts);
    form.style.display = "none";
    simulation.style.display = "block";
    console.log(`Lifts: ${numLifts}, Floors: ${numFloors}`);
  }
});

function validateInput(floorCount, liftCount) {
  if (isNaN(floorCount) || isNaN(liftCount)) {
    alert("Enter a valid number");
    return false;
  } else if (floorCount < 0 || liftCount < 0) {
    alert("Enter positive numbers");
    return false;
  } else if (liftCount > floorCount) {
    alert("No. of Lifts cannot be more than No. of floors");
    return false;
  } else if (liftCount === 0 || floorCount === 0) {
    alert("No. of Lifts or No. of floors cannot be zero");
    return false;
  }
  return true;
}

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

    upButton.addEventListener("click", function () {
      // Move the lifts to the selected floor
      moveLiftToFloor(floor, "up");
    });

    const downButton = document.createElement("button");
    downButton.classList.add("floor-button");
    downButton.textContent = "▼";

    downButton.addEventListener("click", function () {
      // Move the lifts to the selected floor
      moveLiftToFloor(floor, "down");
    });

    floorContainer.appendChild(floorNumber);
    floorContainer.appendChild(upButton);
    floorContainer.appendChild(downButton);

    simulationContainer.appendChild(floorContainer);
  }

  // Create lift containers at the bottom for each lift
  const liftContainer = document.createElement("div");
  liftContainer.classList.add("lift-container");

  for (let liftNumber = 1; liftNumber <= numLifts; liftNumber++) {
    const liftBox = document.createElement("div");
    liftBox.classList.add("lift-box");
    liftBox.style.backgroundColor = "blue";
    liftBox.textContent = `Lift ${liftNumber}`;
    liftContainer.appendChild(liftBox);
  }

  simulationContainer.appendChild(liftContainer);
  simulation.appendChild(simulationContainer);

  function moveLiftToFloor(floor, direction) {
    // Move each lift to the selected floor based on direction
    const liftPosition = (floor - 1) * 10;
    liftContainer.style.transform = `translateY(-${liftPosition}vh)`;
  }
}
