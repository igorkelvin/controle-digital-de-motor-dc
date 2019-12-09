// Firebase Functions and vars

var firebaseConfig = {
    apiKey: "AIzaSyDp5X69Dzj7_e0tQ7Bxmf4dLqcJUdKidc8",
    authDomain: "controle-digital-de-motor-dc.firebaseapp.com",
    databaseURL: "https://controle-digital-de-motor-dc.firebaseio.com",
    projectId: "controle-digital-de-motor-dc",
    storageBucket: "controle-digital-de-motor-dc.appspot.com",
    messagingSenderId: "132289960228",
    appId: "1:132289960228:web:6df92cf2c6ce546f11fbb1"
};

firebase.initializeApp(firebaseConfig);
//console.log(firebase.app().name);

var database = firebase.database();
//firebase.database.enableLogging(true, true);

function updateData(vartype, index, value) {
  //let myJSON = '{"R' + index + '":{"value":' + value + '}}';
  let myJSON = '{"' + index + '":' + value + '}';
  let myObj = JSON.parse(myJSON);
  
  console.log("Sended: " + myJSON);
  firebase.database().ref(vartype).update(myObj);
}


async function syncDataWithFirebase(vartype, ref) {
  let indexRef = firebase.database().ref(vartype);
  
  let promise = indexRef.once('value').then(async function(snapshot) {
    ref[0] = snapshot.val(); 
  });
  
  await promise;
  return promise;
}

function resetData() {
  firebase.database().ref("/").remove();
}



