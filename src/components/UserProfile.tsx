import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUser } from '../features/auth/authSlice';
import { RootState, useAppDispatch } from '../app/store';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  // Accessing state
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  // Render loading state
  if (loading) return <p>Loading...</p>;
  
  // Render error state
  if (error) return <p>Error: {typeof error === 'string' ? error : (error as { message?: string }).message || "An unexpected error occurred"}</p>;

  // Render user profile
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user ? `${user.firstName || 'N/A'} ${user.lastName || ''}` : 'N/A'}</p>
      <p>Email: {user?.email || 'N/A'}</p>
      <p>Phone Number: {user?.phoneNumber || 'N/A'}</p>
      <h3>Tasks:</h3>
      {user?.tasks && user.tasks.length > 0 ? (
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
