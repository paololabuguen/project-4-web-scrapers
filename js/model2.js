// This script is for Model 2 (Judsica's Model)

//---------------------------------------------------------//
// Function to show information about the model in model 1 //
//---------------------------------------------------------//

function model2Information() {
    /** Shows info about the Machine Learning Model on the left grid */
    htmlString = '<h3>Model 2 Analysis - Logistic Regression</h3><hr>';
    htmlString += '<p class=\"model-element\">Dropped Columns: <b>5</b></p>';
    htmlString += '<p class=\"model-element\">Grade, Batch Enrolled, Sub Grade, Employment Duration, Application Type</p>';
    htmlString += '<p class=\"model-element\">Random State: <b>1</b></p>';
    htmlString += '<p class=\"model-element\">Balanced Acuracy Score: <b>0.5</b></p><hr>';

    htmlString += '<h3>Confusion Matrix</h3><hr>';

    // Create a table for the data
    htmlString += '<table class=\"model-2-table-cr\" id = \"model-2-table-1\">'

    // Row 1
    htmlString += '<tr class=\"model-2-row\">'
    htmlString += '<td class=\"model-2-table-element-cr\">16031</td>'
    htmlString += '<td class=\"model-2-table-element-cr\">0</td></tr>'

    // Row 2
    htmlString += '<tr class=\"model-2-row\">'
    htmlString += '<td class=\"model-2-table-element-cr\">1561</td>'
    htmlString += '<td class=\"model-2-table-element-cr\">0</td></tr>'

    htmlString += '</table>'

    document.getElementById("graph-1-grid-text").innerHTML = htmlString;
}

function model2ClassificationReport() {

    // Create a string to replace inner html
    tableString = '<h3 class=\"model-2-table-header\">Classification Report</h3><hr>'

    // Create a table for the data
    tableString += '<table class=\"model-2-table\" id = \"model-2-table-1\">'

    // Row 1
    tableString += '<tr class=\"model-2-row\">'
    tableString += '<th class=\"model-2-table-head\"></th>'
    tableString += '<th class=\"model-2-table-head\">Precision</th>'
    tableString += '<th class=\"model-2-table-head\">Recall</th>'
    tableString += '<th class=\"model-2-table-head\">F1-Score</th>'
    tableString += '<th class=\"model-2-table-head\">Support</th></tr>'

    // Row 2
    tableString += '<tr class=\"model-2-row\">'
    tableString += '<td class=\"model-2-table-element\">0</td>'
    tableString += '<td class=\"model-2-table-element\">0.91</td>'
    tableString += '<td class=\"model-2-table-element\">1.00</td>'
    tableString += '<td class=\"model-2-table-element\">0.95</td>'
    tableString += '<td class=\"model-2-table-element\">16031</td></tr>'

    // Row 3
    tableString += '<tr class=\"model-2-row\">'
    tableString += '<td class=\"model-2-table-element\">1</td>'
    tableString += '<td class=\"model-2-table-element\">0.00</td>'
    tableString += '<td class=\"model-2-table-element\">0.00</td>'
    tableString += '<td class=\"model-2-table-element\">0.00</td>'
    tableString += '<td class=\"model-2-table-element\">1561</td></tr>'

    // Row 4
    tableString += '<tr class=\"model-2-row\">'
    tableString += '<td class=\"model-2-table-element\">Accuracy</td>'
    tableString += '<td class=\"model-2-table-element\"></td>'
    tableString += '<td class=\"model-2-table-element\"></td>'
    tableString += '<td class=\"model-2-table-element\">0.91</td>'
    tableString += '<td class=\"model-2-table-element\">17592</td></tr>'

    // Row 5
    tableString += '<tr class=\"model-2-row\">'
    tableString += '<td class=\"model-2-table-element\">Macro Average</td>'
    tableString += '<td class=\"model-2-table-element\">0.46</td>'
    tableString += '<td class=\"model-2-table-element\">0.50</td>'
    tableString += '<td class=\"model-2-table-element\">0.48</td>'
    tableString += '<td class=\"model-2-table-element\">17592</td></tr>'

    // Row 6
    tableString += '<tr class=\"model-2-row\">'
    tableString += '<td class=\"model-2-table-element\">Weighted Average</td>'
    tableString += '<td class=\"model-2-table-element\">0.83</td>'
    tableString += '<td class=\"model-2-table-element\">0.91</td>'
    tableString += '<td class=\"model-2-table-element\">0.87</td>'
    tableString += '<td class=\"model-2-table-element\">17592</td></tr>'

    tableString += '</table>'

    document.getElementById("graph-2-grid-text").innerHTML = tableString;
}

function model2() {
    // Want 4 grid elements
    grid4();
    // Refresh the grid elements
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1TextString;
    document.getElementById("graph-2").innerHTML = graphGrid2TextString;

    // Call the functions to fill the grid elements
    model2Information();
    model2ClassificationReport();
}

// Click event when the side panel options are clicked
document.getElementById("model-2-panel").addEventListener("click", model2);