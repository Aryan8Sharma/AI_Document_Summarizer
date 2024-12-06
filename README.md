# AI-Powered Enterprise Document Summarizer
![image](https://github.com/user-attachments/assets/aa901bc2-ada2-434e-92af-a276b77343d2)


## Project Overview
This project aims to create an interactive canvas platform where users can upload class notes in PDF format, and the integrated AI will summarize the notes. The platform will also offer additional AI-powered features such as keyword extraction, sentiment analysis, topic clustering, and intelligent search functionality. The platform will leverage advanced Natural Language Processing (NLP) techniques to distill complex information into digestible insights, enhancing decision-making and operational efficiency. The goal is to enhance the learning experience by making class notes more accessible and easier to comprehend.

## Features
1. **Class Notes Summarization**: 
   - The primary feature of the project is AI-based summarization of uploaded PDFs. Users can upload class notes, and the AI will generate a concise summary of the content, highlighting key points.
   
2. **Keyword Extraction**:
   - The AI extracts important keywords from the notes, allowing users to quickly identify the main topics and terms discussed in the document.

3. **Sentiment Analysis**:
   - Analyzes the tone of the class notes to determine whether the content is generally positive, neutral, or negative, helping students understand the instructor’s stance on key topics.

4. **Topic Clustering**:
   - The AI groups similar sections of the class notes into clusters based on topic similarity, providing users with an organized structure of the content.

5. **Intelligent Search**:
   - Provides an advanced search tool where users can input queries, and the AI searches for relevant content in the class notes, returning direct matches and related concepts.

6. **Handwriting Detection (Optional)**:
   - If handwritten notes are uploaded as images, the AI can detect and transcribe the text into a digital format, enabling all other features on handwritten notes.

7. **Interactive Canvas**:
   - The project provides a canvas where users can visualize the content, summaries, and keyword clusters. Users can interact with the canvas to expand topics, view detailed summaries, and add personal annotations.


## Project Overview
1. **Backend**: 
   - **Node.js** or **Python (Flask/Django)**: For handling backend logic and API requests.
   - **AI/ML Libraries**: 
     - **Transformers** for summarization and keyword extraction.
     - **spaCy** or **NLTK** for Natural Language Processing tasks.
     - **TensorFlow** or **PyTorch** for additional deep learning models if needed.

2. **Frontend**: 
   - **React.js** or **Vue.js**: For building the user interface, interactive canvas, and visualizations.
   - **Canvas API**: For rendering and managing the interactive canvas.

3. **AI Models**:
   - **Hugging Face Models** for text summarization, sentiment analysis, and clustering.
   - **OpenAI API** (optional): For more advanced features like question-answering and concept generation.

4. **Database**:
   - **MongoDB**: For storing user-uploaded PDFs, AI-generated summaries, and other metadata.
   - **Amazon S3** or **Google Cloud Storage**: For file storage and retrieval.

5. **Deployment**:
   - **Docker**: For containerizing the application.
   - **Kubernetes**: For managing deployments and scaling the application.
   - **AWS Lambda** (for serverless functions), **AWS EC2**, or **Heroku**: For hosting the backend and frontend.

## Getting Started
