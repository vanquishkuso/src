$("document").ready(function () {

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
          $("#login-box")
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
            $("#login-box")
              .append(
                "<p class='wrong-login'>Du har skrivit fel användarnamn<br>och / eller lösenord</p>"
              )
              .find(".wrong-login") // Find the wrong-login class text
              .fadeOut(5000); // Add awesome fade effect
          } else if (loginSuccessful == 1) {
            logged_in = true;
            // If loginSuccessful has 1 value, redirect to next page.
            window.location.href = "courseinfo.html";
          }
        }
      });
    });
    //End API get about student logins
  }

  function courses() {
    //Start to get data from API about course information
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=courses", function (
      courseData
    ) {
      // Check if the session is valid, or else
      //   function checkSession() {
      //     if (sessionStorage.getItem('username') == null) {
      //       window.location.href = "error.html";
      //     }
      //   }
      //
      //
      //   function checkUser() {
      //     if (sessionStorage.getItem('username') != null) {
      //       $(".user").append("Inloggad som " + sessionStorage.getItem('username'));
      //     } else {
      //       checkSession();
      //     }
      //   }
      //   checkUser();
      // For loop to append API course data to the <th> in html

    });
  }
  // courses();

  function addCourses() {
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=courses", courseData => {
      $.each(courseData, function (index, courses) {
        $("tbody").append(
          "<tr><td><a class='course-link' href='" + courses.courseName + ".html'>" + courses.school + "</a></td><td><a class='course-link' href='" + courses.courseName + ".html'>" + courses.courseId + "</a></td><td><a class='course-link' href='" + courses.courseName + ".html'>" + courses.courseName + "</a></td><td><a class='course-link' href='" + courses.courseName + ".html'>" + courses.credit + "</a></td><td><a class='course-link' href='" + courses.courseName + ".html'>" + courses.startWeek + "</a></td><td><a class='course-link' href='" + courses.courseName + ".html'>" + courses.endWeek + "</a></td></tr>"
        );
      });
    });
  }
  addCourses();

  function addQuiz() {
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=quiz", quizData => {
      var correctPoint = 0;
      var wrongPoint = 0;
      $.each(quizData, function (index, quiz) {

        $(".quizdiv").append(
          $(
            "<h3 class='question-box mt-5'>" + quiz.question + "</h3>"
          )
        );

        $(".quizdiv").append(
          $(
            "<button type='button' class='btn btn-primary btn-lg mx-1 my-1 qbtn btn-correct'>" + quiz.correct_answer + "</button>"
          ).click(function () {
            correctPoint++;
          })
        );

        $(".quizdiv").append(
          $(
            "<button type='button' class='btn btn-primary btn-lg mx-1 my-1'>" + quiz.incorrect_answers[0] + "</button>"
          ).click(function () {
            wrongPoint++;
          })
        );

        if (quiz.incorrect_answers.length >= 2) {
          $(".quizdiv").append(
            $(
              "<button type='button' class='btn btn-primary btn-lg mx-1 my-1 qbtn'>" + quiz.incorrect_answers[1] + "</button>"
            ).click(function () {

              wrongPoint++;
            })
          );
        }

        if (quiz.incorrect_answers.length >= 3) {
          $(".quizdiv").append(
            $(
              "<button type='button' class='btn btn-primary btn-lg mx-1 my-1'>" + quiz.incorrect_answers[2] + "</button>"
            ).click(function () {
              wrongPoint++;
            })
          );
        }
      })
    });
  }
  addQuiz();

  function showCorrectAnswers() {
    $(".quizdiv").click(function () {
      $(".btn-correct:eq(0)").addClass("btn-success")
      $("button").prop("disabled", true)
    });
  }
  showCorrectAnswers()
});

