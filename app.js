  var config = {
      apiKey: "AIzaSyDijQbP8TYiID_vJoHQuUwWco4f2zcJPNE",
      authDomain: "train-scheduler-7e257.firebaseapp.com",
      databaseURL: "https://train-scheduler-7e257.firebaseio.com",
      projectId: "train-scheduler-7e257",
      storageBucket: "",
      messagingSenderId: "769906656690"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  $("#add-train-btn").on("click", function (event) {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("x");
      var trainFreq = $("#frequency-input").val().trim();

      var tempTrain = {
          name: trainName,
          destination: trainDest,
          time: trainTime,
          frequency: trainFreq
      };

      database.ref().push(tempTrain);
      // Logs everything to console
      console.log("tempTrain.name " + tempTrain.name);
      console.log("tempTrain.destination " + tempTrain.destination);
      console.log("tempTrain.time " + tempTrain.time);
      console.log("tempTrain " + tempTrain.frequency);

      alert("Train successfully added");

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#frequency-input").val("");
  });

  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
      // Store everything into a variable.
      var trainName = childSnapshot.val().name;
      var trainDest = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().time;
      var trainFreq = childSnapshot.val().frequency;
      var current = moment();

      var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
      console.log(trainTime);


      var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      var tRemainder = diffTime % trainFreq;
      console.log(tRemainder);

      var tMinutesTillTrain = trainFreq - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


      console.log("trainName " + trainName);
      console.log("trainDest " + trainDest);
      console.log("trainTime " + trainTime);
      console.log("trainFreq " + trainFreq);

      function update() {
          $("#clock").html(moment().format('H:mm:ss'));
      }

      setInterval(update, 1000);

      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
          trainFreq + "</td><td>" + moment(nextTrain, "HH:mm").format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>");
  });
