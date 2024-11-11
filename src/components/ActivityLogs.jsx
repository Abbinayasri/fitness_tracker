import React, { useState, useEffect } from 'react';
import './ActivityLogs.css';
import  db  from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const mockData = [
  { date: '2024-11-01', workoutHours: 1.5, caloriesBurned: 150 },
  { date: '2024-11-02', workoutHours: 2, caloriesBurned: 200 },
  { date: '2024-11-03', workoutHours: 1.2, caloriesBurned: 130 },
  { date: '2024-11-04', workoutHours: 2.5, caloriesBurned: 250 },
];

export default function ActivityLogs() {
  const [progressData, setProgressData] = useState([]);
  const [totalWorkoutHours, setTotalWorkoutHours] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [goalHours, setGoalHours] = useState('');
  const [goalCalories, setGoalCalories] = useState('');
  const [feedback, setFeedback] = useState('');

  const goalsCollectionRef = collection(db, 'goals');
  const feedbackCollectionRef = collection(db, 'feedback');

  useEffect(() => {
    const fetchedData = mockData;
    setProgressData(fetchedData);

    const totalHours = fetchedData.reduce((acc, item) => acc + item.workoutHours, 0);
    const totalCalories = fetchedData.reduce((acc, item) => acc + item.caloriesBurned, 0);

    setTotalWorkoutHours(totalHours);
    setTotalCaloriesBurned(totalCalories);
  }, []);

  // Function to save goals to Firestore
  const saveGoals = async () => {
    try {
      await addDoc(goalsCollectionRef, {
        goalHours: goalHours,
        goalCalories: goalCalories,
        date: new Date().toISOString(),
      });
      alert('Goals saved successfully!');
      setGoalHours('');
      setGoalCalories('');
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  // Function to save feedback to Firestore
  const saveFeedback = async () => {
    try {
      await addDoc(feedbackCollectionRef, {
        feedback: feedback,
        date: new Date().toISOString(),
      });
      alert('Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  return (
    <div className="activity-logs">
      <h1>Activity Logs</h1>

      {/* Total Stats Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Workouts</h3>
          <p>{progressData.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Workout Hours</h3>
          <p>{(totalWorkoutHours / progressData.length).toFixed(2)} hours</p>
        </div>
        <div className="stat-card">
          <h3>Average Calories Burned</h3>
          <p>{(totalCaloriesBurned / progressData.length).toFixed(0)} kcal</p>
        </div>
      </div>

      {/* Today's Activity */}
      <div className="today-activity">
        <h3>Today's Activity</h3>
        <p>Workout Hours: 1.5 hours</p>
        <p>Calories Burned: 150 kcal</p>
      </div>

      {/* Goals Section */}
      <div className="goals-section">
        <h3>Your Fitness Goals</h3>
        <input
          type="number"
          value={goalHours}
          onChange={(e) => setGoalHours(e.target.value)}
          placeholder="Set Weekly Workout Hours Goal"
        />
        <input
          type="number"
          value={goalCalories}
          onChange={(e) => setGoalCalories(e.target.value)}
          placeholder="Set Monthly Calories Burned Goal"
        />
        <button onClick={saveGoals}>Save Goals</button>
      </div>

      {/* Recent Activities */}
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          {progressData.slice(0, 5).map((data, index) => (
            <li key={index}>
              <strong>{data.date}</strong>: {data.workoutHours} hours, {data.caloriesBurned} kcal
            </li>
          ))}
        </ul>
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h3>Workout Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your workout experience!"
          rows="4"
        />
        <button onClick={saveFeedback}>Submit Feedback</button>
      </div>
      {/* Social Sharing */}
      <div className="social-sharing">
        <button className="share-btn">Share on Twitter</button>
        <button className="share-btn">Share on Facebook</button>
        <button className="share-btn">Share on Instagram</button>
      </div>
    </div>
    
    
  );
}
