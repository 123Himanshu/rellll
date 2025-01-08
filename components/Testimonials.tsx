'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'Relyy has been a game-changer for my mental health. It\'s like having a supportive friend available 24/7.',
    rating: 5,
  },
  {
    name: 'John D.',
    text: 'I was skeptical at first, but Relyy has truly helped me manage my anxiety. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Emily L.',
    text: 'The personalized advice and exercises have made a significant difference in my daily life. Thank you, Relyy!',
    rating: 4,
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-[#F0F7FF] via-[#E8F1F8] to-[#F0F7FF]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-[#2E5A88] mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 p-8 rounded-xl shadow-lg border border-[#ADD8E6]/20"
            >
              <p className="text-[#4A5568] mb-6 text-lg leading-relaxed italic">
                {testimonials[currentIndex].text}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#2E5A88] font-semibold">{testimonials[currentIndex].name}</span>
                <div className="flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-[#FFB547] fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-white text-[#2E5A88] p-3 rounded-full shadow-md hover:bg-[#F0F7FF] transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white text-[#2E5A88] p-3 rounded-full shadow-md hover:bg-[#F0F7FF] transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

