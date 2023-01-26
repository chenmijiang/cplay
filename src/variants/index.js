// 下滑动画
export const fadeDown = {
  animation: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: '100vh'
  },
  transition: {
    type: "spring",
    duration: 0.5,
    stiffness: 1000,
    damping: 15,
  }
}