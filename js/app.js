// page animations 
const tl = gsap.timeline({duration: 1});

tl.from('.navLinks', {y:-50, stagger: .3, opacity:0})
.from('#title', {opacity :0})
.from('[data-hero]', {opacity : 0})

const tl_2 = gsap.timeline({duration:1,
  scrollTrigger: {
    trigger: "#projet"}})

tl_2.from('.gallery-item h3', { opacity: 0, stagger: .2 })
.from('.gallery-item figure', { opacity : 0, scale : 0.5 , duration : 0.8, stagger :{
  from:'end',
  amount : 0.5
}})
.from('.gallery-item p', {opacity: 0, translateY: -10, duration: 0.3})

// menu menu burger

const menu_btn = document.querySelector('#burger');
	const mobile_menu = document.querySelector('#mobile-nav');

	menu_btn.addEventListener('click', function () {
		menu_btn.classList.toggle('is-active');
		mobile_menu.classList.toggle('is-active');
	});

// mouse animation
const cursor = document.querySelector(".cursor");
const frontend = document.querySelector(".dev");
const title = document.querySelector("#title_2");

const hero = document.querySelector('[data-hero]')

window.addEventListener('mousemove', (e) => {
	const { clientX, clientY } = e
  const x = Math.round((clientX / window.innerWidth) * 90)
  const y = Math.round((clientY / window.innerHeight) * 90)
	
	hero.style.setProperty('--x', `${x}%`)
	hero.style.setProperty('--y', `${y}%`)
  
})

// banner animation
console.clear();

var textPath = document.querySelector('#text-path');

var textContainer = document.querySelector('#text-container');

var path = document.querySelector( textPath.getAttribute('href') );

var pathLength = path.getTotalLength();
console.log(pathLength);

function updateTextPathOffset(offset){
  textPath.setAttribute('startOffset', offset); 
}

updateTextPathOffset(pathLength);

function onScroll(){
  requestAnimationFrame(function(){
    var rect = textContainer.getBoundingClientRect();
    var scrollPercent = rect.y / window.innerHeight;
    console.log(scrollPercent);
    updateTextPathOffset( scrollPercent * 2 * pathLength );
  });
}

window.addEventListener('scroll',onScroll);

// scroll animation
AOS.init({
  duration: 1200,
})


// form validation
const fname = document.querySelector("#fname");
const emailEl = document.querySelector("#email");
const lname = document.querySelector("#lname");
const messageEl = document.querySelector("textarea[name='message']");
const phoneEL = document.querySelector("#phone");

const form = document.querySelector("#signup");

// check names length
const checkName = () => {
  let valid = false;
  const min = 2,
    max = 25;
  const firstName = fname.value.trim();
  const lastName = lname.value.trim();

  if (!isRequired(firstName)) {
    showError(fname, "Ce champ ne peut pas être vide.");
  } else if (!isBetween(firstName.length, min, max)) {
    showError(
      fname,
      `Ce champ doit contenir entre ${min} et ${max} caractères.`
    );
  } else {
    showSuccess(fname);
    valid = true;
  }

  if (!isRequired(lastName)) {
    showError(lname, "Ce champ ne peut pas être vide.");
  } else if (!isBetween(lastName.length, min, max)) {
    showError(
      lname,
      `Ce champ doit contenir entre ${min} et ${max} caractères.`
    );
  } else {
    showSuccess(lname);
    valid = true;
  }
  return valid;
};

// to check email
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Ce champ ne peut pas être vide.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Cette adresse mail n'est pas valide.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

// to check phone
const checkPhone = () => {
  let valid = false;
  const phone = phoneEL.value.trim();
  if (!isRequired(phone)) {
    showError(phoneEL, "Ce champ ne peut pas être vide.");
  } else if (!isPhoneValid(phone)) {
    showError(phoneEL, "Ce numéro n'est pas valide.");
  } else {
    showSuccess(phoneEL);
    valid = true;
  }
  return valid;
};

// to check message
/*const checkMessage = () => {
  let valid = false;
  const min = 5,
    max = 180;
  const text = messageEl.value.trim();
  if (!isRequired(text)) {
    showError(text, "Ce champ ne peut pas être vide.");
  } else if (!isBetween(firstName.length, min, max)) {
    showError(
      text,
      `Ce champ doit contenir entre ${min} et ${max} caractères.`
    );
  } else {
    showSuccess(text);
    valid = true;
  }

  return valid;
};*/

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPhoneValid = (tel) => {
  const phoneno = /^0[1-9][0-9]{8}$/; // french phone
  return phoneno.test(tel);
};

const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

// error function
const showError = (input, message) => {
  const formField = input.parentElement;
  const formField_2 = messageEl.parentElement;

  formField.classList.remove("success");
  formField.classList.add("error");
  // for textarea
  // formField_2.classList.remove("success");
  // formField_2.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
  // for textarea
  // const error_2 = formField_2.querySelector("small");
  // error_2.textContent = message;
};

// success function
const showSuccess = (input) => {
  const formField = input.parentElement;
  //for textarea
  // const formField_2 = messageEl.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");
  // for textarea
  // formField_2.classList.remove("error");
  // formField_2.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
  // for textarea
  // const error_2 = formField_2.querySelector("small");
  // error_2.textContent = "";
};

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate forms
  let isNameValid = checkName(),
    isEmailValid = checkEmail(),
    isPhoneValid = checkPhone();
    /*isTextValid = checkMessage();*/

  let isFormValid = isNameValid && isEmailValid && isPhoneValid && isTextValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});



