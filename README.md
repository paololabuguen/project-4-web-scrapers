# Project-4-web-scrapers

## Introduction
For this project, we wanted to use machine learning models to predict based off of certain features if a bank loaner will default their loans. 
We have taken a dataset on Kaggle (https://www.kaggle.com/datasets/ankitkalauni/bank-loan-defaulter-prediction-hackathon/data?select=submission.csv) to train and test our machine learning models on.
We decided that we would create 4 different models and present them on an HTML dashboard and kept a few questions in mind:
1) What variables are considered on getting your credit card approved?
2) What ML algorithms are suitable for this problem?

### Table of Contents

1) Data Preprocessing
2) Solution Architecture
3) Model Implementation
4) Dashboard
5) Conclusion
6) Credits

## Requirements
- Python version: 3.11
- Required Libraries:
    - Pandas
    - Tensorflow
    - Sklearn
    - Seaborn
    - Joblib
    - Pickle
    - SQLalchemy
    - Flask

## Description of Sections

### Data Preprocessing
The dataset came separated into train and test datasets. We wanted to create our own dataset from this so, we joined the train and test dataset and selected about 70000 rows from the combined dataset.
The dataset came already cleaned with no empty entries (we're lucky). Two columns had switched titles so we switched them to their proper columns and this was our main dataset (mainDS.csv). Further preprocessing was performed by 
each member doing a machine learning model.

### Solution Architecture
The data we have was imported into an SQLite Database and we used Python Flask to create an API to access this data. We also used Flask to access our machine learning models and test the models with the test data. JavaScript, HTML and CSS
were used to access the API and create the dashboard showing our results.

### Model Implementation
With the model implementation, we had 4 of our group members choose their own machine learning model and used mainDS.csv to train and test their models. We decided to create a neural network model, a random forest model and 2 logistic regression models.
Each member did further preprocessing such as removing columns, binning some columns, creating dummy variables for categorical variables,scaling etc. After the training is done, we exported our models into pickle, joblib and H5 files to be able to be accessed by Flask. 
Details of each machine learning model are shown in our dashboard.

### Dashboard
We decided to create a dashboard in HTML to show the results of our machine learning models. Details about each model are shown as well as some graphs about some columns in the dataset, to show how the distributions of some columns are. We are also able to test each 
model by selecting a random row from the test data, running the model with this row and making a prediction. We then compare the prediction with the actual result.

In order to use the dashboard, run the app.py file under the flask folder. Then, run dashboard.html under the html file.

### Conclusion
In conclusion, we were mostly able to predict non-defaulters than defaulters. Accuracy was around 90% for the neural network model, random forest model and one logistic regression model and 75% for the other logistic regression model. We could improve these models in 
the future by changing certain parameters, optimizing more of the columns and so on.

Some limitations we encountered were optimization; we could've improved accuracy by further preprocessing the data if time permitted and explored different machine learning models. Also, the data lacked much information about defaulters and we believe this affected 
the models predicting defaulters accurately. The dataset could also have recorded more features such as age, type of work, income, vehicle ownership and etc.

### Credits
Group members: Judsica Donbosco, Paolo Labuguen, Raph Caymo, Amjad Abdullah , Neel Patel 
