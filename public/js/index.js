// Get references to page elements
var $userName = $("#user-name");
var $userBio = $("#user-bio");
var $submitBtn = $("#submit");
var $userList = $("#user-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUsers: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },
  getUsers: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteUsers: function(id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  }
};

// refreshusers gets new users from the db and repopulates the list
var refreshUsers = function() {
  API.getUsers().then(function(data) {
    var $users = data.map(function(user) {
      var $a = $("<a>")
        .text(user.text)
        .attr("href", "/user/" + user.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": user.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $userList.empty();
    $userList.append($users);
  });
};

// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    name: $userName.val().trim(),
    description: $userBio.val().trim()
  };

  if (!(user.name && user.description)) {
    alert("You must enter an username and description!");
    return;
  }

  API.saveUser(user).then(function() {
    refreshUsers();
  });

  $userName.val("");
  $userBio.val("");
};

// handleDeleteBtnClick is called when an user's delete button is clicked
// Remove the user from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteUser(idToDelete).then(function() {
    refreshUsers();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$userList.on("click", ".delete", handleDeleteBtnClick);

// -----------------------------------------------------------

// creating user info
$("submit-bio").on("click", function(event) {
  event.preventDefault();

  var newUser = {
    name: $("#inputname")
      .val()
      .trim(),
    age: $("#inputage")
      .val()
      .trim(),
    bio: $("#inputbio")
      .val()
      .trim(),
    pictureURL: $("#userpic").val()
  };
  console.log(newUser);

  $.post("/api/newuser", newUser).then(function(data) {
    console.log(data);
  });

  $("#inputname").val("");
  $("#inputage").val("");
  $("#inputbio").val("");
  $("#userpic").val("");
});

// onclick "like"
$("sumbit-bttn").on("click", function() {
  document.getElementById;
});
// function to add the photo id to the db and store in favorites
// function to load next photo

// on click "meh"
// fn to load next photo
