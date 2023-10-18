# Project-4-web-scrapers
## Judsica Donbosco, Paolo Labuguen, Raph Caymo, Amjad Abdullah, Neel Patel 

## Introduction
For this project, we wanted to use machine learning models to predict based off of certain features if a bank loaner will default their loans. 
We have taken a dataset on Kaggle (https://www.kaggle.com/datasets/ankitkalauni/bank-loan-defaulter-prediction-hackathon/data?select=submission.csv) to train and test our machine learning models on.
We decided that we would create 4 different models and present them on an HTML dashboard and kept a few questions in mind:
1) What variables are considered on getting your credit card approved?
2) Which factor is the most important and has the biggest impact looking at all the demographics?
3) What ML algorithms are suitable for this problem?

### Table of Contents

### Data Preprocessing

### Model Implementation

### Dashboard

### Conclusion

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

### Model Implementation
With the model implementation, we had 4 of our group members choose their own machine learning model and used mainDS.csv to train and test their models. We decided to create a neural network model, a random forest model and 2 logistic regression models.
Each member did further preprocessing such as removing columns, binning some columns, creating dummy variables for categorical variables, etc. Details are shown in our dashboard.

### Dashboard

