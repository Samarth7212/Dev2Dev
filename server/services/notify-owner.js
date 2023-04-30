const { sendEmail } = require("./node-mailer");
const client = require("../db/connect");

exports.notifyOwner = async (questionId, answerDescription) => {
  try {
    const questionQuery = `SELECT title, description, owner FROM Question WHERE id = $1`;
    const questionValues = [questionId];

    const question = await client.query(questionQuery, questionValues);
    const questionTitle = question.rows[0].title;
    const questionDescription = question.rows[0].description;
    const ownerId = question.rows[0].owner;

    const query = `SELECT email FROM Users WHERE id = $1`;
    const values = [ownerId];

    const email = await client.query(query, values);
    const emailToSend = email.rows[0].email;

    const subject = "Your question has been answered!";
    const html = `
		<h1>Your question has been answered!</h1>
		<p>Question: ${questionTitle}</p>
		<p>Question Description: ${questionDescription}</p>
		<p>Answer: ${answerDescription}</p>
	`;

    sendEmail(emailToSend, subject, html);
  } catch (err) {
    console.log(err);
  }

  console.log("Email sent to owner");
  return;
};
