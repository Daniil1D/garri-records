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
    <div className="fixed bottom-4 z-40 left-1/2 -translate-x-1/2 w-[900px] bg-neutral-900 text-white rounded-2xl px-6 py-4 flex items-center gap-6 shadow-2xl">

      <button
        onClick={close}
        className="absolute top-2 right-3 text-white text-xl"
      >
        ✕
      </button>

      <img
        src={cover ?? ""}
        className="w-14 h-14 rounded-lg object-cover"
      />

      <div className="w-56">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-neutral-400">{artist}</div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1">
        <button
          onClick={() => {
            if (isPlaying) {
              handlePause()
            } else {
              handlePlay()
            }
            toggle()
          }}
          className="w-10 h-10 rounded-full bg-white text-black font-bold"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

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
        className="w-24"
      />

      <audio
        ref={audioRef}
        onTimeUpdate={() => setTime(audioRef.current!.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current!.duration)}
        onError={() => {}}
      />
    </div>
  )
}