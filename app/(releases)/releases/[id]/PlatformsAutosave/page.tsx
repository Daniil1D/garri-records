'use client'

import { usePlatformsAutosave } from '@/shared/hooks/usePlatformsAutosave'

export default function PlatformsAutosave ({ releaseId }: { releaseId: string }) {
  usePlatformsAutosave(releaseId)
  return null
}
