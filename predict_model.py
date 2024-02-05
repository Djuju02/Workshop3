import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import statistics

from sklearn.preprocessing import StandardScaler, PolynomialFeatures

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

from sklearn.tree import DecisionTreeRegressor, plot_tree

#--------------- Cleaning data ---------------
def cleaning_data(df):
    # Delete duplicates 
    print(df.duplicated().any())
    df = df.drop_duplicates()
    print(df.duplicated().any())

    # Manage Outliers
    #Outliers for PRICE
    q1 = df['PRICE'].quantile(0.25)
    q3 = df['PRICE'].quantile(0.75)

    IQR = q3 - q1

    max_limit = q3 + (1.5 * IQR)
    min_limit = q1 - (1.5 * IQR) 

    df.loc[df['PRICE'] > max_limit, 'PRICE'] = max_limit
    df.loc[df['PRICE'] < min_limit, 'PRICE'] = min_limit

    #Outliers for BEDS
    q1_beds = df['BEDS'].quantile(0.25)
    q3_beds = df['BEDS'].quantile(0.75)

    IQR_beds = q3_beds - q1_beds

    max_limit_beds = q3_beds + (1.5 * IQR_beds)
    min_limit_beds = q1_beds - (1.5 * IQR_beds)

    df.loc[df['BEDS'] > max_limit_beds, 'BEDS'] = max_limit_beds
    df.loc[df['BEDS'] < min_limit_beds, 'BEDS'] = min_limit_beds

    #Outliers for PROPERTYSQFT
    q1_propertysqft = df['PROPERTYSQFT'].quantile(0.25)
    q3_propertysqft = df['PROPERTYSQFT'].quantile(0.75)

    IQR_propertysqft = q3_propertysqft - q1_propertysqft

    max_limit_propertysqft = q3_propertysqft + (1.5 * IQR_propertysqft)
    min_limit_propertysqft = q1_propertysqft - (1.5 * IQR_propertysqft)

    df.loc[df['PROPERTYSQFT'] > max_limit_propertysqft, 'PROPERTYSQFT'] = max_limit_propertysqft
    df.loc[df['PROPERTYSQFT'] < min_limit_propertysqft, 'PROPERTYSQFT'] = min_limit_propertysqft

    #Outliers for BATH
    q1_bath = df['BATH'].quantile(0.25)
    q3_bath = df['BATH'].quantile(0.75)

    IQR_bath = q3_bath - q1_bath

    max_limit_bath = q3_bath + (1.5 * IQR_bath)
    min_limit_bath = q1_bath - (1.5 * IQR_bath)

    df.loc[df['BATH'] > max_limit_bath, 'BATH'] = max_limit_bath
    df.loc[df['BATH'] < min_limit_bath, 'BATH'] = min_limit_bath

    # Converting the squared feet into squared meters
    df.loc[:, 'PROPERTYSQFT'] = df['PROPERTYSQFT'] * 0.092903

    return df

def Correlation_matrice(df):
    correlation = df[['BEDS', 'PRICE', 'PROPERTYSQFT', 'BATH']].corr()
    plt.figure(figsize=(8, 6))
    sns.heatmap(correlation, annot=True, cmap='coolwarm')
    plt.title('Correlation Matrice')
    plt.show()


#------------Part of Matias------------
def Matias():

    X = df[['BEDS', 'BATH', 'PROPERTYSQFT']]  # Features
    y = df['PRICE']  # Target variable

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    reg = DecisionTreeRegressor(random_state=42)
    reg.fit(X_train, y_train)

    y_pred = reg.predict(X_test)

    mse = mean_squared_error(y_test, y_pred)
    print("Mean Squared Error: ", mse)

def Manon():
    # -------------------- Linear regression --------------------
    X = df[['PROPERTYSQFT']]
    y = df['PRICE']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    #Construction of the model
    model = LinearRegression()
    model.fit(X_train, y_train)

    #Test prediction
    y_pred = model.predict(X_test)

    #Evaluation
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"MSE: {mse}, R2: {r2}")

    # -------------------- Polynomial variation --------------------
    poly = PolynomialFeatures(degree=2)  # Second degree
    X_poly = poly.fit_transform(X)

    X_train_poly, X_test_poly, y_train, y_test = train_test_split(X_poly, y, test_size=0.2, random_state=42)

    #Model construction
    model_poly = LinearRegression()
    model_poly.fit(X_train_poly, y_train)

    # Prediction
    y_pred_poly = model_poly.predict(X_test_poly)

    # Evaluation
    mse_poly = mean_squared_error(y_test, y_pred_poly)
    r2_poly = r2_score(y_test, y_pred_poly)

    print(f"MSE with polynomial characteristics: {mse_poly}, R2: {r2_poly}")

    # The polynomial variation have improved the model (R² higher)
    pass
  
def Tiphaine():
    # Tiphaine's code here
    print('Fonction de Tiphaine exécutée')
    pass

def Julien():
    # Julien's code here
    # -------------------- Decision Tree Regression --------------------
    # Utilisation des mêmes données X et y pour la cohérence
    # Supposons que Julien travaille également avec 'PROPERTYSQFT' pour prédire 'PRICE'
    X = df[['PROPERTYSQFT']]  # Assurez-vous que 'df' est accessible
    y = df['PRICE']

    # Séparation des données en ensembles d'entraînement et de test
    X_train_tree, X_test_tree, y_train_tree, y_test_tree = train_test_split(X, y, test_size=0.2, random_state=42)

    # Construction et entraînement du modèle, etc.
    # ...

    X_train_tree, X_test_tree, y_train_tree, y_test_tree = train_test_split(X, y, test_size=0.2, random_state=42)

    # Construction du modèle d'arbre de décision
    model_tree = DecisionTreeRegressor(random_state=42)
    model_tree.fit(X_train_tree, y_train_tree)

    # Prédiction avec le modèle d'arbre de décision
    y_pred_tree = model_tree.predict(X_test_tree)

    # Evaluation du modèle d'arbre de décision
    mse_tree = mean_squared_error(y_test_tree, y_pred_tree)
    r2_tree = r2_score(y_test_tree, y_pred_tree)

    print(f"MSE with Decision Tree: {mse_tree}, R2: {r2_tree}")

    # Optionnel: Afficher l'arbre de décision
    # Remarque: Pour les grands arbres, cette visualisation peut être difficile à interpréter
    plt.figure(figsize=(20,10))
    plot_tree(model_tree, filled=True, feature_names=['PROPERTYSQFT'], max_depth=3)
    plt.title('Decision Tree - First 3 Levels')
    plt.show()

def Minsoo():
    #Minsoo's code here
    print("Minsoo's function is working")
    pass

def main():
    # Ask the user which function to execute
    choix = input("Which function do you want to execute ? (Matias, Manon, Tiphaine, Julien, Minsoo, corr): ")
    
    if choix == 'Matias':
        Matias()
    elif choix == 'Manon':
        Manon()
    elif choix == 'Tiphaine':
        Tiphaine()
    elif choix == 'Julien':
        Julien()
    elif choix == 'Minsoo':
        Minsoo()
    elif choix == 'corr':
        Correlation_matrice(df)
    else:
        print("Choice not recognized. Please enter a valid name.")

if __name__ == "__main__":
    try:
        df = pd.read_csv('archive/NY-House-Dataset.csv', sep=',')
        df = df.copy()  # Faites une copie du DataFrame pour éviter les modifications sur la vue
        df = cleaning_data(df)  # Appel de la fonction de nettoyage
        print(df)
    except FileNotFoundError:
        print("File not found. Please check the path.")
    
    main()
