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

function graph3() {
    // Want only 2 grid elements
    grid2();
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1CanvasString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;

    // Call the functions to fill the grid elements
    openCreditGraph();
}

document.getElementById("graph-3-panel").addEventListener("click", graph3);