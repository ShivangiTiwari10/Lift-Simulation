const form = document.querySelector("#form");
const simulation = document.querySelector("#simulation");
const submitButton = form.querySelector(".submitButton");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const numLifts = parseInt(document.querySelector("#liftnumber").value);
  const numFloors = parseInt(document.querySelector("#floornumber").value);

  if (validateInput(numFloors, numLifts)) {
    generateSimulationUI(numFloors, numLifts);
  }
});

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
    if (floorIdx === 0) {
      floors.setAttribute("class", "floors-border");
    }
  }
};

const creatFloorBox = (id) => {
  const floor = document.createElement("div");
  floor.setAttribute("class", "floor");
  floor.setAttribute("id", id);

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
  upButton.setAttribute("onclick", "moveButtonClick(" + id + ")");
  const downButton = document.createElement("input");
  downButton.setAttribute("type", "button");
  downButton.setAttribute("value", "▼");
  downButton.setAttribute("onclick", "moveButtonClick(" + id + ")");

  floorButtons.appendChild(upButton);
  floorButtons.appendChild(downButton);

  floorDetails.appendChild(floorName);
  floorDetails.appendChild(floorButtons);

  floor.appendChild(floorDetails);
  floor.appendChild(liftsContainer);

  return floor;
};
