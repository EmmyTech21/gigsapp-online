import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import { fetchTasks, selectTasks } from '../features/tasks/tasksSlice';
import { RootState } from '../app/store';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Header from './Header';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector((state: RootState) => selectTasks(state) || {});
  const { user } = useSelector((state: RootState) => selectAuth(state) || {});
  const [currentDate, setCurrentDate] = useState<string>("");
  const [filter, setFilter] = useState({ title: '', status: 'All' });

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTasks(user.id));
    }

    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
  }, [dispatch, user]);

  const filteredTasks = tasks.filter(task => {
    return (
      (filter.status === 'All' || task.status === filter.status) &&
      (task.title.toLowerCase().includes(filter.title.toLowerCase()))
    );
  });

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Tasks Posted',
        data: [50, 100, 75, 134],
        borderColor: '#ff8c42',
        backgroundColor: 'rgba(255, 140, 66, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Tasks Completed',
        data: [30, 90, 80, 134],
        borderColor: '#56ccf2',
        backgroundColor: 'rgba(86, 204, 242, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6">
      <Header/>
      <h1 className="text-xl font-semibold">{currentDate}</h1>
      <h1 className="text-2xl font-bold">
        Good morning, {user?.firstName} {user?.lastName} 👤 🌞
      </h1>

      {/* Task Stats and Chart */}
      <div className="flex gap-4 my-4 h-32">
        <div className="p-4 bg-white shadow-md h rounded flex flex-col items-center text-center">
          <div className="text-blue-500 text-2xl">🔧</div>
          <div className="text-lg font-semibold">Active Tasks</div>
          <div>{tasks?.filter(task => task.status !== 'Completed').length || 0}</div>
        </div>
        <div className="p-4 bg-white shadow-md rounded flex flex-col items-center text-center">
          <div className="text-blue-500 text-2xl">🕒</div>
          <div className="text-lg font-semibold">Pending Requests</div>
          <div>{tasks?.filter(task => task.status === 'Pending').length || 0}</div>
        </div>
        <div className="p-4 bg-white shadow-md rounded flex flex-col items-center text-center">
          <div className="text-blue-500 text-2xl">✅</div>
          <div className="text-lg font-semibold">Completed Tasks</div>
          <div>{tasks?.filter(task => task.status === 'Completed').length || 0}</div>
        </div>
        <div className="p-4 bg-white shadow-md rounded flex flex-col items-center text-center">
          <div className="text-blue-500 text-2xl">⭐</div>
          <div className="text-lg font-semibold">Helper Ratings</div>
          <div>4/5</div>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-md rounded p-4 mt-4 h-80 w-1/2">
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          <div className="flex justify-around mt-4">
            <button className="text-blue-500">Weekly</button>
            <button>Monthly</button>
            <button>Annually</button>
          </div>
        </div>
      </div>

      {/* Filter Section (Now below the chart) */}
      <div className="flex gap-4 my-4 mt-64">
        <input
          type="text"
          placeholder="Search by Title"
          value={filter.title}
          onChange={e => setFilter({ ...filter, title: e.target.value })}
          className="border rounded p-2"
        />
        <select
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
          className="border rounded p-2"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Live">Live</option>
        </select>
      </div>

      {/* Tasks Table */}
      <table className="min-w-full mt-6 bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="p-2">Task Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Budget</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id}>
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.category}</td>
              <td className="p-2">{task.budget}</td>
              <td className={`p-2 ${task.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                {task.status}
              </td>
              <td className="p-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
