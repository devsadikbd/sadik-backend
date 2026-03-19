import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
function makeANiceEmail(text: string, username: string = 'Admin'): string {
  return `
    <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
    ">
    <h2>Hello There please set your password</h2>
    <p>${text}</p>
    <p>😘, ${username}</p>
    </div>
  `;
}
export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  ehlo?: string[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string,
  username: string = 'Admin'
): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: 'admin@devsadik.me',
    subject: 'Hey gorib',
    html: makeANiceEmail(`
        <p>Your password is:</p>
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to set your password</a>
    `, username),
  })) as MailResponse;
  if (process.env.MAIL_USER.includes('gmail.com')) {
    console.log(`Message sent: ${getTestMessageUrl(info)}`);
  }
}
