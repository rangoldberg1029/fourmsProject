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
            axios.get("http://localhost:/fourmsProject/server/route/getUser.php",{params:{
                email:user_login.email,
                password:user_login.password,
                token:localStorage.getItem("token")
                }})
                .then((res)=>{
                    if(res.data=="NO"){ alert("Invalid email/password"); }
                     else if(res.status!=200) {
                         alert(`Server error - ${res.status}`);
                     }
                     else if(res.data.length>50)  {
                         path('/');
                     }
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

