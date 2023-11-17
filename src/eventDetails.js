
import FilmFrenzyFest from "./images/poster/poster10.jpg";
import CameraChronicles from "./images/poster/poster6.jpg";
import CinematicShot from "./images/poster/poster7.jpg";


export const events = [
  {
    id:1,
    "name": "Filmy Fest",
    "alias": "Reel Making",
    "image": FilmFrenzyFest,
    "aboutEvent": "CAPTURING FROM REAL TO REEL! Reels have surely become a means for the youth of today to exhibit their creativity and bring in the best trends on social media in this digital era. As a result, we've chosen to use this expressive platform to recognize the students' inventiveness. To explore the creative side of the students, we bring to you The Reel Making Competition",
    "eventDetail": [
      "It is an individual event.",
      "Any act of indiscipline by participants, calls for cancellation of registration.",
      "Topic - *Splash Vibes*"
    ],
    rulebook:"https://www.youtube.com/",
    "schedule": {
      "day": "19th May",
      "venue": "G16",
      "time": "9:30 AM"
    }
  },
  {
    id:2,
    "name": "Cinematic Shot",
    "alias": "Short Film",
    "image": CinematicShot,
    "aboutEvent": "Anything that can be written or thought of can be filmed. They say a picture is worth a thousand words then a film is worth a thousand times more. If you are an author whose novels are films, this is right place to publish.",
    "eventDetail": ["Theme will be given on the first day of the Fest"],
    rulebook:"https://www.youtube.com/",
    "schedule": {
      "day": "19th May",
      "venue": "G16",
      "time": "9:30 AM"
    }
  },
  {
    id:3,
    "name": "Camera Chronicles",
    "alias": "Photography",
    "image": CameraChronicles,
    "aboutEvent": "There is a creative fraction of a second when you are taking a picture. Your eye  must see a composition or an expression that life itself offers you, and you must know with intuition when to click the camera. That is the moment the photographer is creative. Oops! The Moment! Once you miss it, it is gone forever",
    "eventDetail": [
      "This event will have only one round and result will be announced on the last day of Yensplash"
    ],
    "rules": "www.youtube.com",
    rulebook:"https://www.youtube.com/",
    "schedule": {
      "day": "19th May",
      "venue": "G16",
      "time": "9:30 AM"
    }
  }
]





function eventDetails() {
  return (
    <div>eventDetails</div>
  )
}

export default eventDetails
