//iQEu9smCCo1p3VssKj5ULqK6M9HrmDkhanEDhjeEHtfowf4F5pTkhoLVObsN
// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://smsfirebase-1bc4a.firebaseio.com"
// });
const https = require('https');
const firebase = require('firebase');
const dateformat = require('dateformat');
const schedule = require('node-schedule');
const express = require('express');

// require('firebase/analytics');

// const database = firebase.database();
//CONNECT TO FIREBASE
const firebaseConfig  = {
    apiKey: "AIzaSyBYatZomClzcerZhI6S3oYXUuj1bQD_2z8",
    authDomain: "smsfirebase-1bc4a.firebaseapp.com",
    databaseURL: "https://smsfirebase-1bc4a.firebaseio.com",
    projectId: "smsfirebase-1bc4a",
    storageBucket: "",
    messagingSenderId: "631670587080",
    appId: "1:631670587080:web:a5dc097d41a06e767e6ffd",
    measurementId: "G-96E6LTMBWD"
  };

  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
//Retrieving Datahttps://console.firebase.google.com/u/0/project/smsfirebase-1bc4a/database/smsfirebase-1bc4a/data/Attendance/2019-06-07/-LglbYDg7bT41yXMkelw/PhoneNumber
// var getNumber = firebase.database().ref('Attendance/2019-06-07/-LglbYDg7bT41yXMkelw/PhoneNumber');
// getNumber.on('value', function(snapshot){
//     console.log('snap.val() is: ',snapshot.val());

// });

//getDate
//SCHEDULE MESSAGE
var j = schedule.scheduleJob('*/5 * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    var today = dateformat(Date.now(),'yyyy-mm-dd');
var numbers =[];

// console.log(today);
//GET PHONE NUMBERS FROM FIREBASE
getList = firebase.database().ref(`Attendance/${today}/`);

getList.on('value',function(snapshot) {
    console.log(snapshotToArray(snapshot));
numbers  = snapshotToArray(snapshot);

//MESSAGE DATA
const data = JSON.stringify({
        api_token: 'iQEu9smCCo1p3VssKj5ULqK6M9HrmDkhanEDhjeEHtfowf4F5pTkhoLVObsN',
        from: 'Wuraola',
        to: numbers,
        body: 'Contact Test. I love you'
    });

    console.log(data);

//SEND MESSAGE
const options = {

    hostname: 'www.bulksmsnigeria.com',
    path: '/api/v1/sms/create',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};


const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
        process.stdout.write(chunk)
    });

    res.on('end', () => {
        console.log(JSON.parse(data));
    });

})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()


});


  });

  j.schedule();



function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        var  childData = childSnapshot.child("PhoneNumber").val();

        returnArr.push(childData);
    });

    return returnArr;
};


