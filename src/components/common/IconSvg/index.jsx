import React from 'react'

const importAll = (requireContext) =>
  requireContext.keys().forEach(requireContext)
try {
  importAll(require.context('@/assets/icons', true, /\.svg$/))
} catch (error) {
  console.log(error)
}

function Icon({ className, name }) {
  return (
    <svg className={className ? className : 'icon'}>
      <use xlinkHref={'#' + name} />
    </svg>
  )
}

export default Icon
