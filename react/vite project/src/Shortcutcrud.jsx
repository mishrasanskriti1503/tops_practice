import React, { useState } from "react";

const Shortcutcrud = () => {
    const [data, setData] = useState({
        name: "",
        age: "",
    });
    const [id, setId] = useState("");
    const [alldata, setAlldata] = useState([]);

    const handleChange = (e) => {

        /* Using Destructuring */
        const { name, value } = e.target;
        /* ------ Without Destructuring ------ */
        /* Yha name --> Form ki andr vala name property h */
        // const n = e.target.name
        //  const v = e.taget.value
        setData({
            ...data,
            [name]: value,
        });
    };

    const saveData = (e) => {
        e.preventDefault();
        if (id !== "") {
            let res = alldata.map((i, index) => {
                if (index == id) {
                    i = data;
                }
                return i;
            });
            setAlldata(res);
        } else {
            setAlldata([...alldata, data]);
        }
        /* Input ke baad input filed blank krne ke liye */
        setData({
            name: "",
            age: "",
        });
    };

    const delData = (id) => {
        let res = alldata.filter((i, index) => {
            return index != id;
        });
        setAlldata(res);
    };

    const editData = (id) => {
        let res = alldata.find((i, index) => {
            return index == id;
        });
        setData(res); /* Is setData ke andr hamara name and age h, jo yaha se wo vapis input field me jayega or jese hi data change hoke save pe click karege to saveData wala funciton call hoga or iske andr ka if-else loop execute hoga */
        setId(id);
    };

    return (
        <div>
            <form action="#" method="post" onSubmit={saveData}>
                <label htmlFor="">Name : </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="">Age : </label>
                <input
                    type="number"
                    name="age"
                    id="age"
                    value={data.age}
                    onChange={handleChange}
                />
                <br />
                <br />
                <input type="submit" value="Save Data" /> <br />
                <br />
            </form>
            <table border={2} width={600}>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {alldata.map((i, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{i.name}</td>
                                <td>{i.age}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            editData(index);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    Shortcutcrud<button
                                        onClick={() => {
                                            delData(index);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Shortcutcrud;
