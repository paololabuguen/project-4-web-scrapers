# Import Dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import tensorflow
from tensorflow.keras.models import load_model

from pathlib import Path
from sklearn.metrics import balanced_accuracy_score
import random

import pandas as pd

from flask import Flask, jsonify
import json

#####################################################
###                 Database Setup                ###
#####################################################

# Create engine
engine = create_engine("sqlite:///Resources/bank_loan_ml.db")

# Reflect database into new model
Base = automap_base()

# Reflect tables
Base.prepare(autoload_with=engine)

# Create app
app = Flask(__name__)
# Do not sort keys
app.json.sort_keys = False

# Store mainDS table in a variable
Bank_Loan_Test = Base.classes.bank_loan

# Store Raph's Training record table
Raph_Training_record = Base.classes.raph_training_record

# Store column names into a variable
inspector = inspect(Bank_Loan_Test)
column_names = [columns.key for columns in inspector.mapper.column_attrs]

#####################################################
###                   Home Route                  ###
#####################################################
@app.route("/")
def homepage():
    return("Homepage for Project 4 - Web Scrapers API<br/>"
           "Available routes:<br/>"
           "/api/v1/all_data (All data in mainDS.csv)<br/>"
           "/api/v1/loan_status (Number of defaulters and non-defaulters)<br/>"
           "/api/v1/home_owner_type (Count of each home ownership type)<br/>"
           "/api/v1/loan_funded (Count of amounts of loans funded by category)<br/>"
           "/api/v1/employment_duration (Counts of employment duration of applicants)<br/>"
           "/api/v1/open_credit_line<br/>"
           "/api/v1/raph_training_record (Raph's Training Record Dataframe)<br/>"
           "/api/v1/model_1 <br/>"
           )

#####################################################
###       Route for all data in mainDS.csv        ###
#####################################################
@app.route("/api/v1/all_data")
def all_data():
    # getattr of columns for Bank_Loan_Test to pass to the query
    columns = [getattr(Bank_Loan_Test, column) for column in column_names]

    # Query all results
    session = Session(engine)
    results = session.query(*columns).all()
    session.close()

    # List to jsonify
    all_test_data = []

    for row in results:

        # Dictionary for each row where keys are the column names 
        row_dict = {}
        for i in range(len(row)):
            row_dict[column_names[i]] = row[i]
        all_test_data.append(row_dict)
    
    return jsonify(all_test_data)


#####################################################
###     Home ownership type distribution route    ###
#####################################################
@app.route("/api/v1/home_owner_type")
def home_owner_type():

    # Dictionary to jsonify
    mortgage_dict = {}

    # Query the count of each home_ownership type
    session = Session(engine)
    results = session.query(func.count(Bank_Loan_Test.home_ownership),
                            Bank_Loan_Test.home_ownership)\
        .group_by(Bank_Loan_Test.home_ownership)\
        .all()
    session.close()

    # Add the data to the dictionary where keys are teh home ownership type and the values are the count
    for row in results:
        mortgage_dict[row[1].lower().capitalize()] = row[0]

    return jsonify(mortgage_dict)


