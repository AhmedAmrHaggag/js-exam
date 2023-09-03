
let showData = document.getElementById("showData");
let searchForResults = document.getElementById("searchId");
const maxToShow = 20;
const maxWords = 30;
let mealsSubset ;

  $(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(400)
        $("body").css("overflow", "visible")
    })
})


  function openMySideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 600)

    $(".open-close-icon").toggleClass("fa-align-justify fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}


function closeMySideNav() {
    let sideNavWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -sideNavWidth
    }, 600)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeMySideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeMySideNav()
    } else {
        openMySideNav()
    }
})



function showMeals(foodArray) {
  let ourStorage = "";

  for (let i = 0; i < foodArray.length; i++) {
      ourStorage += `
      <div class="col-md-3">
              <div onclick="getMealInformation('${foodArray[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${foodArray[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${foodArray[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }

  showData.innerHTML = ourStorage
}



async function getCategories() {
    searchForResults.innerHTML = "";
    closeMySideNav()
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()

  showCategories(response.categories)
  $(".seconed-loading-screen").fadeOut(200)

}

function showCategories(foodArray) {
  let ourStorage = "";

  for (let i = 0; i < foodArray.length; i++) {
const categoryDescription = foodArray[i].strCategoryDescription;
const catDecAfterSplit = categoryDescription.split(" ").slice(0, maxWords).join(" ");
 
      ourStorage += `
      <div class="col-md-3">
              <div onclick="getCategoryMealsId('${foodArray[i].strCategory}')" class=" position-relative overflow-hidden rounded-3 cursor-pointer meal">
                  <img class="w-100" src="${foodArray[i].strCategoryThumb}" >
                  <div class="meal-layer position-absolute text-center text-black p-3">
                      <h3>${foodArray[i].strCategory}</h3>
                      <p>${catDecAfterSplit}</p>
                  </div>
              </div>
      </div>
      `
  }

  showData.innerHTML = ourStorage
}


async function getArea() {
    searchForResults.innerHTML = "";
    closeMySideNav()
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  respone = await respone.json()

  showArea(respone.meals)
  $(".seconed-loading-screen").fadeOut(200)

}


function showArea(foodArray) {
  let ourStorage = "";

  for (let i = 0; i < foodArray.length; i++) {
      ourStorage += `
      <div class="col-md-3">
              <div onclick="getAreaMealsId('${foodArray[i].strArea}')" class="rounded-3 text-center cursor-pointer">
                      <i class="fa-solid fa-house-laptop fa-5x"></i>
                      <h3>${foodArray[i].strArea}</h3>
              </div>
      </div>
      `
  }

  showData.innerHTML = ourStorage
}


async function getIngredients() {
    searchForResults.innerHTML = "";
    closeMySideNav()
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  respone = await respone.json()

  showIngredients(respone.meals.slice(0, 20))
  $(".seconed-loading-screen").fadeOut(200)

}


function showIngredients(foodArray) {
  let ourStorage = "";

  for (let i = 0; i < foodArray.length; i++) {
    const ingredientsDescription = foodArray[i].strDescription;
    const ingDecAfterSplit = ingredientsDescription.split(" ").slice(0, maxWords).join(" ");
      ourStorage += `
      <div class="col-md-3">
              <div onclick="getIngredientsMealsId('${foodArray[i].strIngredient}')" class="rounded-3 text-center cursor-pointer">
                      <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                      <h3>${foodArray[i].strIngredient}</h3>
                      <p>${ingDecAfterSplit}</p>
              </div>
      </div>
      `
  }

  showData.innerHTML = ourStorage
}


async function getCategoryMealsId(category) {
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  response = await response.json()


 mealsSubset = response.meals.splice(0, maxToShow);
showMeals(mealsSubset);
  $(".seconed-loading-screen").fadeOut(200)

}



async function getAreaMealsId(area) {
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()


  mealsSubset = response.meals.splice(0, maxToShow);
showMeals(mealsSubset);
  $(".seconed-loading-screen").fadeOut(200)

}


async function getIngredientsMealsId(ingredients) {
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()


  mealsSubset = response.meals.splice(0, maxToShow);
showMeals(mealsSubset);
  $(".seconed-loading-screen").fadeOut(200)

}

async function getMealInformation(mealID) {
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  searchForResults.innerHTML = "";
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  respone = await respone.json();

  showMealInformation(respone.meals[0])
  $(".seconed-loading-screen").fadeOut(200)

}


function showMealInformation(meal) {
  
  searchForResults.innerHTML = "";


  let Materials = ``

  for (let i = 1; i <= maxWords; i++) {
      if (meal[`strIngredient${i}`]) {
          Materials += `<li class="alert alert-info  p-2 m-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
      }
  }


  let tags = meal.strTags?.split(",")
  if (!tags) {
    tags = [];
  }

  let tagsStr = ''
  for (let i = 0; i < tags.length; i++) {
      tagsStr += `
      <li class="alert alert-danger p-2 m-2 ">${tags[i]}</li>`
  }



  let ourStorage = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-2 flex-wrap">
                  ${Materials}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-2 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`

  showData.innerHTML = ourStorage
}


function showSearchInputs() {
    closeMySideNav()
  searchForResults.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`

  showData.innerHTML = ""
}

