import React from "react";
import SpeakerSession from "./SpeakerSession";
import Task from "./Task";

const TaskData = () => {
  // Sample data for session
  const Tasks = [
    {
      heading: "Upload Your Photo",
      date: "2024-04-05",
      time: "10:00 AM",
      desc:'Please upload a high resolution photograph of size less than 100 kb',
      status:'Overdue'

    },
    {
      heading: "Add Your Session Description",
      date: "2024-04-06",
      time: "11:30 AM",
      desc:'Please add description for your session with a max of 500 characters.',
      status:'Approved'

    },
    {
      heading: "Add Your Session Description",
      date: "2024-04-07",
      time: "02:45 PM",
      desc:'Please upload a high resolution photograph of size less than 100 kb',
      status:'Approved'

    },
  ];

  return (
    <div>
      {Tasks.map((task, index) => (
        <Task key={index} taskdemoData={task} />
      ))}
    </div>
  );
};

export default TaskData;
