import React, {useEffect, useState} from 'react';
import axios from 'axios';



let App = () =>{

  let [item, setItem] = useState([]);
  let [newtask, setNewtask] = useState("");

  useEffect(()=>{
    axios.get('http://localhost:5000/getTask').then(
      arr => setItem(arr.data)
    )
  }, [])

  let submitHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/addTask', {todo : newtask}).then(
      arr => setItem(arr.data),
      setNewtask("")
    )
  }

  let deleteHandler = id =>{
  axios.delete(`http://localhost:5000/deleteTask/${id}`).then(
    arr=> setItem(arr.data)
  )
  }

  //   return(
  //   <div class = "text-center">
  // //    <h3 className="text-center mb-4">Todo Mangement Application</h3>
  // //    <form onSubmit={submitHandler}>
  // //      <input size = "30" type = "text" value={newtask} onChange={(e)=>setNewtask(e.target.value)}/>&nbsp;&nbsp;
  // //    <input type = "submit" value="Add" class = "btn btn-primary" />
  // //    </form>
  // //   {item.map(task=>
  //   <div key = {task._id}>
  // //    <h3>{task.todo}</h3>
  // //    <button  onClick={()=> deleteHandler(task._id)}>Delete</button>
  // //   </div>)}
  // //   </div>
  //   )
  return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-5">

        <div className="card shadow p-3">
          <h4 className="text-center mb-3">Todo Application</h4>

          {/* Input */}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Add Task"
              value={newtask}
              onChange={(e) => setNewtask(e.target.value)}
              required
            />

            <div className="d-grid">
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </div>
          </form>

          {/* Todo List */}
          {item.map(task => (
            <div
              key={task._id}
              className="border rounded d-flex justify-content-between align-items-center p-2 mt-3"
            >
              <span>{task.todo}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteHandler(task._id)}
              >
                X
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  </div>
);


 

};





export default App;