#####################################################
###            Route for loans funded             ###
#####################################################
@app.route("/api/v1/loan_funded")
def loan_funded():
    
    # Query the counts of loans funded from <5k, 5k-10k, 10k-20k, 20k-30k and >30k
    session = Session(engine)

    results_less_5k = session.query(func.count(Bank_Loan_Test.funded_amount))\
        .where(Bank_Loan_Test.funded_amount < 5000)\
        .all()

    results_5k_10k = session.query(func.count(Bank_Loan_Test.funded_amount))\
        .filter(Bank_Loan_Test.funded_amount < 10000 )\
        .filter(Bank_Loan_Test.funded_amount >= 5000)\
        .all()
    
    results_10k_15k = session.query(func.count(Bank_Loan_Test.funded_amount))\
        .filter(Bank_Loan_Test.funded_amount < 15000 )\
        .filter(Bank_Loan_Test.funded_amount >= 10000)\
        .all()
    
    results_15k_20k = session.query(func.count(Bank_Loan_Test.funded_amount))\
        .filter(Bank_Loan_Test.funded_amount < 20000 )\
        .filter(Bank_Loan_Test.funded_amount >= 15000)\
        .all()
    
    results_20k_30k = session.query(func.count(Bank_Loan_Test.funded_amount))\
        .filter(Bank_Loan_Test.funded_amount < 30000 )\
        .filter(Bank_Loan_Test.funded_amount >= 20000)\
        .all()
    
    results_30k_plus = session.query(func.count(Bank_Loan_Test.funded_amount))\
        .filter(Bank_Loan_Test.funded_amount >= 30000)\
        .all()
    
    session.close()

    # Dictionary to jsonify
    loan_funded_json = {'Less than 5000': results_less_5k[0][0],
                        '5000 - 10000': results_5k_10k[0][0],
                        '10000 - 15000': results_10k_15k[0][0],
                        '15000 - 20000': results_15k_20k[0][0],
                        '20000 - 30000': results_20k_30k[0][0],
                        '30000+': results_30k_plus[0][0]}

    return jsonify(loan_funded_json)

#####################################################
###         Route for Employment Duration         ###
#####################################################
@app.route("/api/v1/employment_duration")
def employment_duration():

    # Object for the data to be returned as a JSON
    employment_duration_json = {}
    
    # Query the employment duration and their counts
    session = Session(engine)
    # Less than 30 years
    results_less_30 = session.query(Bank_Loan_Test.employment_duration, func.count(Bank_Loan_Test.employment_duration))\
        .filter(Bank_Loan_Test.employment_duration <= 30)\
        .group_by(Bank_Loan_Test.employment_duration)\
        .all()
    # More than 30 years
    results_more_30 = session.query(func.count(Bank_Loan_Test.employment_duration))\
        .filter(Bank_Loan_Test.employment_duration > 30)\
        .all()
    
    session.close()

    # List of employment duration and list of their counts
    emp_duration = [dur[0] for dur in results_less_30]
    emp_duration.append('30+')
    emp_duration_count = [count[1] for count in results_less_30]

    for row in results_more_30:
        emp_duration_count.append(row[0])

    # Add to employment_duration_json where the key is years of employment and 
    # values are their counts
    for i in range(len(emp_duration)):
        employment_duration_json[emp_duration[i]] = emp_duration_count[i]
    
    return jsonify(employment_duration_json)

#####################################################
###             Route for Loan Status             ###
#####################################################
@app.route("/api/v1/loan_status")
def loan_status():

    # Object for the data to be returned as a JSON
    loan_status_json = {}
    
    # Query the loan status and their counts
    session = Session(engine)
    results = session.query(Bank_Loan_Test.loan_status, func.count(Bank_Loan_Test.loan_status))\
        .group_by(Bank_Loan_Test.loan_status)\
        .all()
    session.close()

    # List of loan status and list of their counts
    loan_status = [stat[0] for stat in results]
    loan_status_count = [count[1] for count in results]

    # Add to loan_status_json where the key is the loan status and 
    # values are their counts
    for i in range(len(loan_status)):
        if loan_status[i] == 1:
            loan_status_json["Defaulters"] = loan_status_count[i]
        else:
            loan_status_json["Non-defaulters"] = loan_status_count[i]
    
    return jsonify(loan_status_json)


#####################################################
###             Route for Loan Status             ###
#####################################################
@app.route("/api/v1/open_credit_line")
def open_credit_line():
    # Object for the data to be returned as a JSON
    open_credit_json = {}

    # Query the open credit line and their counts
    session = Session(engine)
    results = session.query(Bank_Loan_Test.open_account, func.count(Bank_Loan_Test.open_account))\
        .group_by(Bank_Loan_Test.open_account)\
        .all()
    session.close()
    # List of loan status and list of their counts
    open_credit = [stat[0] for stat in results]
    open_credit_count = [count[1] for count in results]

    # Add to loan_status_json where the key is the loan status and 
    # values are their counts
    for i in range(len(open_credit)):
        open_credit_json[open_credit[i]] = open_credit_count[i]
    
    return jsonify(open_credit_json)

