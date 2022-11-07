Webcam.set({
    height: 250,
    width: 350,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_pic() {
    Webcam.snap(function (picture) {
        document.getElementById("result").innerHTML = "<img src= '" + picture + "' id = 'result_pic' >";
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BzEuJjyvD/model.json", model_loaded);


function model_loaded() {
    console.log("Model is loaded.");
}

function identify_pic() {

    picture_identify = document.getElementById("result_pic");
    classifier.classify(picture_identify, got_results);
}


function got_results(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        
        console.log(results);
        prediction = results[0].label;
        agent_speak();
        if (prediction == "Thumbs down") {
            document.getElementById("result_name").innerHTML = prediction;
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if (prediction == "OK") {
            document.getElementById("result_name").innerHTML = prediction;
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (prediction == "Thumbs up") {
            document.getElementById("result_name").innerHTML = prediction;
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (prediction == "Peace") {
            document.getElementById("result_name").innerHTML = prediction;
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
    }
}

function agent_speak() {
    var agent_speak = window.speechSynthesis;
    speak_pred = "The hand gesture is " + prediction;

    utter_data = new SpeechSynthesisUtterance(speak_pred);
    agent_speak.speak(utter_data);
}