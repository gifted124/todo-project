import React, { useState } from "react";
import { BiPlus, BiDotsVerticalRounded } from "react-icons/bi";

const Todo = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hideDoneTasks, setHideDoneTasks] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    categories: [],
  });
  const [editingTask, setEditingTask] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "The first task title",
      description:
        "Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et",
      categories: ["work", "study"],
      done: false,
    },
    {
      id: 2,
      title: "The second task title",
      description:
        "Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et",
      categories: ["work"],
      done: false,
    },
    {
      id: 3,
      title: "The third task title",
      description: "Lorem ipsum dolor sit amet, consectetur sadipscing elitr",
      categories: ["entertainment"],
      done: false,
    },
  ]);

  const toggleTaskDone = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const toggleCategory = (category) => {
    if (editingTask) {
      setEditingTask((prev) => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      }));
    } else {
      setNewTask((prev) => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      }));
    }
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      categories: newTask.categories,
      done: false,
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", categories: [] });
    setShowAddTaskForm(false);
  };

  const handleUpdateTask = () => {
    if (!editingTask.title.trim()) return;

    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
    );
    setEditingTask(null);
    setShowAddTaskForm(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setMenuOpen(null);
  };

  const handleEditClick = (task) => {
    setEditingTask({ ...task });
    setShowAddTaskForm(true);
    setMenuOpen(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory && !task.categories.includes(selectedCategory)) {
      return false;
    }
    if (hideDoneTasks && task.done) {
      return false;
    }
    return true;
  });

  return (
    <div className="h-screen bg-white p-6">
      {showAddTaskForm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => {
                  setShowAddTaskForm(false);
                  setEditingTask(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                className="w-[75px] bg-amber-950 text-white py-2 rounded hover:bg-amber-600"
              >
                {editingTask ? "Update" : "Add"}
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="add a title..."
                className="w-full p-2 border rounded"
                value={editingTask ? editingTask.title : newTask.title}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({ ...editingTask, title: e.target.value })
                    : setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="add a description..."
                className="w-full p-2 border rounded"
                rows={3}
                value={
                  editingTask ? editingTask.description : newTask.description
                }
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    : setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Tags</label>
              <div className="flex gap-2">
                {["work", "study", "entertainment", "family"].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                        (editingTask
                          ? editingTask.categories
                          : newTask.categories
                        ).includes(category)
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          category === "work"
                            ? "bg-purple-300 "
                            : category === "study"
                            ? "bg-blue-300"
                            : category === "entertainment"
                            ? "bg-red-300"
                            : "bg-gray-400"
                        }`}
                      />
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">todo</h1>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowAddTaskForm(true);
          }}
          className="text-3xl text-gray-600 hover:text-gray-800"
        >
          <BiPlus />
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-1/5">
          <ul className="space-y-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
            {["work", "study", "entertainment", "family"].map((category) => (
              <li
                key={category}
                className={`flex items-center gap-2 cursor-pointer ${
                  selectedCategory === category ? "font-bold" : ""
                }`}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
              >
                <span
                  className={`w-7 h-7 rounded-full ${
                    category === "work"
                      ? "bg-purple-300"
                      : category === "study"
                      ? "bg-blue-300"
                      : category === "entertainment"
                      ? "bg-red-300"
                      : "bg-gray-400"
                  }`}
                />
                <span className="text-gray-800">{category}</span>
              </li>
            ))}
          </ul>

          
          <div className="mt-6">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={hideDoneTasks}
                onChange={(e) => setHideDoneTasks(e.target.checked)}
              />
              Hide Done Tasks
            </label>
          </div>

          <div className="mt-10 text-center text-3xl mr-[190px] w-35"> <img src="https://www.idolgroup.com.bd/_next/image?url=/_next/static/media/i-introduction.f742dab9.png&w=828&q=75" alt="" /></div>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`w-full md:w-[48%] bg-yellow-100 p-4 rounded shadow-md h-40 ${
                  task.done ? "opacity-60" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <h2
                    className={`font-bold text-lg ${
                      task.done ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === task.id ? null : task.id)
                      }
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      <BiDotsVerticalRounded />
                    </button>
                    {menuOpen === task.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <button
                          onClick={() => handleEditClick(task)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p
                  className={`text-sm text-gray-700 mt-1 ${
                    task.done ? "line-through" : ""
                  }`}
                >
                  {task.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  {task.categories.includes("work") && (
                    <span className="w-4 h-4 bg-purple-300 rounded-full" />
                  )}
                  {task.categories.includes("study") && (
                    <span className="w-4 h-4 bg-blue-300 rounded-full" />
                  )}
                  {task.categories.includes("entertainment") && (
                    <span className="w-4 h-4 bg-red-300 rounded-full" />
                  )}
                  {task.categories.includes("family") && (
                    <span className="w-4 h-4 bg-gray-400 rounded-full" />
                  )}
                  <label className="ml-auto flex items-center gap-1 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTaskDone(task.id)}
                    />
                    Done
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
