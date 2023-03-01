// 按钮变体
export const buttonVariants = {
  closed: {
    stroke: 'var(--bg-white-200)',
  },
  open: {
    stroke: 'var(--bg-white-100)',
  },
}

// 背景变体
export const backgroundVariants = {
  open: {
    x: '-600px',
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20
    },
  },
  closed: {
    x: 0,
    transition: {
      delay: 0.15,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

// 菜单变体
export const menuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

// link变体
export const linkVariants = {
  open: {
    x: '-600px',
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: 0,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
}