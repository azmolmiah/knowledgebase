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
function renderTime() {
  const dates = document.querySelectorAll("p.date");
  const times = document.querySelectorAll("p.time");
  const today = new Date();

  // Date
  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  date < 10
    ? (todaysDate = "0" + date + "/" + month + "/" + year)
    : (todaysDate = date + "/" + month + "/" + year);

  let myDates;
  // dates.forEach(date => {
  //   myDates = date.innerHTML
  //     .split("-")
  //     .reverse()
  //     .join("/");
  //   date.innerHTML = myDates;
  // });

  for (let i = 0; i < dates.length; i++) {
    myDates = dates[i].innerHTML
      .split("-")
      .reverse()
      .join("/");
    dates[i].innerHTML = myDates;
  }

  let dayNumber;
  let monthNumber;
  let yearNumber;

  // dates.forEach(date => {
  //   let splitDate = date.innerHTML.split("/");
  //   dayNumber = Number(splitDate[0]);
  //   monthNumber = Number(splitDate[1]);
  //   yearNumber = Number(splitDate[2]);
  // });

  for (let i = 0; i < dates.length; i++) {
    let splitDate = dates[i].innerHTML.split("/");
    dayNumber = Number(splitDate[0]);
    monthNumber = Number(splitDate[1]);
    yearNumber = Number(splitDate[2]);
  }

  // Time
  let hourNow = today.getHours();
  let minutesNow = today.getMinutes();
  let hourNumber;
  let minutesNumber;

  // times.forEach(time => {
  //   let splitTime = time.innerHTML.split(":");
  //   hourNumber = Number(splitTime[0]);
  //   minutesNumber = Number(splitTime[1]);
  // });

  for (let i = 0; i < times.length; i++) {
    let splitTime = times[i].innerHTML.split(":");
    hourNumber = Number(splitTime[0]);
    minutesNumber = Number(splitTime[1]);
    // console.log(times[i].parentElement.parentElement);
  }

  let timer = setTimeout("renderTime()", 1000);
  if (dayNumber == date && monthNumber == month && yearNumber == year) {
    if (hourNumber == hourNow && minutesNumber == minutesNow) {
      // const timebg = document.getElementsByClassName("time");

      clearTimeout(timer);
      if (confirm(`You have a call at ${hourNumber}:${minutesNumber}`)) {
      } else {
      }
    } else {
      timer;
    }
  }
  timer;
}
renderTime();
