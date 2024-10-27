import React from 'react';

const TaskItem: React.FC<{ task: any }> = ({ task }) => {
  return (
    <tr className="border-b">
      <td className="p-4">{task.title}</td>
      <td className="p-4">{task.category}</td>
      <td className="p-4">{task.budget}</td>
      <td className={`p-4 ${task.status === 'Completed' ? 'text-success' : 'text-pending'}`}>
        {task.status}
      </td>
    </tr>
  );
};

// export default TaskItem;
