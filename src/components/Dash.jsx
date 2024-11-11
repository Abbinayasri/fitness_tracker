import React, { useState } from 'react';
import Navigation from './Navigation';
import WorkoutPlans from './WorkoutPlans';
import FoodControl from './FoodControl';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setCurrentView('workout-plans');
  };

  const handleSignUp = () => {
    setIsSignedIn(true);
    setCurrentView('workout-plans');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'workout-plans':
        return <WorkoutPlans />;
      case 'food-control':
        return <FoodControl />;
      case 'profile':
        return <Profile />;
      case 'sign-in':
        return <SignIn onSignIn={handleSignIn} />;
      case 'sign-up':
        return <SignUp onSignUp={handleSignUp} />;
      default:
        return <HomePage onSignIn={handleSignIn} onSignUp={handleSignUp} />;
    }
  };

  return (
    <div>
      <Navigation onSelect={handleViewChange} />
      {renderContent()}
    </div>
  );
}
