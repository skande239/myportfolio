import React from 'react'
import { motion } from 'framer-motion'

export default function FloatingParticles() {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 0
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const startX = Math.random() * vw
        const startY = Math.random() * vh
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{ x: startX, y: startY }}
            animate={{ y: [null, -100, vh + 100], opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
          />
        )
      })}
    </div>
  )
}
