// live-events.js

document.addEventListener('DOMContentLoaded', function() {
    // The JSON Server will run on port 3000 by default
    const API_URL = 'http://localhost:3000/liveEvents';
    const eventGrid = document.getElementById('liveEventGrid');
    const categoryLinks = document.querySelectorAll('#categoryNav .category-item');
    let allEventsData = [];

    // Helper to format currency
    function formatCurrency(amount) {
        // Assuming ₹ is the currency symbol based on other files
        return `₹${Math.round(amount).toLocaleString('en-IN')}`;
    }

    // --- Core Rendering Function ---
    function renderEvents(events) {
        let eventsHTML = "";
        if (events.length === 0) {
            eventGrid.innerHTML = "<p class='loading-text'>No events found for this category. Try selecting 'All'.</p>";
            return;
        }

        events.forEach(event => {
            eventsHTML += `
                <a href="${event.link}" class="tile-link">
                    <article class="tile">
                        <div class="thumb">
                            <img src="${event.image}" alt="${event.title}">
                            <span class="date-badge">${event.date}</span>
                            <span class="category-badge">${event.category}</span>
                        </div>
                        <h4>${event.title}</h4>
                        <p class="muted">${event.location}</p>
                        <div class="price-row">
                            <span class="price">${formatCurrency(event.price)} onwards</span>
                            <span class="discount">${event.discount}</span>
                        </div>
                    </article>
                </a>
            `;
        });
        eventGrid.innerHTML = eventsHTML;
    }

    // --- New Feature: Dynamic Filtering Logic ---
    function filterEvents(category) {
        let filteredEvents = allEventsData;
        
        if (category !== "All") {
            filteredEvents = allEventsData.filter(event => event.category === category);
        }
        
        renderEvents(filteredEvents);
    }
    
    // Attach click listeners to category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active class for styling
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterEvents(category);
        });
    });

    // --- Data Fetching from JSON Server ---
    async function fetchEvents() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                // Throw error if the server is not reachable or endpoint is wrong
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Store all fetched data globally
            allEventsData = await response.json();
            
            // Render all events initially
            renderEvents(allEventsData);
        } catch (error) {
            console.error('Error fetching data from JSON server:', error);
            eventGrid.innerHTML = `<p class='loading-text' style="color: var(--primary-dark);">
                                    ❌ Error loading events. Please ensure the JSON server is running.<br>
                                    Try running: <code>json-server --watch db.json</code>
                                  </p>`;
        }
    }
    
    // --- Initialization ---
    fetchEvents();
});