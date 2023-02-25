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

export const glassCoverVariant = {
  enter: {
    opacity: 0
  },
  center: {
    zIndex: -3,
    x: 0,
    opacity: 1
  },
  exit: {
    zIndex: -4,
    opacity: 0
  }
}

// 子路由切换动画
export const routerSwitchVariant = {
  enter: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    ease: 'easeInOut',
    duration: 0.3
  }
}

// 按钮回弹
export const btnTapSpringVariant = {
  tap: {
    scale: 1.03
  },
  transition: {
    type: 'spring',
    duration: 0.3
  }
}