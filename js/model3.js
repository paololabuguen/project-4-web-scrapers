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

function model3() {
    // Want 4 grid elements
    grid4();
    // Refresh the grid elements
    // Replacing the inner HTML makes it possible to change the items contained in the
    // grid to the new items from this model
    document.getElementById("graph-1").innerHTML = graphGrid1TextString;
    document.getElementById("graph-2").innerHTML = graphGrid2TextString;

    // Call the functions to fill the grid elements
    model3Information();
}

// Click event when the side panel options are clicked
document.getElementById("model-3-panel").addEventListener("click", model3);