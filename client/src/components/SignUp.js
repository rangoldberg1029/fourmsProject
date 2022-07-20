import React, {useState} from 'react';
import axios from "axios";
import '../css/register.css'
import {useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie'

function SignUp() {
    const path = useNavigate();
    const [user_signup,set_user_signup]=useState({username:'',email:'',password:'',repeatPassword:''});
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

    function signupStmt(e){
        const { id, value } = e.target;
        set_user_signup(prevInput => {
            return {
                ...prevInput,
                [id]: value
            }
        })
    }


    function signupSubmit(e){
        e.preventDefault()
        if(user_signup.password!=user_signup.repeatPassword){
            alert("There is no match between passwords ")
            return;
        }

        const newUser={
            username:user_signup.username,
            password:user_signup.password,
            email:user_signup.email
        }
        axios.post("http://localhost:/fourmsProject/server/route/insertUsers.php",newUser)
            .then((res)=>{
                console.log(res.data);
                const data=res.data;
                if(data=="User already exists"){
                        alert(data);
                }else if(data=="NO") alert("Invalid email");
                else{
                    localStorage.setItem("token", res.data);
                    path("/login");
                }
            }).catch((e)=>{
            console.log(e);
        })
    }
    return (
        <div className="SignUp">
            <div className="d-flex justify-content-center h-100">
                <div className="card-login">
                    <div className="card-header">
                        <h3>Sign Up</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">
                                <input type="text" className="form-control" placeholder="username" id='username' onChange={signupStmt} value={user_signup.username}></input>
                            </div>
                            <div className="input-group form-group">
                                <input type="email" className="form-control" placeholder="Email" id='email' onChange={signupStmt} value={user_signup.email}  ></input>
                            </div>
                            <div className="input-group form-group">
                                <input type="password" className="form-control" placeholder="password " id='password' onChange={signupStmt} value={user_signup.password}  ></input>
                            </div>
                            <div className="input-group form-group">
                                <input type="password" className="form-control" placeholder="repassword " id='repeatPassword' onChange={signupStmt} value={user_signup.repeatPassword}  ></input>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn float-center mt-5 login_btn" onClick={signupSubmit}>Sign Up</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;


