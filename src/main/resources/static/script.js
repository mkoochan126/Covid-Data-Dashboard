const stateCodeMap = {
  'Alabama': 'al',
  'Alaska': 'ak',
  'Arizona': 'az',
  'Arkansas': 'ar',
  'California': 'ca',
  'Colorado': 'co',
  'Connecticut': 'ct',
  'Delaware': 'de',
  'Florida': 'fl',
  'Georgia': 'ga',
  'Hawaii': 'hi',
  'Idaho': 'id',
  'Illinois': 'il',
  'Indiana': 'in',
  'Iowa': 'ia',
  'Kansas': 'ks',
  'Kentucky': 'ky',
  'Louisiana': 'la',
  'Maine': 'me',
  'Maryland': 'md',
  'Massachusetts': 'ma',
  'Michigan': 'mi',
  'Minnesota': 'mn',
  'Mississippi': 'ms',
  'Missouri': 'mo',
  'Montana': 'mt',
  'Nebraska': 'ne',
  'Nevada': 'nv',
  'New Hampshire': 'nh',
  'New Jersey': 'nj',
  'New Mexico': 'nm',
  'New York': 'ny',
  'North Carolina': 'nc',
  'North Dakota': 'nd',
  'Ohio': 'oh',
  'Oklahoma': 'ok',
  'Oregon': 'or',
  'Pennsylvania': 'pa',
  'Rhode Island': 'ri',
  'South Carolina': 'sc',
  'South Dakota': 'sd',
  'Tennessee': 'tn',
  'Texas': 'tx',
  'Utah': 'ut',
  'Vermont': 'vt',
  'Virginia': 'va',
  'Washington': 'wa',
  'West Virginia': 'wv',
  'Wisconsin': 'wi',
  'Wyoming': 'wy'
};

const stateNames = Object.keys(stateCodeMap);

document.addEventListener('DOMContentLoaded', () => {

    const displayView = document.getElementById("displayView");

    displayView.addEventListener("change", function(){
      const selectedValue = displayView.value;
      if(displayView.value == "view1"){
        document.getElementById("form1").style.display = 'block';
        document.getElementById("form2").style.display = 'none';

        document.getElementById("arizonaChart").style.display = 'block';
        document.getElementById("customChart").style.display = 'none';
      }
      else if(displayView.value == "view2"){
        document.getElementById("form1").style.display = 'none';
        document.getElementById("form2").style.display = 'block';

        document.getElementById("arizonaChart").style.display = 'none';
        document.getElementById("customChart").style.display = 'block';
      }
    });

    flatpickr("#currentDate", {
      dateFormat: "Y-m-d",
    });

    flatpickr("#startDate", {
      dateFormat: "Y-m-d",
    });

    flatpickr("#endDate", {
      dateFormat: "Y-m-d",
    });

    document.getElementById("form1").style.display = 'block';
    document.getElementById("form2").style.display = 'none';

    document.getElementById("arizonaChart").style.display = 'block';
    document.getElementById("customChart").style.display = 'none';

    const stateDropdown = document.getElementById('state');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const currentDateInput = document.getElementById('currentDate');
    const submitButtonWeekView = document.getElementById('submitButtonWeekView');
    const submitButtonCustomView = document.getElementById('submitButtonCustomView');
  
    // Populate the state dropdown (you can fetch this data from a service)
    stateNames.forEach((state) => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateDropdown.appendChild(option);
    });

    function updateLineChart(responseData, chart){
      var labels = []
      var positive = []
      var negative = []
      responseData.forEach(jsonObject => {
        const date = jsonObject.date;
        const positiveCases = jsonObject.positive;
        const negativeCases = jsonObject.negative;
        labels.push(date);
        positive.push(positiveCases);
        negative.push(negativeCases);
      });
      var updatedData = {
          labels: labels,
          datasets: [{
              label: 'Positive Cases',
              data: positive, // Your data points
              borderColor: 'blue', // Line color
              borderWidth: 1, // Line width
              fill: false // Do not fill the area under the line
          },
          {
            label: 'Negative Cases',
            data: negative, // Your data points
            borderColor: 'red', // Line color
            borderWidth: 1, // Line width
            fill: false // Do not fill the area under the line
        }]
      };

      if(chart == "customChart"){
        customChart.data = updatedData;
        customChart.options = {
          plugins: {
            title: {
              display: true,
              text: stateDropdown.value + " State Covid data between dates " + startDateInput.value + " and " + endDateInput.value,
            },
          }
        }
        customChart.update();
      }
      else if(chart == "arizonaChart"){
        arizonaChart.data = updatedData;
        arizonaChart.options = {
          plugins: {
            title: {
              display: true,
              text: "Arizona State Covid Week data for date " + currentDateInput.value,
            },
          }
        }
        arizonaChart.update();
      }
      return;
    }

    function fetchAndDisplayArizonaStateCovidWeekData(currentDate){

      fetch('http://localhost:8080/covid19/az/'+ currentDate)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
          console.log("SRK_Debug CP2", responseData);
          updateLineChart(responseData, "arizonaChart");
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }

    function fetchAndDisplayCustomStateCovidData(selectedState, startDate, endDate){

      // Make a POST request to your Spring Boot backend
      fetch('http://localhost:8080/covid19/'+ stateCodeMap[selectedState] + "/" + startDate + "/" + endDate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((responseData) => {
          console.log("SRK_Debug CP2", responseData);
          updateLineChart(responseData, "customChart");
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }

    submitButtonWeekView.addEventListener('click', () => {
        const currentDate = currentDateInput.value.replace(/-/g, '');
        fetchAndDisplayArizonaStateCovidWeekData(currentDate);
    });

    submitButtonCustomView.addEventListener('click', () => {
      const selectedState = stateDropdown.value;
      const startDate = startDateInput.value.replace(/-/g, '');
      const endDate = endDateInput.value.replace(/-/g, '');
  
      // Check if inputs are empty
      if (!selectedState || !startDate || !endDate) {
        alert('Please fill in all fields.');
        return;
      }

      fetchAndDisplayCustomStateCovidData(selectedState, startDate, endDate);
    });

    var ctxCustomChart = document.getElementById('customChart').getContext('2d');
    var ctxArizonaChart = document.getElementById('arizonaChart').getContext('2d');
    var data = {};

    var customChart = new Chart(ctxCustomChart, {
        type: 'line',
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: stateDropdown.value + " State Covid data between dates " + startDateInput.value + " and " + endDateInput.value,
            },
          }
        }
    });

    var arizonaChart = new Chart(ctxArizonaChart, {
        type: 'line',
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Arizona State Covid Week data for date " + currentDateInput.value,
            },
          }
        }
    });

    fetchAndDisplayArizonaStateCovidWeekData(currentDateInput.value.replace(/-/g, ''));
    fetchAndDisplayCustomStateCovidData(stateDropdown.value, startDateInput.value.replace(/-/g, ''), endDateInput.value.replace(/-/g, ''));
  });
  