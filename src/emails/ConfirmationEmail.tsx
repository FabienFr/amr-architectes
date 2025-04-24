import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Preview,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ConfirmationEmailProps {
  name: string;
  siteName?: string;
}

export default function ConfirmationEmail({
  name,
  siteName = "AMR Architectes",
}: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Merci pour votre message, {name}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl p-6 border border-gray-200 rounded">
            <Heading className="text-black text-xl font-bold mb-4">
              Merci pour votre message
            </Heading>

            <Text>Bonjour {name},</Text>
            <Text>
              Nous avons bien reçu votre message. Nous reviendrons vers vous
              dans les plus brefs délais.
            </Text>
            <Text>
              L’équipe de <strong>{siteName}</strong>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
