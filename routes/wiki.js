const express = require("express");
const addPage = require('../views/addPage');
const { Page } = require('../models');
const wikiPage = require('../views/wikipage');


const router = express.Router();

// GET on /wiki
router.get("/", async (req, res, next) => {
  res.send("wiki.js route");
})

// POST on /wiki
router.post("/", async (req, res, next) => {
  // we got a post request on wiki
  // we need to insert the data on the request body into the database
  // we need the data: it's in req.body
  // we need the databse: that's

  try {
    const page = await Page.create({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) { next(error) }
})

// GET to /wiki/add
router.get("/add", async (req, res, next) => {
  res.send(addPage());
})

// GET to /wiki/:slug
router.get("/:slug", async (req, res, next) => {
  const page = await Page.findOne({
    where: {
      slug: req.params.slug
    }
  })
  res.send(wikiPage(page));
});

module.exports = router;
