let link = "http://127.0.0.1:5000/api/v1/";

function homeOwnerTypeGraph(oldChart) {
    // Define the link to access the data from the Flask API
    let homeOwnerString = link + "home_owner_type";

    // Get the graph-1-grid element for the graph
    let ctx = document.getElementById('graph-1-grid');

    // Delete the old chart to replace for the new one
    if (oldChart != undefined) {
        oldChart.destroy();
    }

    // Define a new Donut Chart
    donutChart = new Chart(ctx, {

        // Donut type chart
        type: 'doughnut',

        // This is where we specify datasetsS
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

                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },

        }
    })

    // Access the API for the homeowner type data to plot into the donut chart
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
                backgroundColor: [
                    '#531F7D',
                    '#497D1F',
                    '#FBAF04'
                ]
            }]
        };
        
        // Update the donut chart
        donutChart.data = donutData;
        donutChart.update();
    })

    return donutChart
}


function loanFundedGraph(oldChart) {
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


grid1 = homeOwnerTypeGraph()
function graph2() {
    grid1 = loanFundedGraph(grid1)
}
function graph1() {
    grid1 = homeOwnerTypeGraph(grid1)
}

document.getElementById("graph-1").addEventListener("click", graph1);
document.getElementById("graph-2").addEventListener("click", graph2);