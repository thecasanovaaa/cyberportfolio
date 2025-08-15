/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')

export default function SideCard() {
  const inputRef = useRef()
  const scrollRef = useRef()
  const [terminalLines, setTerminalLines] = useState([])
  const [animatedLines, setAnimatedLines] = useState([])
  const [input, setInput] = useState("")

  const animateLineOutput = async (lines) => {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let current = ""
      for (let j = 0; j < line.length; j++) {
        current += line[j]
        setAnimatedLines(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = current
          return copy
        })
        await new Promise(res => setTimeout(res, 25))
      }
      if (i < lines.length - 1) {
        setAnimatedLines(prev => [...prev, ""])
      }
    }
  }

  const handleCommand = (cmd) => {
    const typed = { type: "command", content: cmd }
    let response = []

    switch (cmd.trim().toLowerCase()) {
      case 'about':
        response.push({ type: "output", content: `Welcome to my terminal portfolio. I'm Muffadal Darukhanawala,` })
        response.push({ type: "output", content: `a cybersecurity enthusiast with CEH and CPT certifications from Mile2.` })
        response.push({ type: "output", content: `With a strong foundation in ethical hacking and penetration testing,` })
        response.push({ type: "output", content: `I specialize in uncovering vulnerabilities and building secure systems.` })
        response.push({ type: "output", content: `Type 'PROJECTS' command to explore my Porjects.` })
        break
      case 'role':
        response.push({ type: "output", content: `Frontend Developer | React & Three.js Enthusiast` })
        break
      case 'hobby':
        response.push({ type: "output", content: `Building immersive 3D UIs` })
        break
      case 'projects':
        response.push({ type: "output", content: `Projects:` })
        response.push({ type: "output", content: `- Interactive 3D Portfolio` })
        response.push({ type: "output", content: `- Custom Three.js Experiences` })
        response.push({ type: "output", content: `- React UI Libraries` })
        break
      case 'help':
        response.push({ type: "output", content: "Available commands:" })
        response.push({ type: "output", content: "About, role, hobby, projects, clear, help" })
        break
      case 'clear':
        setTerminalLines([])
        setAnimatedLines([])
        return
      case '':
        return
      default:
        response.push({ type: "output", content: "Command not recognized. Type 'help' for available commands." })
    }

    setTerminalLines(prev => [...prev, typed, ...response])
    setAnimatedLines(prev => [...prev, "", ""])
    animateLineOutput(response.map(r => r.content))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput("")
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [animatedLines])

  useEffect(() => {
    const welcome = { type: "output", content: "Welcome Type 'help' to explore (⌐■_■) !" }
    setTerminalLines([welcome])
    setAnimatedLines([""])
    animateLineOutput([welcome.content])
  }, [])

  return (
    <div  style={{ height: "80vh", width: "100vw", display: "flex" }}>
    <div className='canvascode' style={{
  width: "40%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderLeft: '0.9px solid rgba(0, 255, 0, 0.3)',
  borderRight: '0.9px solid rgba(0, 255, 0, 0.3)'
}}>
  <Canvas
    gl={{ alpha: true }}
    style={{ background: 'transparent' }}
    camera={{ position: [0, 0, 13], fov: 25 }}
  >
    <ambientLight intensity={Math.PI} />
    <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
      <Band />
    </Physics>
    <Environment blur={0.75}>
      <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
      <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
      <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
      <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
    </Environment>
  </Canvas>
</div>

      <div className='terminalcode'
        style={{
          width: "60%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // terminal panel transparent background
          borderLeft: '0.9px solid rgba(0, 255, 0, 0.3)',
          borderRight: '0.9px solid rgba(0, 255, 0, 0.3)',
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "monospace",
          color: "#fff",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <div style={{ flexGrow: 1, overflowY: "auto" }}>
          {terminalLines.map((line, index) => {
            if (line.type === "command") {
              return (
                <p key={index} style={{ margin: 0, fontSize: "1.1rem" }}>
                  <span style={{ color: "#7b93ff" }}>muffadal@portfolio:~$ </span>
                  <span style={{ color: "#0f0" }}>{line.content}</span>
                </p>
              )
            } else if (line.type === "output") {
              return (
                <p key={index} style={{ margin: 0, fontSize: "1.1rem" }}>
                  {animatedLines[index] || ""}
                </p>
              )
            } else {
              return null
            }
          })}

          <div style={{ display: "flex", alignItems: "center", fontSize: "1.1rem" }}>
            <span style={{ color: "#7b93ff" }}>muffadal@portfolio:~$&nbsp;</span>
            <span style={{ color: "#0f0", whiteSpace: "pre-wrap" }}>{input || '\u00A0'}</span>
            <span
              style={{
                width: "8px",
                height: "1em",
                backgroundColor: "#0f0",
                animation: "blink 1s step-start infinite",
                marginLeft: "2px"
              }}
            />
          </div>

          <div ref={scrollRef} />
        </div>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
            height: 0
          }}
        />

        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      </div>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }

  const { nodes, materials } = useGLTF("https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb")
  const myImage = useTexture('/avatar.jpg')
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'

  myImage.wrapS = myImage.wrapT = THREE.ClampToEdgeWrapping
  myImage.center.set(0.8, 0.2)
  myImage.repeat.set(1.1, 1.1)
  myImage.offset.set(0.3, -0.1)
  myImage.flipY = false
  myImage.anisotropy = 16
  myImage.needsUpdate = true

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh geometry={nodes.card.geometry}><meshStandardMaterial map={myImage} side={THREE.FrontSide} /></mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="#2e2e2e" depthTest={false} resolution={[width, height]} lineWidth={1} />
      </mesh>
    </>
  )
}


