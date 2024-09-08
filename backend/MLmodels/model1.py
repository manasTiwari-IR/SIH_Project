#!/usr/bin/env python
# coding: utf-8

# In[111]:


#Om Shri Ganeshaya Namah


# In[112]:


import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import TruncatedSVD
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV, cross_val_score


# In[113]:


df = pd.read_csv('../backend/MLmodels/coursera_course_dataset_v3.csv')


# In[114]:


df.head()


# In[115]:


df.isnull().sum()


# In[116]:


columns_to_drop = ['Difficulty', 'course_description', 'Type','course_students_enrolled']
df = df.drop(columns=columns_to_drop)


# In[117]:


df.head()


# In[118]:


df.isnull().sum() #treated null values


# In[119]:


from sklearn.feature_extraction.text import CountVectorizer
df['Skills'] = df['Skills'].apply(lambda x: ' '.join(x.split(', ')))
df.head()


# In[120]:


# Initialize CountVectorizer
vectorizer = CountVectorizer()
# Fit and transform the skills into vectors
X = vectorizer.fit_transform(df['Skills']).toarray()


# In[121]:


# Check the shape of the resulting vectors
print(X.shape)


# In[122]:


y = df['Title']


# In[123]:


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(X_train.shape, X_test.shape)


# In[124]:


from sklearn.neighbors import NearestNeighbors
knn = NearestNeighbors(n_neighbors=10, metric='cosine')
knn.fit(X_train)


# In[125]:


# In[126]:


def recommend_courses(user_skills, knn, y_train,urls,ratings,review_count,duration):
    #This function takes user skills, finds the nearest neighbors using the KNN model, and returns 
    #the top 10 recommended courses.
    #:param user_skills: List of skills selected by the user
    #:param model: Trained Word2Vec model
    #:param knn: Trained NearestNeighbors model
    #:param y_train: Training set course titles
    #:return: List of top 5 recommended courses
    # Vectorize the user input skills
    user_vector = vectorizer.transform([' '.join(user_skills)]).toarray()
    distances, indices = knn.kneighbors(user_vector)
    # Get the corresponding course titles for the top 10 recommendations
    recommended_courses = [(y_train.iloc[i], urls.iloc[i],ratings.iloc[i],review_count.iloc[i],duration.iloc[i])  for i in indices[0]]
    for i, (course, url,ratings,review_count,duration) in enumerate(recommended_courses, 1):
        print(f"{i}. {course}")
        print(f"   URL: {url}")
        print(f"   Ratings: {ratings}")
        print(f"   Review Count: {review_count}")
        print(f"   Duration: {duration}")
    return recommended_courses


# In[127]:


from flask import Flask, request, jsonify


# In[128]:



# In[129]:


app = Flask(__name__)
# Assume you've loaded the KNN model and word2vec model already
@app.route('/predictcourses', methods=['POST'])
def predict():
    data = request.json
    urls = df['course_url']
    ratings=df['Ratings']
    review_count=df['Review Count']
    duration=df['Duration']
    user_skills = data['skills']
    user_vector = vectorizer.transform([' '.join(user_skills)]).toarray()
    # Predict top 10 courses
    distances, indices = knn.kneighbors(user_vector.reshape(1, -1))
    # Fetch the top 10 course titles and URLs
    recommended_courses = [{"Course_Title":y_train.iloc[i], "URL":urls.iloc[i], "Ratings":ratings.iloc[i],"Review_Count":review_count.iloc[i],"Duration":duration.iloc[i]} for i in indices[0]]
    # Return predictions as JSON
    return jsonify(recommended_courses)
if __name__ == '__main__':
    app.run(port=7000, debug=True)


# In[ ]:




