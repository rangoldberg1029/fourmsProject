import React, {useState} from 'react';
import axios from "axios";
import {useLocation} from "react-router-dom";


function Discussion() {
    const[discussion,setDiscussion]=useState({post: '', parent_comment: '', date: Date,user:''})
    const location=useLocation();
    function handelPost(e){
        const { id, value } = e.target;
        setDiscussion(prevInput => {
            return {
                ...prevInput,
                [id]: value
            }
        })
    }
    function submit(e){
        e.preventDefault()
        console.log(window.localStorage.getItem("id"))
       const newDiscussion={
            post:discussion.post,
           parent_comment:window.localStorage.getItem("iddd"),
           date:Date.now(),
           user:discussion.user,
           token:localStorage.getItem("token")
       }
        axios.post("http://localhost:/fourmsProject/server/route/insertDiscussion.php",newDiscussion)
            .then((res)=>{
                console.log(res.data);
            })
    }


    return(
        <div className="panel panel-default" style={{marginTop:"50px"}}>
            <div className="panel-body">
                <h3>Community forum</h3>
                <form >
                    <div className="form-group">
                        <label htmlFor="usr">Write your name:</label>
                        <input type="text" className="form-control" id="user" onChange={handelPost} value={discussion.user}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Write your question:</label>
                        <textarea className="form-control" rows="5" id="post" onChange={handelPost} value={discussion.post}></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Send" onClick={submit}></input>
                </form>
            </div>
        </div>
    )
}

export default Discussion;