// Select the burger menu element
const burger = document.querySelector("#burger");
// Select the navigation links element
const menuToggle = document.querySelector("#menu-toggle");
// Select the toggle button element
const toggle = document.querySelector("#toggle");
// Select the floating letters element
const letters = document.querySelector("#letters");
// Select the sorter element
const sort = document.querySelector("#sort");
// Select the content items element
const items = document.querySelector("#items");
// Select the photo slide element
const slide = document.querySelector("#slide");
// Select the previous button element
const prev = document.querySelector("#prev");
// Select the next button element
const next = document.querySelector("#next");

const navMenu = document.querySelector(".menu");

burger.addEventListener("click", function () {
  this.classList.toggle("active");
});
// Add a click event listener to the toggle button element
toggle.addEventListener("click", function () {
  // Toggle the theme of the body element
  document.body.classList.toggle("dark");
});

// Add event listener to the burger menu icon
burger.addEventListener("click", function () {
  // Toggle the checkbox when the burger menu icon is clicked
  menuToggle.checked = !menuToggle.checked;
});

// Add event listener to the navigation menu toggle checkbox
menuToggle.addEventListener("change", function () {
  // Toggle the visibility of the navigation menu based on the checkbox state
  if (this.checked) {
    navMenu.classList.add("show");
  } else {
    navMenu.classList.remove("show");
  }
});

// Select all navigation links inside the menu
const navLinks = document.querySelectorAll(".menu a");

// Add event listener to each navigation link
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Hide the navigation menu when a link is clicked
    navMenu.classList.remove("show");
    // Toggle the burger icon state
    burger.classList.remove("active");
    // Uncheck the menu toggle checkbox
    menuToggle.checked = false;
  });
});

// mix it up portfolio section
var mixer = mixitup(".portfolio-gallery");

// up scroll code
const body = document.body;
let lastscroll = 0;

window.addEventListener("scroll", () => {
  const currentscroll = window.scrollY;
  if (currentscroll <= 0) {
    body.classList.remove("scroll-up");
    return;
  }

  if (currentscroll > lastscroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  } else if (
    currentscroll < lastscroll &&
    body.classList.contains("scroll-down")
  ) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }
  lastscroll = currentscroll;
});

// theme Button
const toggleButton = document.getElementById("toggle");
const themeLabel = document.querySelector(".theme-label");
const themeSun = document.getElementById("theme-sun");
const themeMoon = document.getElementById("theme-moon");

toggleButton.addEventListener("click", function () {
  // Toggle theme label
  if (themeLabel.textContent === "Light") {
    themeLabel.textContent = "Dark";
    toggleButton.style.backgroundColor = "#000000"; // Black background color
    toggleButton.style.color = "#FFFF00"; // Yellow text color for "Dark"
  } else {
    themeLabel.textContent = "Light";
    toggleButton.style.backgroundColor = "#FFFFFF"; // White background color
    toggleButton.style.color = "#333333"; // Default text color
  }

  // Toggle theme icons
  themeSun.style.display =
    themeSun.style.display === "none" ? "inline-block" : "none";
  themeMoon.style.display =
    themeMoon.style.display === "none" ? "inline-block" : "none";
});

// Function to generate a random number between min and max values
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to apply a random rotation to each letter
function jiggleLetters() {
  const letters = document.querySelectorAll("#letters span");
  letters.forEach((letter) => {
    const rotation = getRandom(-5, 5); // Adjust the range of rotation as needed
    letter.style.transform = `rotate(${rotation}deg)`;
  });
}

// Call the jiggleLetters function when the page loads
window.addEventListener("load", jiggleLetters);

// modal for pic section

// Get the modal
var modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);

// Get the modal content container
var modalContent = document.createElement("div");
modalContent.classList.add("modal-content");
modal.appendChild(modalContent);

// Get all images with class="more-img"
var images = document.querySelectorAll(".more-img");

// Loop through each image and attach click event
images.forEach(function (image) {
  image.addEventListener("click", function () {
    // Create an image element inside modal content
    var modalImg = document.createElement("img");
    modalImg.classList.add("modal-img");
    modalImg.src = this.src;
    modalContent.innerHTML = ""; // Clear previous content
    modalContent.appendChild(modalImg);
    // Show the modal
    modal.style.display = "block";
  });
});

// Close the modal when clicked outside the image
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Close the modal when close button is clicked
var span = document.createElement("span");
span.classList.add("close");
span.innerHTML = "&times;"; // Unicode character for close symbol
modalContent.appendChild(span);

span.addEventListener("click", function () {
  modal.style.display = "none";
});
