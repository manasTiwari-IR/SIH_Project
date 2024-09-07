import "./styles/AddSkills.css";
import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
function AddSkills(props) {
  const {user,updateUser}=useUser()
  const Language = [
    "C",
    "C#",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "Ruby",
    "PHP",
    "HTML",
    "CSS",
    "SQL",
    "Swift",
    "Kotlin",
    "Rust",
    "Go",
    "Dart",
    "Rust",
    "Go/Golang",
    "R",
    "Markdown",
  ];
  const Hosting_SaaS = [
    "Netlify",
    "Vercel",
    "Heroku",
    "GitHub Pages",
    "Firebase",
    "AWS",
    "Google Cloud",
    "Microsoft Azure",
    "DigitalOcean",
    "Vultr",
    "Linode",
    "IBM Cloud",
    "Alibaba Cloud",
    "Oracle Cloud",
  ];
  const Frameworks = [
    "React",
    "Angular",
    "Vue",
    "Svelte",
    "Ember",
    "Meteor",
    "Express",
    "Next.js",
    "Nuxt.js",
    "Gatsby",
    "Create React App",
    "Ionic",
    "Cordova",
    "Electron",
    "NW.js",
    "Flutter",
    "Xamarin",
    "PhoneGap",
    "Apache Cordova",
    "React Native",
    "NativeScript",
    "Remix",
    "Node.js",
    "Vite",
    "Parcel",
    "Webpack",
    "Socket.io",
    "Jquery",
    "Flutter",
    "Ionic",
    "Quasar",
    "Vuetify",
    "Bootstrap",
    "Materialize",
    "Tailwind CSS",
    "Ant Design",
    "Semantic UI",
    "Material-UI",
  ];
  const server = [
    "Apache",
    "Nginx",
    "Apache Airflow",
    "Apache Tomcat",
    "Apache Maven",
    "Apache Kafka",
    "Apache Ant",
    "Jenkins",
  ];
  const Database = [
    "MySQL",
    "PostgreSQL",
    "Cassandra",
    "MongoDB",
    "MariaDB",
    "Oracle Database",
    "Microsoft SQL Server",
    "Teardata",
    "Redis",
    "Firebase",
    "Supabase",
    "Prisma",
  ];
  const ML_DL = [
    "TensorFlow",
    "Keras",
    "PyTorch",
    "Scipy",
    "Numpy",
    "Pandas",
    "Scikit-learn",
    "Matplotlib",
    "MLflow",
  ];
  const Tools = [
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Apache Subversion",
    "Teamcity",
  ];
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const addSkill = (skill) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/');
    }
  }, [updateUser]);

  useEffect(() => {
  if (user && user.isCompany && localStorage.getItem("token")) {
    navigate('/error');
  }
}, [user]);
  
  const CheckCard = ({ PropName }) => {
    return (
      <div className="customCheckBoxHolder">
        <input
          type="checkbox"
          checked={skills.includes(PropName)}
          onChange={() => addSkill(PropName)}
          id={PropName}
          className="customCheckBoxInput"
        />
        <label htmlFor={PropName} className="customCheckBoxWrapper">
          <div className="customCheckBox">
            <div className="inner">{PropName}</div>
          </div>
        </label>
      </div>
    );
  };
  const onChange = (e) => {
    setDesc(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/addskills/adduserinfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AuthToken": localStorage.getItem('token')
        },
        body: JSON.stringify({
          description: desc,
          ProgrammingLang: skills,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      navigate("/search");
      props.showAlert("Successfully updated your User Information", "success");
    } else {
      props.showAlert("Fill all the details properly", "danger");
    }
  };
  return (
    <>
      <section className="add-skill-container">
        <div className="add-skills">
          <h1>Add more to your Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="skill_yesNo">
              <div className="form-group1">
                <label htmlFor="description">About Yourself :</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Write about yourself..."
                  value={desc}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="skillNo">
                Don't have any skills?
               <Link to='/'><button type="button">Learn Skills</button></Link> 
              </div>
            </div>
            <div className="form-group-skills">
              <h2>Select Your Skills</h2>
              <div className="skillset">
                <h3>Language</h3>
                <div className="skillset-cards">
                  {Language.map((lang, index) => (
                    <CheckCard key={index} PropName={lang} />
                  ))}
                </div>
              </div>
              <div className="skillset">
                <h3>Hosting & SaaS</h3>
                <div className="skillset-cards">
                  {Hosting_SaaS.map((lang, index) => (
                    <CheckCard key={index} PropName={lang} />
                  ))}
                </div>
              </div>
              <div className="skillset">
                <h3>Frameworks</h3>
                <div className="skillset-cards">
                  {Frameworks.map((lang, index) => (
                    <CheckCard key={index} PropName={lang} />
                  ))}
                </div>
              </div>
              <div className="skillset">
                <h3>Server</h3>
                <div className="skillset-cards">
                  {server.map((lang, index) => (
                    <CheckCard key={index} PropName={lang} />
                  ))}
                </div>
              </div>
              <div className="skillset">
                <h3>Database</h3>
                <div className="skillset-cards">
                  {Database.map((lang, index) => (
                    <CheckCard key={index} PropName={lang} />
                  ))}
                </div>
              </div>
              <div className="skillset">
                <h3>ML/DL</h3>
                <div className="skillset-cards">
                  {ML_DL.map((lang, index) => (
                    <CheckCard key={index} PropName={lang} />
                  ))}
                </div>
              </div>
              <div className="skillset">
                <h3>Tools</h3>
                <div className="skillset-cards">
                  {Tools.map((lang, index) => (
                    <CheckCard key={index} PropName={lang} />
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="AddSkillsBtn"
              onClick={() => {
                console.log(skills);
              }}
            >
              Add
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
export default AddSkills;
