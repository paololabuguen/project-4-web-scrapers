let link = "http://127.0.0.1:5000/api/v1/";

graphGrid1CanvasString = '<canvas id=\"graph-1-grid\"></canvas>';
graphGrid2CanvasString = '<canvas id=\"graph-2-grid\"></canvas>';
graphGrid1TextString = '<div id=\"graph-1-grid-text\"></div>';
graphGrid2TextString = '<div id=\"graph-2-grid-text\"></div>';
//-----------------------------------------------//
// Function to graph the donut chart for graph 1 //
//-----------------------------------------------//

function homeOwnerTypeGraph() {
    /**Graphs the home owner type donut chart and returns the chart
     * 
     */

    document.getElementById("graph-1").innerHTML = graphGrid1CanvasString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;
    // Define the link to access the data from the Flask API
    // This is the link to the route of the json we want, in this case,
    // the home ownership types
    let homeOwnerString = link + "home_owner_type";

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
                    text: 'Home Ownership Type'
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

    // Access the API for the homeowner type data to plot into the donut chart
    // We add this to data from the donut chart we created earlier
    d3.json(homeOwnerString).then(data => {

        // Type of home ownership
        donutLabels = Object.keys(data);

        // Values for each type
        donutValues = Object.values(data);

        // Define the data to be plotted into the donut chart
        donutData = {
            // Set the label as home ownership type
            labels: donutLabels,

            // Set the dataset
            datasets: [{
                label: 'Home Ownership Type',
                data: donutValues,

                // Set color values for the slices
                backgroundColor: [
                    '#531F7D',
                    '#497D1F',
                    '#FBAF04'
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

//-----------------------------------------------//
//  Function to graph the bar chart for graph 2  //
//-----------------------------------------------//

function loanFundedGraph(oldChart) {
    /**Graphs the number of loans funded by the amounts
     */

    document.getElementById("graph-1").innerHTML = graphGrid1CanvasString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;
    // Define the link to access the data from the Flask API
    let loanFundedString = link + "loan_funded";

    // Get the graph-1-grid element for the graph
    let ctx = document.getElementById('graph-1-grid');

    // Define a new Donut Chart
    barChart = new Chart(ctx, {

        // Bar chart
        type: 'bar',

        // This is where we specify datasets
        data: {},
        options: {
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
                    text: 'Loan Funded Amounts'
                },

                // Don't want to display the legend for the bar chart
                legend: {
                    display: false
                }
            },

            // This is where we configure the axes elements
            scales: {

                // Configurations for y axis
                y: {

                    // Title
                    title: {
                        color: 'black',
                        font: {
                            size: 15
                        },
                        display: true,
                        text: 'Number of Applications'
                    },
                    beginAtZero: true,

                    // y-ticks
                    ticks: {
                        color: 'black'
                    }
                },

                // Configurations for x axis
                x: {

                    // Title
                    title: {
                        color: 'black',
                        font: {
                            size: 15
                        },
                        display: true,
                        text: 'Amount of Loans Funded'
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

    // Access the API for the homeowner type data to plot into the donut chart
    d3.json(loanFundedString).then(data => {

        // Type of home ownership
        barLabels = Object.keys(data);

        // Values for each type
        barValues = Object.values(data);

        // Define the data to be plotted into the donut chart
        barData = {
            // Set the label as home ownership type
            labels: barLabels,

            // Set the dataset
            datasets: [{
                label: 'Loan Funded Amount',
                data: barValues,
                backgroundColor: [
                    '#531F7D',
                    '#497D1F',
                    '#FBAF04',
                    '#ED12EA',
                    '#1ADAE5'
                ]
            }]
        };

        // Update the donut chart
        barChart.data = barData;
        barChart.update();
    })
}

// Initialize Graphs
homeOwnerTypeGraph()

// This is the function called when you click Graph 1 on the side panel
function graph1() {
    homeOwnerTypeGraph()
}

// This is the function called when you click Graph 2 on the side panel
function graph2() {
    loanFundedGraph()
}

// Click event when the side panel options are clicked
document.getElementById("graph-1-panel").addEventListener("click", graph1);
document.getElementById("graph-2-panel").addEventListener("click", graph2);