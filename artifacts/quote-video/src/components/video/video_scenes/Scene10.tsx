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
        className="absolute bottom-[10vh] left-[10vw] w-[12vw] h-[0.3vh]"
        style={{ backgroundColor: '#9C060B' }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      <motion.div
        className="absolute top-[10vh] right-[10vw] w-[12vw] h-[0.3vh]"
        style={{ backgroundColor: '#9C060B' }}
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      />

      <div className="text-center px-[10vw] relative z-10">
        <motion.blockquote
          className="text-[3.6vw] leading-[1.35] font-light text-white/90"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: '2vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          <motion.span
            className="text-[6vw] leading-none inline-block mr-[0.5vw]"
            style={{ color: '#9C060B' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            &ldquo;
          </motion.span>
          If you want people to feel something, you still need a human who can.
          <motion.span
            className="text-[6vw] leading-none inline-block ml-[0.5vw]"
            style={{ color: '#9C060B' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            &rdquo;
          </motion.span>
        </motion.blockquote>

        <motion.div
          className="mt-[4vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.0, delay: 1.4 }}
        >
          <span
            className="text-[1.6vw] tracking-[0.25em] uppercase"
            style={{ color: '#9C060B', fontFamily: 'var(--font-display)' }}
          >
            voiceoverguy.co.uk
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
