# 📊 HR Analytics: Employee Attrition Prediction

<<<<<<< HEAD
## Project Summary

This HR Analytics project analyzes employee attrition data to discover why employees leave and to predict future attrition. The workflow includes data cleaning, exploratory data analysis, feature engineering, model training, and evaluation.

## Objectives

- Understand the main attrition drivers in the HR dataset
- Visualize attrition trends by department, age group, and salary
- Build a reliable attrition prediction model
- Evaluate model performance using classification metrics and threshold analysis
- Provide a clear, repeatable Jupyter Notebook workflow

## Dataset

- `HR_Analytics.csv` — primary HR dataset used in the notebook
- `HR_attrition_data.csv` — cleaned dataset export saved from the notebook (optional)

## Notebook

- `HR-Analytics.ipynb` — contains the full analysis pipeline, including:
  - library imports
  - data loading and inspection
  - cleaning and duplicate removal
  - feature engineering
  - exploratory data analysis (EDA)
  - preprocessing and modeling
  - evaluation and visualization

## What the Notebook Does

1. Loads `HR_Analytics.csv` and inspects the data structure.
2. Drops irrelevant or constant columns: `EmployeeCount`, `EmployeeNumber`, `Over18`, `StandardHours`, and `YearsWithCurrManager`.
3. Removes duplicate rows and checks for missing values.
4. Creates `AgeGroup` categories to analyze attrition by age segment.
5. Visualizes attrition by department, age group, monthly income, and correlation.
6. Builds a preprocessing pipeline with `StandardScaler` and `OneHotEncoder`.
7. Trains a Logistic Regression model using stratified `train_test_split`.
8. Evaluates the model with accuracy, ROC-AUC, F1-score, classification report, and threshold analysis.

## Key Findings

- Most low-information columns were removed to improve model clarity.
- Creating `AgeGroup` helped reveal age-based attrition patterns.
- Attrition distribution was compared across departments and salary levels.
- The notebook evaluates model performance using both ROC-AUC and precision/recall threshold selection.

## Dependencies

- Python 3.8+ recommended
- pandas
- numpy
- matplotlib
- seaborn
- scikit-learn
- shap (optional)
=======
### 🚀 Predict Employee Attrition Before It Happens
An end-to-end Machine Learning and Data analyst project that predicts employee attrition using HR workforce data. The solution combines data analysis, feature engineering, predictive modeling, explainable AI, an interactive dashboard  and webiste to support data-driven HR decision-making.

---

## 🎯 Project Overview
Employee attrition is a critical challenge for organizations as it impacts productivity, recruitment costs, and workforce planning.
This project leverages Machine Learning to identify employees who may be at risk of leaving the organization, enabling HR teams to take proactive retention measures.

### Key Objectives
* Predict employee attrition risk
* Identify factors driving employee turnover
* Generate explainable predictions using SHAP
* Support HR decision-making through interactive analytics
---

## 💼 Resume Highlights
* Built an end-to-end Machine Learning pipeline for employee attrition prediction.
* Performed data cleaning, preprocessing, feature engineering, and exploratory data analysis on HR datasets.
* Developed and evaluated a Logistic Regression classification model using Scikit-Learn.
* Implemented model explainability using SHAP to interpret prediction outcomes.
* Designed an interactive Streamlit dashboard for real-time and batch employee predictions.
* Visualized model performance using ROC Curve, Confusion Matrix, and classification metrics.
* Created a deployable HR Analytics application suitable for business use cases.

---

## 🔍 Machine Learning Workflow
>>>>>>> 55268391f5777f14d7c61a21ec8c6d42c573ed46

### 1. Data Preprocessing

* Missing value handling
* Data transformation
* Feature encoding
* Data scaling

### 2. Exploratory Data Analysis (EDA)

* Attrition trend analysis
* Department-wise employee insights
* Correlation analysis
* Feature distribution visualization

### 3. Feature Engineering

* Selection of relevant predictors
* Data preparation for model training

### 4. Model Development

* Logistic Regression Classifier
* Probability-based predictions
* Model optimization and evaluation

### 5. Explainable AI

* SHAP Summary Plots
* Feature Contribution Analysis
* Individual Prediction Interpretation

---

## 📈 Model Evaluation

Performance evaluation using:

* Accuracy Score
* Precision
* Recall
* F1 Score
* ROC-AUC Score
* Confusion Matrix

---

## 🖥️ Application Features

### Employee Attrition Prediction

Predict whether an employee is likely to leave the organization.

### Batch Prediction

Upload CSV files and generate predictions for multiple employees simultaneously.

### Explainable AI Dashboard

Understand why the model made a prediction using SHAP analysis.

### Performance Analytics

Visualize model effectiveness through evaluation metrics and charts.

---

## 🛠️ Tech Stack

### Languages & Libraries

* Python
* Pandas
* NumPy
* Scikit-Learn
* Matplotlib
* Seaborn

### Deployment
* Website(using React, Typescript...)

### Development Tools
* Jupyter Notebook
* GitHub

---

## 📂 Repository Structure

```text
HR_Analytics/
├── HR_Analytics_website
├── Dashboard.pbix
├── HR_Analytics.csv
├── HR-Analytics.ipynb
├── Model.pkl
└── README.md
```

<<<<<<< HEAD
## How to Run

1. Clone the repository.
2. Ensure the dataset file `HR_Analytics.csv` is in the project root.
3. Open a terminal in the project folder.
4. Run:

```bash
jupyter notebook
```

5. Open `HR-Analytics.ipynb` and execute cells from top to bottom.

## Recommended Improvements

- Add SHAP explainability to interpret feature importance for the Logistic Regression model.
- Compare alternative models such as Decision Tree, Random Forest, or XGBoost.
- Add cross-validation for more stable model assessment.
- Build a Power BI dashboard for interactive HR analysis.
- Expand the dataset with employee engagement, promotion, and performance metrics.

## File Structure

- `HR_Analytics.csv` — raw dataset
- `HR_attrition_data.csv` — cleaned dataset export
- `HR-Analytics.ipynb` — analysis notebook
- `readme.md` — this documentation

## Notes

This project is useful for HR analysts, recruiters, and business stakeholders who need a repeatable analytics workflow for attrition prediction and employee retention strategy.
=======
---
## 🚀 Skills Demonstrated

* Machine Learning
* Predictive Analytics
* Data Cleaning
* Exploratory Data Analysis
* Feature Engineering
* Model Evaluation
* Explainable AI
* Data Visualization
* Website Deployment
* Business Analytics
---

## 👩‍💻 Author
**Nidhi Patel**

Aspiring Data Analyst | Machine Learning Enthusiast
Focused on transforming data into actionable business insights through analytics, visualization, and machine learning.

---

⭐ If you found this project useful, consider giving it a star.
>>>>>>> 55268391f5777f14d7c61a21ec8c6d42c573ed46
