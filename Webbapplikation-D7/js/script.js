$("document").ready(function () {

  // Check if the username is logged in, if not then redirect to error.html page.
  function checkSession() {
    if (sessionStorage.getItem('username') == null) {
      window.location.href = "error.html";
    }
  }
  checkSession();
  
  // Add log out button to the page and append it to the navigation.
  function addLogOutButton() {
    $(".navbar-nav").append("<li class='nav-item'><button class='btn btn-primary text-light justify-content-start btn-logout' aria-label='Logga ut'>Logga ut</button></li>");
    $(".btn-logout").click(function () {
      sessionStorage.clear(); // Clear session to logout and then redirect to login.html.
      window.location.href = "login.html"
    });
  }
  addLogOutButton();

  // Start function to add the course data to the courses.html page.
  function addCourses() {
    // get API first
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=courses", courseData => {
      $.each(courseData, function (index, courses) {

        // Variable to make the link names lower case and replace the space between course names with two words, example Content Management, to make the links usable.
        // Add the course links to the navigation bar.
        var coursesLink = courses.courseName.toLowerCase().replace(/\s/g, '');
        $(".menu-item").eq(index).attr("href", coursesLink + ".html").html(courses.courseName);

        // Append the school name, course name and course data to the table at the courses.html
        $("tbody").append(
          "<tr><td><span lang='en'><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.school + "</a></span></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.courseId + "</a></td><td><span lang='en'><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.courseName + "</a></span></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.credit + "</a></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.startWeek + "</a></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.endWeek + "</a></td></tr>"
        );

        // Append the school name, course name and course data to the card element in each course page.
        // Remove the link attribute to the courses that are not reachable.
        $(".start-h" + index).append("<h5 class='card-title d-inline'>Skola </h5><p class='card-text d-inline font-weight-bold'><span lang='en'> " + courses.school + "</span></p><br>")
        $(".start-h" + index).append("<h5 class='card-title d-inline'>Poäng </h5><p class='card-text d-inline font-weight-bold'> " + courses.credit + "</p><br>")
        $(".start-h" + index).append("<h5 class='card-title d-inline'>Startar vecka </h5><p class='card-text d-inline font-weight-bold'> " + courses.startWeek + "</p><br>")
        $(".start-h" + index).append("<h5 class='card-title d-inline'>Slutar vecka </h5><p class='card-text d-inline font-weight-bold'> " + courses.endWeek + "</p><br>")
        $(".start-h" + index).append("<h5 class='card-title d-inline'>Lärare </h5><p class='card-text d-inline font-weight-bold'> " + courses.teachers + "</p><br>")

        $(".course-2").removeAttr("href");
        $(".course-4").removeAttr("href");
        $(".course-5").removeAttr("href");
        $(".course-6").removeAttr("href");
      });

    });
  }
  addCourses();

  // Add Quiz from the quiz API.
  function addQuiz() {
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=quiz", quizData => {
      // Variable to check the correct points and wrong points to show the user when score-button is pressed.
      var correctPoint = 0;
      var wrongPoint = 0;

      // Function to show the score at the bottom when score-button is pressed.
      function showTotalScore() {
        $(".score-button").append(
          $("<button type='button' class='btn btn-secondary my-3' aria-label='Visa poäng'>Visa dina poäng</button>")
        );
        $(".score-button button").click(function () {
          $(".show-score").show();
          $(".show-score").html(
            "<p class='d-inline'><strong>Du fick</strong></p><p class='d-inline'><strong> " +
            correctPoint +
            "</strong></p><p class='d-inline'><strong> rätt</strong></p><br><p class='d-inline'><strong>Du fick </strong></p><p class='d-inline'><strong>" +
            wrongPoint +
            "</strong></p><p class='d-inline'><strong> fel</strong></p>"
          );
        });
      }
      showTotalScore(); // Run the function when site loads.

      // Start Loop to append the data from quiz API to the quiz.html.
      $.each(quizData, function (index, quiz) {
        $(".quizdiv").append(
          $(
            "<h4 class='question-box mt-5'>" + quiz.question + "</h4>"
          )
        );

        $(".quizdiv").append(
          $(
            "<button type='button' aria-label='Svarsalternativ 1' class='btn btn-primary btn-lg mx-1 my-1 btn-correct" + index + " qbtn" + index + "'>" + quiz.correct_answer + "</button>"
          ).click(function () {
            correctPoint++; // Add value to correctPoint variable to show results when score-button is pressed
          })
        );

        $(".quizdiv").append(
          $(
            "<button type='button' aria-label='Svarsalternativ 2' class='btn btn-primary btn-lg mx-1 my-1 btn-wrong" + index + " qbtn" + index + "'>" + quiz.incorrect_answers[0] + "</button>"
          ).click(function () {
            wrongPoint++; // Add value to wrongPoint variable to show results when score-button is pressed
          })
        );

        // If more than one wrong answers are available, append one more button.
        if (quiz.incorrect_answers.length >= 2) {
          $(".quizdiv").append(
            $(
              "<button type='button' aria-label='Svarsalternativ 3' class='btn btn-primary btn-lg mx-1 my-1 btn-wrong" + index + " qbtn" + index + "'>" + quiz.incorrect_answers[1] + "</button>"
            ).click(function () {
              wrongPoint++; // Add value to wrongPoint variable to show results when score-button is pressed
            })
          );
        }

        // If more than two wrong answers are available, append one more button.
        if (quiz.incorrect_answers.length >= 3) {
          $(".quizdiv").append(
            $(
              "<button type='button' aria-label='Svarsalternativ 4' class='btn btn-primary btn-lg mx-1 my-1 btn-wrong" + index + " qbtn" + index + "'>" + quiz.incorrect_answers[2] + "</button>"
            ).click(function () {
              wrongPoint++; // Add value to wrongPoint variable to show results when score-button is pressed

            })
          );
        }

        // Script to add button colors by using the bootstrap classes for button when correct and wrong button is pressed. Remove the btn-danger (red color button) from the correct button if correct button is pressed, then add the btn-success class (green color button)
        $(".quizdiv .qbtn" + index).click(function () {
          $(this).addClass("btn-danger");
          $(".btn-correct" + index).removeClass("btn-danger").addClass("btn-success");
          $(".qbtn" + index).prop("disabled", true)
        });
      })
    });
  }
  // End quiz script.
  addQuiz(); // Run the script when the site loads.
});

