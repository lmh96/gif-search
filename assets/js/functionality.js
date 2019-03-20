$(document).ready(function () {
    var queryURL = "";
    var moreBtn = $("<btn>");
    var offset = 0;
    var query = "";

    var recommended = [
        "cat",
        "dog",
        "snek",
        "birb",
        "lol",
        "funny"
    ];

    for (i = 0; i < recommended.length; i++) {
        var recBtn = $("<btn>");
        recBtn.val(recommended[i]);
        recBtn.addClass("btn btn-light suggested");
        recBtn.text(recommended[i]);
        $("#recommended").append(recBtn);
    }

    $("#search").keypress(function (event) {
        if (event.keyCode == 13)
            $('#searchIt').click();
    });

    $(".suggested").on("click", function () {
        $("#search").val($(this).val());
        if ($(this).text() != "trending")
            $("#searchIt").click();
    });

    $("#searchIt").on("click", function () {
        query = "";
        $("#results").empty();
        var temp = $("#search").val();
        offset = 0;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i] === " ") {
                query += "_";
            }
            else {
                query += temp[i];
            }
        }

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&limit=10&offset=" + offset + "&api_key=dc6zaTOxFJmzC";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var data = response.data;
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var image = $("<img>");
                var tr = $("<tr>");
                var title = $("<h2>");

                title.text(data[i].title);
                image.attr("src", data[i].images.fixed_height_still.url);
                image.attr("data-still", data[i].images.fixed_height_still.url);
                image.attr("data-animate", data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("gif");

                tr.append(title);
                tr.append(image);
                $("#results").append(tr);
            }
        })
        moreBtn.empty();

        moreBtn.attr("id", "more");
        moreBtn.val(query);
        moreBtn.addClass("btn btn-light");
        moreBtn.text("More gifs!");
        $("#moreDiv").append(moreBtn);
        offset += 10;
    });

    $("#trending").on("click", function () {
        offset = 0;
        queryURL = "https://api.giphy.com/v1/gifs/trending?limit=10&offset=" + offset + "&api_key=dc6zaTOxFJmzC";

        $("#results").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var data = response.data;
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var image = $("<img>");
                var tr = $("<tr>");
                var title = $("<h2>");

                title.text(data[i].title);
                image.attr("src", data[i].images.fixed_height_still.url);
                image.attr("data-still", data[i].images.fixed_height_still.url);
                image.attr("data-animate", data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("gif");

                tr.append(title);
                tr.append(image);
                $("#results").append(tr);
            }
        });

        moreBtn.empty();

        moreBtn.attr("id", "more");
        moreBtn.addClass("btn btn-light");
        moreBtn.text("More gifs!");
        $("#moreDiv").append(moreBtn);
        offset += 10;
    });
    
    $(document).on("click", "#more", function () {
        if (moreBtn.val() === "" || typeof (moreBtn.val()) === "undefined") {
            queryURL = "https://api.giphy.com/v1/gifs/trending?limit=10&offset=" + offset + "&api_key=dc6zaTOxFJmzC";
        }
        else {
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $("#more").val() + "&limit=10&offset=" + offset + "&api_key=dc6zaTOxFJmzC";
        }
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var data = response.data;
            console.log(queryURL);

            for (var i = 0; i < data.length; i++) {
                var image = $("<img>");
                var tr = $("<tr>");
                var title = $("<h2>");

                title.text(data[i].title);
                image.attr("src", data[i].images.fixed_height_still.url);
                image.attr("data-still", data[i].images.fixed_height_still.url);
                image.attr("data-animate", data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("gif");

                tr.append(title);
                tr.append(image);
                $("#results").append(tr);
            }

            offset += 10;
        })
    });
    $(document).on("click",".gif",function () {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});