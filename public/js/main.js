$(document).ready(() => {
  $(".delete").on("click", e => {
    $target = $(e.target);
    const id = $target.attr("data-id");
    let url;
    let location;
    let windowLocation = window.location.pathname;
    const spiltUrl = windowLocation.split("/");

    if (spiltUrl[1] == "reminders") {
      url = "/reminders/";
      location = "/reminders/myreminders";
    } else if (spiltUrl[1] == "articles") {
      url = "/articles/";
      location = "/";
    }

    $.ajax({
      type: "DELETE",
      url: url + id,
      success: () => {
        if (confirm("Are you sure?")) {
        } else {
          // Abort
        }
        window.location.href = location;
      },
      error: err => {
        console.log(err);
      }
    });
  });
});

// // GET the time and date then alert
const dates = document.querySelectorAll("p.date");
const times = document.querySelectorAll("p.time");
const today = new Date();

// Current Date
let date = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let myDates;
// Add zero infront of day
date < 10
  ? (todaysDate = "0" + date + "/" + month + "/" + year)
  : (todaysDate = date + "/" + month + "/" + year);
// Reverse my dates
for (let i = 0; i < dates.length; i++) {
  myDates = dates[i].innerHTML
    .split("-")
    .reverse()
    .join("/");
  dates[i].innerHTML = myDates;
}
// Table Dates
let dayNumber;
let monthNumber;
let yearNumber;
// Parse dates into number
for (let i = 0; i < dates.length; i++) {
  let splitDate = dates[i].innerHTML.split("/");
  dayNumber = Number(splitDate[0]);
  monthNumber = Number(splitDate[1]);
  yearNumber = Number(splitDate[2]);
}

// Time
let hourNow = today.getHours();
let minutesNow = today.getMinutes();
let myTimes;

for (let i = 0; i < times.length; i++) {
  myTimes = times[i];
}

function renderTime() {
  let timer = setTimeout("renderTime()", 1000);
  if (dayNumber == date && monthNumber == month && yearNumber == year) {
    if (myTimes.innerHTML == hourNow + ":" + minutesNow) {
      clearTimeout(timer);
      if (confirm(`You have a call at ${hourNow}:${minutesNow}`)) {
        myTimes.parentElement.parentElement.style.backgroundColor =
          "rgba(255, 0, 0, 0.4)";
      } else {
        myTimes.parentElement.parentElement.style.backgroundColor = "";
      }
    }
  }
  timer;
}
renderTime();
