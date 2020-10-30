const Recipe = require("../models/recipe");
const auth = require("../configs/auth");
const { Router } = require("express");
const router = Router();

//INDEX ROUTE
router.get("/", auth, async (req, res) => {
  res.json(await Recipe.find({}))
});

//DELETE ROUTE
router.delete("/:id", auth, async (req, res) => {
    res.json(await Recipe.findByIdAndRemove(req.params.id))
});

//UPDATE ROUTE
router.put("/:id", auth, async (req, res) => {
    res.json(await Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true}))
});

//CREATE ROUTE
router.post("/", auth, async (req, res) => {
  res.json(await Recipe.create(req.body));
});

//EXPORT ROUTER
module.exports = router;
