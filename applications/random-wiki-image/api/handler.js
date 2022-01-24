const axios = require('axios');
const { parse } = require('node-html-parser');

const allowedOrigins = [
  'http://localhost:3000',
  'https://caldwell.org',
  'https://www.caldwell.org'
]

module.exports.get_image = async event => {
  const origin = event.headers.origin;

  let headers = {};
  if (allowedOrigins.includes(origin)) {
    headers = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    }
  }

  let src = null;
  let title = null;
  while (!src) {
    const { data } = await axios.get('https://commons.wikimedia.org/wiki/Special:Random/File');
    const root = parse(data);
    const link = root.querySelector('.mw-filepage-other-resolutions a:nth-child(2)');
    title = root.querySelector('#firstHeading').innerHTML;
    if (!link) continue;
    src = link.getAttribute('href');
  }

  return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
          src,
          title
      })
  }
  
}