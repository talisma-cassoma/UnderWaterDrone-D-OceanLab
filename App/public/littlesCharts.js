//-----------------------------------
let theData=[]
let theLabels=[]
for (let i = 0; i < 20; i++) {
    theData.push(((Math.random()<=0.5)? -1 : 1)*Math.random())
    theLabels.push(i)
}
    
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: theLabels,
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2, 
        datasets: [{
            label: 'sensors',
            data: theData,
            backgroundColor: [
                '#8676ff',
                '#FF708B',
                '#FFBA69'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                display: false,
                beginAtZero: true
                },
            x: {
                display: false
                }
            }
            }
        });