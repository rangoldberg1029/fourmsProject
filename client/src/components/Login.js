import React, {useState} from 'react';
import axios from "axios";
import '../css/register.css'
import {useNavigate  } from "react-router-dom";



function Login() {
    const path = useNavigate();

    const [user_login,set_user_login]=useState({username:'',email:'',password:''});
    const [error, setError] = useState("");

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
            axios.get("http://localhost:/fourmsProject/server/route/getUser.php",{ params: {
                    email:user_login.email,
                    password:user_login.password
                }
            })
                .then((res)=>{
                     const data=res.data;
                     console.log(data);

                    if(res.data!=""){
                        setError("");
                        set_user_login(data);
                        window.localStorage.setItem("username",data.username);
                        window.localStorage.setItem("email",data.email);

                        path('/');//check how to pass user to home page
                       // alert("The connection was successful");
                    }else
                    setError("email or password worng");

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
                    <div>
                        <h6 className="error">{error}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

}

export default Login;

