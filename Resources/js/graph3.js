function openCreditGraph() {
    /**Graphs the number of employment durations by year */
    // Define the link to access the data from the Flask API
    let openCreditString = link + "open_credit_line";

    // Get the graph-2-grid element for the graph
    let ctx = document.getElementById('graph-2-grid');

    // Define a new bar Chart
    barChart = new Chart(ctx, {

        // Bar chart
        type: 'bar',

        // This is where we specify datasets
        data: {},
        options: {
            // This produces a horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {

                // Configurations for the title
                title: {
                    color: 'black',
                    font: {
                        size: 20
                    },
                    display: true,
                    text: 'Number of Applicants by Number of Open Credit Lines'
                },

                // Don't want to display the legend for the bar chart
                legend: {
                    display: false
                }
            },

            // This is where we configure the axes elements
            scales: {

                // Configurations for x axis
                x: {

                    // Title
                    title: {
                        color: 'black',
                        font: {
                            size: 15
                        },
                        display: true,
                        text: 'Number of Open Credit Lines'
                    },
                    beginAtZero: true,

                    // y-ticks
                    ticks: {
                        color: 'black'
                    }
                },

                // Configurations for y axis
                y: {

                    // Title
                    title: {
                        color: 'black',
                        font: {
                            size: 15
                        },
                        display: true,
                        text: 'Number of Applicants'
                    },

                    // We do not want to display the x gridlines
                    grid: {
                        display: false
                    },

                    // x-ticks
                    ticks: {
                        color: 'black'
                    }
                }
            },

        }
    })

    // Access the API for the open credit line data to plot into the bar chart
    d3.json(openCreditString).then(data => {

        // Number of open credit lines
        barLabels = Object.keys(data);

        // Values for each type
        barValues = Object.values(data);

        // Define the data to be plotted into the bar chart
        barData = {
            // Set the label as employment duration type
            labels: barLabels,

            // Set the dataset
            datasets: [{
                label: 'Number of Applicants',
                data: barValues,
                backgroundColor: [
                    '#1ADAE5',
                    '#531F7D',
                    '#497D1F',
                    '#FBAF04',
                    '#ED12EA'
                ]
            }]
        };

        // Update the bar chart
        barChart.data = barData;
        barChart.update();
    })
    
}

//-----------------------------------------------//
// Function to graph the donut chart for graph 3 //
//-----------------------------------------------//

function bankGradeGraph() {
    /** Graphs the home owner type donut chart */

    // Define the link to access the data from the Flask API
    // This is the link to the route of the json we want, in this case,
    // the bank grade types
    let bankGradeString = link + "bank_grade";

    // Get the graph-1-grid element for the graph
    // We need to pass this as a param to the Chart
    let ctx = document.getElementById('graph-1-grid');

    // Define a new Donut Chart

    donutChart = new Chart(ctx, {

        // Customize the chart
        // Try to look at Chart.js documentation for more customizations
        // Chart.js has a weird way of doing customizations which is sometimes annoying

        // Donut type chart
        type: 'doughnut',

        // This is where we specify datasets
        // We fill this in later when we call d3.json
        data: {},
        options: {

            // These 2 below makes the graph stay inside their div elements
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                // Configurations for the title
                title: {
                    color: 'black',
                    font: {
                        size: 20
                    },
                    display: true,
                    text: 'Bank Grade Distribution'
                },

                // Legend style
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },

        }
    })

    // Access the API for the bank grade data to plot into the donut chart
    // We add this to data from the donut chart we created earlier
    d3.json(bankGradeString).then(data => {

        // Type of home ownership
        donutLabels = Object.keys(data);

        // Values for each type
        donutValues = Object.values(data);

        // Define the data to be plotted into the donut chart
        donutData = {
            // Set the label as bank grade type
            labels: donutLabels,

            // Set the dataset
            datasets: [{
                label: 'Bank Grade',
                data: donutValues,

                // Set color values for the slices
                backgroundColor: [
                    '#531F7D',
                    '#497D1F',
                    '#FBAF04',
                    '#ED12EA',
                    '#1ADAE5',
                    '#99CCFF',
                    '#0000FF'
                ]
            }]
        };

        // Update the donut chart
        // We set the data collected from the API first then we call update()
        // to update the chart
        donutChart.data = donutData;
        donutChart.update();
    })

}

function graph3() {
    // Want only 2 grid elements
    grid2();
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1CanvasString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;

    // Call the functions to fill the grid elements
    openCreditGraph();
    bankGradeGraph();
}

document.getElementById("graph-3-panel").addEventListener("click", graph3);