import { useState, useEffect, useRef } from 'react'; // Import useRef
import './App.css';
import emailjs from '@emailjs/browser'; // Import EmailJS

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEnvelope, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
// Import social media icons
import { faFacebook, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import imagePic from './elijah.jpg'; // Import your image



function App( ) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState(''); 

  
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'React', 'JavaScript', 'PHP', 
    'HTML', 'CSS',  'MySQL', 
    'PostgreSQL', 'Python', 'Java', 
    'Bootstrap', 'Laravel', 'Django'
  ];

  // Refs for each section to observe
  const skillsSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  // State to control visibility of each section
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  // State for modal visibility
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  // Sample project data
  const projectWebsites = [
    { name: 'Mental Health System', url: 'https://mindcare.liveblog365.com' },
    { name: 'Student Learning Platform', url: 'https://kalosa0770.github.io/Cuzita/' },
    { name: 'GemConnect', url: '#' },
    { name: 'Portfolio Website', url: 'https://kalosa0770.github.io/personal-website/' }
  ];


  useEffect(() => {
    // Slideshow interval
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 3000);

    // Intersection Observer for sections
    const observerOptions = {
      root: null, // relative to the viewport
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add 'is-visible' class when section enters viewport
          if (entry.target.classList.contains('skillsSection')) {
            setSkillsVisible(true);
          } else if (entry.target.classList.contains('projectsSection')) {
            setProjectsVisible(true);
          } else if (entry.target.classList.contains('contactSection')) {
            setContactVisible(true);
          }
          // Optionally, unobserve after animation if it only needs to play once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe each section
    if (skillsSectionRef.current) observer.observe(skillsSectionRef.current);
    if (projectsSectionRef.current) observer.observe(projectsSectionRef.current);
    if (contactSectionRef.current) observer.observe(contactSectionRef.current);

    // Cleanup function for both interval and observer
    return () => {
      clearInterval(slideInterval);
      if (skillsSectionRef.current) observer.unobserve(skillsSectionRef.current);
      if (projectsSectionRef.current) observer.unobserve(projectsSectionRef.current);
      if (contactSectionRef.current) observer.unobserve(contactSectionRef.current);
    };
  }, [slides.length]); // Dependency array for useEffect

  //button click handlers
  const handleViewProjects = () => {
    projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' });

  }

  const viewProjects = () => {
    setShowProjectsModal(true); // Show the modal when button is clicked
  };
  
  const handleCloseProjectsModal = () => {
    setShowProjectsModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    setFormStatus('Sending...'); // Provide immediate feedback

    // Your EmailJS Service ID, Template ID, and Public Key
    const serviceId = 'service_8x442th'; // Replace with your Service ID from EmailJS
    const templateId = 'template_lpqcs6g'; // Replace with your Template ID from EmailJS
    const publicKey = 'fMpM8htlf4bIRg3np'; // Replace with your Public Key from EmailJS Account

    const templateParams = {
      user_name: name,    // Must match template variables (e.g., {{user_name}})
      user_email: email,  // Must match template variables (e.g., {{user_email}})
      message: message,   // Must match template variables (e.g., {{message}})
      to_email: 'kalosaelijah3@gmail.com' // Optional: if your template needs a 'to' address
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus('You have contacted Elijah Kalosa, thank you! 🎉');
        // Clear form fields after submission
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setFormStatus('Failed to contact Elijah Kalosa. Please try again later. 😥');
      });
  };

  return (
    <div className="Container">
      <header className='header'>
        <h2 className='myName'><FontAwesomeIcon icon={faCode} /> Elijah Kalosa <FontAwesomeIcon icon={faCode} /></h2>
        <div className='menuBar'>
          <ul className='menuList'>
            <li className='menuItem'>Home</li>
            <li className='menuItem'>About</li>
            <li className='menuItem'>Projects</li>
            <li className='menuItem'>Contact</li>
          </ul>
        </div>
      </header>
      <main className='mainContent'>
        <section className='introduction'>
          <h3 className='cTA'>
            Meet Elijah Kalosa, a developer proficient in <div className='slideShow'>
              {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                  {slide}
                </div>
              ))}
            </div>
          </h3>
        </section>

        {/* The aboutMe section is now static (not animated on scroll) */}
        <section className='aboutMe'>
          <h3 className='aboutHeading'>About Me</h3> {/* New heading */}
          <p className='aboutText'>
            I am a fullstack developer that builds web applications, 
            I am passionate about creating clean and effective code.
          </p>
          <div className='contactDetails'>
            <p><FontAwesomeIcon icon={faEnvelope} /> kalosaelijah3@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> +260770940809</p>
          </div>
          <div className='buttons'>
            <button className='btn'onClick={handleViewProjects}>View Projects</button>
            <button className='btn'>View CV</button>
          </div>
          <div className='socialLinks'>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='socialLink'><FontAwesomeIcon icon={faFacebook} /></a>
            <a href='https://wa.me/260770940809' target='_blank' rel='noopener noreferrer' className='socialLink'><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href='https://www.linkedin.com/in/elijah-kalosa' target='_blank' rel='noopener noreferrer' className='socialLink'><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </section>

        {/* Image section is now after aboutMe, and also static */}
        <section className='imageSection'>
          <img src={imagePic} alt='Elijah Kalosa' className='profileImage' />
        </section>
        
        {/* These sections will slide in on scroll */}
        <section 
          className={`skillsSection ${skillsVisible ? 'is-visible' : ''}`} 
          ref={skillsSectionRef}
        >
          <h3 className='skillsHeading'>Skills</h3>
          <ul className='skillsList'>
            <li className='skillItem'>React</li>
            <li className='skillItem'>JavaScript</li>
            <li className='skillItem'>PHP</li>
            <li className='skillItem'>HTML</li>
            <li className='skillItem'>CSS</li>
            <li className='skillItem'>MySQL</li>
            <li className='skillItem'>PostgreSQL</li>
            <li className='skillItem'>Python</li>
            <li className='skillItem'>Java</li>
            <li className='skillItem'>Bootstrap</li>
            <li className='skillItem'>Laravel</li>
            <li className='skillItem'>Django</li>
          </ul>
        </section>

        <section 
          className={`projectsSection ${projectsVisible ? 'is-visible' : ''}`} 
          ref={projectsSectionRef}
        >
          <h3 className='projectsHeading'>Projects</h3>
          <p className='projectsText'>
            Check out my projects on GitHub and in live show to see my work in action.
          </p>
          
            <a href='https://github.com/kalosa0770' target='_blank' rel='noopener noreferrer' className='projectsLink'>
              View on GitHub
            </a>
            <button className='projectsLink' onClick={viewProjects}>
              View in Live Show
            </button>
            
        </section>

         {/* Projects Modal */}
        {showProjectsModal && (
          <div className={`modal-overlay ${showProjectsModal ? 'active' : ''}`}>
            <div className="modal-content">
              <button className="modal-close-button" onClick={handleCloseProjectsModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h3 className="modal-heading">My Live Projects</h3>
              <ul className="project-links-list">
                {projectWebsites.map((project, index) => (
                  <li key={index} className="project-link-item">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="modal-note">
                Note: These are sample links. 
              </p>
            </div>
          </div>
        )}

        <section 
          className={`contactSection ${contactVisible ? 'is-visible' : ''}`} 
          ref={contactSectionRef}
        >
          <h3 className='contactHeading'>Contact Me</h3>    
          <p className='contactText'>
            If you want to hire me, have any questions or want to collaborate, feel free to reach out!
          </p>
          <form className='contactForm' onSubmit={handleSubmit}>
          <input 
            type='text' 
            placeholder='Your Name' 
            className='contactInput' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
          <input 
            type='email' 
            placeholder='Your Email' 
            className='contactInput' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <textarea 
            placeholder='Your Message' 
            className='contactTextarea' 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type='submit' className='contactButton'>Send Message</button>
        </form>
        {formStatus && <p className="form-status">{formStatus}</p>} {/* Display status message */}
        </section>  
        <section className='footer'>
          <p className='footerText'>
            &copy;
            {
              new Date().getFullYear() > 2025 ?
              ` ${new Date().getFullYear()}` :
              ' 2025'
            }. Developed by Elijah Kalosa <FontAwesomeIcon icon={faCode} /> , all rights reserved.</p>
        </section>
        
      </main>
     
    </div>
  );
}

export default App;

