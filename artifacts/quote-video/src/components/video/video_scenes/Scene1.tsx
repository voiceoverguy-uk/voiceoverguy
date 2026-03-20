import { motion } from 'framer-motion';

export function Scene1() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute top-[8vh] left-[8vw] w-[12vw] h-[0.3vh]"
        style={{ backgroundColor: '#9C060B' }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />

      <motion.div
        className="absolute bottom-[12vh] right-[6vw] w-[8vw] h-[8vw] rounded-full border border-white/5"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="text-center px-[10vw] relative z-10">
        <motion.div
          className="mb-[2vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span
            className="text-[1.8vw] tracking-[0.3em] uppercase"
            style={{ color: '#9C060B', fontFamily: 'var(--font-display)' }}
          >
            VoiceoverGuy
          </span>
        </motion.div>

        <motion.blockquote
          className="text-[3.8vw] leading-[1.3] font-light text-white/90"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
        >
          <motion.span
            className="text-[6vw] leading-none inline-block mr-[0.5vw]"
            style={{ color: '#9C060B' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            &ldquo;
          </motion.span>
          Just because AI can read the script doesn't mean it can feel the moment.
          <motion.span
            className="text-[6vw] leading-none inline-block ml-[0.5vw]"
            style={{ color: '#9C060B' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            &rdquo;
          </motion.span>
        </motion.blockquote>
      </div>
    </motion.div>
  );
}
