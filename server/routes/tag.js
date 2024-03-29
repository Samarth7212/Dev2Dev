let express = require("express");
// const { isAuthenticated } = require("../middlewares/user_verification");
const {
  getUniqueTags,
  getQuestionsByTag,
} = require("../controllers/tag_controller");

let router = express.Router();

// This will the tags for a particular question
// router.get("/:id", retrieveTagByQuestionId);

// router.post("/:id", isAuthenticated, createTagforQuestionId);

// router.delete("/:id", isAuthenticated, deleteTag);

router.get("/", getUniqueTags);

router.get("/:tag", getQuestionsByTag);

module.exports = router;
