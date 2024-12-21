import React from 'react';
import TaskCard from '../Layout/TaskCard';



const tasks = [
  {
    name: 'Abdullahi Al-Mansur',
    price: 'From NGN 25,000',
    location: 'Galadimawa, Abuja',
    summary: 'Lorem ipsum dolor sit amet consectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netusconsectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netu. or sit amet consectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netusconsectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netu',
  },
  {
    name: 'Abdullahi Al-Mansur',
    price: 'From NGN 25,000',
    location: 'Galadimawa, Abuja',
    summary: 'Lorem ipsum dolor sit amet consectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netusconsectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netu. or sit amet consectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netusconsectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netu',
  },
  {
    name: 'Abdullahi Al-Mansur',
    price: 'From NGN 25,000',
    location: 'Galadimawa, Abuja',
    summary: 'Lorem ipsum dolor sit amet consectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netusconsectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netu. or sit amet consectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netusconsectetur. Rhoncus at neque cras tempus quis. Amet ligula magnis nunc cras laoreet netu',
  },
];

const TasksNearYou: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-10">Tasks Near You</h1>
      <div className="space-y-4 text-3xl">
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            name={task.name}
            price={task.price}
            location={task.location}
            summary={task.summary}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksNearYou;
