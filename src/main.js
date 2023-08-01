document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector(".submitButton");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); 

    const numLifts = document.getElementById("liftnumber").value;
    const numFloors = document.getElementById("floornumber").value;

    if (numLifts.trim() === "" || numFloors.trim() === "") {
      alert("Please fill in both input boxes.");
   
    } else if(numLifts<0|| numFloors<0){
      alert("Enter positive numbers")
      return false;

    }else if(numLifts>numFloors){
      alert("no. of lift can not be more than no. of floors")
      return false 

    }
      else {
      window.location.href =
        "lift.html?lifts" 
     
    }
  });
});
