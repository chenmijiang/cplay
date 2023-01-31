// 下滑动画
export const boxShowVariant = {
  initial: {
    x: '-50%', y: 0, opacity: 0
  },
  animate: {
    x: '-50%', y: '20vh', opacity: 1
  },
  exit: { x: '-50%', y: '5vh', opacity: 0 },
  transition: { ease: 'easeInOut', }
}