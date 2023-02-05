import React, {useState, useRef} from "react";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import {nanoid} from "nanoid";


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  //hook for handling tasks
  const [tasks, setTasks] = useState(props.tasks);

  //hook for handling filtering
  const [filter, setFilter] = useState("All");

  //adding task
  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  };

  //checkbox toggle
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    }));
    setTasks(updatedTasks);
  };

  //deleting tasks
  function deleteTask(id) {
    const ans = window.confirm("Are you sure?");
    if (ans){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    }
    else alert("Be careful");
  };

  //editig tasks
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {if(id === task.id) {
      return {...tasks, name: newName}
    } 
    return task;
  });
  setTasks(editedTaskList);
  }
  const taskList = tasks
.filter(FILTER_MAP[filter])
.map((task) => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));
const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`;
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const listHeadingRef = useRef(null);
  <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
  {headingText}
</h2>

  
  return (
    <div className="todoapp stack-large">
      <h1>ToDo App</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
            {taskList}
      </ul>
    </div>
  );
}

export default App;
