'use client';
import React, { forwardRef, useMemo } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';

type PageTransitionProps = HTMLMotionProps<'div'>;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

const PageTransition = ({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) => {
  const onInitial = { y: 15, opacity:0 };
  const onAnimate = { y: 0, opacity:1 };
  const onExit = { y: -15, opacity:0 };

  const transition = { duration: 0.6, ease: 'easeInOut', type: 'spring', stiffness: 100 };
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={onInitial}
        animate={onAnimate}
        exit={onExit}
        transition={transition}
        {...rest}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default forwardRef(PageTransition);
