// This script is for Model 2 (Neel's Model)

//---------------------------------------------------------//
// Function to show information about the model in model 3 //
//---------------------------------------------------------//

function model4Information() {
    /** Shows info about the Machine Learning Model on the left grid */
    htmlString = '<h3>Model 4 Analysis - Logistic Regression</h3><hr>';

    // Confusion Matrix
    htmlString += '<h3>Confusion Matrix</h3><hr>';

    // Create a table for the data
    htmlString += '<table class=\"model-4-table\" id = \"model-4-table-1\">';

    // Row 1
    htmlString += '<tr class=\"model-4-row\">';
    htmlString += '<td class=\"model-4-table-element-cm\">7174</td>';
    htmlString += '<td class=\"model-4-table-element-cm\">5683</td></tr>';

    // Row 2
    htmlString += '<tr class=\"model-4-row\">';
    htmlString += '<td class=\"model-4-table-element-cm\">645</td>';
    htmlString += '<td class=\"model-4-table-element-cm\">572</td></tr>';

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
    tableString += '<td class=\"model-4-table-element\">0.56</td>';
    tableString += '<td class=\"model-4-table-element\">0.69</td>';
    tableString += '<td class=\"model-4-table-element\">12857</td></tr>';

    // Row 3
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">1</td>';
    tableString += '<td class=\"model-4-table-element\">0.09</td>';
    tableString += '<td class=\"model-4-table-element\">0.47</td>';
    tableString += '<td class=\"model-4-table-element\">0.15</td>';
    tableString += '<td class=\"model-4-table-element\">1217</td></tr>';

    // Row 4
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">Accuracy</td>';
    tableString += '<td class=\"model-4-table-element\"></td>';
    tableString += '<td class=\"model-4-table-element\"></td>';
    tableString += '<td class=\"model-4-table-element\">0.55</td>';
    tableString += '<td class=\"model-4-table-element\">14074</td></tr>';

    // Row 5
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">Macro Average</td>';
    tableString += '<td class=\"model-4-table-element\">0.50</td>';
    tableString += '<td class=\"model-4-table-element\">0.51</td>';
    tableString += '<td class=\"model-4-table-element\">0.42</td>';
    tableString += '<td class=\"model-4-table-element\">14074</td></tr>';

    // Row 6
    tableString += '<tr class=\"model-4-row\">';
    tableString += '<td class=\"model-4-table-element\">Weighted Average</td>';
    tableString += '<td class=\"model-4-table-element\">0.85</td>';
    tableString += '<td class=\"model-4-table-element\">0.55</td>';
    tableString += '<td class=\"model-4-table-element\">0.65</td>';
    tableString += '<td class=\"model-4-table-element\">14074</td></tr>';

    tableString += '</table>';

    document.getElementById("graph-2-grid-text").innerHTML = tableString;
}

function model4() {
    // Want 4 grid elements
    grid4();
    // Refresh the grid elements
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1TextString;
    document.getElementById("graph-2").innerHTML = graphGrid2TextString;

    // Call the functions to fill the grid elements
    model4Information();
    model4ClassificationReport();
}

// Click event when the side panel options are clicked
document.getElementById("model-4-panel").addEventListener("click", model4);