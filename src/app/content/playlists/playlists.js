// playlist imports
import sampler from './sampler.json';
import indietronic from './indietronic.json';
import hipsterSynthpop from './hipster-synthpop.json';
import absoluteFocus from './absolute-focus.json';
import tropicalVibes from './tropical-vibes.json';
// playlist detail imports
import samplerDetails from '../playlist-details/sampler-details.json';
import indietronicDetails from '../playlist-details/indietronic-details.json';
import hipsterSynthpopDetails from '../playlist-details/hipster-synthpop-details.json';
import absoluteFocusDetails from '../playlist-details/absolute-focus-details.json';
import tropicalVibesDetails from '../playlist-details/tropical-vibes-details.json';

const playlists = [
  {
    name: 'Standard Sampler',
    data: sampler,
    details: samplerDetails,
  },
  {
    name: 'Indietronic',
    data: indietronic,
    details: indietronicDetails,
  },
  {
    name: 'Hipster Synthpop',
    data: hipsterSynthpop,
    details: hipsterSynthpopDetails,
  },
  {
    name: 'Absolute Focus',
    data: absoluteFocus,
    details: absoluteFocusDetails,
  },
  {
    name: 'Tropical Vibes',
    data: tropicalVibes,
    details: tropicalVibesDetails,
  },
  {
    name: 'Spotify Library',
    data: sampler,
    details: samplerDetails,
  }
]

export default playlists;