async function searchByName(name) {
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  response = await response.json()

  if (response.meals) {
        showMeals(response.meals);
    } else {
        showMeals([]);
    }
  $(".seconed-loading-screen").fadeOut(200)

}

async function searchByFLetter(letter) {
  showData.innerHTML = ""
  $(".seconed-loading-screen").fadeIn(200)

  let letters = 'abcdefghijklmnopqrstuvwxyz';
  let randomIndex = Math.floor(Math.random() * letters.length);
  let randomLetter = letters.charAt(randomIndex);
  
    
    if (letter === "") {
        letter = randomLetter
        console.log(randomLetter);
  }
  

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  response = await response.json()

  if (response.meals) {
        showMeals(response.meals);
    } else {
        showMeals([]);
    }
  $(".seconed-loading-screen").fadeOut(200)

}






function showContacts() {
    searchForResults.innerHTML = "";
    closeMySideNav()
  showData.innerHTML = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="validateName()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed. <br> please enter at least 3 characters
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="validateEmail()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="validatePhone()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="validateAge()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="validatePassword()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="validateRepassword()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `
}


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function validateName() {
    nameInputTouched = true;
    const nameInput = document.getElementById("nameInput");
    const nameAlert = document.getElementById("nameAlert");
    if (nameInput.value.trim().length >= 3 && /^[a-zA-Z ]+$/.test(nameInput.value)) {
        nameAlert.classList.replace("d-block", "d-none");
    } else {
        nameAlert.classList.replace("d-none", "d-block");
    }
    updateSubmitButton();
}

function validateEmail() {
    emailInputTouched = true;
    const emailInput = document.getElementById("emailInput");
    const emailAlert = document.getElementById("emailAlert");
    if (emailInput.value.trim() === "" || /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value)) {
        emailAlert.classList.replace("d-block", "d-none");
    } else {
        emailAlert.classList.replace("d-none", "d-block");
    }
    updateSubmitButton();
}

function validatePhone() {
    phoneInputTouched = true;
    const phoneInput = document.getElementById("phoneInput");
    const phoneAlert = document.getElementById("phoneAlert");
    if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value)) {
        phoneAlert.classList.replace("d-block", "d-none");
    } else {
        phoneAlert.classList.replace("d-none", "d-block");
    }
    updateSubmitButton();
}

function validateAge() {
    ageInputTouched = true;
    const ageInput = document.getElementById("ageInput");
    const ageAlert = document.getElementById("ageAlert");
    if (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value)) {
        ageAlert.classList.replace("d-block", "d-none");
    } else {
        ageAlert.classList.replace("d-none", "d-block");
    }
    updateSubmitButton();
}

function validatePassword() {
    passwordInputTouched = true;
    const passwordInput = document.getElementById("passwordInput");
    const passwordAlert = document.getElementById("passwordAlert");
    if (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value)) {
        passwordAlert.classList.replace("d-block", "d-none");
    } else {
        passwordAlert.classList.replace("d-none", "d-block");
    }
    updateSubmitButton();
}

function validateRepassword() {
    repasswordInputTouched = true;
    const repasswordInput = document.getElementById("repasswordInput");
    const repasswordAlert = document.getElementById("repasswordAlert");
    if (repasswordInput.value === document.getElementById("passwordInput").value) {
        repasswordAlert.classList.replace("d-block", "d-none");
    } else {
        repasswordAlert.classList.replace("d-none", "d-block");
    }
    updateSubmitButton();
}

function updateSubmitButton() {
    let submitBtn = document.getElementById("submitBtn");
    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

function nameValidation() {
    const nameInput = document.getElementById("nameInput");
    return nameInput.value.trim().length >= 3 && /^[a-zA-Z ]+$/.test(nameInput.value);
}

function emailValidation() {
    const emailInput = document.getElementById("emailInput");
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value);
}

function phoneValidation() {
    const phoneInput = document.getElementById("phoneInput");
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value);
}

function ageValidation() {
    const ageInput = document.getElementById("ageInput");
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value);
}

function passwordValidation() {
    const passwordInput = document.getElementById("passwordInput");
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value);
}

function repasswordValidation() {
    const repasswordInput = document.getElementById("repasswordInput");
    return repasswordInput.value === document.getElementById("passwordInput").value;
}



