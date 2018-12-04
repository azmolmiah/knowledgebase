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

// GET the time and date then alert
const dates = document.getElementsByClassName("date");
let dateInnerHTML;
for (let i = 0; i < dates.length; i++) {
  dateInnerHTML = dates[i].innerHTML
    .split("-")
    .reverse()
    .join("-");
  dates[i].innerHTML = dateInnerHTML;
}

const today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
