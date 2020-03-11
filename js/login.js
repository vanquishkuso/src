$("document").ready(function () {

  function checkUser() {
    if (sessionStorage.getItem('username') != null) {
      $(".user").append("Inloggad som " + sessionStorage.getItem('username'));
    window.location.href="index.html"
    }
  }
  checkUser();
  
  function loginScript() {
    //Start to get data from API about students and login information
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=students", function (
      data
    ) {
      $("#submit-button").click(function () {
        // Get the value from the input fields
        var username = $("#username").val();
        var password = $("#password").val();
        var logged_in = false;



        // For loop to check if the input value is same as API data
        if (username == "" || password == "") {
          $(".wrong-login").remove();
          $("#form-login")
            .append(
              "<p class='wrong-login'>Alla fält måste vara ifyllda</p>"
            )
            .find(".wrong-login") // Find the wrong-login class text
            .fadeOut(5000); // Add awesome fade effect
        } else {
          login()
        }

        function login() {
          var loginSuccessful = 0;
          for (i = 0; i < data.length; i++) {
            if (
              username == data[i].login.username &&
              password == data[i].login.password
            ) {
              loginSuccessful++; // Add value to variable if successful
              sessionStorage.setItem('username', username)
            }
          }
          if (loginSuccessful == 0) {
            // If unsuccessful the loginSuccessful variable is 0, then run the follwing
            $(".wrong-login").remove(); // Needs this to remove the text to see if next input is invalid as well.
            $("#form-login")
              .append(
                "<p class='wrong-login'>Du har skrivit fel användarnamn<br>och / eller lösenord</p>"
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
    //End API get about student logins
  }
  loginScript();

});