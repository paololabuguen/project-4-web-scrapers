// This script is for Model 1 (Raph's Model)

//---------------------------------------------------------//
// Function to show information about the model in model 1 //
//---------------------------------------------------------//

function model1Information() {
    /** Shows info about the Machine Learning Model on the left grid */

    // This string is to be added to the inner HTML for the Model information
    // The classes added to the <p> elements are for customization on CSS
    // You can customize font, margins, alignment, etc.
    tableString = '<h3>Model 1 Analysis - Neural Network Model</h3><hr>';

    // Create a table for the data
    tableString += '<table class=\"model-1-table\" id = \"model-1-table-1\">'

    // Row 1
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Hidden Layers</td>'
    tableString += '<td class=\"model-1-table-element\">2</td></tr>'

    // Row 2
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Hidden Layer 1 Nodes</td>'
    tableString += '<td class=\"model-1-table-element\">100</td></tr>'

    // Row 3
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Hidden Layer 2 Nodes</td>'
    tableString += '<td class=\"model-1-table-element\">100</td></tr>'

    // Row 4
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Hidden Layer 1 Activation Function</td>'
    tableString += '<td class=\"model-1-table-element\">ReLU</td></tr>'

    // Row 5
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Hidden Layer 2 Activation Function</td>'
    tableString += '<td class=\"model-1-table-element\">ReLU</td></tr>'

    // Row 6
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Output Layer Activation Function</td>'
    tableString += '<td class=\"model-1-table-element\">Sigmoid</td></tr>'

    // Row 7
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Batch Size</td>'
    tableString += '<td class=\"model-1-table-element\">32</td></tr>'

    // Row 7
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Epochs</td>'
    tableString += '<td class=\"model-1-table-element\">60</td></tr>'

    // Row 7
    tableString += '<tr class=\"model-1-row\">'
    tableString += '<td class=\"model-1-table-element\" id=\"model-1-table-left\">Validation Split</td>'
    tableString += '<td class=\"model-1-table-element\">0.2</td></tr>'

    tableString += '</table>'
    // Add to the inner HTML
    document.getElementById("graph-1-grid-text").innerHTML = tableString;
}

//-------------------------------------------------------------//
// Function to graph the training records colected for model 1 //
//-------------------------------------------------------------//
function model1Graph() {
    // Define URL string in the API for the data
    let graph1String = link + 'raph_training_record';

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
                }]
        }

        // Replace the data from the line chart to the data we just collected
        // Update the graph
        lineGraph.data = lineData;
        lineGraph.update();
    })
}

function model2Graph() {
    // Define URL string in the API for the data
    let graph2String = link + 'raph_training_record';

    // We need to pass this as a param to the Chart
    let ctx = document.getElementById('graph-4-grid');

    // Set up a new Chart.js line graph
    // You can customize the graph here if you'd like
    // The version of Chart.js is 3.9.1 so be careful of documentation
    // Some old posts on stackoverflow might only work for older versions
    lineGraph2 = new Chart(ctx, {
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

    d3.json(graph2String).then(data => {

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
        lineGraph2.data = lineData;
        lineGraph2.update();
    })
}

function model1Prediction() {
    // Create a button
    predictionUrl = link + '/model_1';
    grid3String = '<button type=\"button\" onclick=model1Prediction()>Random Row</button>';

    d3.json(predictionUrl).then(data => {
        rowInfo = data.info;
        rowPrediction = data.predict;

        columnsGrid3 = Object.keys(rowInfo);
        valuesGrid3 = Object.values(rowInfo);
        columnsGrid4 = Object.keys(rowPrediction);
        valuesGrid4 = Object.values(rowPrediction);

        // Grid 4 elements
        grid3String += '<h3>Predictions on Random Row</h3><hr>';
        grid3String += '<table class=\"model-2-table\" id = \"model-2-table-2\">';

        for (i = 0; i < columnsGrid4.length; i++) {
            grid3String += '<tr class=\"model-2-row\">';
            grid3String += `<td class=\"model-2-table-element\" id=\"model-2-table-left\">${columnsGrid4[i]}</td>`;
            grid3String += `<td class=\"model-2-table-element\">${valuesGrid4[i]}</td></tr>`;
        }
        grid3String += '</table>';

        grid3String +='<h3>Random Row Information</h3><hr>'
        
        // Grid 3 elements
        grid3String += '<table class=\"model-1-table\" id = \"model-1-table-1\">';

        for (i = 0; i < columnsGrid3.length; i++) {
            grid3String += '<tr class=\"model-2-row\">';
            grid3String += `<td class=\"model-2-table-element\" id=\"model-2-table-left\">${columnsGrid3[i]}</td>`;
            grid3String += `<td class=\"model-2-table-element\">${valuesGrid3[i]}</td></tr>`;
        }
        grid3String += '</table>';


        document.getElementById("graph-3-grid-text").innerHTML = grid3String;
        // document.getElementById("graph-4-grid-text").innerHTML = grid4String;
    })
}

// This is the function called when you click Model 1 on the side panel
function model1() {
    // Want 4 grid elements
    grid4();
    htmlString = '<button type=\"button\" onclick=model1Prediction()>Random Row</button>';
    // Refresh the grid elements
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1TextString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;
    document.getElementById("graph-3").innerHTML = graphGrid3TextString;
    document.getElementById("graph-4").innerHTML = graphGrid4CanvasString;

    document.getElementById("graph-3-grid-text").innerHTML = htmlString;
    // Call the functions to fill the grid elements
    model1Information();
    model1Graph();
    model2Graph();
    model1Prediction();
}

// Click event when the side panel options are clicked
document.getElementById("model-1-panel").addEventListener("click", model1);