// Variables
var celebArray = [
  "Steph Curry", "Lady Gaga", "Will Ferrell", "Chris Pratt", "Jennifer Lawrence", "Emma Stone", "Serena Williams", "Justin Bieber"];


//=== Helper functions ===//
// Render buttons of celebArray
function renderButtons() {

  $("#buttonsBar").empty();

    for (var i = 0; i < celebArray.length; i++) {
    var button = $("<button>");
    button.addClass("celebButton");
    button.attr("data-name", celebArray[i]);
    button.text(celebArray[i]);

    $("#buttonsBar").append(button);
  }
}

//--- Event Handlers ---//
// Adding a celebrity button for the user form
$("#add-celeb").on("click", function(event) {
  event.preventDefault();

  // retrieve input from textbox
  var inputCeleb = $("#input").val().trim();

  if (inputCeleb != "") {

  // add user input to celebArray
  celebArray.unshift(inputCeleb);
  $("#input").val("");

  renderButtons();
}
});

// GET celebrity Gifs when their buttons are clicked
function getCelebGifs() {
  var person = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })

.done(function(response) {
    var dataArray = response.data;
    console.log(response)

      $("#gifPanel").empty();
      for (var i = 0; i < dataArray.length; i++) {
        var newDiv = $("<div>");
        newDiv.addClass("celebGif");

        var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
        newDiv.append(newRating);

        var newImg = $("<img>");
        newImg.attr("src", dataArray[i].images.fixed_height_still.url);
        newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
        newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
        newImg.attr("data-state", "still");
        newDiv.append(newImg);

        // Append the new Gifs to the gifPanel
        $("#gifPanel").append(newDiv);
      }
    });
  }

//--- Animation on click ---//
function animateGif() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial celebrity buttons when DOM is loaded
$(document).ready(function() {
  renderButtons();
});

// An event handler for the celebrity buttons to fetch appropriate Gifs
$(document).on("click", ".celebButton", getCelebGifs);

// Add an event handler for the celeb Gifs to make the image animate and stop
$(document).on("click", ".celebGif", animateGif);
