# Project-4-web-scrapers
## Judsica Donbosco, Paolo Labuguen, Raph Caymo, Amjad Abdullah, Neel Patel 

## BANK LOANS
### This Project entails the analysis of loan acquisition data and the implementation of different machine learning algorithms to predict the loan acquisition.
### Table of Contents

### Section 1 Data Preprocessing

### Section 2 Model Implementation

### Section 3 Results or Conclusion

## Requirements
- Python version: 3.10
- Required Libraries:
  	- Pandas
 	 - NumPy
       - Sklearn
       - Seaborn
       - Joblib
       - Openpyxl

## To install the required libraries, run:
!pip install openpyxl
Execution Instructions
1. Open the notebook in Jupyter.
2. Ensure all dependencies are installed.
3. Run cells in the specified order.

## Description of Sections

### Section 1 Data Preprocessing

* Read the data file.
* Drop the unnecessary features from the data.
* Investigating the missing values in the data.
* Explore data using different visualization.
* Convert categorical data into numerical by using get dummies function because model works on numerical data.
* Now apply standard scalar to normalize the numerical data for consistency.

### Section 2 Model Implementation

* Perform train test split to split the data into train and test data.
* Now apply Logistic regression model on the train data.
* Save this model using Joblib library.
* Now evaluate the trained model on test data and compute the accuracy of the model.
* After that, Perform the random oversampler on training data to alleviate the class imbalance.
* Again, implement the logistic regression and evaluate the model.

