
var dataSize = 60;
var dataIndex = 2;
var dataSizeTotal = dataSize;

var setpoint = 0;

var R = chart_config.data.datasets[0].data;
var U = chart_config.data.datasets[1].data;
var Y = chart_config.data.datasets[2].data;
var X = chart_config.data.labels;
var E = [];

R_total = R;
U_total = U;
Y_total = Y;

var please_redraw = true;

var spRange = document.getElementById('points');
var spText  = document.getElementById('text_sp');
var rangeRange = document.getElementById('chartRange');
var rangeText  = document.getElementById('text_range');

rangeRange.value = dataSize;


spRange.addEventListener('change', function() {
	spText.innerHTML = spRange.value
});

function control() {
  spText.innerHTML = spRange.value;
  rangeText.innerHTML = rangeRange.value;
  
  rangeRange.max = dataSizeTotal;
  setpoint = spRange.value;
  
  if (dataSize != rangeRange.value) {
    dataSize = rangeRange.value;
    please_redraw = true;
  }
  
  if (please_redraw) {
    updateChart();
    please_redraw = false;
  }
  
  window.myLine.update(0);
}

window.onload = async function() {
	var ctx = document.getElementById('canvas').getContext('2d');
  
  sync();
    
  var indexRef = firebase.database().ref('status/index');
  indexRef.on('value', function(snapshot) {
    let ret = snapshot.val();
    
    sync();
    
  });
  
	window.myLine = new Chart(ctx, chart_config);
  window.setInterval(control, 20);
};

async function sync() {
  var originalDataSet = [];
  let tmp = []; // Don't know how to pass variable by reference to a function, 
                // so I am doing this horrible workaround
                
  await syncDataWithFirebase('/', tmp);
  
  originalDataSet = tmp[0];
  //console.log(originalDataSet);
  
  if (originalDataSet == null || originalDataSet == undefined) {
    return;
  }
  
  //if (setpoint != originalDataSet["status"]["setpoint"]) {
    //updateData("status", "setpoint", spRange.value);
  //}
  
  R_total = originalDataSet["data"]["R"];
  U_total = originalDataSet["data"]["U"];
  Y_total = originalDataSet["data"]["Y"];
  
  dataSizeTotal = R_total.length;
  
  please_redraw = true;
}

function newSetPoint() {
  updateData("status", "setpoint", setpoint);
}
