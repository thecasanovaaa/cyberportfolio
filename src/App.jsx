
// // eslint-disable-next-line no-unused-vars
// import React from 'react'
import SideCard from './Components/sidecard/sidecard'
import Navbar from './Components/Navbar/navbar'
import Footer from './Components/Footer/footer'


// const App = () => {
//   return (
//     <>
//       <Navbar/>
//       <SideCard/>
//       <Footer/>
      
//     </>
//   )
// }

// export default App

import MatrixBackground from './Components/MatrixBackground'

const App = () => {
  return (
    <>
      <MatrixBackground />
      <Navbar />
      <SideCard />
      <Footer />
    </>
  )
}

export default App
