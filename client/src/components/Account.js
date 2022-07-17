import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";

function Account() {
    const [password,setPassword]=useState({oldPass:'',newPass:'',confirmPass:''});


    function changePassword(e){
        setPassword(e.target.value);
    }

    function handelSubmit(e){
        e.preventDefault();
        //if() oldpass!=this.oldpass
        //axios.post()

    }
    return (
        <div>
            <form className="card-header">
                <div >
                    <input type="password"  className="form-control" placeholder="Old password" onChange={changePassword} value={password.oldPass}/>
                </div>
                <div >
                    <input type="password"  className="form-control" placeholder="New password" onChange={changePassword} value={password.newPass} />
                </div>
                <div >
                    <input type="password"  className="form-control" placeholder="Confirm password " onChange={changePassword} value={password.confirmPass}/>
                </div>
                <button type="submit" className="btn-primary" onClick={handelSubmit}></button>
            </form>
        </div>
    )
}
export default Account;