/* eslint-disable */

(function(s, t, a, n) {
  s[t] || (s[t] = a, n = s[a] = function() {
          n.q.push(arguments)
      },
      n.q = [], n.v = 2, n.l = 1 * new Date)
})(window, "InstanaEumObject", "ineum");

ineum('reportingUrl', 'https://eum-blue-saas.instana.io');
if(window.location.hostname === 'hipi.co.in') {
  ineum('key', 'KTWnCUDUQY65CEEOXClRJg');
} else if(window.location.hostname === 'preprod.hipi.co.in') {
  ineum('key', '3BMdbtCkT2ecrgTw4sZxww');
} else if(window.location.hostname === 'mock.hipi.co.in') {
  ineum('key', 'OX_MXEDcSy21zxRMIPodGw');
}  else {
  ineum('key', window.location.hostname);
}

ineum('trackSessions');

// function instanaAgent (i, s, o, g, r, a, m) {
//   i['InstanaEumObject'] = r;
//   i[r] = i[r] || function() {
//     (i[r].q = i[r].q || []).push(arguments)
//   }, i[r].l = 1 * new Date();
//   a = s.createElement(o),
//   m = s.getElementsByTagName(o)[0];
//   a.async = 1;
//   a.src = g;
//   m.parentNode.insertBefore(a, m);
// }

// instanaAgent(window, document, 'script', '//eum.instana.io/eum.min.js', 'ineum')

// ineum('reportingUrl', 'https://eum-us-west-2.instana.io');
// (() => {
//     var env = window.location.hostname
//     if(env === 'hipi.zee5.com') {
//       ineum('key', 'hipi.zee5.com');
//       return;
//     }
//     if(env === 'stage.hipi.zee5.com') {
//       ineum('key', 'stage.hipi.zee5.com');
//       return;
//     }
//     ineum('key', 'local-env');
//   })()
