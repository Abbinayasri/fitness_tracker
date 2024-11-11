import React, { useState, useRef, useEffect } from 'react';
import './index.css';
 // Import your Firestore instance
 import { initializeApp } from "firebase/app";
 import db from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const userId = auth.currentUser ? auth.currentUser.uid : null;



function DailyChallengeCard({ imageUrl, challengeName, description, isLocked, onComplete, isCompleted, onProgress }) {
  return (
    <div style={cardContainerStyle}>
      <img src={imageUrl} alt={challengeName} style={imageStyle} />
      <div style={cardBodyStyle}>
        <h5 style={cardTitleStyle}>
          {challengeName} {isLocked && <span style={lockStyle}>🔒</span>}
        </h5>
        <p style={cardTextStyle}>{description}</p>
        <button
          style={{ ...buttonStyle, ...(isLocked || isCompleted ? {} : buttonHoverStyle) }}
          onClick={() => {
            if (!isLocked && !isCompleted) {
              onComplete();
              if (challengeName === '30-Day Challenge') {
                onProgress(); // Trigger scroll only when the 30-day challenge is started
              }
            }
          }}
          disabled={isLocked || isCompleted}
        >
          {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Complete'}
        </button>
      </div>
    </div>
  );
}

export default function WorkoutPlans() {
  const [progress, setProgress] = useState({
    '30-Day Challenge': false,
    '60-Day Challenge': false,
    '100-Day Challenge': false,
  });
  
  const challengeSectionRef = useRef(null);

  const handleComplete = (challengeName) => {
    const updatedProgress = {
      ...progress,
      [challengeName]: true,
    };
    setProgress(updatedProgress);
    saveProgress(updatedProgress);
  };
  
  const handleCheckboxChange = async (dayIndex, isChecked) => {
    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }
  
    const challengeName = '30-Day Challenge';
    const docRef = doc(db, 'challenges', userId);
  
    try {
      const docSnapshot = await getDoc(docRef);
      const currentData = docSnapshot.exists() ? docSnapshot.data() : {};
  
      const updatedChallengeData = {
        ...currentData[challengeName],
        [`day-${dayIndex}`]: isChecked,
      };
  
      await setDoc(docRef, {
        [challengeName]: updatedChallengeData,
      }, { merge: true });
  
      setProgress((prevProgress) => ({
        ...prevProgress,
        [`day-${dayIndex}`]: isChecked,
      }));
  
      console.log(`Day ${dayIndex} set to ${isChecked ? 'completed' : 'not completed'} in Firestore`);
    } catch (error) {
      console.error('Error updating checkbox state in Firestore:', error);
    }
  };
  
  
  const handleProgress = () => {
    // Scroll to the 30-day challenge section when starting the challenge
    if (challengeSectionRef.current) {
      challengeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } 
  };
  const fetchProgress = async () => {
    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }
  
    try {
      const docRef = doc(db, 'challenges', userId);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const progressData = docSnapshot.data()['30-Day Challenge'] || {};
        setProgress(progressData);
      }
    } catch (error) {
      console.error('Error fetching progress from Firestore:', error);
    }
  };
  
  
  
   // Use useEffect to fetch data when component loads
   useEffect(() => {
    fetchProgress();
  }, []);
  const saveProgress = async (updatedProgress) => {
    try {
      await setDoc(doc(db, 'challenges', userId), updatedProgress);
      console.log('Progress saved to Firestore');
    } catch (error) {
      console.error('Error saving progress to Firestore:', error);
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'left', marginBottom: '10px', color: '#fff' }}>Workout Plans</h2>
      <p style={{ fontSize: '1.1rem', color: '#fff', lineHeight: '1', marginTop: '5px' }}>
        Physical exercise is a key pillar of a healthy lifestyle, improving both physical and mental well-being.
      </p>

      {/* Progressive Daily Challenges Section */}
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ marginBottom: '15px', color: '#fff' }}>Challenges</h4>

        <div style={rowStyle}>
          <DailyChallengeCard
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW9--zaB-Gyd3m-dc2P8WQ3_fwtBdiyeSpXQ&s"
            challengeName="30-Day Challenge"
            description="Start with a 30-day challenge to build consistency!"
            isLocked={false}
            isCompleted={progress['30-Day Challenge']}
            onComplete={() => handleComplete('30-Day Challenge')}
            onProgress={handleProgress} // Trigger scroll on "Start"
          />
          <DailyChallengeCard
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmn2v5PY6MxqElAdHUDM4ukijQqH6HA99B5Q&s"
            challengeName="60-Day Challenge"
            description="Build on your strength and endurance for 60 days!"
            isLocked={!progress['30-Day Challenge']}
            isCompleted={progress['60-Day Challenge']}
            onComplete={() => handleComplete('60-Day Challenge')}
            onProgress={handleProgress}
          />
          <DailyChallengeCard
            imageUrl="https://thumbs.dreamstime.com/b/join-global-craze-compete-against-virtual-avatars-monthlong-fitness-challenge-using-tingedge-vr-technology-vector-319038659.jpg"
            challengeName="100-Day Challenge"
            description="Push yourself to the max with this 100-day challenge!"
            isLocked={!progress['60-Day Challenge']}
            isCompleted={progress['100-Day Challenge']}
            onComplete={() => handleComplete('100-Day Challenge')}
            onProgress={handleProgress}
          />
        </div>
      </div>

      {/* 30-Day Challenge Details Section */}
      <div ref={challengeSectionRef} style={challengeDetailsContainerStyle}>
        <h3 style={{ color: '#fff' }}>30-Day Challenge</h3>
        <div style={horizontalScrollContainerStyle}>
          {[...Array(30)].map((_, index) => (
            <div key={index} style={challengeDayCardStyle}>
              <div style={dayCardContentStyle}>
                {/* Small image on the left side */}
                <img
                  src="https://via.placeholder.com/50"
                  alt={`Day ${index + 1}`}
                  style={dayImageStyle}
                />

                {/* Challenge Day Content */}
                <div style={dayTextContentStyle}>
                  <h4 style={{ color: '#fff' }}>Day {index + 1}</h4>
                  <p style={{ color: '#fff' }}>Workout details for Day {index + 1}</p>
                </div>

                {/* Checkbox on the right side */}
                <input
  type="checkbox"
  style={checkboxStyle}
  id={`day-${index + 1}`}
  checked={progress[`day-${index + 1}`] || false}
  onChange={(e) => handleCheckboxChange(index + 1, e.target.checked)}
/>


              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline styles
const cardContainerStyle = {
  maxWidth: '100%',
  width: '300px',
  height: '350px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  border: '1px solid #ddd',
  borderRadius: '5px',
  overflow: 'hidden',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const cardBodyStyle = {
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const cardTitleStyle = {
  fontSize: '18px',
  marginBottom: '10px',
  color: '#fff',
};

const cardTextStyle = {
  fontSize: '14px',
  color: '#fff',
};

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#008080',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s ease',
};

const buttonHoverStyle = {
  backgroundColor: '#006666',
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
};

const lockStyle = {
  color: '#888',
  marginLeft: '8px',
};

const challengeDetailsContainerStyle = {
  marginTop: '40px',
};

const horizontalScrollContainerStyle = {
  display: 'flex',
  flexDirection: 'column', // Stack the cards vertically
  gap: '10px',
  padding: '10px 0',
  width: '100%',
  justifyContent: 'flex-start',
};

const challengeDayCardStyle = {
  width: '100%',
  height: '150px',
  padding: '20px',
  backgroundColor: '#444',
  borderRadius: '10px',
  textAlign: 'center',
  marginRight: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Space between content and checkbox
};

const dayCardContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

const dayImageStyle = {
  width: '50px', // Adjust size as needed
  height: '50px',
  objectFit: 'cover',
  borderRadius: '5px', // Optional: for rounded corners
};

const dayTextContentStyle = {
  flex: '1',
  textAlign: 'left',
  marginLeft: '10px',
};

const checkboxStyle = {
  width: '20px',
  height: '20px',
  cursor: 'pointer',
};
