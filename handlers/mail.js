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

transport.sendMail({
	from: 'Michael Wiss <michael.wiss@gmail.com>',
	to: 'michael.wiss@gmail.com',
	subject: 'Just trying things out',
	html: 'Hey I <strong>love</strong> you',
	text: 'Hey I love you'
});

