let link = "http://127.0.0.1:5000/api/v1/";

function homeOwnerTypeGraph(oldChart) {
    /**Graphs the home owner type donut chart and returns the chart
     * 
     * parameter: Chart
     * 
     * We pass this parameter to destroy (if it exists) so we can plot the 
     * new graph taking over its place in the dashboard
     */

    // Define the link to access the data from the Flask API
    // This is the link to the route of the json we want, in this case,
    // the home ownership types
    let homeOwnerString = link + "home_owner_type";

    // Get the graph-1-grid element for the graph
    // We need to pass this as a param to the Chart
    let ctx = document.getElementById('graph-1-grid');

    // Delete the old chart to replace for the new one
    // The new graph would not be plotted if the old chart was not destroyed
    if (oldChart != undefined) {
        oldChart.destroy();
    }

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

    // Return the donut chart
    return donutChart
}


function loanFundedGraph(oldChart) {
    /**Graphs the number of loans funded by the amounts
     * 
     * parameter: Chart
     * 
     * We pass this parameter to destroy (if it exists) so we can plot the 
     * new graph taking over its place in the dashboard
     */

    // Define the link to access the data from the Flask API
    let loanFundedString = link + "loan_funded";

    // Get the graph-1-grid element for the graph
    let ctx = document.getElementById('graph-1-grid');

    // Delete the old chart to replace for the new one
    if (oldChart != undefined) {
        oldChart.destroy();
    }

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

    return barChart
}

// Initialize Graphs
// Notice we save the chart to a variable.
// This is to pass as a parameter back into the function to destroy 
// and create a new chart.
// grid1 is the graph appearing on the left
grid1 = homeOwnerTypeGraph()

// This is the function called when you click Graph 1 on the side panel
function graph1() {
    // Once again, we store the chart into a variable to destroy, if needed to, later
    // Whenever we wanna replace the left visualization, we store it in the
    // variable grid1
    grid1 = homeOwnerTypeGraph(grid1)
}

// This is the function called when you click Graph 2 on the side panel
function graph2() {
    // Once again, we store the chart into a variable to destroy, if needed to, later
    // Whenever we wanna replace the left visualization, we store it in the
    // variable grid1
    grid1 = loanFundedGraph(grid1)
}

// Click event when the side panel options are clicked
document.getElementById("graph-1").addEventListener("click", graph1);
document.getElementById("graph-2").addEventListener("click", graph2);