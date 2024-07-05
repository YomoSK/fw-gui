const express = require('express');
const cors = require('cors');
const execSh = require('exec-sh');

const PORT = 5959;
const server = express();
server.use(cors());
server.use(express.static('public'));

server.get('/', (req, res) => {
   res.sendFile('index.html');
});

server.get('/ports', (req, res) => {
   execSh('ufw status numbered', true, (err, stdout, stderr) => {
      if(err) res.json({ error: stderr });
      else res.send({ success: stdout });
   });
});

server.post('/delete/:rule', (req, res) => {
   execSh('yes | ufw delete ' + req.params.rule, true, (err, stdout, stderr) => {
      if(err) res.json({ error: stderr });
      else res.send({ success: stdout });
   });
});

server.listen(PORT, () => {
   console.log('FW-GUI is running at :' + PORT);
});