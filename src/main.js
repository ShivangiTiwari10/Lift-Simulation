const upButton = document.querySelector(".submmitButton");
// upButton.addEventListener

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector(".submitButton");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    const numLifts = document.getElementById("liftnumber").value;
    const numFloors = document.getElementById("floornumber").value;

    if (numLifts.trim() === "" || numFloors.trim() === "") {
      alert("Please fill in both input boxes.");
    } else {
      window.location.href =
        "lift.html?lifts=" + numLifts + "&floors=" + numFloors;
    }
  });
});
