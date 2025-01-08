'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const images = [
  { src: '/istockphoto-1294477039-612x612.jpg', alt: 'Relyy interface 1' },
  { src: '/istockphoto-1294477039-612x612.jpg', alt: 'Relyy interface 2' },
  { src: '/istockphoto-1294477039-612x612.jpg', alt: 'Relyy interface 3' },
]

const ImageShowcase = () => {
  return (
    <section className="py-16 bg-[#D8D8D8]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-[#2E5A88] mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Experience Relyy in Action
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative overflow-hidden rounded-lg shadow-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-[#2E5A88] bg-opacity-75 flex items-center justify-center"
              >
                <p className="text-white text-lg font-semibold">View Details</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImageShowcase

