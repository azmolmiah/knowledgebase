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
const date = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
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
const hourNow = today.getHours();
const minutesNow = today.getMinutes();

// Timer loop

let checkTime = function() {
  for (let i = 0; i < times.length; i++) {
    if (dayNumber == date && monthNumber == month && yearNumber == year) {
      if (times[i].innerHTML == hourNow + ":" + minutesNow) {
        times[i].parentElement.parentElement.style.backgroundColor =
          "rgba(255, 0, 0, 0.4)";
      } else {
        times[i].parentElement.parentElement.style.backgroundColor = "";
      }
    }
  }
};
setTimeout(checkTime, 1000);
