import { Container, Title } from "@/shared/components/shared";
import { SupportChatClient } from "@/shared/components/shared/support/SupportChatClient";

export default function SupportPage() {
  return (
    <Container className="space-y-6">
      <Title text="Поддержка" size="2xl" className="font-bold" />

      <SupportChatClient />
    </Container>
  );
}
