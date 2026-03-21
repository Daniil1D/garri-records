"use client"

import { useEffect, useRef } from "react"
import axios from "axios"
import { usePlayer } from "@/shared/store/global-player"

export const PlayerUI = () => {
  const {
    audioUrl,
    title,
    artist,
    cover,
    isPlaying,
    toggle,
    currentTime,
    duration,
    setTime,
    setDuration,
    volume,
    setVolume,
    releaseId,
    isOpen,
    close,
  } = usePlayer()

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioUrl || !audioRef.current) return

    audioRef.current.src = audioUrl

    if (releaseId) {
      axios.post("/api/play", { releaseId }).catch(() => {})
    }

  }, [audioUrl, releaseId])

  if (!isOpen) return null

  const handlePlay = () => {
    if (!audioRef.current) return
    audioRef.current.play().catch(() => {})
  }

  const handlePause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
  }

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full z-50
        bg-neutral-900 text-white
        border-t border-neutral-800
      "
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex items-center gap-3 sm:gap-6">

        <button
          onClick={close}
          className="absolute top-2 right-3 text-white text-lg"
        >
          ✕
        </button>

        <img
          src={cover ?? ""}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm sm:text-base truncate">
            {title}
          </div>
          <div className="text-xs sm:text-sm text-neutral-400 truncate">
            {artist}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">

          <button
            onClick={() => {
              if (isPlaying) handlePause()
              else handlePlay()
              toggle()
            }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black font-bold"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

        </div>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (audioRef.current) audioRef.current.volume = v
            setVolume(v)
          }}
          className="hidden sm:block w-24"
        />
      </div>

      <div className="px-3 sm:px-6 pb-2">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            const t = Number(e.target.value)
            if (audioRef.current) audioRef.current.currentTime = t
            setTime(t)
          }}
          className="w-full"
        />
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={() => setTime(audioRef.current!.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current!.duration)}
        onError={() => {}}
      />
    </div>
  )
}