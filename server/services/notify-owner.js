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
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Question Answered</title>
        </head>
        <body style="background-color: #f7f7f7; font-family: Arial, sans-serif;">
            <header style="background-color: #0066cc; color: #fff; padding: 1rem;">
                <h1 style="font-size: 1.5rem; margin: 0;">Your question has been answered!</h1>
            </header>
            <main style="max-width: 600px; margin: 0 auto; padding: 1rem;">
                <section style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Question</h2>
                    <p style="margin: 0;">${questionTitle}</p>
                </section>
                <section style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Question Description</h2>
                    <p style="margin: 0;">${questionDescription}</p>
                </section>
                <section>
                    <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Answer</h2>
                    <p style="margin: 0;">${answerDescription}</p>
                </section>
            </main>
        </body>
    </html>
	`;

    sendEmail(emailToSend, subject, html);
  } catch (err) {
    console.log(err);
  }

  console.log("Email sent to owner");
  return;
};
