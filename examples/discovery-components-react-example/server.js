/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const express = require('express');
const app = express();
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const cors = require('cors');
const bodyParser = require('body-parser');
/* eslint-enable @typescript-eslint/no-var-requires */

const baseUrl = 'https://blissful-tharp-balancer.fyre.ibm.com:31843';
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.options('*', cors());
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.post(
  '/api/v1/environments/:environment_id/collections/:collection_id/query',
  cors(),
  async (req, res) => {
    try {
      const searchClient = new DiscoveryV1({
        url: `${baseUrl}/discovery/zen-apostle/instances/1566577081/api`,
        icp4d_url: baseUrl,
        authentication_type: 'icp4d',
        username: 'admin',
        password: 'password',
        disable_ssl_verification: true,
        version: '2019-01-01'
      });
      const params = Object.assign({}, req.body, req.params);
      const response = await searchClient.query(params);
      res.json(response);
    } catch (e) {
      console.error(e);
      res.json({ error: 'something went wrong' });
    }
  }
);

const port = 4000;
app.listen(port, () => {
  console.log('Kitchen sink app running at http://localhost:%s/', port);
});