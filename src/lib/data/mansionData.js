export const rooms = [
  {
    id: 'foyer',
    name: 'Grand Foyer',
    description: 'The opulent entrance to Greystone Manor. Crystal chandeliers cast eerie shadows on marble floors.',
    x: '50%',
    y: '75%',
    mobileX: '45%', // Adjusted for mobile
    mobileY: '85%', // Adjusted for mobile
    connections: ['library', 'ballroom', 'dining_room']
  },
  {
    id: 'library',
    name: 'Library',
    description: 'Walls of ancient books and a lingering scent of pipe tobacco. Mr. Black was found here.',
    x: '28%',
    y: '35%',
    mobileX: '20%',
    mobileY: '25%', // Adjusted for mobile
    connections: ['study', 'foyer']
  },
  {
    id: 'dining_room',
    name: 'Dining Room',
    description: 'An elaborate feast lies untouched. Wine glasses bear traces of the last supper.',
    x: '65%',
    y: '30%',
    mobileX: '70%', // Adjusted for mobile
    mobileY: '40%', // Adjusted for mobile
    connections: ['kitchen', 'foyer', 'ballroom', 'study']
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Steam still rises from pots. A knife is conspicuously missing from the block.',
    x: '85%',
    y: '35%',
    mobileX: '90%', // Adjusted for mobile
    mobileY: '50%', // Adjusted for mobile
    connections: ['dining_room', 'servants_quarters']
  },
  {
    id: 'study',
    name: 'Study',
    description: 'Papers scattered everywhere. The safe stands open and empty.',
    x: '65%',
    y: '20%',
    mobileX: '60%', // Adjusted for mobile
    mobileY: '10%', // Adjusted for mobile
    connections: ['library', 'dining_room']
  },
  {
    id: 'ballroom',
    name: 'Ballroom',
    description: 'Dusty mirrors reflect moonlight. Footprints cross the polished floor.',
    x: '55%',
    y: '45%',
    mobileX: '50%', // Adjusted for mobile
    mobileY: '55%', // Adjusted for mobile
    connections: ['dining_room', 'foyer', 'conservatory']
  },
  {
    id: 'conservatory',
    name: 'Conservatory',
    description: 'Exotic plants loom in darkness. A broken window lets in the cold night air.',
    x: '40%',
    y: '55%',
    mobileX: '35%', // Adjusted for mobile
    mobileY: '65%', // Adjusted for mobile
    connections: ['study', 'ballroom']
  },
  {
    id: 'servants_quarters',
    name: 'Servants\' Quarters',
    description: 'Simple quarters with complex secrets. Someone left in a hurry.',
    x: '80%',
    y: '25%',
    mobileX: '85%', // Adjusted for mobile
    mobileY: '15%', // Adjusted for mobile
    connections: ['kitchen']
  }
];
