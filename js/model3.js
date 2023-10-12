// This script is for Model 2 (Amjad's Model)

//---------------------------------------------------------//
// Function to show information about the model in model 3 //
//---------------------------------------------------------//

function model3Information() {
    /** Shows info about the Machine Learning Model on the left grid */
    htmlString = '<h3>Model 3 Analysis - Random Forest</h3><hr>';
    htmlString += '<p class=\"model-element\">First, we did a RandomizedSearchCV for the RandomForestClassifier and found best parameters</p><hr>';
    htmlString += '<p class=\"model-element\"><b>Best Params</b></p>';
    // htmlString += '<p class=\"model-element\">n_estimators: <b>60</b></p>';
    // htmlString += '<p class=\"model-element\">min_samples_split: <b>100</b></p>';
    // htmlString += '<p class=\"model-element\">min_samples_leaf: <b>5</b></p>';
    // htmlString += '<p class=\"model-element\">max_features: <b>sqrt</b></p>';
    // htmlString += '<p class=\"model-element\">max_depth: <b>20</b></p><hr>';
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
            grid4String += `<td class=\"model-3-table-element\">${valuesGrid4[i]}</td></tr>`;
        }
        grid4String += '</table>';

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
    model3Information();
    model3Prediction();
}

// Click event when the side panel options are clicked
document.getElementById("model-3-panel").addEventListener("click", model3);