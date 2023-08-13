import logo from './logo.svg';
import './App.css';
import {MdClose} from "react-icons/md"
import { useEffect, useState } from 'react';
import axios from "axios"
import FormData from './models/FormData';

//fetching data 
axios.defaults.baseURL = "http://localhost:8080/"

function App() {

  const [addSection, setSection] = useState(false)
  const [editSection, setEdit] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  })
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    _id: "",
  })
  const [DataList,SetDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value, name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name]: value
      }
    })
  }

// Submit data to MongoDB
  const handleSubmmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    if(data.data.success){
      setSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
      })
    }
  }

  // Get Data form MongoDB
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      SetDataList(data.data.data)
      // alert(data.data.message)
    }
  }
  useEffect(()=>{
    getFetchData()
  }, [])


  // Delete Data
  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }

  // Update Data
  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update/", formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEdit(false)
    }
  }

  const handleEditOnChange = async(e)=>{
    const {value, name} = e.target
    setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name]: value
      }
    })
  }

  const handleEdit = (ex)=>{
    setFormDataEdit(ex)
    setEdit(true)
  }







  return (
    <>
      <div className= "container">
        <button className= "btn btn-add" onClick={()=>setSection(true)}>Add</button>

      {
        addSection && (

// model/FormData.js
          <FormData
          handleSubmmit = {handleSubmmit}
          handleOnChange = {handleOnChange}
          handleclose = {()=>setSection(false)}
          rest = {formData}
          />
        )
      }

      {
        editSection && (
          
// model/FormData.js
          <FormData
          handleSubmmit = {handleUpdate}
          handleOnChange = {handleEditOnChange}
          handleclose = {()=>setEdit(false)}
          rest = {formDataEdit}
          />
        )
      }

      <div className='TableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>
            { DataList[0] ? (
              DataList.map((ex)=>{
                console.log(ex)
                return(
                  <tr>
                    <td>{ex.name}</td>
                    <td>{ex.email}</td>
                    <td>{ex.mobile}</td>
                    <td>{ex.address}</td>
                    <td>
                      <button className='btn btn-Edit' onClick={()=>handleEdit(ex)}>Edit</button>
                      <button className='btn btn-Delete' onClick={()=>handleDelete(ex._id)}>Delete</button>
                    </td>
                  </tr>
                )
              }))
              : (
                <p style={{textAlign: 'center'}}> No Data Availabe </p>
              )
            }
          </tbody>
        </table>
      </div>
        

      </div>
    
    </>
  );
}

export default App;
