import React from "react";
import './styles/createPost.css'

function CreatePost() {

    return (
        <>

            <section className="createPost">
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
                <div className="createPostForm">
                    <div className="createPostHeading">Create a Post</div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="CompanyName">Company Name :</label>
                            <input type="text" className="form-control" minLength={8} id="CompanyName" placeholder="Enter Company's Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Job/Internship Description :</label>
                            <textarea name="description" id="description" placeholder="Description of Job/Intership" required ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Job/Internship Location :</label>
                            <input className="form-control" id="location" placeholder="Remote/Hybrid/Offline" required ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email :</label>
                            <input type="email" className="form-control" id="email" placeholder="abdce@company.com" required ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactNumber">Contact Number :</label>
                            <input type="tel" className="form-control" id="contactNumber"
                                minLength={10}
                                maxLength={10} placeholder="Enter contact number" required ></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </section>

        </>
    );
}
export default CreatePost;