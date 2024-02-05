import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import statistics

from sklearn.preprocessing import StandardScaler, MinMaxScaler

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

from sklearn.tree import DecisionTreeRegressor, plot_tree

#--------------- Cleaning data ---------------
def cleaning_data(df):
    # Delete duplicates 
    print(df.duplicated().any())
    df = df.drop_duplicates()
    print(df.duplicated().any())

    # Visualise Outliers
    fig, axes = plt.subplots(nrows=1, ncols=4, figsize=(20, 5))

    df[['PRICE']].boxplot(ax=axes[0])
    axes[0].set_title('PRICE')

    df[['BEDS']].boxplot(ax=axes[1])
    axes[1].set_title('BEDS')

    df[['BATH']].boxplot(ax=axes[2])
    axes[2].set_title('BATH')

    df[['PROPERTYSQFT']].boxplot(ax=axes[3])
    axes[3].set_title('PROPERTYSQFT')

    plt.show()

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

    return df

def Matias():
    # Matias' code here
    print('Fonction de Matias exécutée')
    pass

def Manon():
    # Manon's code here
    print('Fonction de Manon exécutée')
    pass

def Tiphaine():
    # Tiphaine's code here
    print('Fonction de Tiphaine exécutée')
    pass

def Julien():
    # Julien's code here
    print('Fonction de Julien exécutée')
    pass

def Minsoo():
    #Minsoo's code here
    print("Minsoo's function is working")
    pass

def main():
    # Ask the user which function to execute
    choix = input("Which function do you want to execute ? (Matias, Manon, Tiphaine, Julien, Minsoo): ")
    
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
    else:
        print("Choice not recognized. Please enter a valid name.")

if __name__ == "__main__":
    try:
        df = pd.read_csv('archive/NY-House-Dataset.csv', sep=',')
        df = cleaning_data(df)
        print(df)
    except FileNotFoundError:
        print("File not found. Please check the path.")
    
    main()

