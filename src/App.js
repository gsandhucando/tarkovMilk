import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect, useMemo, useLayoutEffect } from "react"
import { useGLTF, Html, useProgress, PerspectiveCamera, OrbitControls, useHelper, Environment } from "@react-three/drei"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap, Power3 } from 'gsap'
import Model from './TarkovMilk'
import GoldStar from './GoldStar'
import './App.css';
// import './fonts/RedOctober.ttf';

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
            scrub: 1,
            markers: true
          }
        })
        .to(ref.current.children[0].rotation, { x: 6.25 }, 'simultaneously')
      // .to(ref.current.rotation, { y: 4.79 })
      // .to(camera.position, { x: 15 }, 'simultaneously')
      // .to(ref.current.rotation, { z: 1.6 })
      // .to(ref.current.rotation, { z: 0.02, y: 3.1 }, 'simultaneously')
      // .to(camera.position, { x: 0.16 }, 'simultaneously')
      // .to(ref.current.rotation, { y: -1 })
      // .to(camera.position, { x: 14, y: 0 }, 'simultaneously')


      // .to(ref.current.rotation, { y: 0 }, 'simultaneously')
      // .to(camera.position, { x: -10, z: -5 }, 'simultaneously')

      // .to(ref.current.rotation, { y: .5 }, 'simultaneously')
      // .to(camera.position, { x: -2, z: -1 })
      console.log(ref)

      const tl = gsap .timeline({
        scrollTrigger: {
          trigger: '.section-two',
          start: 'bottom center',
          endTrigger: '.section-tree',
          end: 'center bottom',
          scrub: 1,
          markers: true,
          toggleAttribute: "restart pause resume none"
        }
      });
            tl.from(".tweetContainer", {opacity: 0});
            tl.to(".tweetContainer", {opacity: 1});

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
      <div className='nav'>
        <img className='logo' src='logo.png' />
        <div className='navRightContainer'>
          <ul className='navUl'>
            <li className='navLi'>CONTACT</li>
            <li className='navLi' style={{ marginLeft: 10 }}>ABOUT</li>
          </ul>
        </div>
      </div>
      <div className='secondSection' style={{ position: 'relative' }}>
        {/* orthographic zoom: 20,  */}
        <Canvas className='model' style={{ width: '100vw', height: '100vh', zIndex: 50, position: 'fixed' }} camera={{ fov: 75, position: [0, 0, 0] }} pixelRatio={window.devicePixelRatio} dpr={[1, 2]}>
          {/* <fog attach="fog" args={['purple', 1, 155]} /> */}
          <Suspense fallback={<Loader />}>
            <AnimationWrapper>
              <Model position={[0, -15, -35]} />
              {/* <GoldStar position={[0,0,-30]} rotation={[-30, 0 , 0]}/> */}
            </AnimationWrapper>
            {/* <spotLight intensity={.3} position={[0, 0, 30]} angle={0.15} penumbra={1} decay={2} castShadow />
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.45} penumbra={1} decay={2} castShadow />
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.5} penumbra={1} decay={2} castShadow /> */}
            {/* <Environment preset="city" background /> */}
            <pointLight position={[10, 10, 10]} />
          </Suspense>
        </Canvas>
        <section className="section-one">
          <div className='sectionOneTextContainer'>
            <h1 className='title'>MONOKO</h1>
            <p className='description'>Rated Number #1 In Russia</p>
          </div>
        </section>
        <section className="section-two" >
          <h1 className='title' style={{ color: 'gold' }}>Special offer</h1>
          <p className='description' style={{ color: 'gold', fontFamily: "RedOctober" }}>Buy One Get One Free</p>
          <Canvas className='model' style={{ width: '100vw', height: '100vh', zIndex: 49 }} camera={{ fov: 75, position: [0, 0, 0] }} pixelRatio={window.devicePixelRatio} dpr={[1, 2]}>
            {/* <fog attach="fog" args={['purple', 1, 155]} /> */}
            <Suspense fallback={<Loader />}>
              {/* <AnimationWrapper> */}
              {/* <Model position={[0,-15,-35]} /> */}

              <GoldStar position={[-15, 10, -30]} rotation={[-30.5, 4, 0]} />
              <GoldStar position={[20, 0, -30]} rotation={[-10, 9.4, 0]} />
              <GoldStar position={[0, 0, -30]} rotation={[-30, 9, 0]} />
              {/* </AnimationWrapper> */}
              {/* <spotLight intensity={.3} position={[0, 0, 30]} angle={0.15} penumbra={1} decay={2} castShadow />
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.45} penumbra={1} decay={2} castShadow />
            <spotLight intensity={.3} position={[0, 0, 30]} angle={0.5} penumbra={1} decay={2} castShadow /> */}
              {/* <Environment preset="city" background /> */}
              <pointLight position={[10, 10, 10]} />
            </Suspense>
          </Canvas>

        </section>
        <section className="section-three">
          <h1 className='title'>Customer Reviews</h1>
          {/* <p className='description'>Buy One Get One Free</p> */}
          {/* <a style={{ zIndex: 100 }} rel="noopener noreferrer" href='https://twitter.com/nikgeneburn' target="_blank">
            <img className='tweet' src='./nikitaTweet.png' alt='tweet' />
          </a> */}
          <div className='tweetContainer'>

            <a style={{ zIndex: 100 }} rel="noopener noreferrer" href='https://twitter.com/LVNDMARK_tv' target="_blank">
              <img className='tweet' src='./tonysTweet.png' alt='tweet'>
              </img>
            </a>
          </div>
          <div className='tweetContainer'>

            <a style={{ zIndex: 100 }} rel="noopener noreferrer" href='https://twitter.com/GloriousE1' target="_blank">
              <img className='tweet' src='./gloriousE.png' alt='tweet'>
              </img>
            </a>
          </div>
          <div className='tweetContainer'>

            <a style={{ zIndex: 100 }} rel="noopener noreferrer" href='https://twitter.com/RealTigz' target="_blank">
              <img className='tweet' src='./tigzTweet.png' alt='tweet'>
              </img>
            </a>
          </div>
          <div className='tweetContainer'>

            <a style={{ zIndex: 100 }} rel="noopener noreferrer" href='https://twitter.com/Pestily' target="_blank">
              <img className='tweet' src='./pestTweet.png' alt='tweet'>
              </img>
            </a>
          </div>
          <div className='tweetContainer'>

            <a style={{ zIndex: 100 }} rel="noopener noreferrer" href='https://twitter.com/WillerZ4' target="_blank">
              <img className='tweet' src='./willerZTweet.png' alt='tweet'>
              </img>
            </a>
          </div>
        </section>
        <section className="section-four">
          <div className='box' />
        </section>
        <section className="section-five" />
      </div>
    </div>
  );
}

export default App;
