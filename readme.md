# HR Analytics Project

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

Install dependencies with:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn shap
```

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