/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// import * as THREE from 'three'
// import { useEffect, useRef, useState } from 'react'
// import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
// import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
// import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
// import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

// extend({ MeshLineGeometry, MeshLineMaterial })

// useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')

// export default function SideCard() {
//   const inputRef = useRef()
//   const scrollRef = useRef()
//   const [terminalLines, setTerminalLines] = useState([])
//   const [animatedLines, setAnimatedLines] = useState([])
//   const [input, setInput] = useState("")

//   const animateLineOutput = async (lines) => {
//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i]
//       let current = ""
//       for (let j = 0; j < line.length; j++) {
//         current += line[j]
//         setAnimatedLines(prev => {
//           const copy = [...prev]
//           copy[copy.length - 1] = current
//           return copy
//         })
//         await new Promise(res => setTimeout(res, 25))
//       }
//       if (i < lines.length - 1) {
//         setAnimatedLines(prev => [...prev, ""])
//       }
//     }
//   }

//   const handleCommand = (cmd) => {
//     const typed = { type: "command", content: cmd }
//     let response = []

//     switch (cmd.trim().toLowerCase()) {
//       case 'whoami':
//         response.push({ type: "output", content: `Name: Muffadal Darukhanawala` })
//         break
//       case 'role':
//         response.push({ type: "output", content: `Frontend Developer | React & Three.js Enthusiast` })
//         break
//       case 'hobby':
//         response.push({ type: "output", content: `Building immersive 3D UIs` })
//         break
//       case 'projects':
//         response.push({ type: "output", content: `Projects:` })
//         response.push({ type: "output", content: `- Interactive 3D Portfolio` })
//         response.push({ type: "output", content: `- Custom Three.js Experiences` })
//         response.push({ type: "output", content: `- React UI Libraries` })
//         break
//       case 'help':
//         response.push({ type: "output", content: "Available commands:" })
//         response.push({ type: "output", content: "whoami, role, hobby, projects, clear, help" })
//         break
//       case 'clear':
//         setTerminalLines([])
//         setAnimatedLines([])
//         return
//       case '':
//         return
//       default:
//         response.push({ type: "output", content: "Command not recognized. Type 'help' for available commands." })
//     }

//     setTerminalLines(prev => [...prev, typed, ...response])
//     setAnimatedLines(prev => [...prev, "", ""])
//     animateLineOutput(response.map(r => r.content))
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleCommand(input)
//       setInput("")
//     }
//   }

//   useEffect(() => {
//     inputRef.current?.focus()
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [animatedLines])

//   useEffect(() => {
//     const welcomeMessage = [
//       "> Verifying credentials...",
//       "> Access Granted ✅",
//       "> 1",
//       "> 2",
//       "> 3",
//       "> 4"
//     ]

//     const welcomeLines = welcomeMessage.map(line => ({ type: "output", content: line }))

//     setTerminalLines(welcomeLines)
//     setAnimatedLines([""])
//     animateLineOutput(welcomeMessage)
//   }, [])

//   return (
//     <div style={{ height: "80vh", width: "100vw", display: "flex" }}>
//       <div style={{
//         width: "40%",
//         height: "100%",
//         backgroundColor: "rgba(0, 0, 0, 0.4)",
//         borderLeft: '0.9px solid rgba(0, 255, 0, 0.3)',
//         borderRight: '0.9px solid rgba(0, 255, 0, 0.3)'
//       }}>
//         <Canvas
//           gl={{ alpha: true }}
//           style={{ background: 'transparent' }}
//           camera={{ position: [0, 0, 13], fov: 25 }}
//         >
//           <ambientLight intensity={Math.PI} />
//           <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
//             <Band />
//           </Physics>
//           <Environment blur={0.75}>
//             <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
//             <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
//             <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
//             <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
//           </Environment>
//         </Canvas>
//       </div>

