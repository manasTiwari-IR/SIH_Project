import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './styles/createPost.css'
import { useUser } from "../context/UserContext";

function CreatePost(props) {
    const {user,updateUser}=useUser()
    const [Info, setInfo] = useState({
        CompanyName:"",
        Description:"",
        location:"",
        CompanyEmail:"",
        ContactNum:0,
      });
      const navigate=useNavigate()
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/jobposting/createpost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "AuthToken": localStorage.getItem('token')
          },
          body: JSON.stringify({
            CompanyName: Info.CompanyName,
            description: Info.Description,
            joblocation: Info.location,
            contactEmail: Info.CompanyEmail,
            contactNumber: Info.ContactNum,
          }),
        });
        const json = await response.json();
        if (json.success) {
            navigate('/')
          props.showAlert("Successfully created a JOB POST", "success");
        } else {
          props.showAlert("Invalid Details try again", "danger");
        }
      };
      const onChange = (e) => {
        setInfo({ ...Info, [e.target.name]: e.target.value });
      };
      useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate('/');
        }
      }, [updateUser]);


      useEffect(() => {
        if (user && !user.isCompany && localStorage.getItem("token") ) {
          navigate('/error');
        }
      }, [user]);
    return (
        <>
            <section className="createPost">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
                <div className="createPostForm">
                    <div className="createPostHeading">Create a JOB Post</div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="CompanyName">Company Name :</label>
                            <input type="text" className="form-control" minLength={3} id="CompanyName" name="CompanyName" placeholder="Enter Company's Name" required 
                            onChange={onChange}
                            value={Info.CompanyName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Job/Internship Description :</label>
                            <textarea name="Description" id="description" placeholder="Description of Job/Intership"  required onChange={onChange}
                            value={Info.Description}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Job/Internship Location :</label>
                            <input className="form-control" id="location" placeholder="Remote/Hybrid/Offline" required name="location" onChange={onChange}
                            value={Info.location}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email :</label>
                            <input type="email" className="form-control" id="email" placeholder="abdce@company.com" name="CompanyEmail" required 
                            onChange={onChange}
                            value={Info.CompanyEmail}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactNumber">Contact Number :</label>
                            <input type="tel" className="form-control" id="contactNumber"
                                minLength={10}
                                maxLength={10} placeholder="Enter contact number" 
                                onChange={onChange}
                                value={Info.ContactNum}
                                name="ContactNum"
                                required ></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </section>

        </>
    );
}
export default CreatePost;