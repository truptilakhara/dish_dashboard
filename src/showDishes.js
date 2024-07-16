import { useEffect, useState } from "react";

const ShowDishes = () => {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    fetchDishes();
  }, []);
  const fetchDishes = async () => {
    const data = await fetch("http://localhost:1234/dishes");
    const json = await data.json();
    setDishes(json);
  };
  const togglePublishedStatus = async (dishId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:1234/dishes/${dishId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });

      if (response.ok) {
        setDishes((prevDishes) =>
          prevDishes.map((dish) =>
            dish.dishId === dishId
              ? { ...dish, isPublished: !currentStatus }
              : dish
          )
        );
      } else {
        console.log("Failed to update published status");
      }
    } catch (error) {
      console.error("Error updating published status:", error);
    }
  };
  return dishes ? (
    dishes.map((res) => (
      <div className="m-1 shadow bg-gray-100 border ">
        {res.isPublished && (
          <ul className="text-lg font-mono">
            <li>
              {res.dishId}. {res.dishName}
            </li>

            <li>{res.isPublished ? "Published" : "Unpublished"}</li>
            <li>
              <img
                src={res.imageUrl}
                alt="dish-photo"
                className="lg:h-64 lg:w-80 sm:w-72 sm:h-52 "
              ></img>
            </li>
          </ul>
        )}
        <button
          className="m-1 ml-[56px] w-32 h-9 bg-red-500 text-white text-lg font-semibold"
          onClick={() => togglePublishedStatus(res.dishId, res.isPublished)}
        >
          {res.isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>
    ))
  ) : (
    <div>Loading</div>
  );
};
export default ShowDishes;
