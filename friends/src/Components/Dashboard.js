import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../Utils/AxiosWithAuth";
import Friends from "./Friends";

const Dashboard = () => {
    const friendObj = {
        id: "",
        name: "",
        age: "",
        email: ""
    };

    const [friendValue, setFriendValue] = useState(friendObj);
    const [friendsList, setFriendsList] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = e => {
        setFriendValue({ ...friendValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFriendValue({ ...friendValue, id: Date.now() });
        setIsUpdating(true);
        axiosWithAuth()
            .post("/friends", friendValue)
            .then(res => {
                setFriendsList(res.data);
                setIsUpdating(false);
            })
            .then(() => {
                setFriendValue(friendObj);
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    };

    useEffect(() => {
        setIsUpdating(true);
        axiosWithAuth()
            .get("/friends")
            .then(res => {
                console.log(res)
                setFriendsList(res.data);
                setIsUpdating(false);
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    }, []);

    return (
        <section className="dashboard">
            <div className="addFriend">
                <h1>Add a new friend!</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={friendValue.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="age">Age:</label>
                    <input
                        type="text"
                        name="age"
                        placeholder="35"
                        value={friendValue.age}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="joe.doe@gmail.com"
                        value={friendValue.email}
                        onChange={handleChange}
                    />
                    <button type="submit">Add Friend</button>
                </form>
            </div>
            <div className="friends">
                <h1>
                    {isUpdating
                        ? "Loading..."
                        : `You have ${friendsList.length} friends!`}
                </h1>
                <div className="friendsList">
                    {friendsList.map(cv => {
                        return <Friends data={cv} key={cv.id} setUpdate={setIsUpdating} setList={setFriendsList} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Dashboard; 