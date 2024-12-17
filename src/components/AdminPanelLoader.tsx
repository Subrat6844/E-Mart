import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function AdminPanelLoader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h2
              className="text-3xl font-bold text-white mb-4"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Entering Admin Panel
            </motion.h2>
            <motion.div
              className="flex justify-center space-x-2"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