#####################################################
###        Route for Model 1 h5 Prediction        ###
#####################################################
@app.route("/api/v1/model_1")
def model_1():
    # Links for the data
    model_1_link = 'Resources/Raph_Model_Files/Saved_Models/raph-model.h5'
    X_test_link = 'Resources/Raph_Model_Files/Splits/X_test.csv'
    y_test_link = 'Resources/Raph_Model_Files/Splits/y_test.csv'

    prediction_id = {0: "Non-Defaulter", 1: "Defaulter"}
    # Create separate dataframes for the X_test and y_test
    X_test = pd.read_csv(Path(X_test_link))
    y_test = pd.read_csv(Path(y_test_link))

    # Generate a random index
    random_row = X_test.sample()
    random_index = random_row.index

    # Load the model
    model = load_model(model_1_link)

    # # Make predictions to a random rown and X_test
    prediction_row = model.predict(random_row)
    prediction = model.predict(X_test)

    # Balanced Accuracy score
    score = balanced_accuracy_score(y_test, prediction)

    y_test.iloc[random_index, 0].values[0]
    # Dictionary to jsonify
    score_json = {'Row Number on Test Dataframe': int(random_index[0]), 'Predicted': prediction_id[int(prediction_row[0][0])], 'Actual': prediction_id[int(y_test.iloc[random_index,0].values[0])],
              'Balanced Accuracy Score': float(score)}

    return jsonify(score_json)

#####################################################
###        Route for Model 2 h5 Prediction        ###
#####################################################
# @app.route("/api/v1/model_2")
# def model_2():
#     # Links for the data
#     model_2_link = 'Resources/Amjad_Files/random_forest_model.h5'
#     X_test_link = 'Resources/Amjad_Files/X_test.csv'
#     y_test_link = 'Resources/Amjad_Files/y_test.csv'

#     prediction_id = {0: "Non-Defaulter", 1: "Defaulter"}
#     # Create separate dataframes for the X_test and y_test
#     X_test = pd.read_csv(Path(X_test_link))
#     y_test = pd.read_csv(Path(y_test_link))

#     # Generate a random index
#     random_row = X_test.sample()
#     random_index = random_row.index

#     # Load the model
#     model = load_model(model_2_link)

#     # # Make predictions to a random rown and X_test
#     prediction_row = model.predict(random_row)
#     prediction = model.predict(X_test)
    
#     # Balanced Accuracy score
#     score = balanced_accuracy_score(y_test, prediction)

#     y_test.iloc[random_index, 0].values[0]
#     # Dictionary to jsonify
#     score_json = {'Row Number on Test Dataframe': int(random_index[0]), 'Predicted': prediction_id[int(prediction_row[0][0])], 'Actual': prediction_id[int(y_test.iloc[random_index,0].values[0])],
#                 'Balanced Accuracy Score': float(score)}

#     return jsonify(score_json)

#####################################################
###      Route for Raph's Training record csv     ###
#####################################################
@app.route("/api/v1/raph_training_record")
def raph_training_record():

    # Dictionary for the data to be returned as a JSON
    raph_train_results_json = {}

    # Query all results
    session = Session(engine)
    results_loss = session.query(Raph_Training_record.loss).all()
    results_accuracy = session.query(Raph_Training_record.accuracy).all()
    results_val_loss = session.query(Raph_Training_record.val_loss).all()
    results_val_accuracy = session.query(Raph_Training_record.val_accuracy).all()
    session.close()

    # Save each column into a variable
    loss = [elem[0] for elem in results_loss]
    accuracy = [elem[0] for elem in results_accuracy]
    val_loss = [elem[0] for elem in results_val_loss]
    val_accuracy = [elem[0] for elem in results_val_accuracy]

    # Define the key value pairs for the JSON
    raph_train_results_json['Loss'] = loss
    raph_train_results_json['Accuracy'] = accuracy
    raph_train_results_json['Validation Accuracy'] = val_accuracy
    raph_train_results_json['Validation Loss'] = val_loss

    return jsonify(raph_train_results_json)

    
if __name__ == "__main__":
    app.run(debug=True)
    
