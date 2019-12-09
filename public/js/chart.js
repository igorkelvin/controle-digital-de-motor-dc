var R_total;
var U_total;
var Y_total;

var chart_config = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Reference (SetPoint)',
      data: [],
      borderColor: 'rgba(180, 0, 0, 1)',
      backgroundColor: 'rgba(180, 0, 0, 1)',
      fill: false,
      lineTension: 0
    }, {
      label: 'Control Output',
      data: [],
      borderColor: 'rgba(0, 180, 0, 1)',
      backgroundColor: 'rgba(0, 180, 0, 1)',      
      fill: false,
      lineTension: 0
    }, {
      label: 'Output',
      data: [],
      borderColor: 'rgba(50, 50, 255, 1)',
      backgroundColor: 'rgba(50, 50, 255, 1)',
      fill: false,
      lineTension: 0
    }]
  },
  options: {
    steppedLine: 'before',
    maintainAspectRatio: false,
    elements: {
      point: {
	      radius: 2
      },
      line: {
	      borderWidth: 2,
        stepped: true
      },
    },
    point: {
      radius: 1
    },
    animation: {
      duration: 0 // general animation time
    },
    hover: {
      animationDuration: 0 // duration of animations when hovering an item
    },      
    responsive: true,
    responsiveAnimationDuration: 0, // animation duration after a resize
    title: {
      display: true,
      text: 'Controlador de Motor DC'
    },
    tooltips: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true
        },
        ticks: {
          minRotation: 0,
          maxRotation: 0,
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        },
        ticks: {
          minRotation: 0,
          maxRotation: 0,
          min: -5,
          max: 255,
          
        }
      }]
    }
  }
};

function beforePrintHandler () {
    for (var id in Chart.instances) {
        Chart.instances[id].resize();
    }
}

function updateChart() {
 
  let max = Math.min(R_total.length, Math.min(U_total.length, Y_total.length));
  let min = Math.max(max-dataSize, 0);
  
  R = R_total.slice(min);
  U = U_total.slice(min);
  Y = Y_total.slice(min);
  
  //console.log(R);
  //console.log(U);
  //console.log(Y);
  
  X = [];
  for (i = 0; i < dataSize; i++) {
    X[i] = i+min;
  }
  
  //console.log(X);
  
  chart_config.data.labels = X;
  chart_config.data.datasets[0].data = R;
  chart_config.data.datasets[1].data = U;
  chart_config.data.datasets[2].data = Y;
}
