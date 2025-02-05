var typed = new Typed("#element", {
  strings: ["Full Stack Developer", " Web Developer"],
  typeSpeed: 80,
});

// scroll reveal

ScrollReveal({
  reset: true,
  distance: "30px",
  duration: 1000,
  delay: 100,
});
ScrollReveal().reveal(".hero,.hero-link,.abt-head,.project-head,.contact", {
  origin: "top",
});
ScrollReveal().reveal(".skills", { origin: "bottom" });
ScrollReveal().reveal(
  ".about,.about-me,.education,.contact form,.aboout-img,.projects h3",
  { origin: "left" }
);
ScrollReveal().reveal(".education,.project", { origin: "right" });

// active link

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let phoneNav = document.querySelectorAll(".phone-nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }

    if (top >= offset && top < offset + height) {
      phoneNav.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector(".phone-nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};


// form submit

const form = document.getElementById("form");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userMessage = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = validateInput();

  if (valid) {
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbwYDGakTJqZRGrqI6xnHRaqBtDmXHpZj7yC9w43BC0mDAaVB4dr2gy9B7tmD6MWceJN/exec",
      data: $("#form").serialize(),
      method: "post",
      success: function (response) {
        alert("Form submitted successfully");
        window.location.reload();
        FormData.clear();
      },
      error: function (err) {
        alert("Something Error");
      },
    });
  }
});

function validateInput() {
  const userNameVal = userName.value.trim();
  const userEmailVal = userEmail.value.trim();
  const userMessageVal = userMessage.value.trim();

  let success = true;

  if (userNameVal === "") {
    setError(userName, "Username required");
    success = false;
  } else if(!/^[a-zA-Z\s'-]+$/.test(userNameVal)){
    setError(userName, "Invalid Input")
    success=false;
    
  } else {
    setSuccess(userName);
  }

  if (userEmailVal === "") {
    setError(userEmail, "Email is required");
    success = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmailVal)) {
    setError(userEmail, "Please enter a valid email in the correct format");
    success = false;
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmailVal)) {
    setError(userEmail, "Email does not match the required pattern");
    success = false;
  } else {
    setSuccess(userEmail);
  }



  if (userMessageVal === "") {
    setError(userMessage, "Message is required");
    success = false;
  } else {
    setSuccess(userMessage);
  }

  return success;
}

function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = message;
  inputGroup.classList.add("error");
}
function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error")
}

