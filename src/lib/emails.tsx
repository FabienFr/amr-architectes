import { Resend } from "resend";
import { render } from "@react-email/render";
import ContactEmail from "@/emails/ContactEmail";
import ConfirmationEmail from "@/emails/ConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendContactEmailsOptions {
  name: string;
  email: string;
  phone: string;
  message: string;
  attachments?: {
    filename: string;
    content: Buffer;
  }[];
  siteName?: string;
  notifyTo: string;
}

export async function sendContactEmails({
  name,
  email,
  phone,
  message,
  attachments = [],
  siteName = "Site Web",
  notifyTo,
}: SendContactEmailsOptions) {
  const contactHtml = await render(
    <ContactEmail
      name={name}
      email={email}
      phone={phone}
      message={message}
      siteName={siteName}
    />,
  );

  const confirmationHtml = await render(
    <ConfirmationEmail name={name} siteName={siteName} />,
  );

  const [contactResult, confirmationResult] = await Promise.all([
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: notifyTo,
      subject: `Nouveau message de contact via ${siteName}`,
      replyTo: email,
      html: contactHtml,
      attachments,
    }),
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Merci pour votre message – ${siteName}`,
      html: confirmationHtml,
    }),
  ]);

  return { contactResult, confirmationResult };
}
