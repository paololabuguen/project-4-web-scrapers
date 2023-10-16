// This script is for Model 2 (Amjad's Model)

//---------------------------------------------------------//
// Function to show information about the model in model 3 //
//---------------------------------------------------------//

function model3Information() {
    /** Shows info about the Machine Learning Model on the left grid */
    htmlString = '<h3>Model 3 Analysis - Random Forest</h3><hr>';
    htmlString += '<p class=\"model-element\">For this model, we first did a RandomizedSearchCV for the Random Forest Classifier and found best parameters</p><hr>';
    htmlString += '<p class=\"model-element\"><b>Best Params</b></p>';

    // Table
    htmlString += '<table class=\"model-3-table\" id = \"model-3-table-1\">'

    // Row 1
    htmlString += '<tr class=\"model-3-row\">'
    htmlString += '<td class=\"model-3-table-element\" id=\"model-3-table-left\">n_estimators</td>'
    htmlString += '<td class=\"model-3-table-element\">60</td></tr>'

    // Row 2
    htmlString += '<tr class=\"model-3-row\">'
    htmlString += '<td class=\"model-3-table-element\" id=\"model-3-table-left\">min_samples_split</td>'
    htmlString += '<td class=\"model-3-table-element\">100</td></tr>'

    htmlString += '<tr class=\"model-3-row\">'
    htmlString += '<td class=\"model-3-table-element\" id=\"model-3-table-left\">min_samples_leaf</td>'
    htmlString += '<td class=\"model-3-table-element\">5</td></tr>'

    htmlString += '<tr class=\"model-3-row\">'
    htmlString += '<td class=\"model-3-table-element\" id=\"model-3-table-left\">max_features</td>'
    htmlString += '<td class=\"model-3-table-element\">sqrt</td></tr>'

    htmlString += '<tr class=\"model-3-row\">'
    htmlString += '<td class=\"model-3-table-element\" id=\"model-3-table-left\">max_depth</td>'
    htmlString += '<td class=\"model-3-table-element\">20</td></tr>'

    htmlString += '</table>'

    document.getElementById("graph-1-grid-text").innerHTML = htmlString;
}

function model3ClassificationReport() {

    // Create a string to replace inner html
    tableString = '<h3 class=\"model-3-table-header\">Classification Report</h3><hr>'

    // Create a table for the data
    tableString += '<table class=\"model-3-table\" id = \"model-3-table-2\">'

    // Row 1
    tableString += '<tr class=\"model-3-row\">'
    tableString += '<th class=\"model-3-table-head\"></th>'
    tableString += '<th class=\"model-3-table-head\">Precision</th>'
    tableString += '<th class=\"model-3-table-head\">Recall</th>'
    tableString += '<th class=\"model-3-table-head\">F1-Score</th>'
    tableString += '<th class=\"model-3-table-head\">Support</th></tr>'

    // Row 2
    tableString += '<tr class=\"model-3-row\">'
    tableString += '<td class=\"model-3-table-element\">0</td>'
    tableString += '<td class=\"model-3-table-element\">0.91</td>'
    tableString += '<td class=\"model-3-table-element\">1.00</td>'
    tableString += '<td class=\"model-3-table-element\">0.95</td>'
    tableString += '<td class=\"model-3-table-element\">12857</td></tr>'

    // Row 3
    tableString += '<tr class=\"model-3-row\">'
    tableString += '<td class=\"model-3-table-element\">1</td>'
    tableString += '<td class=\"model-3-table-element\">0.00</td>'
    tableString += '<td class=\"model-3-table-element\">0.01</td>'
    tableString += '<td class=\"model-3-table-element\">0.00</td>'
    tableString += '<td class=\"model-3-table-element\">1217</td></tr>'

    // Row 4
    tableString += '<tr class=\"model-3-row\">'
    tableString += '<td class=\"model-3-table-element\">Accuracy</td>'
    tableString += '<td class=\"model-3-table-element\"></td>'
    tableString += '<td class=\"model-3-table-element\"></td>'
    tableString += '<td class=\"model-3-table-element\">0.91</td>'
    tableString += '<td class=\"model-3-table-element\">14074</td></tr>'

    // Row 5
    tableString += '<tr class=\"model-3-row\">'
    tableString += '<td class=\"model-3-table-element\">Macro Average</td>'
    tableString += '<td class=\"model-3-table-element\">0.96</td>'
    tableString += '<td class=\"model-3-table-element\">0.50</td>'
    tableString += '<td class=\"model-3-table-element\">0.48</td>'
    tableString += '<td class=\"model-3-table-element\">14074</td></tr>'

    // Row 6
    tableString += '<tr class=\"model-3-row\">'
    tableString += '<td class=\"model-3-table-element\">Weighted Average</td>'
    tableString += '<td class=\"model-3-table-element\">0.92</td>'
    tableString += '<td class=\"model-3-table-element\">0.91</td>'
    tableString += '<td class=\"model-3-table-element\">0.87</td>'
    tableString += '<td class=\"model-3-table-element\">14074</td></tr>'

    tableString += '</table>'

    tableString += '<h3>Confusion Matrix</h3><hr>';

    // Create a table for the data
    tableString += '<table class=\"model-3-table\" id = \"model-3-table-1\">'

    // Row 1
    tableString += '<tr class=\"model-3-row\">'
    tableString += '<td class=\"model-3-table-element-cm\">12857</td>'
    tableString += '<td class=\"model-3-table-element-cm">0</td></tr>'

    // Row 2
    tableString += '<tr class=\"model-3-row\">'
    tableString += '<td class=\"model-3-table-element-cm\">1217</td>'
    tableString += '<td class=\"model-3-table-element-cm\">4</td></tr>'

    tableString += '</table>'

    document.getElementById("graph-2-grid-text").innerHTML = tableString;
}

