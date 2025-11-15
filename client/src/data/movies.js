// Movie data configuration matching the original HTML pages
export const movieData = {
  'deadpool': {
    title: 'Deadpool & Wolverine',
    year: '2024',
    genre: 'Action, Comedy, Sci-Fi',
    rating: '8.1',
    poster: 'images/deadpool.jpg',
    releaseDate: 'July 26, 2024',
    director: 'Shawn Levy',
    stars: 'Ryan Reynolds, Hugh Jackman',
    studio: 'Marvel Studios (MCU)',
    trailer: 'https://www.youtube.com/embed/73_1biulkYk',
    description: 'The next installment in the MCU featuring **Deadpool** as he gets sucked into the timeline by the Time Variance Authority (TVA). Forced together, the chaotic hero must team up with a reluctant, grizzled **Wolverine** for a multiverse-spanning adventure. The film promises blood-soaked action and signature fourth-wall breaks.',
    venue: 'TVA Cinema, New York',
    dates: ['Jul 26', 'Jul 27', 'Jul 28'],
    showtimes2D: ['11:30 AM', '02:45 PM', '06:00 PM', '09:15 PM'],
    showtimesIMAX: ['04:00 PM', '10:30 PM'],
    ticketPrices: [
      { category: 'Standard (2D)', price: 250 },
      { category: 'Premium (2D)', price: 350 },
      { category: 'IMAX 3D', price: 450 }
    ],
    defaultPrice: 250
  },
  'venom': {
    title: 'Venom: The Last Dance',
    year: '2024',
    genre: 'Action, Sci-Fi',
    rating: '6.0',
    poster: 'images/venom.jpg',
    releaseDate: '2024',
    director: 'Kelly Marcel',
    stars: 'Tom Hardy, Chiwetel Ejiofor, Juno Temple',
    studio: 'Sony Pictures',
    trailer: 'https://www.youtube.com/embed/__2bjWbetsA',
    description: 'Tom Hardy returns as **Eddie Brock** for the final film in the trilogy. Eddie and **Venom** are on the run, hunted by both of their worlds. With the net closing in, the duo is forced into a devastating decision that will bring the curtains down on their last dance, as they face the threat of a creature known as a Xenophage and a government operation tracking symbiotes.',
    venue: 'Cinema Hall',
    dates: ['Today', 'Tomorrow', 'Day After'],
    showtimes2D: ['10:30 AM', '1:00 PM', '4:30 PM', '7:30 PM', '10:00 PM'],
    showtimesIMAX: [],
    ticketPrices: [
      { category: 'Standard', price: 320 }
    ],
    defaultPrice: 320
  },
  'joker': {
    title: 'Joker: Folie à Deux',
    year: '2024',
    genre: 'Drama, Musical',
    rating: '5.2',
    poster: 'images/joker.jpg',
    releaseDate: '2024',
    director: 'Todd Phillips',
    stars: 'Joaquin Phoenix, Lady Gaga',
    studio: 'Warner Bros',
    trailer: 'https://www.youtube.com/embed/_OKAwz2MsJs',
    description: 'The sequel to Joker (2019) finds <b>Arthur Fleck</b> institutionalized at Arkham State Hospital, where he meets <b>Harleen Quinzel</b> (Lady Gaga). While struggling with his dual identity, Arthur stumbles upon true love and finds the music that\'s always been inside him, leading to a vibrant, imaginative jukebox musical.',
    venue: 'Arkham Cinemas',
    dates: ['Today', 'Tomorrow'],
    showtimes2D: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
    showtimesIMAX: [],
    ticketPrices: [
      { category: 'Standard', price: 300 }
    ],
    defaultPrice: 300
  },
  'dune-part-two': {
    title: 'Dune: Part Two',
    year: '2024',
    genre: 'Action, Sci-Fi',
    rating: '8.4',
    poster: 'images/dune-part2.jpg',
    releaseDate: '2024',
    director: 'Denis Villeneuve',
    stars: 'Timothée Chalamet, Zendaya, Austin Butler, Florence Pugh',
    studio: 'Warner Bros',
    trailer: 'https://www.youtube.com/embed/poWiludgQCw',
    description: 'The saga continues as Paul Atreides unites with Chani and the Fremen in a war of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    venue: 'Cinema Hall',
    dates: ['Today', 'Tomorrow'],
    showtimes2D: ['10:00 AM', '1:30 PM', '4:00 PM', '7:00 PM', '10:30 PM'],
    showtimesIMAX: [],
    ticketPrices: [
      { category: 'Standard', price: 350 }
    ],
    defaultPrice: 350
  },
  'thebatman': {
    title: 'The Batman',
    year: '2022',
    genre: 'Action, Crime, Drama',
    rating: '7.8',
    poster: 'images/batman.jpg',
    releaseDate: '2022',
    director: 'Matt Reeves',
    stars: 'Robert Pattinson, Zoë Kravitz, Jeffrey Wright, Paul Dano',
    studio: 'Warner Bros',
    trailer: 'https://www.youtube.com/embed/mqqft2x_Aa4',
    description: 'In his second year fighting crime in Gotham City, the vigilante **Batman** (Robert Pattinson) investigates the **Riddler** (Paul Dano), a mysterious serial killer targeting the city\'s elite. Batman must uncover corruption with ties to his own family\'s past and ultimately bring justice to the abuse of power plaguing Gotham. The film takes the style of a gritty, detective-noir story.',
    venue: 'Cinema Hall',
    dates: ['Today', 'Tomorrow'],
    showtimes2D: ['10:15 AM', '1:15 PM', '4:15 PM', '7:15 PM', '10:15 PM'],
    showtimesIMAX: [],
    ticketPrices: [
      { category: 'Standard', price: 340 }
    ],
    defaultPrice: 340
  },
  'insideout2': {
    title: 'Inside Out 2',
    year: '2024',
    genre: 'Animation, Comedy',
    rating: '7.8',
    poster: 'images/inside.jpg',
    releaseDate: '2024',
    director: 'Kelsey Mann',
    stars: 'Amy Poehler (Joy), Maya Hawke (Anxiety), Lewis Black (Anger)',
    studio: 'Pixar Animation Studios',
    trailer: 'https://www.youtube.com/embed/LEjhY15eCx0',
    description: '**Inside Out 2** returns to the mind of newly minted teenager **Riley**. The original emotions—Joy, Sadness, Anger, Fear, and Disgust—are joined by a host of unexpected new Emotions, including **Anxiety**, **Envy**, **Embarrassment**, and **Ennui**. Headquarters undergoes a sudden demolition to make room for these newcomers, forcing the old crew to figure out how to navigate Riley\'s complex teenage world.',
    venue: 'Cinema Hall',
    dates: ['Today', 'Tomorrow'],
    showtimes2D: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
    showtimesIMAX: [],
    ticketPrices: [
      { category: 'Standard', price: 300 }
    ],
    defaultPrice: 300
  },
  'oppenheimer': {
    title: 'Oppenheimer',
    year: '2023',
    genre: 'Biography, Drama',
    rating: '8.3',
    poster: 'images/oppenheimer.jpg',
    releaseDate: '2023',
    director: 'Christopher Nolan',
    stars: 'Cillian Murphy, Emily Blunt, Robert Downey Jr., Matt Damon',
    studio: 'Universal Pictures',
    trailer: 'https://www.youtube.com/embed/uYPbbksJxIg',
    description: '**J. Robert Oppenheimer**, the American theoretical physicist, is appointed by Lt. Gen. Leslie Groves Jr. to direct the top-secret **Manhattan Project** during World War II. The epic thriller chronicles the intense development of the first nuclear weapons and Oppenheimer\'s subsequent fall from grace during a government hearing over his loyalty and post-war opposition to nuclear proliferation.',
    venue: 'Cinema Hall',
    dates: ['Today', 'Tomorrow'],
    showtimes2D: ['11:30 AM', '2:30 PM', '5:30 PM', '8:30 PM'],
    showtimesIMAX: [],
    ticketPrices: [
      { category: 'Standard', price: 350 }
    ],
    defaultPrice: 350
  }
};

export const getMovieBySlug = (slug) => movieData[slug] || null;

