import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/auth/authSlice';
import { RootState } from '../app/store';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  
  // Accessing state
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
   
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]); // Add user to the dependency array

  // Debugging logs
  console.log('User:', user);
  console.log('Loading:', loading);
  console.log('Error:', error);

  // Render loading state
  if (loading) return <p>Loading...</p>;
  
  // Render error state
  if (error) return <p>Error: {error}</p>;

  // Render user profile
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user ? `${user.firstName || 'N/A'} ${user.lastName || ''}` : 'N/A'}</p>
      <p>Email: {user?.email || 'N/A'}</p>
      <p>Phone Number: {user?.phoneNumber || 'N/A'}</p>
      <h3>Tasks:</h3>
      {user.tasks && user.tasks.length > 0 ? (
        <ul>
          {user.tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.category} - ${task.budget}
              {task.status && ` - Status: ${task.status}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default UserProfile;
