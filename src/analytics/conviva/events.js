import { Constants } from "@convivainc/conviva-js-coresdk";
import { videoAnalytics } from "./index";

export const playerEvents = (type) => {
  debugger
  console.log(videoAnalytics,"videoAnalytics");
  const events = {
    'buffer':()=> videoAnalytics.reportPlaybackMetric(Constants.Playback.PLAYER_STATE, Constants.PlayerState.BUFFERING),
    'playing':()=> videoAnalytics.reportPlaybackMetric(Constants.Playback.PLAYER_STATE, Constants.PlayerState.PLAYING),
    'ended':()=>videoAnalytics.reportPlaybackMetric(Constants.Playback.PLAYER_STATE, Constants.PlayerState.SEEK_ENDED),
    'pause':()=>videoAnalytics.reportPlaybackMetric(Constants.Playback.PLAYER_STATE, Constants.PlayerState.PAUSED),
    'waitStarted':()=>videoAnalytics.reportPlaybackEvent(Constants.Events.USER_WAIT_STARTED),
    'waitEnded':()=>videoAnalytics.reportPlaybackEvent(Constants.Events.USER_WAIT_ENDED)
  }
  console.log(type,"type");
  type && events?.[type] && events?.[type]();
}