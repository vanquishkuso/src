$("document").ready(function () {
    $(".user").append("<button id='log-out'>Logga ut</button>");
    $("#log-out").click(function (){
        sessionStorage.clear();
        window.location.href = "index.html";
    });
    //Point calculator variables for the quiz
    var correctPoint = 0;
    var wrongPoint = 0;

    function quiz() {
        //Get data from API about the quiz
        $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=quiz", function (
            quizData
        ) {
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

            for (i = 0; i < 10; i++) {
                // For loop to
                let addNumQuestion = i + 1; // Show which number the question has, +1 is necessary because the loop starts at 0. After this, the question is appended through the loop.

                $("#quiz" + [i]).append(
                    //Append all the questions though the loop
                    $(
                        "<p id='question-box" +
                        [i] +
                        "'>Fråga #" +
                        addNumQuestion +
                        "<br>" +
                        quizData[i].question +
                        "</p>"
                    )
                );
                $("#quiz" + [i]).append(
                    // Append the correct answer button
                    $(
                        "<button type='button' class='btn score-button" +
                        [i] +
                        " button-q-" +
                        [i] +
                        "'>" +
                        quizData[i].correct_answer +
                        "</button>"
                    ).click(function () {
                        correctPoint++; // Add score if correct button is pressed
                    })
                );
                $("#quiz" + [i]).append(
                    // Append the first incorrect answer button
                    $(
                        "<button type='button' class='btn button-q-" +
                        [i] +
                        "'>" +
                        quizData[i].incorrect_answers[0] +
                        "</button>"
                    ).click(function () {
                        wrongPoint++; // Add wrong score if incorrect button is pressed
                    })
                );

                // if the question has two or more faulty answers, it will append the next one.
                if (quizData[i].incorrect_answers.length >= 2) {
                    $("#quiz" + [i]).append(
                        $(
                            "<button type='button' class='btn button-q-" +
                            [i] +
                            "'>" +
                            quizData[i].incorrect_answers[1] +
                            "</button>"
                        ).click(function () {
                            wrongPoint++; // Add wrong score if incorrect button is pressed
                        })
                    );
                }

                // if the question has three faulty answers, it will append the next one.
                if (quizData[i].incorrect_answers.length >= 3) {
                    $("#quiz" + [i]).append(
                        $(
                            "<button type='button' class='btn button-q-" +
                            [i] +
                            "'>" +
                            quizData[i].incorrect_answers[2] +
                            "</button>"
                        ).click(function () {
                            wrongPoint++; // Add wrong score if incorrect button is pressed
                        })
                    );
                }
            }
            // Disable the buttons on the question if a button is pressed, also show the correct answer with green colored background with css. The correct button also has higher opacity than the disabled ones.
            $(".button-q-" + [0]).click(function () {
                $(".score-button" + [0]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [0]).prop("disabled", true);
            });
            $(".button-q-" + [1]).click(function () {
                $(".score-button" + [1]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [1]).prop("disabled", true);
            });
            $(".button-q-" + [2]).click(function () {
                $(".score-button" + [2]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [2]).prop("disabled", true);
            });
            $(".button-q-" + [3]).click(function () {
                $(".score-button" + [3]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [3]).prop("disabled", true);
            });
            $(".button-q-" + [4]).click(function () {
                $(".score-button" + [4]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [4]).prop("disabled", true);
            });
            $(".button-q-" + [5]).click(function () {
                $(".score-button" + [5]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [5]).prop("disabled", true);
            });
            $(".button-q-" + [6]).click(function () {
                $(".score-button" + [6]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [6]).prop("disabled", true);
            });
            $(".button-q-" + [7]).click(function () {
                $(".score-button" + [7]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [7]).prop("disabled", true);
            });
            $(".button-q-" + [8]).click(function () {
                $(".score-button" + [8]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [8]).prop("disabled", true);
            });
            $(".button-q-" + [9]).click(function () {
                $(".score-button" + [9]).css({
                    "background-color": "green",
                    opacity: "1"
                });
                $(".button-q-" + [9]).prop("disabled", true);
            });
        });
    }
   // quiz(); // Run the function when site loads.

    // Hide the show score text when the site loads.
    $(".show-score").hide();

    // Function to append a new button to show the scores. When clicked the total score, including a text will show with green color.
    function showTotalScore() {
        $(".score-button").append(
            $("<button type='button'>Visa dina poäng</button>")
        );
        $(".score-button button").click(function () {
            $(".show-score").show();
            $(".show-score").html(
                "<p class='p-score'>Dina poäng är </p><p class='p-score score-color'>" +
                correctPoint +
                "</p><p class='p-score'><br>Du fick </p><p class='p-score score-color-red'>" +
                wrongPoint +
                "</p><p class='p-score'> fel</p>"
            );
        });
    }
    showTotalScore(); // Run the function when site loads.

});