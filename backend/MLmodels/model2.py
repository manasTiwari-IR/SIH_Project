#!/usr/bin/env python
# coding: utf-8

# In[1]:


#Om Shri Ganeshaya Namah


# In[2]:


import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import TruncatedSVD
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV, cross_val_score


# In[3]:


df = pd.read_csv('../backend/MLmodels/coursera_course_dataset_v3.csv')


# In[4]:


df.head()


# In[5]:


df.isnull().sum()


# In[6]:


df = df[df['course_url'].notna()]


# In[7]:


columns_to_drop = ['course_students_enrolled', 'course_description', 'Review Count', 'Difficulty', 'Type', 'Duration']
df = df.drop(columns=columns_to_drop)


# In[8]:


df.head()


# In[9]:


df.isnull().sum() #treated null values


# In[10]:


# Assuming 'Skills' column contains comma-separated lists of skills
df['Skills'] = df['Skills'].apply(lambda x: x.split(', '))

# Check the first few rows
df.head()


# In[11]:


from gensim.models import Word2Vec


# In[12]:


# Train Word2Vec model on the skills column (which contains lists of skills)
model = Word2Vec(sentences=df['Skills'], vector_size=100, window=5, min_count=1, sg=0)

# Check the vocabulary size
print(f"Vocabulary size: {len(model.wv)}")


# In[13]:


# Function to calculate the average Word2Vec vector for a list of skills
def get_mean_vector(words, model, num_features):
    # Filter out words that are not in the model vocabulary
    words = [word for word in words if word in model.wv.index_to_key]
    
    if len(words) >= 1:
        # Calculate the mean of the word vectors for the given skills
        return np.mean([model.wv[word] for word in words], axis=0)
    else:
        # Return a zero vector if none of the words are in the vocabulary
        return np.zeros(num_features)

# Apply the vectorization to the 'Skills' column
X = np.array([get_mean_vector(skills, model, 100) for skills in df['Skills']])

# Check the shape of the resulting vectors
print(X.shape)


# In[14]:


y = df['Title']


# In[15]:


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(X_train.shape, X_test.shape)


# In[16]:


from sklearn.neighbors import NearestNeighbors
knn = NearestNeighbors(n_neighbors=20, metric='cosine')
knn.fit(X_train)


# In[17]:


# Get the top 10 nearest neighbors for each test sample
distances, indices = knn.kneighbors(X_test)

# Retrieve the corresponding course titles from y_train
recommended_courses = np.array([y_train.iloc[i] for i in indices])

# Check the shape of the recommended courses (should be: number of test samples, 5)
print(recommended_courses.shape)


# In[18]:


def vectorize_user_input(skills, model, num_features=100):

    #This function takes a list of skills as input, vectorizes them using the trained Word2Vec model,
    #and returns the average vector representation.
    #:param skills: List of user input skills
    #:param model: Trained Word2Vec model
    #:param num_features: The number of features for the Word2Vec model (default is 100)
    #:return: The average vector representation of the input skills
    # Vectorize the input skills using the Word2Vec model
    return get_mean_vector(skills, model, num_features)

def recommend_courses(user_skills, model, knn, y_train,urls):
    #This function takes user skills, finds the nearest neighbors using the KNN model, and returns 
    #the top 10 recommended courses.
    #:param user_skills: List of skills selected by the user
    #:param model: Trained Word2Vec model
    #:param knn: Trained NearestNeighbors model
    #:param y_train: Training set course titles
    #:return: List of top 5 recommended courses
    # Vectorize the user input skills
    user_vector = vectorize_user_input(user_skills, model)
    # Reshape the vector for the KNN model (1 sample with the same number of features)
    user_vector = user_vector.reshape(1, -1)
    # Find th e top 10 nearest neighbors
    distances, indices = knn.kneighbors(user_vector)
    # Get the corresponding course titles for the top 10 recommendations
    recommended_courses = [(y_train.iloc[i], urls.iloc[i])  for i in indices[0]]
    return recommended_courses


# In[19]:


from flask import Flask, request, jsonify
# In[22]:


app = Flask(__name__)
# Assume you've loaded the KNN model and word2vec model already
@app.route('/predictcourses', methods=['POST'])  # Only POST method is allowed
def predict():
    data = request.json  # Ensure this is a POST request with JSON body
    urls = df['course_url']
    user_skills = data['skills']
    user_vector = vectorize_user_input(user_skills, model)
    distances, indices = knn.kneighbors(user_vector.reshape(1, -1))
    recommended_courses = [{"Course_Title":y_train.iloc[i], "URL":urls.iloc[i]} for i in indices[0]]
    return jsonify(recommended_courses)
if __name__ == '__main__':
    app.run(port=7000, debug=True)


# In[ ]:




