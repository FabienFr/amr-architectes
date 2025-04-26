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

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  siteName?: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  message,
  siteName = "Site Web",
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouveau message de contact via {siteName}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl p-6 border border-gray-200 rounded">
            <Heading className="text-black text-xl font-bold mb-4">
              Nouveau message de contact via {siteName}
            </Heading>

            <Text>
              <strong>Nom :</strong> {name}
            </Text>
            <Text>
              <strong>Email :</strong> {email}
            </Text>
            <Text>
              <strong>Téléphone :</strong> {phone || "Non renseigné"}
            </Text>
            <Text className="mt-4 whitespace-pre-line">
              <strong>Message :</strong>
              <br />
              {message}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
