$("document").ready(function () {

  // Start script to add the user to sessionStorage
  function checkUser() {
    if (sessionStorage.getItem('username') != null) {
      window.location.href = "index.html"
    }
  }
  checkUser(); // Run the script when site loads

  //Start to get data from API about students and login information
  function loginScript() {
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=students", function (
      data
    ) {
      $("#submit-button").click(function () {
        // Variables to et the value from the input fields
        var username = $("#username").val();
        var password = $("#password").val();
        var logged_in = false;

        // Conditionals to check if the input value is same as API data. Add the error text field underneath the login box. If repeated, remove the textbox and add a new one to show that the login is still wrong.
        if (username == "" || password == "") {
          $(".wrong-login").remove();
          $("#form-login")
            .append(
              "<p class='wrong-login' role='alert'>Alla fält måste vara ifyllda</p>"
            )
            .find(".wrong-login") // Find the wrong-login class text
            .fadeOut(5000); // Add awesome fade effect to the text box
        } else {
          login()
        }

        // Check the login, if the login is successful the variable adds 1 to the loginSuccessful variable
        function login() {
          var loginSuccessful = 0;
          for (i = 0; i < data.length; i++) {
            if (
              username == data[i].login.username &&
              password == data[i].login.password
            ) {
              loginSuccessful++; // Add value to variable if successful
              sessionStorage.setItem('username', username) // Adds the username to sessionStorage
            }
          }
          if (loginSuccessful == 0) {
            // If unsuccessful the loginSuccessful variable is 0, then run the follwing
            $(".wrong-login").remove(); // Needs this to remove the text to see if next input is invalid as well.
            $("#form-login")
              .append(
                "<p class='wrong-login' role='alert'>Du har skrivit fel användarnamn<br>och / eller lösenord</p>"
              )
              .find(".wrong-login") // Find the wrong-login class text
              .fadeOut(5000); // Add awesome fade effect
          } else if (loginSuccessful == 1) {
            logged_in = true;
            // If loginSuccessful has 1 value, redirect to next page.
            window.location.href = "index.html";
          }
        }
      });
    });
    //End get API about student logins
  }
  loginScript(); // Run the script when site loads

});