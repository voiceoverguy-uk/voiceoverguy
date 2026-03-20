import { motion } from 'framer-motion';

export function Scene9() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute top-[15vh] right-[12vw] w-[10vw] h-[0.3vh]"
        style={{ backgroundColor: '#9C060B' }}
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      <motion.div
        className="absolute bottom-[30vh] left-[8vw] w-[3vw] h-[3vw] border border-white/4 rounded-full"
        animate={{ y: [0, '-1.5vh', 0], opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="text-center px-[12vw] relative z-10">
        <motion.blockquote
          className="text-[3.6vw] leading-[1.35] font-light text-white/90"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        >
          <motion.span
            className="text-[6vw] leading-none inline-block mr-[0.5vw]"
            style={{ color: '#9C060B' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            &ldquo;
          </motion.span>
          If you want people to feel something, you still need a human who can.
          <motion.span
            className="text-[6vw] leading-none inline-block ml-[0.5vw]"
            style={{ color: '#9C060B' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            &rdquo;
          </motion.span>
        </motion.blockquote>
      </div>
    </motion.div>
  );
}
