const form = document.querySelector("#form");
const simulation = document.querySelector("#simulation");
const submitButton = form.querySelector(".submitButton");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const numLifts = parseInt(document.querySelector("#liftnumber").value);
  const numFloors = parseInt(document.querySelector("#floornumber").value);

  if (validateInput(numFloors, numLifts)) {
    generateSimulationUI(numFloors, numLifts);
    document.getElementById("backButton").removeAttribute("hidden");
  }
});

let liftData = [];
let requestQueue = [];

function validateInput(numFloors, numLifts) {
  if (isNaN(numFloors) || isNaN(numLifts)) {
    alert("Enter a valid number");
    return false;
  } else if (numFloors < 0 || numLifts < 0) {
    alert("Enter positive number");
    return false;
  } else if (numLifts > numFloors) {
    alert("Lifts should not be more then floors");
    return false;
  } else if (numLifts == 0 || numFloors == 0) {
    alert("No. of Lifts and floors cannot be zero");
    return false;
  } else if (numFloors > 10) {
    alert("floor should be maximum 10");
    return false;
  }
  return true;
}

function generateSimulationUI(numFloors, numLifts) {
  const groundFloor = document.getElementById("simulation");
  groundFloor.innerHTML = "";

  const validation = validateInput(numFloors, numLifts);
  if (validation) {
    document.getElementById("form").setAttribute("hidden", "hidden");
    document.getElementById("simulation").removeAttribute("hidden");
    createFloor(numFloors, numLifts);
  }
}

const createFloor = (numFloors, numLifts) => {
  const floors = document.getElementById("simulation");
  for (id = 1; id <= numFloors; id++) {
    let floorIdx = floors.childElementCount;
    let currentFloor = floorIdx + 1;

    const floor = creatFloorBox(currentFloor);
    floors.insertBefore(floor, floors.firstChild);

    if (currentFloor === 1) {
      for (let liftId = 1; liftId <= numLifts; liftId++) {
        const lift = createLiftBox(liftId);
        floor.querySelector(".lifts-container").appendChild(lift);
      }
      floors.setAttribute("class", "floors-border");
    }
  }
};

const creatFloorBox = (id) => {
  const floor = document.createElement("div");
  floor.setAttribute("class", "floor");

  const floorDetails = document.createElement("div");
  floorDetails.setAttribute("class", "floorDetails");

  const liftsContainer = document.createElement("div");
  liftsContainer.setAttribute("class", "lifts-container");
  liftsContainer.setAttribute("id", "lifts-container-" + id);

  const floorName = document.createElement("div");
  floorName.innerHTML = "Floor " + id;

  const floorButtons = document.createElement("div");
  floorButtons.setAttribute("class", "floorButtons");

  const upButton = document.createElement("input");
  upButton.setAttribute("type", "button");
  upButton.setAttribute("value", "▲");

  const downButton = document.createElement("input");
  downButton.setAttribute("type", "button");
  downButton.setAttribute("value", "▼");

  floorButtons.append(upButton);
  floorButtons.append(downButton);

  floorDetails.append(floorName);
  floorDetails.append(floorButtons);

  floor.append(floorDetails);
  floor.append(liftsContainer);

  return floor;
};

const createLiftBox = (liftId) => {
  const lift = document.createElement("div");
  lift.setAttribute("class", "lift");
  lift.setAttribute("id", "lift-" + liftId);

  const leftDoor = document.createElement("div");
  leftDoor.setAttribute("class", "liftLeftDoor");

  const rightDoor = document.createElement("div");
  rightDoor.setAttribute("class", "liftRightDoor");

  lift.appendChild(leftDoor);
  lift.appendChild(rightDoor);

  return lift;
};

window.backButtonClick = () => {
  const floors = document.getElementById("simulation");
  floors.removeAttribute("class");
  floors.innerHTML = "";
  liftData = [];
  requestQueue = [];
  document.getElementById("backButton").setAttribute("hidden", "hidden");
  document.getElementById("form").removeAttribute("hidden");
};
