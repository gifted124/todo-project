import React, { useState } from "react";
import Todo from "./compunet/Todo";  // Updated import path
import TodoScreen from "./compunet/TodoScreen";

const App = () => {
  const [showTodoApp, setShowTodoApp] = useState(false);

  return (
    <div className="app-container">
      {showTodoApp ? (
        <Todo onBack={() => setShowTodoApp(false)} />
      ) : (
        <TodoScreen onStart={() => setShowTodoApp(true)} />
      )}
    </div>
  );
};

export default App;