//       <div
//         style={{
//           width: "60%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.6)",
//           borderLeft: '0.9px solid rgba(0, 255, 0, 0.3)',
//           borderRight: '0.9px solid rgba(0, 255, 0, 0.3)',
//           padding: "10px",
//           display: "flex",
//           flexDirection: "column",
//           fontFamily: "monospace",
//           color: "#fff",
//         }}
//         onClick={() => inputRef.current?.focus()}
//       >
//         <div style={{ flexGrow: 1, overflowY: "auto" }}>
//           {terminalLines.map((line, index) => {
//             if (line.type === "command") {
//               return (
//                 <p key={index} style={{ margin: 0, fontSize: "1.1rem" }}>
//                   <span style={{ color: "#7b93ff" }}>muffadal@portfolio:~$ </span>
//                   <span style={{ color: "#0f0" }}>{line.content}</span>
//                 </p>
//               )
//             } else if (line.type === "output") {
//               return (
//                 <p key={index} style={{ margin: 0, fontSize: "1.1rem" }}>
//                   {animatedLines[index] || ""}
//                 </p>
//               )
//             } else {
//               return null
//             }
//           })}

//           <div style={{ display: "flex", alignItems: "center", fontSize: "1.1rem" }}>
//             <span style={{ color: "#7b93ff" }}>muffadal@portfolio:~$&nbsp;</span>
//             <span style={{ color: "#0f0", whiteSpace: "pre-wrap" }}>{input || '\u00A0'}</span>
//             <span
//               style={{
//                 width: "8px",
//                 height: "1em",
//                 backgroundColor: "#0f0",
//                 animation: "blink 1s step-start infinite",
//                 marginLeft: "2px"
//               }}
//             />
//           </div>

//           <div ref={scrollRef} />
//         </div>

//         <input
//           ref={inputRef}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           style={{
//             position: "absolute",
//             opacity: 0,
//             pointerEvents: "none",
//             height: 0
//           }}
//         />

//         <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
//       </div>
//     </div>
//   )
// }

// function Band({ maxSpeed = 50, minSpeed = 10 }) {
//   const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
//   const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()
//   const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }

//   const { nodes, materials } = useGLTF("https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb")
//   const myImage = useTexture('/avatar.jpg')
//   const { width, height } = useThree((state) => state.size)
//   const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
//   const [dragged, drag] = useState(false)
//   const [hovered, hover] = useState(false)

//   useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
//   useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
//   useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
//   useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

//   useEffect(() => {
//     if (hovered) {
//       document.body.style.cursor = dragged ? 'grabbing' : 'grab'
//       return () => void (document.body.style.cursor = 'auto')
//     }
//   }, [hovered, dragged])

//   useFrame((state, delta) => {
//     if (dragged) {
//       vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
//       dir.copy(vec).sub(state.camera.position).normalize()
//       vec.add(dir.multiplyScalar(state.camera.position.length()))
//       ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
//       card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
//     }
//     if (fixed.current) {
//       [j1, j2].forEach((ref) => {
//         if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
//         const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
//         ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
//       })
//       curve.points[0].copy(j3.current.translation())
//       curve.points[1].copy(j2.current.lerped)
//       curve.points[2].copy(j1.current.lerped)
//       curve.points[3].copy(fixed.current.translation())
//       band.current.geometry.setPoints(curve.getPoints(32))
//       ang.copy(card.current.angvel())
//       rot.copy(card.current.rotation())
//       card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
//     }
//   })

//   curve.curveType = 'chordal'

//   myImage.wrapS = myImage.wrapT = THREE.ClampToEdgeWrapping
//   myImage.center.set(0.8, 0.2)
//   myImage.repeat.set(1.1, 1.1)
//   myImage.offset.set(0.3, -0.1)
//   myImage.flipY = false
//   myImage.anisotropy = 16
//   myImage.needsUpdate = true

//   return (
//     <>
//       <group position={[0, 4, 0]}>
//         <RigidBody ref={fixed} {...segmentProps} type="fixed" />
//         <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
//         <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
//         <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
//         <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
//           <CuboidCollider args={[0.8, 1.125, 0.01]} />
//           <group
//             scale={2.25}
//             position={[0, -1.2, -0.05]}
//             onPointerOver={() => hover(true)}
//             onPointerOut={() => hover(false)}
//             onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
//             onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
//             <mesh geometry={nodes.card.geometry}><meshStandardMaterial map={myImage} side={THREE.FrontSide} /></mesh>
//             <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
//             <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
//           </group>
//         </RigidBody>
//       </group>
//       <mesh ref={band}>
//         <meshLineGeometry />
//         <meshLineMaterial color="#404040" depthTest={false} resolution={[width, height]} lineWidth={1} />
//       </mesh>
//     </>
//   )
// }
