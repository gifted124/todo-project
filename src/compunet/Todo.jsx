import React, { useState } from "react";
import { BiPlus, BiDotsVerticalRounded, BiTag } from "react-icons/bi";

const Todo = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hideDoneTasks, setHideDoneTasks] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);
  const [newTag, setNewTag] = useState({ name: "", color: "gray-400" });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    categories: []
  });
  const [editingTask, setEditingTask] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([
    { name: "work", color: "purple-300" },
    { name: "study", color: "blue-300" },
    { name: "entertainment", color: "red-300" },
    { name: "family", color: "gray-400" }
  ]);

  const colorOptions = [
    { name: "purple", value: "purple-300" },
    { name: "blue", value: "blue-300" },
    { name: "red", value: "red-300" },
    { name: "green", value: "green-300" },
    { name: "yellow", value: "yellow-300" },
    { name: "pink", value: "pink-300" },
    { name: "gray", value: "gray-400" }
  ];

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "The first task title",
      description: "Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et",
      categories: ["work", "study"],
      done: false,
    },
    {
      id: 2,
      title: "The second task title",
      description: "Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et",
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
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  const toggleCategory = (categoryName) => {
    if (editingTask) {
      setEditingTask(prev => ({
        ...prev,
        categories: prev.categories.includes(categoryName)
          ? prev.categories.filter(c => c !== categoryName)
          : [...prev.categories, categoryName]
      }));
    } else {
      setNewTask(prev => ({
        ...prev,
        categories: prev.categories.includes(categoryName)
          ? prev.categories.filter(c => c !== categoryName)
          : [...prev.categories, categoryName]
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
      done: false
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", categories: [] });
    setShowAddTaskForm(false);
  };

  const handleUpdateTask = () => {
    if (!editingTask.title.trim()) return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
    setShowAddTaskForm(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setMenuOpen(null);
  };

  const handleEditClick = (task) => {
    setEditingTask({ ...task });
    setShowAddTaskForm(true);
    setMenuOpen(null);
  };

  const handleAddTag = () => {
    if (newTag.name.trim() && !availableCategories.some(cat => cat.name === newTag.name.toLowerCase())) {
      setAvailableCategories([...availableCategories, { 
        name: newTag.name.toLowerCase(), 
        color: newTag.color 
      }]);
      setNewTag({ name: "", color: "gray-400" });
      setShowTagForm(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory && !task.categories.includes(selectedCategory)) {
      return false;
    }
    if (hideDoneTasks && task.done) {
      return false;
    }
    return true;
  });

  const getTagColor = (tagName) => {
    const tag = availableCategories.find(cat => cat.name === tagName);
    return tag ? tag.color : "gray-400";
  };

  return (
    <div className="h-screen bg-white p-4 md:p-6">
      {/* Add Task Form Modal */}
      {showAddTaskForm && (
        <div className="fixed inset-0 bg-[#0000006a] flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-md">
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
                className="w-20 bg-amber-950 text-white py-2 rounded hover:bg-amber-600"
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
                value={editingTask ? editingTask.description : newTask.description}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({ ...editingTask, description: e.target.value })
                    : setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                      (editingTask ? editingTask.categories : newTask.categories).includes(category.name)
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full bg-${category.color}`} />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Tag Form Modal */}
      {showTagForm && (
        <div className="fixed inset-0 bg-[#0000006a] flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => {
                  setShowTagForm(false);
                  setNewTag({ name: "", color: "gray-400" });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTag}
                className="w-20 bg-amber-950 text-white py-2 rounded hover:bg-amber-600"
              >
                Add
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Tag Name</label>
              <input
                type="text"
                placeholder="Enter tag name..."
                className="w-full p-2 border rounded"
                value={newTag.name}
                onChange={(e) => setNewTag({...newTag, name: e.target.value})}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tag Color</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    onClick={() => setNewTag({...newTag, color: color.value})}
                    className={`w-8 h-8 rounded-full bg-${color.value} border-2 ${newTag.color === color.value ? 'border-black' : 'border-transparent'}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">todo</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowTagForm(true)}
            className="text-2xl md:text-3xl text-gray-600 hover:text-gray-800"
            title="Create new tag"
          >
            <BiTag />
          </button>
          <button 
            onClick={() => {
              setEditingTask(null);
              setShowAddTaskForm(true);
            }}
            className="text-2xl md:text-3xl text-gray-600 hover:text-gray-800"
            title="Add new task"
          >
            <BiPlus />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full md:w-1/5">
          <ul className="space-y-2 md:space-y-4">
            {availableCategories.map(category => (
              <li
                key={category.name}
                className={`flex items-center gap-2 cursor-pointer p-2 rounded ${
                  selectedCategory === category.name ? "font-bold bg-gray-100" : ""
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              >
                <span className={`w-5 h-5 md:w-7 md:h-7 rounded-full bg-${category.color}`} />
                <span className="text-gray-800">{category.name}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 md:mt-6 p-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={hideDoneTasks}
                onChange={(e) => setHideDoneTasks(e.target.checked)}
              />
              Hide Done Tasks
            </label>
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <img 
              src="https://www.idolgroup.com.bd/_next/image?url=/_next/static/media/i-introduction.f742dab9.png&w=828&q=75" 
              alt="" 
              className="w-20 h-20 md:w-32 md:h-32 mx-auto"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`bg-yellow-100 p-3 md:p-4 rounded shadow-md min-h-32 ${
                  task.done ? "opacity-60" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <h2 className={`font-bold text-base md:text-lg ${task.done ? "line-through" : ""}`}>
                    {task.title}
                  </h2>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(menuOpen === task.id ? null : task.id);
                      }}
                      className="text-gray-500 hover:text-gray-700 text-lg md:text-xl"
                    >
                      <BiDotsVerticalRounded />
                    </button>
                    {menuOpen === task.id && (
                      <div className="absolute right-0 mt-1 w-28 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(task);
                          }}
                          className="block w-full text-left px-3 py-1.5 text-xs md:text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id);
                          }}
                          className="block w-full text-left px-3 py-1.5 text-xs md:text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className={`text-xs md:text-sm text-gray-700 mt-1 ${task.done ? "line-through" : ""}`}>
                  {task.description.length > 100 
                    ? `${task.description.substring(0, 100)}...` 
                    : task.description}
                </p>
                <div className="flex items-center gap-2 mt-2 md:mt-3">
                  {task.categories.map(category => (
                    <span 
                      key={category} 
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-${getTagColor(category)}`}
                    />
                  ))}
                  <label className="ml-auto flex items-center gap-1 text-xs md:text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTaskDone(task.id)}
                      className="w-3 h-3 md:w-4 md:h-4"
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