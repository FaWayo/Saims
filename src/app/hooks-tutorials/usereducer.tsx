import React, { useState } from "react";

function TaskApp() {
  let nextId = 3;
  const initialTasks = [
    { id: 0, text: "Visit Kafka Museum", done: true },
    { id: 1, text: "Watch a puppet show", done: false },
    { id: 2, text: "Lennon Wall pic", done: false },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div>
      {initialTasks.map((tasks, index) => {
        return (
          <div>
            {tasks.done ? (
              <p>
                {tasks.id} <span>{tasks.text}</span>
              </p>
            ) : (
              <s>
                {tasks.id} <span>{tasks.text}</span>
              </s>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TaskApp;
