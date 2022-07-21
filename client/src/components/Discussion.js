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
       const newDiscussion={
            post:discussion.post,
           parent_comment:0,
           date:Date.now(),
           user:discussion.user
       }


        axios.post("http://localhost:/fourmsProject/server/route/insertDiscussion.php",newDiscussion,{
            headers: {
                token:"bearer "+localStorage.getItem("token")
            }
        })
            .then((res)=>{

                const data=res.data;
                console.log(data)
                if(res.status===401){
                    alert("Bad req");
                    return;
                }else if(data=="NO"){alert("Bad req"); return}
                else{console.log("Good req")}
            })
    }


    return(
        <div className="panel panel-default" style={{marginTop:"50px"}}>
            <div className="panel-body">
                <h3>Community forum</h3>
                <form >
                    <div className="form-group">
                        <label htmlFor="comment">Write your post:</label>
                        <textarea className="form-control" rows="5" id="post" onChange={handelPost} value={discussion.post}></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Send" onClick={submit}></input>
                </form>
            </div>
        </div>
    )
}

export default Discussion;