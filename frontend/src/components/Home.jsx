import { Link } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  return (
    <section className="home">
      <div className="HomeContent">
        <div className="HomeQuote">Evolve Your Career</div>
        <Link to={localStorage.getItem('token') ? "/search" : "/signup"} className="start">
          Get Started
          <div className="arrow">
            <lord-icon
              src="https://cdn.lordicon.com/vduvxizq.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Home;
