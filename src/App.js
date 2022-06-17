import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect, useMemo, useLayoutEffect } from "react"
import { useGLTF, Html, useProgress, PerspectiveCamera, OrbitControls, useHelper, Environment } from "@react-three/drei"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap, Power3 } from 'gsap'
import Model from './TarkovMilk'
import './App.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}


function App() {
  function AnimationWrapper({ children }) {
    const ref = useRef()
    const { camera } = useThree()
    useLayoutEffect(() => {
      ref.current.rotation.set(0, 0, 0)
      camera.position.set(0, 0, 0)
      gsap
      .timeline({
        scrollTrigger: {
          trigger: '.section-two',
          start: 'top top',
          endTrigger: '.section-five',
          end: 'bottom bottom',
          scrub: 1
        }
      })
      .to(ref.current.rotation, { y: 4.79 })
      .to(camera.position, { x: -0.1 })
      .to(ref.current.rotation, { z: 1.6 })
      .to(ref.current.rotation, { z: 0.02, y: 3.1 }, 'simultaneously')
      .to(camera.position, { x: 0.16 }, 'simultaneously')
        // .to(ref.current.rotation, { y: -1 })
        // .to(camera.position, { x: 14, y: 0 }, 'simultaneously')


        // .to(ref.current.rotation, { y: 0 }, 'simultaneously')
        // .to(camera.position, { x: -10, z: -5 }, 'simultaneously')

        // .to(ref.current.rotation, { y: .5 }, 'simultaneously')
        // .to(camera.position, { x: -2, z: -1 })

    }, [])
    return <group ref={ref}>{children}</group>
  }
  
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <div className='secondSection' style={{ position: 'relative' }}>
        <Canvas className='model'style={{ width: '100vw', height: '100vh', zIndex: 50, position: 'fixed' }}>
          <fog attach="fog" args={['purple', 1, 155]} />
          <Suspense fallback={<Loader />}>
            <AnimationWrapper>
              <Model position={[0,0,-45]} />
            </AnimationWrapper>
            {/* <spotLight intensity={.3} position={[0, 0, 30]} angle={0.15} penumbra={1} decay={2} castShadow />
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.45} penumbra={1} decay={2} castShadow />
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.5} penumbra={1} decay={2} castShadow /> */}
            {/* <OrbitControls /> */}
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>
        <section className="section-one" />
      <section className="section-two" />
      <section className="section-three" />
      <section className="section-four" />
      <section className="section-five" />
      </div>
    </div>
  );
}

export default App;
