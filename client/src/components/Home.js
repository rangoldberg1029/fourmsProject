import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate,useLocation  } from "react-router-dom";
import axios from 'axios'
import '../css/homeStyle.css'


function Home() {
    const path = useNavigate();
    const [forum, setForum] = useState([{ id:'',post: 'Realtime fetching data', parent_comment: '', date: Date }]);
    const[user,setUser]=useState({username:'',email:''})
    const [flag,setFlag]=useState(true);



    useEffect(() => {
        if(window.localStorage.getItem("username")!="null"){
            const login_user={username:window.localStorage.getItem("username"),email:window.localStorage.getItem("email")};
            setUser(login_user);
        }
        axios.get("http://localhost:/fourmsProject/server/route/getForum.php")
            .then((res) => {
                const data = res.data;
                console.log(data);
                setForum(data);

            }).catch((err) => {
                console.log(err);
            })

    }, [])

    function postData(){
        if(!flag){
            alert("cant ")
        }else {
            window.localStorage.setItem("iddd",forum.id)
            path("/new");
        }

    }



    return (
        <div className="container">
            <div className="main-body p-0">
                <div className="inner-wrapper">
                    <div className="inner-sidebar">
                        <div className="inner-sidebar-header justify-content-center">
                            <button className="btn btn-primary has-icon btn-block" type="button" data-toggle="modal"
                                    data-target="#threadModal" hidden={!flag} onClick={()=>{path("/edit")}}  >
                                NEW DISCUSSION
                            </button>
                        </div>
                        <div className="simplebar-content">
                            <nav className="nav nav-pills nav-gap-y-1 flex-column">
                                <a href="/" className="nav-link nav-link-faded has-icon active">All Threads</a>
                                <a href="/edit" className="nav-link  has-icon ">Account</a>
                                <button  className=" nav-link  has-icon btn btn-link " hidden={!flag} onClick={()=>{setFlag(false); setUser({username:'',email:''})}}>Logout</button>
                                <button  className="nav-link  has-icon btn btn-link" hidden={flag} onClick={()=>{setFlag(true);path('/login')}}>Register</button>
                            </nav>
                        </div>
                    </div>

                    <div className="inner-main" >
                        <div className="inner-main-header ">
                            <h3>Welcome {user.username}</h3>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <table className="table" id="MyTable" style={{backgroundColor: "#edfafa",border:"0px",borderRadius:"10px"}} >
                                    <tbody id="record">
                    {forum.map((commen) => {
                        return (
                            <div className="">
                            <div className="" style={{paddingLeft:"0px"}}>
                            <tr >
                                <td >
                                    <b>
                                        <img src="../avatar.jpg" width="30px" height="30px" />
                                        <i> {commen.date} </i>
                                    </b>
                                    <p style={{paddingLeft:"40px"}} >
                                        {commen.post}
                                         <button className="btn btn-link" onClick={postData}> reply</button>
                                    </p>
                                </td>
                            </tr>
                            </div>
                        {forum.map((reply)=>{
                                                    if(reply.parent_comment==commen.id)return (
                                                        <div>

                                                        <tr>
                                                            <td style={{paddingLeft:"80px"}}>
                                                                <b>
                                                                    <img src="../avatar.jpg" width="30px" height="30px" />
                                                                <i> {reply.date} </i>
                                                                </b>
                                                                <p style={{paddingLeft:"40px"}}>
                                                                    {reply.post}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        </div>
                                                    )
                                                })}


                            </div>

                                    // <div className="card mb-2 p-2">
                                    //     <div className="card-body p-3 p-sm-3">
                                    //         <div className="media forum-item">
                                    //             <a href="/" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                                    //             <div className="media-body">
                                    //                 <h6><a href="/" data-toggle="collapse" data-target=".forum-content" className="text-body" >{commen.post}</a></h6>
                                    //                 <p className="text-secondary  " >
                                    //                     {forum.map((reply)=>{
                                    //                         if(reply.parent_comment==commen.id)return (
                                    //                             reply.post
                                    //                         )
                                    //                     })}
                                    //                 </p>
                                    //
                                    //                 <p className="text-muted  "> <button className="btn btn-link"> reply</button> <span className="text-secondary font-weight-bold p-2" >{commen.date}</span></p>
                                    //
                                    //
                                    //
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </div>
                        )
                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home

