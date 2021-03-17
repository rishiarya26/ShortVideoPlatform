/* eslint-disable */
function prepareFrame() {
  var ifrm = document.createElement('iframe');
  ifrm.setAttribute('src', 'https://hipi-web.s3.ap-south-1.amazonaws.com/feed.html');
  ifrm.setAttribute('style', 'height: 100%; width: 100%; top: 0; left: 0; position: absolute;');
  ifrm.setAttribute('loading', 'lazy');
  ifrm.setAttribute('title', 'hipi');
  ifrm.setAttribute('name', 'hipi');
  ifrm.setAttribute('frameBorder', 0);
  ifrm.setAttribute('marginWidth', 0);
  ifrm.setAttribute('marginHeight', 0);
  ifrm.setAttribute('scrolling', 'no');
  ifrm.setAttribute('allow', 'accelerometer autoplay encrypted-media gyroscope');
  // ifrm.setAttribute('sandbox', 'allow-modals allow-scripts');
  var elem = document.getElementById('embed-hipi');
  elem && elem.appendChild(ifrm);
}

window.addEventListener('DOMContentLoaded', (event) => {
  prepareFrame();
});


{/* <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kendogkenny/video/6939524081066773766" data-video-id="6939524081066773766" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@kendogkenny" href="https://www.tiktok.com/@kendogkenny">@kendogkenny</a> <p>Reply to @yvonnec1618  PLEASE— these comments are too funny I don’t even like alcohol that much 😭✊🏼</p> <a target="_blank" title="♬ Circus - Music and Crowd Sound Effect - Hollywood Sound Effects" href="https://www.tiktok.com/music/Circus-Music-and-Crowd-Sound-Effect-6758350390116222977">♬ Circus - Music and Crowd Sound Effect - Hollywood Sound Effects</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script> */}