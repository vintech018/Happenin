// Live event static data (overview, important info, seat maps, location links)
export const liveEventData = [
  {
    id: 1,
    slug: 'comedy-non-stop',
    link: 'comedynonstop.html',
    overview: 'Catch **Anubhav Singh Bassi** live for his acclaimed stand-up special, **Comedy Non-Stop**. Known for his relatable storytelling and sharp wit, Bassi guarantees an evening of non-stop laughter. This is an intimate club performance.',
    importantInfo: [
      'Doors open at 7:00 PM. Show starts at 8:00 PM.',
      'Age limit: 18+ (Mature content warning).',
      'Venue operates a no-tolerance policy on heckling.',
    ],
    seatMapImage: 'images/comedy_club_seat_map.png',
    seatMapText: 'The venue uses a General Admission (GA) layout with some reserved seating.',
    locationLink: null, // No Google Maps link found in original
    ticketCategories: [
      { category: 'Reserved Seating', price: 799 },
      { category: 'General Admission', price: 499 },
      { category: 'Standing/Entry', price: 299 },
    ],
    dates: ['Sep 25, 8:00 PM', 'Sep 26, 8:00 PM'],
  },
  {
    id: 2,
    slug: 'chandigarh-comedy-carnival',
    link: 'chandigarh.html',
    overview: 'The **Chandigarh Comedy Carnival** brings together a massive lineup of over 15 national stand-up artists, including **Abhishek Upmanyu**, **Appurv Gupta**, and **Manish Tyagi**. Held at the spacious **Kalagram**, expect a night of diverse and brilliant humor.',
    importantInfo: [
      'Gates open at 6:00 PM. Show starts at 7:30 PM.',
      'Seating is allocated based on ticket category.',
      'Event Duration: ~3 hours. Intermission provided.',
    ],
    seatMapImage: 'images/comedy_club_seat_map.png',
    seatMapText: 'Please refer to the seating map for allocated zones.',
    locationLink: null, // No Google Maps link found in original
    ticketCategories: [
      { category: 'VIP', price: 1500 },
      { category: 'Premium', price: 1000 },
      { category: 'General', price: 500 },
    ],
    dates: ['Oct 10, 7:30 PM'],
  },
  {
    id: 3,
    slug: 'imagine-dragons-live',
    link: 'imaginedragons.html',
    overview: 'The <b>Imagine Dragons World Tour</b> comes to India! Experience a night of powerful anthems and electrifying energy at the Bengaluru Stadium. Don\'t miss hits like "Radioactive," "Believer," and "Thunder."',
    importantInfo: [
      'Gates open at 5:00 PM. Show starts at 7:30 PM.',
      'Physical ID proof is mandatory for entry.',
      'Outside food and drinks are strictly prohibited.',
    ],
    seatMapImage: null,
    seatMapText: null,
    locationLink: 'https://www.google.com/maps/search/?api=1&query=M.+Chinnaswamy+Stadium,+Bengaluru',
    ticketCategories: [
      { category: 'VIP', price: 4999 },
      { category: 'Premium', price: 2999 },
      { category: 'General', price: 1999 },
    ],
    dates: ['Sep 12, 7:30 PM', 'Sep 13, 7:30 PM'],
  },
  {
    id: 4,
    slug: 'komedi-nights-laugh-riot',
    link: 'comedynights.html',
    overview: '**Komedi Nights** presents a laugh riot featuring top comedians from across India. Get ready for an evening of side-splitting humor and unforgettable performances.',
    importantInfo: [
      'Doors open at 7:00 PM. Show starts at 8:00 PM.',
      'Age limit: 18+',
      'Seating is on a first-come, first-served basis.',
    ],
    seatMapImage: null,
    seatMapText: null,
    locationLink: 'https://maps.google.com/?cid=16478440139612043660&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl',
    ticketCategories: [
      { category: 'VIP', price: 1299 },
      { category: 'Premium', price: 999 },
      { category: 'General', price: 799 },
    ],
    dates: ['Sep 18, 8:00 PM'],
  },
  {
    id: 5,
    slug: 'edm-sunset-fest',
    link: 'goa.html',
    overview: 'Experience the ultimate EDM festival at **Sunset Beach, Goa**. Dance to the beats of top DJs as the sun sets over the Arabian Sea. A night you won\'t forget!',
    importantInfo: [
      'Gates open at 4:00 PM. Music starts at 6:00 PM.',
      'Age limit: 18+',
      'Access to designated areas based on ticket category.',
    ],
    seatMapImage: 'images/sunset.jpg_large',
    seatMapText: 'Access to designated areas based on ticket category.',
    locationLink: 'https://www.google.com/maps/place/Sunset+Beach/@15.3013726,73.9022788,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfb693c3c7ebe1:0x881ca26490ed4697!8m2!3d15.3012749!4d73.9049348!16s%2Fg%2F1thl3wdd?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D',
    ticketCategories: [
      { category: 'VIP', price: 3999 },
      { category: 'Premium', price: 2999 },
      { category: 'General', price: 2499 },
    ],
    dates: ['Oct 5, 6:00 PM'],
  },
  {
    id: 6,
    slug: 'coldplay-world-tour',
    link: 'coldplay.html',
    overview: '**Coldplay** brings their spectacular world tour to India! Experience their greatest hits live at the Jawaharlal Nehru Stadium in Delhi. A night of music, lights, and unforgettable memories.',
    importantInfo: [
      'Gates open at 5:00 PM. Show starts at 7:00 PM.',
      'Physical ID proof is mandatory.',
      'Parking available on-site (charges apply).',
    ],
    seatMapImage: 'images/coldplay_map.png',
    seatMapText: 'Click on the map to view category zones (map coming soon).',
    locationLink: 'https://www.google.com/maps/place/Jawaharlal+Nehru+Stadium,+Pragati+Vihar,+New+Delhi,+Delhi/@28.5829317,77.2322887,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce2fecce102e9:0xaaf909019bf5f533!8m2!3d28.5833047!4d77.2333304!16s%2Fg%2F12hk6rq57?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D',
    ticketCategories: [
      { category: 'VIP', price: 5999 },
      { category: 'Premium', price: 4499 },
      { category: 'General', price: 3500 },
    ],
    dates: ['Oct 15, 7:00 PM'],
  },
  {
    id: 7,
    slug: 'samay-raina-comedy-club-special',
    link: 'Samay.html',
    overview: '**Samay Raina** brings his unique brand of comedy to The Comedy Store, Pune. Known for his chess-themed humor and quick wit, this is a show you don\'t want to miss!',
    importantInfo: [
      'Doors open at 7:00 PM. Show starts at 8:00 PM.',
      'Age limit: 18+',
      'Seats are on a first-come, first-served basis within the selected category.',
    ],
    seatMapImage: 'images/comedy_clubhouse.png',
    seatMapText: 'Seats are on a first-come, first-served basis within the selected category.',
    locationLink: 'https://www.google.com/maps/place/The+Comedy+Clubhouse/@18.5737309,73.7715768,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b95b1503401f:0xf4727e16ff189c12!8m2!3d18.5737258!4d73.7741571!16s%2Fg%2F11s8jwcgth?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D',
    ticketCategories: [
      { category: 'VIP', price: 999 },
      { category: 'Premium', price: 799 },
      { category: 'General', price: 599 },
    ],
    dates: ['Sep 30, 8:00 PM'],
  },
  {
    id: 8,
    slug: 'classical-music-festival',
    link: 'classical.html',
    overview: 'Experience the finest in classical music at the **Music Academy, Chennai**. Featuring renowned musicians and orchestras, this festival celebrates the rich heritage of Indian classical music.',
    importantInfo: [
      'Doors open at 6:00 PM. Performance starts at 7:00 PM.',
      'All ages welcome.',
      'Allocated seating based on category.',
    ],
    seatMapImage: 'images/classic.jpg',
    seatMapText: 'Allocated seating based on category.',
    locationLink: 'https://www.google.com/maps/place/The+Music+Academy/@13.0458058,80.2545035,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52675f806bace1:0xf0be2a0e0d90273a!8m2!3d13.0458006!4d80.259369!16s%2Fg%2F11nxv2_chw?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D',
    ticketCategories: [
      { category: 'VIP', price: 1999 },
      { category: 'Premium', price: 1499 },
      { category: 'General', price: 1200 },
    ],
    dates: ['Nov 2, 7:00 PM'],
  },
];

export const getLiveEventBySlug = (slug) => liveEventData.find(e => e.slug === slug) || null;
export const getLiveEventById = (id) => liveEventData.find(e => e.id === parseInt(id)) || null;

