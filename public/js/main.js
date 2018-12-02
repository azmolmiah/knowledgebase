$(document).ready(() => {
  $(".delete").on("click", e => {
    $target = $(e.target);
    const id = $target.attr("data-id");
    let url;
    let location;
    let windowLocation = window.location.pathname;
    let spiltUrl = windowLocation.split("/");

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
        alert("Deleted");
        window.location.href = location;
      },
      error: err => {
        console.log(err);
      }
    });
  });
});
