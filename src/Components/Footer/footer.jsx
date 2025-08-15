// import React, { useEffect, useState } from 'react'
// const Footer = () => {
//   const [time, setTime] = useState('')

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date()
//       const options = {
//         timeZone: 'Asia/Kolkata',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       }
//       const formatter = new Intl.DateTimeFormat('en-IN', options)
//       setTime(formatter.format(now))
//     }

//     updateTime()
//     const interval = setInterval(updateTime, 1000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div
//       className='container'
//       style={{
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         height: '5vh',
//         color: 'green',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         border: '0.9px solid rgba(0, 255, 0, 0.3)'
//       }}
//     >
//       <div style={{ paddingLeft: '5px' }}>muffadal@portfolio:~$</div>
//       <div style={{ paddingRight: '5px' }}>{time}</div>
//     </div>
//   )
// }

// export default Footer
import React, { useEffect, useState } from 'react'

const Footer = () => {
  const [time, setTime] = useState('')
  const isMobile = window.innerWidth <= 768

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
      const formatter = new Intl.DateTimeFormat('en-IN', options)
      setTime(formatter.format(now))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className='container'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: isMobile ? '6vh' : '5vh',
        color: 'green',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        border: '0.9px solid rgba(0, 255, 0, 0.3)',
        padding: isMobile ? '5px' : '0 5px',
        fontSize: isMobile ? '12px' : '14px',
        textAlign: 'center'
      }}
    >
      <div style={{ padding: isMobile ? '2px 0' : '0 0 0 5px' }}>muffadal@portfolio:~$</div>
      <div style={{ padding: isMobile ? '2px 0' : '0 5px 0 0' }}>{time}</div>
    </div>
  )
}

export default Footer
