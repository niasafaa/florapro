const path = require('path');
const express = require('express');
const cors = require('cors');
const client = require('./db');

const exp = express();
// const PORT = process.env.PORT || 5000;
exp.set('port', process.env.PORT || 5000);

// Connection to database
const pgConnect = () => {
  client.connect(err => {
    if (err) throw err;

    console.log('Welcome to FloraPRO');
    console.log('connected as Administrator');
  });
};
pgConnect();

if (process.env.NODE_ENV === 'production') {
  exp.use(cors());
  exp.use(express.static(path.join(__dirname, 'client/build')));
  // exp.get('*', (req, res) => res.sendfile(path.join(__dirname, 'client/build/index.html')));
}

if (!process.env.NODE_ENV) {
  exp.use(
    cors({
      origin: 'https://localhost:3000',
      credentials: true
    })
  );
}

exp.use(express.urlencoded({ extended: false }));
exp.use(express.json());

exp.use('/appAPI', require('./routes/app/main'));
exp.use('/dataAPI', require('./routes/data/main'));
exp.use('/authAPI', require('./routes/auth/main'));

exp.listen(exp.get('port'), () =>
  console.log(`Server started on port ${exp.get('port')}`)
);
