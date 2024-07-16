import React from "react";
import ShowDishes from "./showDishes";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold m-6">Dish Dashboard</h1>
      <div className="lg:w-[1200px] sm:w-[900px] flex justify-between  items-center ml-2">
        <ShowDishes></ShowDishes>
      </div>
    </div>
  );
};

export default Home;
