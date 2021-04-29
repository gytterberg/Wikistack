const express = require("express");
const morgan = require("morgan");
const layout = require('./views/layout')
const { db, Page, User } = require('./models')

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => {
    res.send(layout());
  })

db.authenticate()
  .then(() => {
    console.log('connected to the database');
})


const init = async () => {
    await db.sync();

    const PORT = 1337;

app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
})
}

init();