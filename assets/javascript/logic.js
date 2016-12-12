  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBk74DnDRxLE792TDt8waomTDPh6UOBRnk",
    authDomain: "train-activity-week-7.firebaseapp.com",
    databaseURL: "https://train-activity-week-7.firebaseio.com",
    storageBucket: "https://train-activity-week-7.appspot.com",
    messagingSenderId: "60404668303"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var dbTrainCount = 0;

// 2. Button for adding train
$("#add-train-btn").on("click", function() {

  // Grabs user input
  var tName = $("#train-name-input").val().trim();
  var tDestination = $("#train-des-input").val().trim();
  var tStartTime = moment($("#train-start-input").val().trim(), "hh:mm").format("hh:mm");
  var tFrequency = $("#train-freq-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: tName,
    destination: tDestination,
    startTime: tStartTime,
    frequency: tFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.tName);
  console.log(newTrain.tDestination);
  console.log(newTrain.tStartTime);
  console.log(newTrain.tFrequency);

  // Alert
  //alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#train-des-input").val("");
  $("#train-start-input").val("");
  $("#train-freq-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tStartTime = childSnapshot.val().startTime;
  var tFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(tName);
  console.log(tDestination);
  console.log(tStartTime);
  console.log(tFrequency);

  // First Time (pushed back 1 year to make sure it comes before current time)
      var timeConverted = moment(tStartTime, "hh:mm").subtract(1, "years");
      console.log("TIME One Year BACK: " + timeConverted);

  // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
      var diffTime = moment().diff(moment(timeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

	// Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  tFrequency + "</td><td>" + nextTrain.format("hh:mm") + "</td><td>" + tMinutesTillTrain);
});


