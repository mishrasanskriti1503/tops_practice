import React from "react";

const FruitList = () => {
  const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

  return (
    <div>
      <h3>Fruit List</h3>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default FruitList;