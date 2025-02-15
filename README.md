
# **House Price Predictor Frontend**

This repository contains the React-based frontend implementation of the house price prediction system. It serves as the user-facing interface, allowing users to input house details and retrieve predictions from the backend API.

---

## **Features**
 **Prediction Form**: A user-friendly form to input property details such as bedrooms, bathrooms, square footage, and more.
- **Dynamic API Integration**: Connects to the backend API for real-time predictions.
- **Interactive Maps**: Displays a map locator for setting locations and a map for visualizing neighborhood clusters.
- **Web Pages**:
  - **Home Page**: Introduces the application and provides an overview of its functionality.
  - **Project Page**: Details about the house price prediction project.
  - **Simulation Page**: Includes the prediction form and interactive maps for neighborhood clusters and location selection.
- **Responsive Design**: Ensures optimal usability across desktop and mobile devices.

---

## **Demo Video**

Watch a demonstration of the application in action:

[![Watch the Demo](https://img.youtube.com/vi/<VIDEO_ID>/0.jpg)](https://youtu.be/<VIDEO_ID>)

The video shows:
- Entering house details (e.g., bedrooms, bathrooms, square footage).
- Clicking the "Predict" button to get the house price estimate.
- Using the map to locate neighborhoods and visualize clusters.


---

## **Technologies Used**
- **Frontend Framework**: React.js
- **Styling**: CSS
- **API Integration**: RESTful API for communication with the backend.
- **Environment Variables**: `.env` file for managing API endpoints and keys.

---

## **Folder Structure**

Link to the backend: [House Predictor Backend](https://github.com/Nafisatibrahim/house_predictor_backend)

```
frontend/
│
├── public/                  # Public assets
│   ├── favicon.ico          # Favicon for the application
│   ├── housing.jpg          # Sample housing image
│   ├── index.html           # Main HTML file
│   ├── logo192.png          # Logo for larger screens
│   ├── logo512.png          # Logo for smaller screens
│   ├── manifest.json        # Metadata for Progressive Web App (PWA)
│   ├── robots.txt           # Web crawlers management
│
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── App.css          # Styling for App component
│   │   ├── App.js           # Main App component
│   │   ├── App.test.js      # Tests for the App component
│   │   ├── index.css        # Global styles
│   │   ├── index.js         # Application entry point
│   │   ├── reportWebVitals.js # Performance metrics
│   │   ├── setupTests.js    # Setup for testing environment
│
├── .env                     # Environment variables
├── .gitignore               # Files and folders to ignore in version control
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
```

---

## **Setup Instructions**

### **Clone the Repository**
```bash
git clone https://github.com/your-username/house_predictor_frontend.git
cd house_predictor_frontend
```

### **Install Dependencies**
```bash
npm install
```

### **Run the Application**
Start the development server:
```bash
npm start
```

The application will run at:
- **Local**: `http://localhost:3000`

---

## **API Integration**
This frontend communicates with the `House Predictor Backend`. Ensure the backend is running and accessible before using the frontend. By default, the API endpoints can be configured in the `.env` file:
```
REACT_APP_API_URL=http://127.0.0.1:5000
```

Update this value if the backend is deployed on a live server.

---

## **Key Components**

### **App.js**
- Main entry point for the application. Sets up routes and manages the structure of the app.

### **Prediction Form**
- Collects user input and sends a request to the `/predict` endpoint in the backend.
- Displays the prediction result returned by the API.

---

## **Future Enhancements**
- Add error handling for failed API requests.
- Improve UI/UX with animations and responsive design enhancements.
- Add visualizations for housing data using libraries like D3.js or Chart.js.
- Deploy the frontend on cloud platforms (e.g., Netlify, Vercel).

---

## **Contributing**
Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push the branch (`git push origin feature-branch`).
5. Submit a pull request.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Contact**
- **Author**: Nafisat Ibrahim
- **Email**: nafisat.l@Outlook.com
- **GitHub**: https://github.com/Nafisatibrahim
