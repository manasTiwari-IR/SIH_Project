import { Link } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  return (
    <div className="App">
    {/* Hero Section */}
    <section className="hero">
      <h1>Get Hired and Create Job</h1>
      <h2>Unlock your potential and land your dream job today!</h2>
      <Link to={localStorage.getItem('token') ? "/search" : "/signup"} className="start"><button className="buttongetstart">
        <span className="buttongetstart-content">Get Started </span>
      </button></Link>
      
      <Link />
      <div className="cta">
        <span>Join us now and start your journey towards success!</span>
      </div>
    </section>

    {/* Card Container */}
    <section className="card-section">
      <div className="card-container">
        <div className="card">
          <h3>Available Jobs</h3>
          <p>Find the latest job openings in your field and apply directly. Our platform features a wide range of positions, from entry-level to executive roles, to match your skills and career aspirations.</p>
        </div>
        <div className="card">
          <h3>Available Courses</h3>
          <p>Enhance your skills with our curated list of courses. Whether you're looking to improve in tech, marketing, or management, we offer comprehensive courses to help you advance your career.</p>
        </div>
        <div className="card">
          <h3>Resume and CV Help</h3>
          <p>Get expert advice on crafting a standout resume or CV. Our resources and tips will guide you through creating a document that highlights your strengths and catches employers' attention.</p>
        </div>
        <div className="card">
          <h3>Guidance</h3>
          <p>Receive personalized guidance on career development. From interview tips to job search strategies, we provide the support you need to succeed in your professional journey.</p>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section className="about">
      <div className="about-content">
        <img src="https://r.mobirisesite.com/677608/assets/images/gee1f225b67799c0f08a16d0f4632-h_m0rvewe0.png" alt="About Us" />
        <div className="description">
          <h2>Who We Are</h2>
          <p>Welcome to INTERNet, where we turn job seekers into job finders! Our mission is to connect you with opportunities that make your heart race and your bank account smile. Forget the boring job boards; we’re here to spice things up!</p>
          <p>We believe that learning should be as fun as a rollercoaster ride. Our platform offers a treasure trove of skills that are not just recommended but are essential for conquering the job market.</p>
          <p>Join our community of go-getters and dream-chasers and you’ll be well on your way to landing that job you’ve always wanted. Let’s make your career journey unforgettable!</p>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="faq">
      <h2>Got Questions?</h2>
      <div className="faq-container">
        <div className="faq-card">
          <h3>How do I get started?</h3>
          <p>Sign up, choose a plan, and start learning!</p>
        </div>
        <div className="faq-card">
          <h3>What skills can I learn here?</h3>
          <p>From coding to marketing, we cover it all!</p>
        </div>
        <div className="faq-card">
          <h3>Can I change my plan later?</h3>
          <p>Yes, you can change your plan at any time.</p>
        </div>
        <div className="faq-card">
          <h3>How often is new content added?</h3>
          <p>Weekly! We keep it fresh and exciting!</p>
        </div>
      </div>
    </section>
  </div>
);
}

export default Home;