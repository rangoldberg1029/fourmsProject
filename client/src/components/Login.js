import React, {useState} from 'react';
import axios from "axios";
import '../css/register.css'
import {useNavigate  } from "react-router-dom";





function Login() {
    const path = useNavigate();

    const [user_login,set_user_login]=useState({username:'',email:'',password:''});



    function loginStmt(e){
        const { id, value } = e.target;
        set_user_login(prevInput => {
            return {
                ...prevInput,
                [id]: value
            }
        })
    }


    function loginSubmit(e){
        e.preventDefault()
            axios.post("http://localhost:/fourmsProject/server/verify.php",user_login)
                .then((res)=>{
                      if(res.status!=200) {console.log();}
                        else{alert(`Server error - ${res.status}`);}
                }).then((jwt)=>{
                if (jwt=="NO") { alert("Invalid user/password"); }
                localStorage.setItem("token", jwt);
            }).catch((e)=>{
                console.log(e);
            })

    }
return(
    <div className='Login' >
        <div className="d-flex justify-content-center h-100">
            <div className="card-login">
                <div className="card-header">
                    <h3>Sign In</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="email" onChange={loginStmt} value={user_login.email} id='email' ></input>
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input type="password" className="form-control" placeholder="password" onChange={loginStmt} value={user_login.password} id='password'  ></input>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn float-center login_btn mt-5" onClick={loginSubmit}>Login</button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account?  <a href="/register">Sign Up</a>
                    </div>

                </div>
            </div>
        </div>
    </div>

)

}

export default Login;

