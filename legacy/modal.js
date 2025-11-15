// Team member modal functionality
function showModal(memberId) {
  const modal = document.getElementById('teamModal');
  const modalDetails = document.getElementById('modalDetails');
  
  // Set content based on team member
  let content = '';
  
  switch(memberId) {
    case 'vaibhav':
      content = `
        <div class="modal-header-content">
          <img src="vaibhav.jpg" alt="Vaibhav - CEO" class="modal-avatar">
          <div class="modal-text-group">
            <h2>Vaibhav</h2>
            <p class="modal-role">Founder & CEO</p>
          </div>
        </div>
        <div class="modal-body-content">
          <p class="bio-text">Vaibhav is the visionary behind Happenin, bringing extensive experience in event management and technology.</p>
          <p class="bio-text">With a passion for creating seamless user experiences, he leads the team in developing innovative solutions for event discovery.</p>
          <div class="modal-social">
            <a href="https://www.linkedin.com/in/vaibhav-chawla-124019243/" target="_blank" class="social-link">
              <i class="fab fa-linkedin"></i> Connect on LinkedIn
            </a>
          </div>
        </div>
      `;
      break;
    case 'maanit':
      content = `
        <div class="modal-header-content">
          <img src="maanit.jpg" alt="Maanit - Developer" class="modal-avatar">
          <div class="modal-text-group">
            <h2>Maanit</h2>
            <p class="modal-role">Lead Developer</p>
          </div>
        </div>
        <div class="modal-body-content">
          <p class="bio-text">Maanit is the technical genius behind Happenin's platform, specializing in web development and system architecture.</p>
          <p class="bio-text">His expertise in creating scalable and efficient applications ensures that Happenin delivers a smooth experience for all users.</p>
          <div class="modal-social">
            <a href="https://www.linkedin.com/in/maanit-b62494332/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" class="social-link">
              <i class="fab fa-linkedin"></i> Connect on LinkedIn
            </a>
          </div>
        </div>
      `;
      break;
    case 'medhansh':
      content = `
        <div class="modal-header-content">
          <img src="medhansh.jpg" alt="Medhansh - UX Designer" class="modal-avatar">
          <div class="modal-text-group">
            <h2>Medhansh</h2>
            <p class="modal-role">Product & UX Design</p>
          </div>
        </div>
        <div class="modal-body-content">
          <p class="bio-text">Medhansh brings creative vision and user-centered design principles to Happenin, crafting intuitive and engaging interfaces.</p>
          <p class="bio-text">His focus on understanding user needs and behaviors helps shape Happenin into a platform that delights users at every interaction.</p>
          <div class="modal-social">
            <a href="https://www.linkedin.com/in/medhansh-bhoria-b9b494354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" class="social-link">
              <i class="fab fa-linkedin"></i> Connect on LinkedIn
            </a>
          </div>
        </div>
      `;
      break;
    default:
      content = '<p>Team member information not available.</p>';
  }
  
  modalDetails.innerHTML = content;
  modal.style.display = 'flex';
  
  // Add event listener to close when clicking outside
  window.addEventListener('click', closeModalOutside);
}

function closeModal() {
  const modal = document.getElementById('teamModal');
  modal.style.display = 'none';
  
  // Remove event listener
  window.removeEventListener('click', closeModalOutside);
}

function closeModalOutside(event) {
  const modal = document.getElementById('teamModal');
  if (event.target === modal) {
    closeModal();
  }
}