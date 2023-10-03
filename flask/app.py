# Import Dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

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

# Store the table in a variable
Bank_Loan_Test = Base.classes.bank_loan

# Store column names into a variable
inspector = inspect(Bank_Loan_Test)
column_names = [columns.key for columns in inspector.mapper.column_attrs]

#####################################################
###                   Home Route                  ###
#####################################################
@app.route("/")
def homepage():
    return("Homepage for Project 4 - Web Scrapers API"
           "Available routes:<br/>"
           "/api/v1/home_owner_type (Count of each home ownership type)<br/>"
           "/api/v1/loan_funded (Count of amounts of loans funded by category)<br/>"
           )

# Route for all data in mainDS.csv
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

# Mortgage type distribution route
@app.route("/api/v1/home_owner_type")
def home_owner_type():

    # Object to jsonify
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

# Route for loans funded
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

    # Object to jsonify
    loan_funded_json = {'Less than 5000': results_less_5k[0][0],
                        '5000 - 10000': results_5k_10k[0][0],
                        '10000 - 15000': results_10k_15k[0][0],
                        '15000 - 20000': results_15k_20k[0][0],
                        '20000 - 30000': results_20k_30k[0][0],
                        '30000+': results_30k_plus[0][0]}

    return jsonify(loan_funded_json)

if __name__ == "__main__":
    app.run(debug=True)
