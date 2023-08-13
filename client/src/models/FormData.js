import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const FormData = ({handleSubmmit, handleOnChange, handleclose, rest})=>{
    return (
        <div className= "add-container">
            <form onSubmit={handleSubmmit}>
              <div className= "close-btn" onClick={handleclose}><MdClose/></div>

              <p style={{textAlign: 'center'}}> Enter Details Here! </p>

              <lable htmlFor="name">Name: </lable>
              <input type= "text" placeholder='John' id= "name" name= "name" onChange={handleOnChange} value={rest.name}/>

              <lable htmlFor="email">E-Mail: </lable>
              <input type= "email" placeholder='john@icloud.com' id= "email" name= "email" onChange={handleOnChange} value={rest.email}/>

              <lable htmlFor="mobile">Mobile: </lable>
              <input type= "number" placeholder='07XXXXXXXX' id= "mobile" name= "mobile" onChange={handleOnChange} value={rest.mobile}/>

              <lable htmlFor="address">Address: </lable>
              <input type= "text" placeholder='Colombo, SriLanka' id= "address" name= "address" onChange={handleOnChange} value={rest.address}/>

              <button className= "btn">Submit</button>
            </form>
          </div>
    )
}

export default FormData