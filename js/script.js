const link = "http://127.0.0.1:5000/api/v1/";

// Strings to replace the element inside the grid divs

// You can only plot Chart.js charts on a canvas
// There is a way to add text to canvas but I did not study this yet so when we add text,
// replace the element with a div instead

// This makes it possible to refresh the graphs when you click a different option on the 
// side panel.
const graphGrid1CanvasString = '<canvas id=\"graph-1-grid\"></canvas>';
const graphGrid2CanvasString = '<canvas id=\"graph-2-grid\"></canvas>';
const graphGrid3CanvasString = '<canvas id=\"graph-3-grid\"></canvas>';
const graphGrid4CanvasString = '<canvas id=\"graph-4-grid\"></canvas>';

const graphGrid1TextString = '<div id=\"graph-1-grid-text\"></div>';
const graphGrid2TextString = '<div id=\"graph-2-grid-text\"></div>';

const gridElements2 = '<div class=\"grid-elem\" id=\"graph-1\"></div><div class=\"grid-elem\" id=\"graph-2\"></div>'

const gridElements4 = '<div class=\"grid-elem\" id=\"graph-1\"></div><div class=\"grid-elem\" id=\"graph-2\"></div><div class=\"grid-elem\" id=\"graph-3\"></div><div class=\"grid-elem\" id=\"graph-4\"></div>'

const gridElements6 = '<div class=\"grid-elem\" id=\"graph-5\"></div></div><div class=\"grid-elem\" id=\"graph-6\"></div>'
//-----------------------------------------------//
//  Function to graph the bar chart for graph 1  //
//-----------------------------------------------//

function employmentDurationGraph() {
    /**Graphs the number of employment durations by year */
    // Define the link to access the data from the Flask API
    let employmentDurationString = link + "employment_duration";

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
            indexAxis: 'y',
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
                    text: 'Bank Loan Applications by Duration of Employment'
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
                        text: 'Number of Applicants'
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
                        text: 'Duration of Employment (years)'
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

    // Access the API for the employment duration data to plot into the bar chart
    d3.json(employmentDurationString).then(data => {

        // Type of home ownership
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
                    '#531F7D',
                    '#497D1F',
                    '#FBAF04',
                    '#ED12EA',
                    '#1ADAE5'
                ]
            }]
        };

        // Update the bar chart
        barChart.data = barData;
        barChart.update();
    })
    
}

//-----------------------------------------------//
//  Function to graph the bar chart for graph 1  //
//-----------------------------------------------//

function loanStatusGraph() {
    /** Graphs the loan status donut chart */

    // Define the link to access the data from the Flask API
    // This is the link to the route of the json we want, in this case,
    // the loan status 
    let loanStatusString = link + "loan_status";

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
                    text: 'Loan Status (Defaulters and Non-Defaulters)'
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

    // Access the API for the loan status data to plot into the donut chart
    // We add this to data from the donut chart we created earlier
    d3.json(loanStatusString).then(data => {

        // Type of home ownership
        donutLabels = Object.keys(data);

        // Values for each type
        donutValues = Object.values(data);

        // Define the data to be plotted into the donut chart
        donutData = {
            // Set the label as loan status type
            labels: donutLabels,

            // Set the dataset
            datasets: [{
                label: 'Defaulters and Non-Defaulters',
                data: donutValues,

                // Set color values for the slices
                backgroundColor: [
                    '#1ADAE5',
                    '#531F7D'
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

function loanFundedGraph() {
    /**Graphs the number of loans funded by the amounts */

    // Define the link to access the data from the Flask API
    let loanFundedString = link + "loan_funded";

    // Get the graph-1-grid element for the graph
    let ctx = document.getElementById('graph-1-grid');

    // Define a new bar Chart
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
                    text: 'Bank Loan Applicants by Amount of Loans Funded'
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
                        text: 'Number of Applicants'
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
                        text: 'Amount of Loans Funded ($)'
                    },

                    // We do noSt want to display the x gridlines
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

//-----------------------------------------------//
// Function to graph the donut chart for graph 2 //
//-----------------------------------------------//

function homeOwnerTypeGraph() {
    /** Graphs the home owner type donut chart */

    // Define the link to access the data from the Flask API
    // This is the link to the route of the json we want, in this case,
    // the home ownership types
    let homeOwnerString = link + "home_owner_type";

    // Get the graph-1-grid element for the graph
    // We need to pass this as a param to the Chart
    let ctx = document.getElementById('graph-2-grid');

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
//  Functions to change number of grid elements  //
//-----------------------------------------------//
// This function creates 2 grid elements
function grid2() {
    document.getElementById('grid-container').innerHTML = gridElements2;
}

// This function creates 4 grid elements 
function grid4() {
    document.getElementById('grid-container').innerHTML = gridElements4;
}

// This function creates 4 grid elements 
// function grid6() {
//     document.getElementById('body').innerHTML += '<div class=\"grid-2\"><div class=\"grid-container-2\" id=\"grid-container-2\"></div></div>'
//     document.getElementById('grid-container-1').innerHTML = gridElements4;
//     document.getElementById('grid-container-2').innerHTML = gridElements6;
// }
//---------------------------------------------------------------//
// Function to graph the visualizations when you click the panel //
//---------------------------------------------------------------//
// This is the function called when you click Graph 1 on the side panel
function graph1() {
    // Want only 2 grid elements
    grid2();
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1CanvasString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;

    // Call the functions to fill the grid elements
    loanStatusGraph();
    employmentDurationGraph();
}

// This is the function called when you click Graph 2 on the side panel
function graph2() {
    // Want only 2 grid elements
    grid2();
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1CanvasString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;

    // Call the functions to fill the grid elements
    loanFundedGraph();
    homeOwnerTypeGraph();
}

// Initialize
graph1();
// Click event when the side panel options are clicked
document.getElementById("graph-1-panel").addEventListener("click", graph1);
document.getElementById("graph-2-panel").addEventListener("click", graph2);