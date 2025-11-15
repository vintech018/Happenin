import { useState } from 'react';
import { Link } from 'react-router-dom';

const teamMembers = {
  vaibhav: {
    name: 'Vaibhav',
    role: 'Founder & CEO',
    image: '/images/vaibhav.jpg',
    bio: [
      'Vaibhav is the visionary behind Happenin, bringing extensive experience in event management and technology.',
      'With a passion for creating seamless user experiences, he leads the team in developing innovative solutions for event discovery.'
    ],
    linkedin: 'https://www.linkedin.com/in/vaibhav-chawla-124019243/'
  },
  maanit: {
    name: 'Maanit',
    role: 'Lead Developer',
    image: '/images/maanit.jpg',
    bio: [
      'Maanit is the technical genius behind Happenin\'s platform, specializing in web development and system architecture.',
      'His expertise in creating scalable and efficient applications ensures that Happenin delivers a smooth experience for all users.'
    ],
    linkedin: 'https://www.linkedin.com/in/maanit-b62494332/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
  },
  medhansh: {
    name: 'Medhansh',
    role: 'Product & UX Design',
    image: '/images/medhansh.jpg',
    bio: [
      'Medhansh brings creative vision and user-centered design principles to Happenin, crafting intuitive and engaging interfaces.',
      'His focus on understanding user needs and behaviors helps shape Happenin into a platform that delights users at every interaction.'
    ],
    linkedin: 'https://www.linkedin.com/in/medhansh-bhoria-b9b494354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
  },
  shubham: {
    name: 'Shubham Bansal',
    role: 'Tester',
    image: '/images/Shubham.jpg',
    bio: [
      'Shubham ensures the quality and reliability of Happenin through comprehensive testing and quality assurance.',
      'His attention to detail helps maintain a bug-free and smooth user experience across all platforms.'
    ],
    linkedin: 'https://www.linkedin.com/in/medhansh-bhoria-b9b494354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
  }
};

export default function About() {
  const [selectedMember, setSelectedMember] = useState(null);

  const showModal = (memberId) => {
    setSelectedMember(memberId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = '';
  };

  const closeModalOutside = (e) => {
    if (e.target.id === 'teamModal') {
      closeModal();
    }
  };

  const member = selectedMember ? teamMembers[selectedMember] : null;

  return (
    <>
      <div className="container">
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input type="text" className="search-bar" placeholder="Search for events, movies, comedy shows..." />
        </div>
      </div>

      <main className="container about">
        <h1>About Happenin</h1>
        <p className="lead">Happenin is a modern event discovery platform inspired by local listings apps. We focus on showing nearby movies and live events (concerts & stand-up) with a clean, fast interface that helps you find entertainment quickly.</p>

        <section className="about-section">
          <h3><i className="fas fa-bullseye"></i> Our Mission</h3>
          <p>Make event discovery delightful and effortless. We curate and recommend events based on local popularity and trending activities in your area.</p>
        </section>

        <section className="about-section">
          <h3><i className="fas fa-cogs"></i> How It Works</h3>
          <p>Browse through our carefully selected movies and live events, filter by your preferences, and find the perfect entertainment option for any day of the week.</p>
        </section>

        <section className="about-section">
          <h3><i className="fas fa-code"></i> Built with</h3>
          <ul className="feature-list">
            <li><i className="fas fa-check-circle"></i> React & Modern Web Technologies</li>
            <li><i className="fas fa-check-circle"></i> Responsive design for all devices</li>
            <li><i className="fas fa-check-circle"></i> Fast-loading and accessible interface</li>
          </ul>
        </section>

        <section className="about-section team-section">
          <h3><i className="fas fa-users"></i> Our Team</h3>
          <p>We're a passionate team of developers, designers, and event enthusiasts working to bring you the best entertainment discovery experience.</p>
          
          <div className="team-wrapper">
            <h2 className="team-heading">Meet the Team</h2>
            <div className="team-grid">
              <div className="team-card" onClick={() => showModal('vaibhav')}>
                <img src="/images/vaibhav.jpg" alt="Vaibhav - CEO" className="team-avatar" />
                <h4>Vaibhav</h4>
                <p className="team-role">Founder & CEO</p>
                <a href="https://www.linkedin.com/in/vaibhav-chawla-124019243/" target="_blank" rel="noopener noreferrer" className="team-linkedin" onClick={(e) => e.stopPropagation()}>
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>

              <div className="team-card" onClick={() => showModal('maanit')}>
                <img src="/images/maanit.jpg" alt="Maanit - Developer" className="team-avatar" />
                <h4>Maanit</h4>
                <p className="team-role">Lead Developer</p>
                <a href="https://www.linkedin.com/in/maanit-b62494332/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="team-linkedin" onClick={(e) => e.stopPropagation()}>
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>

              <div className="team-card" onClick={() => showModal('medhansh')}>
                <img src="/images/medhansh.jpg" alt="Medhansh - UX Designer" className="team-avatar" />
                <h4>Medhansh</h4>
                <p className="team-role">Product & UX Design</p>
                <a href="https://www.linkedin.com/in/medhansh-bhoria-b9b494354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="team-linkedin" onClick={(e) => e.stopPropagation()}>
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>

              <div className="team-card" onClick={() => showModal('shubham')}>
                <img src="/images/Shubham.jpg" alt="Shubham - Tester" className="team-avatar" />
                <h4>Shubham Bansal</h4>
                <p className="team-role">Tester</p>
                <a href="https://www.linkedin.com/in/medhansh-bhoria-b9b494354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="team-linkedin" onClick={(e) => e.stopPropagation()}>
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <div 
          className="modal" 
          id="teamModal" 
          style={{ display: selectedMember ? 'flex' : 'none' }} 
          onClick={closeModalOutside}
        >
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            {member && (
              <div id="modalDetails">
                <div className="modal-header-content">
                  <img src={member.image} alt={`${member.name} - ${member.role}`} className="modal-avatar" />
                  <div className="modal-text-group">
                    <h2>{member.name}</h2>
                    <p className="modal-role">{member.role}</p>
                  </div>
                </div>
                <div className="modal-body-content">
                  {member.bio.map((para, idx) => (
                    <p key={idx} className="bio-text">{para}</p>
                  ))}
                  <div className="modal-social">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-linkedin"></i> Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
