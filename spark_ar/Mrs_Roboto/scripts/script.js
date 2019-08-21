/*
Welcome to scripting in Spark AR Studio!
From making things move to triggering audio clips,
reactive programming can help you achieve your scripting goals.

Helpful links:

Scripting Basics - https://fb.me/spark-scripting-basics
Reactive Programming - https://fb.me/spark-reactive-programming
Changelogs - https://fb.me/spark-changelog

Note: Feel free to delete the contents of this script and start from scratch.
*/

const Diagnostics = require('Diagnostics');
//const FaceTracking = require('FaceTracking');
const Scene = require('Scene');
const Patches = require('Patches');
const Networking = require('Networking');

const directionalLight = Scene.root.find('directionalLight0');

// Update this line with the URL of your endpoint
const base_domain = "https://e1abab10.ngrok.io";
const base_url = base_domain + "/send/";

Patches.getPulseValue('mouthOpened').subscribe(function (e) {
    Diagnostics.log('Mouth open!');
    sendMessage(0);
})

Patches.getPulseValue('mouthClosed').subscribe(function (e) {
    Diagnostics.log('Mouth closed!');
    sendMessage(1);
})

Patches.getPulseValue('eyebrowsRaised').subscribe(function (e) {
    Diagnostics.log('Eyebrows up');
    sendMessage(2);
})

Patches.getPulseValue('eyebrowsLowered').subscribe(function (e) {
    Diagnostics.log('Eyebrows down');
    sendMessage(3);
})

Patches.getPulseValue('faceHappy').subscribe(function (e) {
    Diagnostics.log('Happy face');
    sendMessage(4);
})

Patches.getPulseValue('faceHappyOff').subscribe(function (e) {
    Diagnostics.log('Happy face off');
    sendMessage(5);
})

Patches.getPulseValue('faceKissing').subscribe(function (e) {
    Diagnostics.log('Kissing face');
    sendMessage(6);
})

Patches.getPulseValue('faceKissingOff').subscribe(function (e) {
    Diagnostics.log('Kissing face off');
    sendMessage(7);
})


function sendMessage(val) {
  Networking.fetch(base_url + val).then(function(result) {
    console.log("fetching " + base_url + val);
  }).catch(function(error) {
    Diagnostics.log("There was an issue with fetch operation: " + error);
  });
}
