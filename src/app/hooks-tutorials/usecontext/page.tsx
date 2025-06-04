import React, { useState } from "react";

type taskI = {
    id: number,
    text: string,
    done: boolean
}
function TaskApp() {
  let nextId = 3;
  const initialTasks: taskI[] = [
    { id: 0, text: "Visit Kafka Museum", done: true },
    { id: 1, text: "Watch a puppet show", done: false },
    { id: 2, text: "Lennon Wall pic", done: false },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text: string) {
    setTasks([...tasks, {
        id: nextId++,
        text: text,
        done: false
    }])
  }

  function handleChangeTask(task: taskI) {
    setTasks(
        tasks.map((t) => {
          if (t.id === task.id) {
            return task
          } else {
            return t
          }
        })
    )
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

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
