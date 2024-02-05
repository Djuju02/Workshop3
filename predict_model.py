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

def Matias():
    # Votre code pour Matias ici
    print('Fonction de Matias exécutée')
    pass

def Manon():
    # Votre code pour Manon ici
    print('Fonction de Manon exécutée')
    pass

def Tiphaine():
    # Votre code pour Tiphaine ici
    print('Fonction de Tiphaine exécutée')
    pass

def Julien():
    # Votre code pour Julien ici
    print('Fonction de Julien exécutée')
    pass

def main():
    # Demander à l'utilisateur quelle fonction exécuter
    choix = input("Quelle fonction voulez-vous exécuter ? (Matias, Manon, Tiphaine, Julien): ")
    
    if choix == 'Matias':
        Matias()
    elif choix == 'Manon':
        Manon()
    elif choix == 'Tiphaine':
        Tiphaine()
    elif choix == 'Julien':
        Julien()
    else:
        print("Choix non reconnu. Veuillez entrer un nom valide.")

if __name__ == "__main__":
    # Importation des données dans le bloc principal pour éviter l'exécution lors des importations
    try:
        df = pd.read_csv('archive/NY-House-Dataset.csv', sep=',')
        print(df)
    except FileNotFoundError:
        print("Fichier non trouvé. Veuillez vérifier le chemin.")
    
    main()
