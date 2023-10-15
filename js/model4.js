// This script is for Model 2 (Neel's Model)

//---------------------------------------------------------//
// Function to show information about the model in model 3 //
//---------------------------------------------------------//

function model4Information() {
    /** Shows info about the Machine Learning Model on the left grid */
    htmlString = '<h3>Model 4 Analysis - Logistic Regression</h3><hr>';

    /** Shows info about the Logistic Regression Model on the left grid */
    htmlString = '<h3>Model 4 Analysis - Logistic Regression</h3><hr>';

    htmlString += '<table class=\"model-4-table\" id = \"model-4-table-1\">'

    // Row 1
    htmlString += '<tr class=\"model-4-row\">'
    htmlString += '<td class=\"model-4-table-element-info\">Number of dropped Columns</td>'
    htmlString += '<td class=\"model-4-table-element-info\">4 out of 35</td></tr>'

    // Row 2
    htmlString += '<tr class=\"model-4-row\">'
    htmlString += '<td class=\"model-4-table-element-info\">Columns Dropped</td>'
    htmlString += '<td class=\"model-4-table-element-info\">ID, Application Type, Batch Enrolled, Term</td></tr>'

    htmlString += '<tr class=\"model-4-row\">'
    htmlString += '<td class=\"model-4-table-element-info\">Random State</td>'
    htmlString += '<td class=\"model-4-table-element-info\">42</td></tr>'

    htmlString += '<tr class=\"model-4-row\">'
    htmlString += '<td class=\"model-4-table-element-info\">multi_class</td>'
    htmlString += '<td class=\"model-4-table-element-info\">ovr</td></tr>'

    htmlString += '<tr class=\"model-4-row\">'
    htmlString += '<td class=\"model-4-table-element-info\">class_weight</td>'
    htmlString += '<td class=\"model-4-table-element-info\">0 = 0.01, 1 = 0.09</td></tr>'

    htmlString += '<tr class=\"model-4-row\">'
    htmlString += '<td class=\"model-4-table-element-info\">solver</td>'
    htmlString += '<td class=\"model-4-table-element-info\">saga</td></tr>'

    htmlString += '</table>'
    // Confusion Matrix
    htmlString += '<h3>Confusion Matrix</h3><hr>';

    // Create a table for the data
    htmlString += '<table class=\"model-4-table\" id = \"model-4-table-1\">';

    // Row 1
    htmlString += '<tr class=\"model-4-row\">';
    htmlString += '<td class=\"model-4-table-element-cm\">10229</td>';
    htmlString += '<td class=\"model-4-table-element-cm\">2628</td></tr>';

    // Row 2
    htmlString += '<tr class=\"model-4-row\">';
    htmlString += '<td class=\"model-4-table-element-cm\">933</td>';
    htmlString += '<td class=\"model-4-table-element-cm\">284</td></tr>';

    htmlString += '</table>';
    document.getElementById("graph-1-grid-text").innerHTML = htmlString;
}

function model4ClassificationReport() {

    // Create a string to replace inner html
    tableString = '<h3 class=\"model-4-table-header\">Classification Report</h3><hr>';

    // Create a table for the data
    tableString += '<table class=\"model-4-table\" id = \"model-4-table-2\">';

    // Row 1
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<th class=\"model-4-table-head\"></th>';
    tableString += '<th class=\"model-4-table-head\">Precision</th>';
    tableString += '<th class=\"model-4-table-head\">Recall</th>';
    tableString += '<th class=\"model-4-table-head\">F1-Score</th>';
    tableString += '<th class=\"model-4-table-head\">Support</th></tr>';

    // Row 2
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">0</td>';
    tableString += '<td class=\"model-4-table-element\">0.92</td>';
    tableString += '<td class=\"model-4-table-element\">0.80</td>';
    tableString += '<td class=\"model-4-table-element\">0.85</td>';
    tableString += '<td class=\"model-4-table-element\">12857</td></tr>';

    // Row 3
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">1</td>';
    tableString += '<td class=\"model-4-table-element\">0.10</td>';
    tableString += '<td class=\"model-4-table-element\">0.23</td>';
    tableString += '<td class=\"model-4-table-element\">0.14</td>';
    tableString += '<td class=\"model-4-table-element\">1217</td></tr>';

    // Row 4
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">Accuracy</td>';
    tableString += '<td class=\"model-4-table-element\"></td>';
    tableString += '<td class=\"model-4-table-element\"></td>';
    tableString += '<td class=\"model-4-table-element\">0.75</td>';
    tableString += '<td class=\"model-4-table-element\">14074</td></tr>';

    // Row 5
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">Macro Average</td>';
    tableString += '<td class=\"model-4-table-element\">0.51</td>';
    tableString += '<td class=\"model-4-table-element\">0.51</td>';
    tableString += '<td class=\"model-4-table-element\">0.49</td>';
    tableString += '<td class=\"model-4-table-element\">14074</td></tr>';

    // Row 6
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">Weighted Average</td>';
    tableString += '<td class=\"model-4-table-element\">0.85</td>';
    tableString += '<td class=\"model-4-table-element\">0.75</td>';
    tableString += '<td class=\"model-4-table-element\">0.79</td>';
    tableString += '<td class=\"model-4-table-element\">14074</td></tr>';

    tableString += '</table>';

    document.getElementById("graph-2-grid-text").innerHTML = tableString;
}

function model4Prediction() {
    // Create a button
    predictionUrl = link + '/model_4';
    grid3String = '<button type=\"button\" onclick=model4Prediction()>Random Row</button>';

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
        grid3String += '<table class=\"model-4-table\" id = \"model-4-table-2\">';

        for(i=0; i < columnsGrid3.length; i++) {
            grid3String += '<tr class=\"model-4-row\">';
            grid3String += `<td class=\"model-4-table-element\" id=\"model-4-table-left\">${columnsGrid3[i]}</td>`;
            grid3String += `<td class=\"model-4-table-element\">${valuesGrid3[i]}</td></tr>`;
        }
        grid3String += '</table>';
        
        // Grid 4 elements
        grid4String = '<h3>Predictions on Random Row</h3><hr>';
        grid4String += '<table class=\"model-4-table\" id = \"model-4-table-2\">';

        for(i=0; i < columnsGrid4.length; i++) {
            grid4String += '<tr class=\"model-4-row\">';
            grid4String += `<td class=\"model-4-table-element\" id=\"model-4-table-left\">${columnsGrid4[i]}</td>`;
            if (valuesGrid4[i] === 'Non-Defaulter') {
                grid4String += `<td class=\"model-4-table-element\" id=\"non-defaulter\"><b>${valuesGrid4[i]}</b></td></tr>`;
            } 
            else if (valuesGrid4[i] === 'Defaulter'){
                grid4String += `<td class=\"model-4-table-element\" id=\"defaulter\"><b>${valuesGrid4[i]}</b></td></tr>`;
            }
            else {
                grid4String += `<td class=\"model-4-table-element\"><b>${valuesGrid4[i]}</b></td></tr>`;
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

function model4() {
    // Want 4 grid elements
    grid4();
    // Refresh the grid elements
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1TextString;
    document.getElementById("graph-2").innerHTML = graphGrid2TextString;
    document.getElementById("graph-3").innerHTML = graphGrid3TextString;
    document.getElementById("graph-4").innerHTML = graphGrid4TextString;
    // Call the functions to fill the grid elements
    model4Information();
    model4ClassificationReport();
    model4Prediction();
}

// Click event when the side panel options are clicked
document.getElementById("model-4-panel").addEventListener("click", model4);