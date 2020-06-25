// start of animation scripting
const showSignInBtn = document.querySelector("#show-sign-in-btn");
const showSignUpBtn = document.querySelector("#show-sign-up-btn");
const formCover = document.querySelector("#cover");
const signUpForm = document.querySelector("#sign-up");
const signInForm = document.querySelector("#sign-in");

//move the form cover to show the sign-in form
const showSignIn = () => {
  formCover.style.animation = "show-sign-in 1s ease-in-out forwards";
  signUpForm.style.animation = "hide-form 1s ease forwards";
  signInForm.style.animation = "show-form 1.5s ease forwards";
  showSignUpBtn.style.display = "block";
  showSignInBtn.style.display = "none";
};

//move the form cover to show the sign-up form
const showSignUp = () => {
  formCover.style.animation = "show-sign-up 1s ease-in-out forwards";
  signInForm.style.animation = "hide-form 1s ease forwards";
  signUpForm.style.animation = "show-form 1.5s ease forwards";
  showSignInBtn.style.display = "block";
  showSignUpBtn.style.display = "none";
};

//Call animation functions below
showSignInBtn.addEventListener("click", showSignIn);
showSignUpBtn.addEventListener("click", showSignUp);

// end of animation scripting

/////////////////////////////////////////////////////////////////////////////

let students;
window.addEventListener("load", getStudentsData);
function getStudentsData() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "../js/students.json", true);

  //save the retrieved JSON data as a glabal students obj
  xhttp.onload = function () {
    if (this.status == 200) {
      const retrieved = JSON.parse(this.responseText);
      students = retrieved.students;
    }
  };
  xhttp.send();
}
// getStudentsData();

//func to clear all the inputs
const clearInputs = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
};

///////////////////////////////////////////////////////////

const signInBtn = document
  .querySelector("#sign-in-btn")
  .addEventListener("click", () => {
    checkForEmptySignIn();
  });

// SIGN-IN FORM THINGS
function checkForEmptySignIn() {
  const userEmail = document.querySelector("#email").value;
  const userPassword = document.querySelector("#password").value;

  if (userEmail == "" || userPassword == "") {
    showModal("Please Enter All The Fields", "#ea4c88", "../images/alert.png");
  } else if (userEmail != "" && userPassword != "") {
    verifySignIn(userEmail, userPassword);
  }
}

function verifySignIn(userEmail, userPassword) {
  let verificationStatus = false;
  let userName;
  for (i = 0; i < students.length; i++) {
    if (
      students[i].email == userEmail &&
      students[i].password == userPassword
    ) {
      verificationStatus = true;
      userName = students[i].name;
    }
    // else {
    //   showModal("Invalid login", "#ea4c88", "../images/alert.png");
    // }
  }

  if (verificationStatus == true) {
    showModal(
      `Welcome Back, ${userName}. We Are Happy To See You Again!`,
      "#b5ff7d",
      "../images/tick.png"
    );
    clearInputs();
  } else {
    showModal("Invalid Login", "#ea4c88", "../images/alert.png");
  }
}

///////////////////////////////////////////////////////////////////////////////////

const signUpBtn = document
  .querySelector("#sign-up-btn")
  .addEventListener("click", function () {
    checkForEmptySignUp();
  });

// SIGN-UP FORM THINGS
function checkForEmptySignUp() {
  const newUserName = document.querySelector("#sign-up-name").value;
  const newUserEmail = document.querySelector("#sign-up-email").value;
  const newUserPassword = document.querySelector("#sign-up-password").value;

  if (newUserName == "" || newUserEmail == "" || newUserPassword == "") {
    showModal("Please Enter All The Fields", "#ea4c88", "../images/alert.png");
  } else if (newUserName != "" && newUserEmail != "" && newUserPassword != "") {
    verifySignUp(newUserName, newUserEmail, newUserPassword);
  }
}

//function to verify sing-up user details
function verifySignUp(newUserName, newUserEmail, newUserPassword) {
  let verificationStatus = true;

  /*loop through the students obj, if there is a matching email then update
    verificationStatus to false*/
  for (i = 0; i < students.length; i++) {
    if (students[i].email == newUserEmail) {
      verificationStatus = false;
    }
  }

  /*if the verificationStatus then there are also no matching emails then we can
    create a new student*/
  if (verificationStatus == true) {
    addNewStudent(newUserName, newUserEmail, newUserPassword);
    showModal(
      `Welcome To The World of Web Developement, ${newUserName}. We Hope You'll Have Fun!!`,
      "#b5ff7d",
      "../images/tick.png"
    );
    clearInputs();
  } else {
    //if the verificationStatus = false then show the modal alerting the user
    showModal(
      "That Email Is Already Registered",
      "#ea4c88",
      "../images/alert.png"
    );
  }
}

function addNewStudent(newUserName, newUserEmail, newUserPassword) {
  //   create a new student obj
  const newStudent = {
    name: newUserName,
    email: newUserEmail,
    password: newUserPassword,
  };

  // add the new student obj to the students array
  students.push(newStudent);
}

function showModal(message, modalColor, icon) {
  const modal = document.querySelector("#modal");
  const blackout = document.querySelector("#blackout");
  const modalMessage = document.querySelector("#msg");
  const modalIcon = document.querySelector("#icon");

  //set the modal color; update the modal innerHTML; show the modal and blackout screen
  modal.style.backgroundColor = modalColor;
  modalMessage.innerHTML = message;
  modalIcon.src = icon;
  modal.style.display = "block";
  blackout.style.display = "block";

  //remove the modal by clicking blackout screen
  blackout.addEventListener("click", () => {
    modalMessage.innerHTML = "";
    modal.style.display = "none";
    blackout.style.display = "none";
  });

  //remove the modal after 5 seconds
  setTimeout(function () {
    modalMessage.innerHTML = "";
    modal.style.display = "none";
    blackout.style.display = "none";
  }, 5000);
}
