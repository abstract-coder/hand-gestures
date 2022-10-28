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
    }
}