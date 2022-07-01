/* eslint-disable no-console */
import nodemailer from 'nodemailer';

export default async function sendMail(to: string, html: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    logger: true,
  });

  const info = await transporter.sendMail({
    from: '"USM Olivet TT" <contact@olivet-tt.fr>',
    to,
    subject: 'Inscription Tournoi Olivet 2022',
    html,
  });
}
