/* eslint-disable */
function instanaAgent (i, s, o, g, r, a, m) {
  i['InstanaEumObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
}

instanaAgent(window, document, 'script', '//eum.instana.io/eum.min.js', 'ineum')
ineum('reportingUrl', 'https://eum-us-west-2.instana.io');
function setKey() {
    var env = window.location.hostname
    if(env === 'hipi.zee5.com') {
      ineum('key', 'hipi.zee5.com');
      return;
    }
    if(env === 'stage.hipi.zee5.com') {
      ineum('key', 'stage.hipi.zee5.com');
      return;
    }
    ineum('key', 'local-env');
}
