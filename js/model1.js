// This script is for Model 1 (Raph's Model)

// Strings to change the element inside the graph-1-grid and graph-2-grid
// when clicking through the side panel
graphGrid1CanvasString = '<canvas id=\"graph-1-grid\"></canvas>';
graphGrid2CanvasString = '<canvas id=\"graph-2-grid\"></canvas>';
graphGrid1TextString = '<div id=\"graph-1-grid-text\"></div>';
graphGrid2TextString = '<div id=\"graph-2-grid-text\"></div>';

// This function gets called when we click on Model 1 on the side panel
function model1Information() {

    graph1String = link + 'raph_training_record';

    // Refresh the grid elements
    document.getElementById("graph-1").innerHTML = graphGrid1TextString;
    document.getElementById("graph-2").innerHTML = graphGrid2CanvasString;

    // This string is to be added to the inner HTML for the Model information
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

    // Get the graph-2-grid element for the graph
    // We need to pass this as a param to the Chart
    let ctx = document.getElementById('graph-2-grid');

    // Set up a new Chart.js line graph
    lineGraph = new Chart(ctx, {
        type: 'line',
        data: {},
        options: {
            // Want the graph to stay inside the container
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
                    text: 'Training Record'
                },

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
        x = [...Array(data['Loss'].length).keys()];
        loss = data['Loss'];
        accuracy = data['Accuracy'];
        val_loss = data['Validation Loss'];
        val_accuracy = data['Validation Accuracy'];

        lineData = {
            labels: x,
            datasets: [{
                label: 'Loss',
                data: loss,
                borderWidth: 2,
                borderColor: '#497D1F',
                backgroundColor: '#497D1F',
                tension: 0.3,
                pointRadius: 1
            },
            {
                label: 'Accuracy',
                data: accuracy,
                borderWidth: 2,
                borderColor: '#531F7D',
                backgroundColor: '#531F7D',
                tension: 0.3,
                pointRadius: 1
            },
            {
                label: 'Validation Loss',
                data: val_loss,
                borderWidth: 2,
                borderColor: '#FBAF04',
                backgroundColor: '#FBAF04',
                tension: 0.3,
                pointRadius: 1
            },
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
        lineGraph.data = lineData;
        lineGraph.update();
    })

}


// This is the function called when you click Model 1 on the side panel
function model1() {
    model1Information();
}

// Click event when the side panel options are clicked
document.getElementById("model-1-panel").addEventListener("click", model1);