import { motion } from 'framer-motion';

export function Scene6() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute top-[10vh] right-[8vw] w-[0.3vh] h-[15vh]"
        style={{ backgroundColor: '#9C060B' }}
        initial={{ scaleY: 0, transformOrigin: 'bottom' }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      <motion.div
        className="absolute bottom-[20vh] left-[10vw] w-[7vw] h-[7vw] rounded-full border border-white/4"
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
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
          Just because it sounds human doesn't mean it connects like one.
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
