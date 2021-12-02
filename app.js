const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users',userRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });


app.listen(8000,(err)=>{
    if(err) {
        console.log(err)
    }else {
        console.log('server started');
    }
})