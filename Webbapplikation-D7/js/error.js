// Start script to redirect the user in 5 seconds to the login page (login.html)
$("document").ready(function () {
  $("button").click(function () {
    window.location.href = "login.html";
  })
  setTimeout(function () { window.location.href = "login.html"; }, 5000);
});