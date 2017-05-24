const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-To-Text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const generateHTML = (filename, options = {}) => {
    const html = pug.renderFile()
}

exports.send = async (options) => {
	const mailOptions ={
		from: `Michae Wiss <noreply@michaelrwiss.com`,
		to: options.user.email,
		subject: options.subject,
		html: 'This will be filled in later',
		text: 'This will also be filled in later'
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
}