function model3Prediction() {
    // Create a button
    predictionUrl = link + '/model_3';
    grid3String = '<button type=\"button\" onclick=model3Prediction()>Random Row</button>';

    d3.json(predictionUrl).then(data => {
        rowInfo = data.info;
        rowPrediction = data.predict;

        columnsGrid3 = Object.keys(rowInfo);
        valuesGrid3 = Object.values(rowInfo);
        columnsGrid4 = Object.keys(rowPrediction);
        valuesGrid4 = Object.values(rowPrediction);

        if (rowPrediction['Predicted'] === rowPrediction['Actual']) {
            match = true;
        } 
        else {
            match = false;
        }

        grid3String +='<h3>Random Row Information</h3><hr>'
        // Grid 3 elements
        grid3String += '<table class=\"model-3-table\" id = \"model-3-table-2\">';

        for(i=0; i < columnsGrid3.length; i++) {
            grid3String += '<tr class=\"model-3-row\">';
            grid3String += `<td class=\"model-3-table-element\" id=\"model-3-table-left\">${columnsGrid3[i]}</td>`;
            grid3String += `<td class=\"model-3-table-element\">${valuesGrid3[i]}</td></tr>`;
        }
        grid3String += '</table>';
        
        // Grid 4 elements
        grid4String = '<h3>Predictions on Random Row</h3><hr>';
        grid4String += '<table class=\"model-3-table\" id = \"model-3-table-2\">';

        for(i=0; i < columnsGrid4.length; i++) {
            grid4String += '<tr class=\"model-3-row\">';
            grid4String += `<td class=\"model-3-table-element\" id=\"model-3-table-left\">${columnsGrid4[i]}</td>`;

            if (valuesGrid4[i] === 'Non-Defaulter') {
                grid4String += `<td class=\"model-3-table-element\" id=\"non-defaulter\"><b>${valuesGrid4[i]}</b></td></tr>`;
            } 
            else if (valuesGrid4[i] === 'Defaulter'){
                grid4String += `<td class=\"model-3-table-element\" id=\"defaulter\"><b>${valuesGrid4[i]}</b></td></tr>`;
            }
            else {
                grid4String += `<td class=\"model-3-table-element\"><b>${valuesGrid4[i]}</b></td></tr>`;
            }
        }
        grid4String += '</table>';

        if (match) {
            grid4String += '<div><img src=\"../Resources/Images/check.png\" alt="Check Mark" class=\"prediction-image\"></div>';
        }
        else {
            grid4String += '<div><img src=\"../Resources/Images/cross.png\" alt="X mark" class=\"prediction-image\"></div>';
        }
        
    document.getElementById("graph-3-grid-text").innerHTML = grid3String;
    document.getElementById("graph-4-grid-text").innerHTML = grid4String;
    })
    
}

function model3() {
    // Want 4 grid elements
    grid4();
    htmlString = '<button type=\"button\" onclick=model3Prediction()>Random Row</button>';
    // Refresh the grid elements
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1TextString;
    document.getElementById("graph-2").innerHTML = graphGrid2TextString;
    document.getElementById("graph-3").innerHTML = graphGrid3TextString;
    document.getElementById("graph-4").innerHTML = graphGrid4TextString;

    // Call the functions to fill the grid elements
    model3ClassificationReport();
    model3Information();
    model3Prediction();
}

// Click event when the side panel options are clicked
document.getElementById("model-3-panel").addEventListener("click", model3);