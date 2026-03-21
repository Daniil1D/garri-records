import { Container, Title } from '@/shared/components/shared'
import { UploadAudioClient } from '@/shared/components/shared/upload/UploadAudioClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UploadAudioPage({ params }: PageProps) {
  const { id: releaseId } = await params

  return (
    <Container className="space-y-6 sm:space-y-8 mt-4 sm:mt-6 md:mt-10 px-4 sm:px-6 md:px-0">
      <Title
        text="Загрузите аудиофайлы"
        size="2xl"
        className="font-bold text-xl sm:text-2xl md:text-3xl"
      />

      <p className="text-gray-500 max-w-full sm:max-w-xl md:max-w-2xl text-sm sm:text-base">
        Для сохранения наилучшего качества треков, рекомендуем загружать файлы
        формата <b>.wav</b> 16/24 44100 Hz bit (только с импульсно-кодовой
        модуляцией)
      </p>

      <UploadAudioClient releaseId={releaseId} />
    </Container>
  )
}