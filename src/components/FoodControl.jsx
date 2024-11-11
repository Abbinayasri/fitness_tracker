import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import './index.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgNLih7ORRCIpoNHTtHv3O1VCyb9UZbKY",
  authDomain: "my-data-storage-44807.firebaseapp.com",
  projectId: "my-data-storage-44807",
  storageBucket: "my-data-storage-44807.firebasestorage.app",
  messagingSenderId: "965453935861",
  appId: "1:965453935861:web:ea5159e9537ce45f8801bc",
  measurementId: "G-NCL3Z0V0C6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [mealLog, setMealLog] = useState([]);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
    
  const calculateBMI = () => {
    const heightInMeters = height / 100; // Convert height from cm to meters
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  
    setBmi(bmiValue);
  
    // Determine BMI status
    let status = "";
    if (bmiValue < 18.5) {
      status = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      status = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      status = "Overweight";
    } else {
      status = "Obese";
    }
    setBmiStatus(status);
    storeBMI(bmiValue, status);
  };
  // Function to store BMI in Firestore
  const storeBMI = async (bmiValue, status) => {
    const bmiData = {
      height: parseFloat(height),
      weight: parseFloat(weight),
      bmi: bmiValue,
      status: status,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "bmiLogs"), bmiData);
      console.log("BMI data saved successfully:", bmiData);
    } catch (error) {
      console.error("Error saving BMI data:", error);
    }
  };
  // Sample food suggestion data
  const foodSuggestions = {
    Monday: { morning: "Greek Yogurt with Fresh Berries", noon: "Grilled Chicken", night: "Baked Salmon with Steamed Broccoli" },
    Tuesday: { morning: "Smoothie with Spinach, Banana", noon: "Veggie Wrap", night: "Spaghetti" },
    Wednesday: { morning: "Toast with Avocado", noon: "Rice and Beans", night: "Grilled Chicken" },
    Thursday: { morning: "Fruit Smoothie", noon: "Quinoa Salad", night: "Steak and Veggies" },
    Friday: { morning: "Greek Yogurt", noon: "Tuna Salad", night: "Spaghetti Squash with Tomato" },
    Saturday: { morning: "Scrambled Eggs", noon: "Whole Wheat Pita with Hummus", night: "Chicken Fajitas" },
    Sunday: { morning: "French Toast", noon: "Chicken Tacos", night: "Roast Beef" },
  };

  // Sample articles data
  const articles = [
    { title: "10 Best Meal Delivery Foods", link: "#", description: "Discover the top meal delivery services for a healthy diet." },
    { title: "9 Best Diet Foods", link: "#", description: "Top foods to include in your diet for weight loss and health." },
    { title: "5 Best Superfoods for Energy", link: "#", description: "Foods that boost your energy and productivity." },
    { title: "Top 7 Foods for Muscle Building", link: "#", description: "The best foods for building lean muscle." },
    { title: "10 Best Vegan Meals for Weight Loss", link: "#", description: "Vegan options to help you lose weight and feel great." }
  ];

  const logMeal = async () => {
    const newMeal = { mealName, calories: parseInt(mealCalories) };

    try {
      await addDoc(collection(db, "mealLogs"), newMeal);
      setMealLog([...mealLog, newMeal]);
      setCaloriesConsumed(caloriesConsumed + newMeal.calories);
    } catch (error) {
      console.error("Error logging meal: ", error);
    }

    setMealName("");
    setMealCalories("");
  };
  

  return (
    <div className="App">
      <header className="header">
        {/* Image removed */}
      </header>

      <h1>Meal Planner</h1>
      
      <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>
        Plan your meals effectively to reach your dietary goals. Ensure a balanced intake of carbohydrates, proteins, and healthy fats for optimal health and wellness.
      </p>
      
      <section className="logMeal-section">
        <h2>Log a Meal</h2>
        <input
          type="text"
          placeholder="Meal Name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={mealCalories}
          onChange={(e) => setMealCalories(e.target.value)}
        />
        <button onClick={logMeal}>Log Meal</button>
      </section>

      <section className="mealLog-section">
        <h2>Meal Log</h2>
        <ul>
          {mealLog.map((meal, index) => (
            <li key={index}>
              {meal.mealName} - {meal.calories} Calories
            </li>
          ))}
        </ul>
        <p>Total Calories Consumed: {caloriesConsumed}</p>
      </section>
      {/* BMI Calculation Section */}
      <section className="bmi-section">
        <h2>Calculate Your BMI</h2>
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={calculateBMI}>Calculate BMI</button>

        {bmi && (
          <div className="bmi-result">
            <h3>Your BMI: {bmi}</h3>
            <p>Status: {bmiStatus}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Food Suggestions</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Morning</th>
              <th>Noon</th>
              <th>Night</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(foodSuggestions).map((day, index) => (
              <tr key={index}>
                <td>{day}</td>
                <td>{foodSuggestions[day].morning}</td>
                <td>{foodSuggestions[day].noon}</td>
                <td>{foodSuggestions[day].night}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="articles-section">
        <h2>Blogs</h2>
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <h3>{article.title}</h3>
              </a>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
  .App {
    text-align: left;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #121212; /* Dark background */
    color: #fff; /* Light text color */
    border-radius: 8px;
  }

  h1 {
    font-size: 2rem;
    color: #fff;
    text-align: left;
    margin: 0;
    padding-top: 10px;
    font-weight: bold;
  }

  h2 {
    font-size: 1.8rem;
    color: #ddd;
    margin-top: 20px;
    text-align: left;
    border-bottom: 2px solid #444; /* Darker border */
    padding-bottom: 8px;
  }

  h3 {
    font-size: 1.2rem;
    color: #00b5ad; /* Highlight color */
    margin: 10px 0;
  }

  section {
    margin-bottom: 25px;
  }

  .logMeal-section {
    padding: 20px;
    border-radius: 8px;
    background-color: #1e1e1e; /* Dark background for sections */
  }

  .mealLog-section {
    background-color: #2e2e2e; /* Slightly lighter dark background */
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #444;
  }

  .bmi-section {
    padding: 20px;
    border-radius: 8px;
    background-color: #2e2e2e;
    border: 1px solid #444;
  }

  .bmi-result {
    margin-top: 20px;
    padding: 10px;
    background-color: #4caf50; /* Green for positive results */
    border-radius: 8px;
    border: 1px solid #444;
  }

  input {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #333; /* Dark input background */
    color: #fff; /* Light text color for input */
  }

  button {
    padding: 10px 20px;
    background-color: #008080; /* Teal color for buttons */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #00b5ad; /* Lighter teal on hover */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #444;
  }

  th {
    background-color: #333;
    color: #fff;
  }

  td {
    background-color: #222; /* Darker rows */
    color: #fff;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 8px 0;
    font-size: 1rem;
    color: #ddd; /* Light text for list items */
  }

  .articles-section {
    margin-top: 30px;
  }

  .articles-section ul {
    list-style: none;
    padding-left: 0;
  }

  .articles-section li {
    margin: 10px 0;
    font-size: 1rem;
    color: #ddd;
  }

  .articles-section a {
    text-decoration: none;
    color: #00b5ad; /* Highlight color for links */
  }

  .articles-section a:hover {
    color: #fff; /* Lighten color on hover */
  }
`}</style>


    </div>
  );
};

export default App;
