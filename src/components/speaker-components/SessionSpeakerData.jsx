import React from "react";
import SpeakerSession from "./SpeakerSession";

const SessionSpeakerData = () => {
  // Sample data for session
  const sessions = [
    {
      heading: "Session 1 Title come here",
      date: "2024-04-05",
      time: "10:00 AM",
      tags: ["Tag1", "Tag2", "Tag3"],
    },
    {
      heading: "Session 2 Title come here",
      date: "2024-04-06",
      time: "11:30 AM",
      tags: ["Tag4", "Tag5"],
    },
    {
      heading: "Session 3 Title come here",
      date: "2024-04-07",
      time: "02:45 PM",
      tags: ["Tag6"],
    },
  ];

  return (
    <div>
      {sessions.map((session, index) => (
        <SpeakerSession key={index} sessionData={session} />
      ))}
    </div>
  );
};

export default SessionSpeakerData;
