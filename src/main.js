let liftData = []; // An array to store information about each lift current state
let requestQueue = []; //An array to store floor requests

const form = document.querySelector("#form");
const simulation = document.querySelector("#simulation");
const submitButton = form.querySelector(".submitButton");

submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // on submitButton clicked generateUi

  const numLifts = parseInt(document.querySelector("#liftNumber").value);
  const numFloors = parseInt(document.querySelector("#floorNumber").value);

  if (validateInput(numFloors, numLifts)) {
    console.log("validateInput", validateInput);
    // console.log("GeneratingUi", generateSimulationUI);
    generateSimulationUI(numFloors, numLifts);
    document.getElementById("backButton").removeAttribute("hidden");
  }
});

// Checks whether the input values for lifts and floors are valid
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

//  clears the simulation area and validates the input again.
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
  // generate floor
  const floors = document.getElementById("simulation");
  floors.innerHTML = "";

  // const floorsContainerHeight = numFloors * 120 + "px"; // Adjust the value as needed
  // floors.style.height = floorsContainerHeight;

  for (id = 1; id <= numFloors; id++) {
    let floorIdx = floors.childElementCount;
    let currentFloor = floorIdx + 1;

    const floor = creatFloorBox(currentFloor);
    floors.insertBefore(floor, floors.firstChild);

    if (currentFloor === 1) {
      for (let liftId = 1; liftId <= numLifts; liftId++) {
        const lift = createLiftBox(liftId);
        floor.querySelector(".lifts-container").appendChild(lift);

        // Initialize lift data and push to liftData array
        const initialLiftData = {
          id: "lift-" + liftId,
          floor: 1, // Set the initial floor here
          inTransition: false,
        };
        liftData.push(initialLiftData);
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
  floorName.innerHTML = "Floor" + id;

  const floorButtons = document.createElement("div");
  floorButtons.setAttribute("class", "floorButtons");

  const upButton = document.createElement("input");
  upButton.setAttribute("type", "button");
  upButton.setAttribute("value", "▲");
  upButton.setAttribute("onclick", "moveButtonClick(" + id + ")");
  console.log("upButton clicked", upButton);

  console.log(upButton.moveButtonClick);

  const downButton = document.createElement("input");
  downButton.setAttribute("type", "button");
  downButton.setAttribute("value", "▼");
  downButton.setAttribute("onclick", "moveButtonClick(" + id + ")");
  console.log("downButton clicked", downButton);

  console.log("moveButtonClick", moveButtonClick);

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

  console.log("Lift", lift);

  return lift;
};

window.backButtonClick = () => {
  const floors = document.getElementById("simulation");
  floors.removeAttribute("class");
  floors.innerHTML = "";

  console.log("backButtonClick", backButtonClick);
  document.getElementById("backButton").setAttribute("hidden", "hidden");
  document.getElementById("form").removeAttribute("hidden");
};

const moveButtonClick = (floorNumber) => {
  console.log("Btn clicked for floor:", floorNumber);

  const liftId = calculateLiftMovement(floorNumber);

  console.log("Selected liftId:", liftId);

  console.log("liftData:", liftData);

  const lift = document.getElementById(liftId);
  if (!lift) {
    requestQueue.push(floorNumber);
    console.log("Lift not found, added to requestQueue:", requestQueue);
    return;
  } else {
    const isInTransition = liftData.some(
      (l) => l.id === liftId && l.inTransition
    );
    // const isDoorOpen =
    //   lift.querySelector(".liftLeftDoor").style.width === "0px"; // Check if the door is open
    if (isInTransition) {
      console.log("$isInTransition", isInTransition);
      console.log("Lift is already in motion. Ignoring new request.");
    } else {
      liftData.forEach((l) => {
        if (l.id === liftId) {
          console.log("Lift found");
          l.inTransition = true;
        }
      });
      console.log("Moving lift to floor:", floorNumber);
      movelift(lift, floorNumber);
    }
  }
};

const calculateLiftMovement = (floorNumber) => {
  // finds the closest available lift to a requested floor.
  return findClosestIdleLift(floorNumber);
};

const movelift = (lift, floorNumber) => {
  let time = 0;
  let diff = 0;
  liftData.forEach((l) => {
    if (l.id == lift.id) {
      diff = Math.abs(l.floor - floorNumber);
      time = diff * 2000;

      // Update lift's current floor in liftData
      l.floor = floorNumber;

      console.log("move lifts from floor", l.floor, "to", floorNumber);
    }
  });

  lift.style.transition = "transform " + time + "ms linear";
  lift.style.transform = "translateY(-" + (floorNumber - 1) * 116 + "px)";

  // After the lift movement is complete, check the request queue
  setTimeout(() => {
    console.log("Lift reached floor:", floorNumber);
    openAndCloseLiftDoors(lift, floorNumber);
  }, time);
};
const processRequestQueue = () => {
  if (requestQueue.length > 0) {
    const nextFloor = requestQueue.shift(); // Get the next floor request
    const liftId = calculateLiftMovement(nextFloor);
    const lift = document.getElementById(liftId);
    if (lift) {
      console.log("Moving lift to floor (from request queue):", nextFloor);
      movelift(lift, nextFloor);
    }
  }
};

const findClosestIdleLift = (floorNumber) => {
  let diff = Infinity;
  let closestLift;
  liftData.forEach((l) => {
    if (!l.inTransition) {
      const isDoorOpen =
        document.getElementById(l.id).querySelector(".liftLeftDoor").style
          .width === "0px"; // Check if the door is open
      let subtract = floorNumber - l.floor;
      if (!isDoorOpen && diff * diff > subtract * subtract) {
        diff = Math.abs(subtract);
        closestLift = l.id;
      }
    }
  });
  console.log("Closest lift:", closestLift);
  return closestLift;
};

// Simulates the opening of the lift doors
const openAndCloseLiftDoors = (lift, floorNumber) => {
  const leftDoor = lift.querySelector(".liftLeftDoor");
  const rightDoor = lift.querySelector(".liftRightDoor");

  leftDoor.style.width = "0"; // Open left door
  rightDoor.style.width = "0"; // Open right door

  setTimeout(() => {
    leftDoor.style.width = "30px"; // Close left door
    rightDoor.style.width = "30px"; // Close right door

    console.log("Lift doors closed:", floorNumber);
    processRequestQueue();
  }, 2500); // Open doors for 2.5 seconds

  setTimeout(() => {
    liftData.forEach((l) => {
      if (l.id == lift.id) {
        l.inTransition = false;
        console.log("move lift if its door is compleately closed");
      }
    });
  }, 5000);
};
