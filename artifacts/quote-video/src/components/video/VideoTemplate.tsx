import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';
import { Scene7 } from './video_scenes/Scene7';
import { Scene8 } from './video_scenes/Scene8';
import { Scene9 } from './video_scenes/Scene9';
import { Scene10 } from './video_scenes/Scene10';

const SCENE_DURATIONS = {
  quote1: 5500,
  quote2: 5000,
  quote3: 5000,
  quote4: 4500,
  quote5: 5000,
  quote6: 5000,
  quote7: 5000,
  quote8: 4500,
  quote9: 4500,
  quote10: 6000,
};

const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9, Scene10];
const sceneKeys = ['quote1', 'quote2', 'quote3', 'quote4', 'quote5', 'quote6', 'quote7', 'quote8', 'quote9', 'quote10'];

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({ durations: SCENE_DURATIONS });

  return (
    <div className="w-full h-full overflow-hidden relative" style={{ backgroundColor: '#000000', minHeight: '100%' }}>
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(156,6,11,0.08), transparent 70%)',
            left: '20vw',
            top: '20vh',
          }}
          animate={{
            x: ['-5vw', '5vw', '-5vw'],
            y: ['-3vh', '3vh', '-3vh'],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute w-[30vw] h-[30vw] rounded-full blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%)',
            right: '10vw',
            bottom: '10vh',
          }}
          animate={{
            x: ['3vw', '-3vw', '3vw'],
            y: ['2vh', '-2vh', '2vh'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="absolute w-[0.3vh] bg-white/[0.03]"
        animate={{
          height: ['15vh', '25vh', '15vh'][currentScene % 3],
          left: ['85vw', '90vw', '85vw'][currentScene % 3],
          top: ['10vh', '20vh', '10vh'][currentScene % 3],
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute w-[0.3vh] bg-white/[0.03]"
        animate={{
          height: ['20vh', '12vh', '20vh'][currentScene % 3],
          right: ['80vw', '85vw', '80vw'][currentScene % 3],
          bottom: ['15vh', '25vh', '15vh'][currentScene % 3],
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {scenes.map((SceneComponent, index) =>
          currentScene === index ? (
            <SceneComponent key={sceneKeys[index]} />
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
