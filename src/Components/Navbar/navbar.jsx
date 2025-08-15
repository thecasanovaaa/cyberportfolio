// // eslint-disable-next-line no-unused-vars
// import React from 'react'
// // import style from './navbar.css'
// const Navbar = () => {
//   return (
//     <div className='container' style={{ backgroundColor: 'Black',alignItems:"center", height:'15vh',color:'green',  border: '0.9px solid green',paddingLeft:"5px" }}>
//       <h1>Muffadal Darukhanawala</h1>
//       <p style={{color:"white"}}>Aspiring Cybersecurity Professional</p>
//     </div>
//   )
// }

// export default Navbar
// eslint-disable-next-line no-unused-vars
import React from 'react'

const Navbar = () => {
  return (
    <div
      className="container"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // semi-transparent black
        alignItems: 'center',
        height: '15vh',
        color: 'green',
        border: '0.9px solid green',
        paddingLeft: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ margin: 0 }}>Muffadal Darukhanawala</h1>
      <p style={{ color: 'white', margin: 0 }}>Aspiring Cybersecurity Professional</p>
    </div>
  )
}

export default Navbar
