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
      var current = moment().format("x");
      console.log("crrntTime "+current);
      
      var added = current - trainTime;
      console.log("addedTime "+ added);
      
      var addFo = moment.unix(added).format("HH:mm");
      console.log("addFo "+ addFo);
      
      
      console.log("trainName " + trainName);
      console.log("trainDest " + trainDest);
      console.log("trainTime " + trainTime);
      console.log("trainFreq " + trainFreq);
      

      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
          trainFreq + "</td><td>" + "nextArrival" + "</td><td>" + "minutes" + "</td><td>");
  });
