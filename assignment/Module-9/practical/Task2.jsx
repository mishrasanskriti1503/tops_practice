import React from "react";

function Task2() {
  const topic = "JSX";
  const description = "JSX allows us to write HTML inside JavaScript.";

  return (
    <div>
      <h2>Welcome to JSX</h2>
      <p>
        {topic} is a syntax extension for React. {description}
      </p>
    </div>
  );
}

export default Task2;