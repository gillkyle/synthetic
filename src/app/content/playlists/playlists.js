// playlist imports
import sampler from "./sampler.json";
import syntheticLibrary from "./synthetic-library.json";
import indietronic from "./indietronic.json";
import hipsterSynthpop from "./hipster-synthpop.json";
import absoluteFocus from "./absolute-focus.json";
import tropicalVibes from "./tropical-vibes.json";
import chillFolk from "./chill-folk.json";
import epicCinematic from "./epic-cinematic.json";
import experimental from "./experimental.json";
import hybridRap from "./hybrid-rap.json";
import subwoofer from "./subwoofer-sounds.json";
// playlist detail imports
import samplerDetails from "../playlist-details/sampler-details.json";
import syntheticLibraryDetails from "../playlist-details/synthetic-library-details.json";
import indietronicDetails from "../playlist-details/indietronic-details.json";
import hipsterSynthpopDetails from "../playlist-details/hipster-synthpop-details.json";
import absoluteFocusDetails from "../playlist-details/absolute-focus-details.json";
import tropicalVibesDetails from "../playlist-details/tropical-vibes-details.json";
import chillFolkDetails from "../playlist-details/chill-folk-details.json";
import epicCinematicDetails from "../playlist-details/epic-cinematic-details.json";
import experimentalDetails from "../playlist-details/experimental-details.json";
import hybridRapDetails from "../playlist-details/hybrid-rap-details.json";
import subwooferDetails from "../playlist-details/subwoofer-details.json";

const playlists = [
  {
    name: "Synthetic Library",
    data: syntheticLibrary,
    details: syntheticLibraryDetails
  },
  {
    name: "Indietronic",
    data: indietronic,
    details: indietronicDetails
  },
  {
    name: "Hipster Synthpop",
    data: hipsterSynthpop,
    details: hipsterSynthpopDetails
  },
  {
    name: "Absolute Focus",
    data: absoluteFocus,
    details: absoluteFocusDetails
  },
  {
    name: "Tropical Vibes",
    data: tropicalVibes,
    details: tropicalVibesDetails
  },
  {
    name: "Chill Folk",
    data: chillFolk,
    details: chillFolkDetails
  },
  {
    name: "Experimental Sounds",
    data: experimental,
    details: experimentalDetails
  },
  {
    name: "Epic Cinematic",
    data: epicCinematic,
    details: epicCinematicDetails
  },
  {
    name: "Subwoofer Bass",
    data: subwoofer,
    details: subwooferDetails
  },
  {
    name: "Hybrid Rap",
    data: hybridRap,
    details: hybridRapDetails
  },
  {
    name: "Spotify Library",
    data: sampler,
    details: samplerDetails
  }
];

export default playlists;
