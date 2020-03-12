$("document").ready(function () {
    $(".user").append("<button id='log-out'>Logga ut</button>");
    $("#log-out").click(function (){
        sessionStorage.clear();
        window.location.href = "index.html";
    });
    //Start to get data from API about course information
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=courses", function (
        courseData
    ) {
        // Check if the session is valid, or else
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
        // For loop to append API course data to the <th> in html
        for (i = 0; i < courseData.length; i++) {
            $("#table-content").append(
                "<tr><td><a class='course-link' href='" + courseData[i].courseName + ".html'>" + courseData[i].school + "</a></td></tr>"
            );
            $("#table-content").append(
                "<tr><td><a class='course-link' href='" + courseData[i].courseName + ".html'>" + courseData[i].courseId + "</a></td></tr>"
            );
            $(".th-header:eq(2)").append(
                "<tr><td><a class='course-link' href='" + courseData[i].courseName + ".html'>" + courseData[i].courseName + "</a></td></tr>"
            );
            $(".th-header:eq(3)").append(
                "<tr><td><a class='course-link' href='" + courseData[i].courseName + ".html'>" + courseData[i].credit + "</a></td></tr>"
            );
            $(".th-header:eq(4)").append(
                "<tr><td><a class='course-link' href='" + courseData[i].courseName + ".html'>" + courseData[i].startWeek + "</a></td></tr>"
            );
            $(".th-header:eq(5)").append(
                "<tr><td><a class='course-link' href='" + courseData[i].courseName + ".html'>" + courseData[i].endWeek + "</a></td></tr>"
            );
        }
    });
    //End API get about course data
});