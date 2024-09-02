// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { useState } from 'react'
import Logo from '/src/assets/careerLogo (1).png'
import '/src/components/Firstpage/Firstpage.css'
function FirstPage() {
    return (
        <section className="home">
            <nav className='Bar1' >
                <img src={Logo} alt="logo" />
            </nav>
            <div className="HomeContent" >
                <div className="HomeQuote">Evolve Your Career</div>
                <button>Get Started</button>
            </div>
        </section>
    )
}

export default FirstPage