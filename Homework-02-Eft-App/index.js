//data import
import data from "./data.js";

const { id, name, iban1, iban2, accountBahcelievlerBudget, accountOranBudget } =
  data;
//DOM sabitler
const accountInformation = document.querySelector("#bankAccounts");
const accountBahcelievler = document.querySelector(".accountBahcelievler");
const accountOran = document.querySelector(".accountOran");
const message = document.querySelector(".welcomeMessage");
const myCode = document.querySelector("#myCode");
const sendCode = document.querySelector("#sendCode");
const centerTab = document.querySelector("#secondTab");
const recipient = document.querySelector("#ibanRecipient");
const transfer = document.querySelector("#amountToBeSend");
const myForm = document.querySelector("form");

// Welcome mesajı vermek için data'dan name'yi alıp kullanıcıya (`Welcome  ${data.name}`) formatında welcome mesajı vermeyi saglar.
window.addEventListener("load", checkJSLoaded);

function checkJSLoaded() {
  const script = document.createElement("script");

  script.addEventListener("load", (event) => {
    message.innerHTML = `Welcome  ${data.name}`;
  });

  script.src = "./index.js";
  document.body.appendChild(script);
}

accountInformation.addEventListener("click", () => {
  accountBahcelievler.innerHTML = data.iban1;
  accountOran.innerHTML = data.iban2;
});

window.onload = function () {
  let filter = document.querySelector("#bankAccounts");
  filter.onchange = function () {
    let selectedAccount = filter.options[filter.selectedIndex].text;
  };
};
//timer
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 2,
    display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};

// Money

let moneyAmount = "";

transfer.addEventListener("keydown", getMoney);

function getMoney(e) {
  moneyAmount = e.target.value;
}

// Character

let characherNumber = 0;

recipient.addEventListener("keydown", getValue);

function getValue() {
  if (characherNumber < 24) {
    characherNumber = parseInt(characherNumber) + 1;
  }
}

// Alerts

const success = document.querySelector(".alert-success");
const failed = document.querySelector(".alert-danger");
success.style.display = "none";
failed.style.display = "none";

function getCleanForm() {
  myForm.reset();
  location.reload();
}

// Gelen kodu onaylamak ve onay pencerisini açmak için çalıştırılacak kodlar

centerTab.style.display = "none";

myForm.addEventListener("submit", (e) => {
  if (characherNumber == 24 && parseInt(moneyAmount) < 500) {
    e.preventDefault();

    success.style.display = "block";

    setTimeout(function () {
      centerTab.style.display = "block";
      centerTab.style.zIndex = "3";
      sendCode.addEventListener("click", function (e) {
        for (let i = 1; i < 4; i++) {
          let theCode = myCode.value;
          if (parseInt(theCode) === 1234) {
            alert("Success");
            getCleanForm();
            break;
          } else {
            alert("Failed");
            myCode.value = "";
            getCleanForm();
          }
        }
      });
    }, 5000);
  } else {
    e.preventDefault();
    failed.style.display = "block";
    setTimeout(function () {
      myForm.reset();
      location.reload();
    }, 5000);
  }
});
