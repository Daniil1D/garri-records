import { InfoBlock } from "@/shared/components/shared";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
      />
    </div>
  );
}