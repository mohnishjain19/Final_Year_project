from flask import Flask, render_template, request
import joblib
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn import svm
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import pandas as pd

nltk.download('stopwords')
stopset = set(stopwords.words('english'))
stopset_list = list(stopset)  # Convert set to list

app = Flask(__name__)

@app.route('/depression', methods=['POST', 'GET'])
def main():
    df_health = pd.read_csv("depression_text.csv", sep=",")
    y = df_health.Sentiment
    X = df_health.tidy_tweet

    # Vectorize the text data
    cv = CountVectorizer(stop_words=stopset_list)
    X = cv.fit_transform(X)

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

    # Naive Bayes Classifier
    nb_clf = MultinomialNB()
    nb_clf.fit(X_train, y_train)
    nb_accuracy = accuracy_score(y_test, nb_clf.predict(X_test))

    # Random Forest Classifier
    rf_clf = RandomForestClassifier()
    rf_clf.fit(X_train, y_train)
    rf_accuracy = accuracy_score(y_test, rf_clf.predict(X_test))

    # Support Vector Machine Classifier
    svm_clf = svm.SVC()
    svm_clf.fit(X_train, y_train)
    svm_accuracy = accuracy_score(y_test, svm_clf.predict(X_test))

    # Get the model with the highest accuracy
    models = [('Naive Bayes', nb_accuracy), ('Random Forest', rf_accuracy), ('Support Vector Machine', svm_accuracy)]
    models.sort(key=lambda x: x[1], reverse=True)
    best_model_name, best_model_accuracy = models[0]

    if request.method == 'GET':
        return render_template('index.html')
    if request.method == 'POST':
        review = request.form['review']
        test = [review]
        vect = cv.transform(test).toarray()
        nb_prediction = nb_clf.predict(vect)[0]
        rf_prediction = rf_clf.predict(vect)[0]
        svm_prediction = svm_clf.predict(vect)[0]
       
    return render_template('result.html', nb_prediction=nb_prediction, rf_prediction=rf_prediction,
                           svm_prediction=svm_prediction, nb_accuracy=nb_accuracy, rf_accuracy=rf_accuracy,
                           svm_accuracy=svm_accuracy, best_model_name=best_model_name,
                           best_model_accuracy=best_model_accuracy)

if __name__ == '__main__':
  # Run the Flask app
  app.run(
	host='0.0.0.0',
	debug=True,
	port=8000
  )
