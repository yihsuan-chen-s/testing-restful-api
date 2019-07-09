const app = require('./app');
const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
    console.log('Express started on port ' + port);
});
