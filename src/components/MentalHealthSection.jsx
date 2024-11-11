import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Assuming Firebase setup is correct
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Sample data for mental health tips and affirmations
const mentalHealthContent = [
  {
    title: 'Mental Health Tip 1',
    description: 'Take a 10-minute break to focus on your breathing and relax.'
  },
  {
    title: 'Mental Health Tip 2',
    description: 'Write down your thoughts and feelings to relieve stress.'
  },
  {
    title: 'Mental Health Tip 3',
    description: 'Reach out to someone you trust when you\'re feeling overwhelmed.'
  },
  {
    title: 'Daily Affirmation',
    description: 'I am strong, capable, and worthy of happiness.'
  },
  {
    title: 'Mental Health Resource',
    description: 'Visit [Mental Health America](https://www.mhanational.org) for helpful resources.'
  }
];

const mentalHealthMoodOptions = ['Happy', 'Sad', 'Stressed', 'Relaxed', 'Motivated', 'Tired'];

const MentalHealthSection = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [moodLog, setMoodLog] = useState([]);

  useEffect(() => {
    const fetchMoodLogs = async () => {
      const moodCollection = collection(db, 'mood_logs');
      const moodSnapshot = await getDocs(moodCollection);
      const moodList = moodSnapshot.docs.map(doc => doc.data());
      setMoodLog(moodList);
    };

    fetchMoodLogs();
  }, []);

  const handleMoodSelection = async (mood) => {
    setSelectedMood(mood);
    const newMoodLog = [...moodLog, { mood, timestamp: new Date() }];
    setMoodLog(newMoodLog);

    try {
      // Save the new mood log to Firestore
      await addDoc(collection(db, 'mood_logs'), {
        mood,
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error adding mood log: ", error);
    }
  };

  return (
    <div className="mentalHealth-section">
      <h2>Mental Health Tips & Resources</h2>
      
      {/* Daily Affirmation */}
      <section className="affirmation-section">
        <h3>Daily Affirmation</h3>
        <p>{mentalHealthContent[3].description}</p>
      </section>
      
      {/* Mental Health Tips */}
      <section className="mental-health-tips-section">
        <h3>Tips for Mental Health</h3>
        <ul>
          {mentalHealthContent.slice(0, 3).map((item, index) => (
            <li key={index}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Mental Health Resources */}
      <section className="resources-section">
        <h3>Resources</h3>
        <ul>
          <li>
            <a href="https://www.mhanational.org" target="_blank" rel="noopener noreferrer">
              {mentalHealthContent[4].description}
            </a>
          </li>
        </ul>
      </section>

      {/* Mood Tracker */}
      <section className="mood-tracker-section">
        <h3>Track Your Mood</h3>
        <p>How are you feeling today?</p>
        <div className="mood-buttons">
          {mentalHealthMoodOptions.map((mood) => (
            <button
              key={mood}
              className={`mood-btn ${selectedMood === mood ? 'selected' : ''}`}
              onClick={() => handleMoodSelection(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        
        
        {/* Mood Log */}
        <div className="mood-log">
          <h4>Your Mood Log</h4>
          <ul>
            {moodLog.map((entry, index) => (
              <li key={index}>
                <strong>{entry.mood}</strong> - {new Date(entry.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MentalHealthSection;
