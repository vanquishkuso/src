$("document").ready(function () {

  function checkSession() {
    if (sessionStorage.getItem('username') == null) {
      window.location.href = "error.html";
    }
  }

  function checkUser() {
    if (sessionStorage.getItem('username') != null) {
      $(".user").append("Inloggad som " + sessionStorage.getItem('username'));
    } else {
      checkSession();
    }
  }
  checkUser();
  //For loop to append API course data to the <th> in html


  function addLogOutButton() {
    $(".navbar-nav").append("<li class='nav-item'><button class='btn btn-primary justify-content-start btn-logout'>Logga ut</button></li>");
    $(".btn-logout").click(function () {
      sessionStorage.clear();
      window.location.href="login.html"
    });
  }
  addLogOutButton();

  function addCourses() {
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=courses", courseData => {
      $.each(courseData, function (index, courses) {
        var checkSite = $(".display-4:contains(" + courses.courseName + ")");
        var checkSiteId = $("." + courses.courseId);
        var coursesLink = courses.courseName.toLowerCase().replace(/\s/g, '');
        $(".menu-item").eq(index).attr("href", coursesLink + ".html").html(courses.courseName);

        $("tbody").append(
          "<tr><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.school + "</a></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.courseId + "</a></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.courseName + "</a></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.credit + "</a></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.startWeek + "</a></td><td><a class='course-link course-" + index + "' href='" + coursesLink + ".html'>" + courses.endWeek + "</a></td></tr>"
        );

        

        $(".start-h" + index).append("<h5 class='card-title d-inline'>Skola </h5><p class='card-text d-inline font-weight-bold'> " + courses.school + "</p><br>")
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



  function addQuiz() {
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=quiz", quizData => {
      var correctPoint = 0;
      var wrongPoint = 0;
      $.each(quizData, function (index, quiz) {

        $(".quizdiv").append(
          $(
            "<h4 class='question-box mt-5'>" + quiz.question + "</h4>"
          )
        );

        $(".quizdiv").append(
          $(
            "<button type='button' class='btn btn-primary btn-lg mx-1 my-1 btn-correct" + index + " qbtn" + index + "'>" + quiz.correct_answer + "</button>"
          ).click(function () {
            correctPoint++;
          })
        );

        $(".quizdiv").append(
          $(
            "<button type='button' class='btn btn-primary btn-lg mx-1 my-1 btn-wrong" + index + " qbtn" + index + "'>" + quiz.incorrect_answers[0] + "</button>"
          ).click(function () {
            wrongPoint++;
          })
        );

        if (quiz.incorrect_answers.length >= 2) {
          $(".quizdiv").append(
            $(
              "<button type='button' class='btn btn-primary btn-lg mx-1 my-1 btn-wrong" + index + " qbtn" + index + "'>" + quiz.incorrect_answers[1] + "</button>"
            ).click(function () {

              wrongPoint++;
            })
          );
        }

        if (quiz.incorrect_answers.length >= 3) {
          $(".quizdiv").append(
            $(
              "<button type='button' class='btn btn-primary btn-lg mx-1 my-1 btn-wrong" + index + " qbtn" + index + "'>" + quiz.incorrect_answers[2] + "</button>"
            ).click(function () {
              wrongPoint++;
            })
          );
        }
        $(".quizdiv .qbtn" + index).click(function () {
          $(this).addClass("btn-danger");
          $(".btn-correct" + index).removeClass("btn-danger").addClass("btn-success");
          $(".qbtn" + index).prop("disabled", true)
        });

        //   $(".quizdiv .qbtn" + index).html($(".qbtn").sort(function () {
        //       return Math.random() - 0.5;
        //     }))

      })
    });
  }
  addQuiz();


  //     $(".btn-correct:eq(0)").addClass("btn-success")
  //     $("button").prop("disabled", true)

});

