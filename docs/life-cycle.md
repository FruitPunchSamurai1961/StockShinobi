## Project Lifecycle

1. **Technology Stack Selection and Repository Setup:**

    - Choose the technology stack: React with Redux and RTK Query for the frontend, and Golang for the backend.

    - Create the project repository on GitHub.

    - Establish a basic boilerplate setup for both frontend and backend.

2. **Backend Development:**

    - Focus on backend development, setting up databases using Postgres for User and User Token.

    - Implement backend functionalities for user registration, authentication token generation, and various validation
      checks (e.g., email validity, password length).

    - Develop helper functions to streamline backend processes.

    - Ensure secure communication between frontend and backend, setting up CORS for localhost:3000 and localhost:4000.

3. **Frontend Development:**

    - Create frontend pages for user login and signup.

    - Implement Redux states to manage frontend state.

    - Connect the frontend and backend using RTK Query to facilitate data flow.

    - Develop frontend components such as login/signup forms, ensuring seamless user interaction.

4. **API Wrapper for AlphaVantage:**

    - Create an API wrapper for AlphaVantage to retrieve real-time and historical financial market data.

    - Integrate AlphaVantage API endpoints into the backend.

    - Implement middleware functionalities, including rate limiting and permission-based page viewing.

5. **Additional Backend Development:**

    - Expand backend functionality by adding more API endpoints to support frontend features.

    - Develop middleware for additional security and access control.

    - Ensure robust error handling and implement logging for debugging purposes.

6. **Frontend Page Development:**

    - Create frontend pages, including the homepage, with various components such as charts, news, and search bars.

    - Implement user interfaces for a seamless user experience.

    - Test frontend components for responsiveness and optimal display.

7. **Deployment to GCP:**

    - Prepare the application for deployment on Google Cloud Platform (GCP).

    - Deploy both frontend and backend components to GCP.

    - Conduct thorough testing on the deployed application to identify and resolve any deployment-related issues.