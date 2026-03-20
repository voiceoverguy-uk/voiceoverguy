import { motion } from 'framer-motion';

export function Scene10() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute top-[10vh] left-[10vw] w-[12vw] h-[0.3vh]"
        style={{ backgroundColor: '#9C060B' }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      <motion.div
        className="absolute bottom-[10vh] right-[10vw] w-[12vw] h-[0.3vh]"
        style={{ backgroundColor: '#9C060B' }}
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      />

      <div className="text-center px-[10vw] relative z-10 flex flex-col items-center gap-[3vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.6 }}
        >
          <span
            className="text-[3.5vw] tracking-[0.2em] uppercase font-light"
            style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)' }}
          >
            VoiceoverGuy
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span
            className="text-[1.6vw] tracking-[0.15em]"
            style={{ color: '#9C060B', fontFamily: 'var(--font-display)' }}
          >
            British Male Voiceover Artist
          </span>
        </motion.div>

        <motion.div
          className="w-[8vw] h-[0.2vh] mx-auto"
          style={{ backgroundColor: '#9C060B' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <span
            className="text-[1.4vw] tracking-[0.25em] uppercase"
            style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)' }}
          >
            voiceoverguy.co.uk
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
