const client = require("../db/connect");

exports.retrieveTagByQuestionId = async (req, res) => {
  let query = `SELECT * FROM tags WHERE id = $1`;
  let values = [req.params.id];

  try {
    let data = await client.query(query, values);
    res.status(200).json({
      data: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving tag",
    });
  }
};

exports.createTagforQuestionId = async (req, res) => {
  //? Optimise this later
  let query = `INSERT INTO QuestionTag (tag, question_id) VALUES ($1, $2)`;
  for (let i = 0; i < req.body.tag.length; i++) {
    let values = [req.body.tag[i], req.params.id];

    try {
      await client.query(query, values);
    } catch (err) {
      return res.status(500).json({
        error: "Error creating tag",
      });
    }
  }

  return res.status(200).json({
    data: "Tags created successfully",
  });
};

exports.deleteTag = async (req, res) => {
  let query = `DELETE FROM QuestionTag WHERE tag = $1 AND question_id = $2`;
  let values = [req.body.tag, req.params.id];

  try {
    await client.query(query, values);
    res.status(200).json({
      data: "Tag deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting tag",
    });
  }
};

exports.getUniqueTags = async (req, res) => {
  const query = "SELECT DISTINCT unnest(tag) AS tag FROM Question";
  try {
    let data = await client.query(query);
    const simpleTagsArray = data.rows.map((obj) => obj.tag);

    res.status(200).json({
      data: simpleTagsArray,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving tags",
    });
  }
};

exports.getQuestionsByTag = async (req, res) => {
  // join and get owner email

  const query =
    "SELECT Question.*, Users.email FROM Question inner join Users on Question.owner=Users.id WHERE $1 = ANY(tag)";
  const values = [req.params.tag];

  try {
    let data = await client.query(query, values);

    res.status(200).json({
      data: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving questions by tag",
    });
  }
};
