const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require('./models/User');

const { auth } = require('./middleware/auth');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

app.post('/api/users/register', (req, res) => {
  // store the data required for signup in database.
  console.log('register');
  const user = new User(req.body);
  console.log(user);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  //search requested email in database
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "There's no user matched with the provided email.",
      });
    }

    //if there's a matched email, check if the password is correct
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      }

      // generate a token if password is correct as well
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // save token at cookie, localStorage
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  // if code has arrived here, that means user passed the authenticfication process
  const { _id, email, name, lastname, role } = req.user;
  res.status(200).json({
    _id,
    isAdmin: role === 0 ? false : true,
    isAuth: true,
    email,
    name,
    lastname,
    role,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  const { _id } = req.user;
  User.findOneAndUpdate({ _id }, { token: '' }, (err, user) =>
    err
      ? res.json({ success: false, err })
      : res.status(200).send({
          success: true,
        })
  );
});

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요~');
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));
