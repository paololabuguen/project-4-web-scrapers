// This script is for Model 1 (Raph's Model)

//---------------------------------------------------------//
// Function to show information about the model in model 1 //
//---------------------------------------------------------//

function model1Information() {
    /** Shows info about the Machine Learning Model on the left grid */

    // Define URL string in the API for the data
    graph1String = link + 'raph_training_record';

    // This string is to be added to the inner HTML for the Model information
    // The classes added to the <p> elements are for customization on CSS
    // You can customize font, margins, alignment, etc.
    htmlString = '<h3>Model 1 Analysis - Neural Network Model</h3><hr>';
    htmlString += '<p class=\"model-element\">Hidden Layers: <b>2</b></p>';
    htmlString += '<p class=\"model-element\">Hidden Layer 1 Nodes: <b>100</b></p>';
    htmlString += '<p class=\"model-element\">Hidden Layer 1 Nodes: <b>100</b></p>';
    htmlString += '<p class=\"model-element\">Hidden Layer 1 Activation Function: <b>ReLU</b></p>';
    htmlString += '<p class=\"model-element\">Hidden Layer 2 Activation Function: <b>ReLU</b></p>';
    htmlString += '<p class=\"model-element\">Output Layer Activation Function: <b>Sigmoid</b></p>';
    htmlString += '<p class=\"model-element\">Batch Size: <b>128</b></p>';
    htmlString += '<p class=\"model-element\">Epochs: <b>55</b></p>';
    htmlString += '<p class=\"model-element\">Validation Split: <b>0.2</b></p>';

    // Add to the inner HTML
    document.getElementById("graph-1-grid-text").innerHTML = htmlString;
}

//-------------------------------------------------------------//
// Function to graph the training records colected for model 1 //
//-------------------------------------------------------------//
function model1Graph() {
    // Get the graph-2-grid element for the graph
    // We need to pass this as a param to the Chart
    let ctx = document.getElementById('graph-2-grid');

    // Set up a new Chart.js line graph
    // You can customize the graph here if you'd like
    // The version of Chart.js is 3.9.1 so be careful of documentation
    // Some old posts on stackoverflow might only work for older versions
    lineGraph = new Chart(ctx, {
        type: 'line',

        // Data to add later
        data: {},

        options: {
            // Want the graph to stay inside the div container
            responsive: true,
            maintainAspectRatio: false,

            // This part is for title customization
            // Chart.js kind of has a weird customization process. Try to look at the 
            // documentation if you want to change these
            plugins: {

                // Configurations for the title
                title: {
                    color: 'black',
                    font: {
                        size: 20
                    },
                    display: true,
                    text: 'Training Record'
                },

                // Legends for each of the lines
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },

            scales: {

                // Configurations for y axis
                y: {
                    ticks: {
                        color: 'black'
                    },
                },

                // Configurations for x axis
                x: {

                    // Labels
                    title: {
                        color: 'black',
                        font: {
                            size: 15
                        },
                        display: true,
                        text: 'Epochs'
                    },
                    // We do not want to display the x gridlines
                    grid: {
                        display: false,

                    },

                    ticks: {
                        color: 'black'
                    }
                }
            },
        }
    });

    d3.json(graph1String).then(data => {

        // Retrieving information from dataframe
        // You can look in the API how this JSON is formatted
        // x is just nuber of epochs
        x = [...Array(data['Loss'].length).keys()];
        loss = data['Loss'];
        accuracy = data['Accuracy'];
        val_loss = data['Validation Loss'];
        val_accuracy = data['Validation Accuracy'];

        // Data to be added to the graph
        lineData = {
            // Labels are for the x-tick values
            labels: x,

            // datasets are for the y-values for the line graph
            // The customization for the lines are here as well
            datasets: [
                
            // First data for the line graph
            {
                label: 'Loss',
                data: loss,
                borderWidth: 2,
                borderColor: '#497D1F',
                backgroundColor: '#497D1F',
                tension: 0.3,
                pointRadius: 1
            },

            // Second data for the line graph
            {
                label: 'Accuracy',
                data: accuracy,
                borderWidth: 2,
                borderColor: '#531F7D',
                backgroundColor: '#531F7D',
                tension: 0.3,
                pointRadius: 1
            },

            // Third data for the line graph
            {
                label: 'Validation Loss',
                data: val_loss,
                borderWidth: 2,
                borderColor: '#FBAF04',
                backgroundColor: '#FBAF04',
                tension: 0.3,
                pointRadius: 1
            },

            // Fourth data for the line graph
            {
                label: 'Validation Accuracy',
                data: val_accuracy,
                borderWidth: 2,
                borderColor: '#ED12EA',
                backgroundColor: '#ED12EA',
                tension: 0.3,
                pointRadius: 1
            }]
        }

        // Replace the data from the line chart to the data we just collected
        // Update the graph
        lineGraph.data = lineData;
        lineGraph.update();
    })
}


// Might be 
// This is the function called when you click Model 1 on the side panel
function model1() {
    // Refresh the grid elements
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1TextString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;

    // Call the functions to fill the grid elements
    model1Information();
    model1Graph();
}

// Click event when the side panel options are clicked
document.getElementById("model-1-panel").addEventListener("click", model1);