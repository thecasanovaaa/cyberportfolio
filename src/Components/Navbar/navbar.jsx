// // export default Navbar
// // eslint-disable-next-line no-unused-vars
// import React from 'react'

// const Navbar = () => {
//   return (
//     <div
//       className="container"
//       style={{
//         backgroundColor: 'rgba(0, 0, 0, 0.7)', // semi-transparent black
//         alignItems: 'center',
//         height: '15vh',
//         color: 'green',
//         border: '0.9px solid green',
//         paddingLeft: '5px',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//       }}
//     >
//       <h1 style={{ margin: 0 }}>Muffadal Darukhanawala</h1>
//       <p style={{ color: 'white', margin: 0 }}>Aspiring Cybersecurity Professional</p>
//     </div>
//   )
// }

// export default Navbar
import React from 'react'

const Navbar = () => {
  const isMobile = window.innerWidth <= 768

  return (
    <div
      className="container"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        height: isMobile ? '12vh' : '15vh',
        color: 'green',
        border: '0.9px solid green',
        padding: isMobile ? '5px' : '5px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: isMobile ? '18px' : '24px'
        }}
      >
        Muffadal Darukhanawala
      </h1>
      <p
        style={{
          color: 'white',
          margin: 0,
          fontSize: isMobile ? '14px' : '16px'
        }}
      >
        Aspiring Cybersecurity Professional
      </p>
    </div>
  )
}

export default Navbar
