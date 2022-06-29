import * as THREE from 'three';
import React, { Suspense, useRef, useLayoutEffect, useState, useEffect } from "react"
import { Html, useProgress, Loader, PositionalAudio } from "@react-three/drei"
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { gsap, Power4 } from 'gsap'
// import Model from './TarkovMilk'
import Model from './Monoko'
import GoldStar from './GoldStar'
import './App.css';

//creits yaloken https://sketchfab.com/3d-models/sgushenka-de849052c70f458c9c1c4d65582330c8
// Runyz https://sketchfab.com/3d-models/cao-sao-vang-golden-star-aromatic-balm-302afdd990304e9cb3d69a8205118f42
// Vecteezy.com

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const volume = <FontAwesomeIcon className='icon' icon={faVolumeHigh} />
const noVolume = <FontAwesomeIcon className='icon' icon={faVolumeOff} />

function App() {

  const [play, setPlay] = useState(false)
  const audioRef = useRef()

  const PlayAudio = () => {
    // setPlay(!play)
    setPlay(prevPlay => !prevPlay);
    audioRef.current.play()
    audioRef.current.setVolume(.03)
    if (!play) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }
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
            // ease: Power4.inOut
            // markers: true
          }
        })
        .to(ref.current.children[0].rotation, { x: 6.25 }, 'simultaneously')
        // .to(ref.current.rotation, { z: 6.25 })
        .to(camera.position, { z: 100 })
        .to(camera.position, { z: 0 })
      console.log(ref)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-two',
          start: 'center center',
          endTrigger: '.section-five',
          end: 'top top',
          scrub: 1,
          // markers: true,
          toggleAttribute: "restart pause resume none",
          id: 'tweets'
        }
      });
      tl.from(".tweetContainer", { xPercent: -1000 });
      tl.to(".tweetContainer", { xPercent: 0 });
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-five',
          // start: 'top top',
          // start: '180px 90%',
          start: '300px 90%',
          // endTrigger: '.section-five',
          end: 'center center',
          // end: '90%',
          scrub: 1,
          // markers: true,
          id: 'bottom'
          // toggleAttribute: "restart pause resume none"
        }
      });
      tl2.from(".pixelFooterContainer", { xPercent: -100 });
      tl2.to(".pixelFooterContainer", { xPercent: 0 });
      tl2.to(".pixelFooterContainer", { xPercent: -150 });

    }, [])
    return <group ref={ref}>{children}</group>
  }

  return (
    <>
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
              <li className='navLi' style={{ marginLeft: 10 }}>CREDIT</li>
              {play ?
                <li onClick={() => PlayAudio()} className='navLi' style={{ marginLeft: 10, dropShadow: '0px 0px 6px #000000' }}>{volume}</li>
                :
                <li onClick={() =>PlayAudio()} className='navLi' style={{ marginLeft: 10 }}>{noVolume}</li>
              }
            </ul>
          </div>
        </div>
        <div className='secondSection' style={{ position: 'relative' }}>
          {/* orthographic zoom: 20,  */}
          <Canvas className='model' style={{ width: '100vw', height: '100vh', zIndex: 50, position: 'fixed' }} camera={{ fov: 75, position: [0, 0, 0] }} pixelRatio={window.devicePixelRatio} dpr={[1, 2]}>
            {/* <fog attach="fog" args={['purple', 1, 155]} /> */}
            {/* <Suspense fallback={<Loader />}> */}
            <AnimationWrapper>
              {/* <Model position={[0, -15, -35]} /> */}
              <Model scale={15} position={[0, -12, -75]} />
            </AnimationWrapper>
            <pointLight position={[10, 10, 10]} />
            {/* </Suspense> */}
          </Canvas>
          <section className="section-one">
            <div className='sectionOneTextContainer'>
              <h1 className='title'>MONOKO</h1>
            </div>
          </section>
          <section className="section-two" >
            <h1 className='title' style={{ color: 'gold' }}>Special offer</h1>
            <p className='description' style={{ color: 'gold', fontFamily: "RedOctober" }}>Buy One Get One Free</p>
            <Canvas className='model' style={{ width: '100vw', height: '100vh', zIndex: 49 }} camera={{ fov: 75, position: [0, 0, 0] }} pixelRatio={window.devicePixelRatio} dpr={[1, 2]}>
              {/* <fog attach="fog" args={['purple', 1, 155]} /> */}
              {/* <Suspense fallback={<Loader />}> */}
              <GoldStar position={[-15, 10, -30]} rotation={[-30.5, 4, 0]} />
              <GoldStar position={[20, 0, -30]} rotation={[-10, 9.4, 0]} />
              <GoldStar position={[0, 0, -30]} rotation={[-30, 9, 0]} />
              <pointLight position={[10, 10, 10]} />
              {/* </Suspense> */}
              <PositionalAudio
              ref={audioRef}
                url="/russianAnthem.mp3"
                distance={1}
                loop
              />
            </Canvas>

          </section>
          <section className="section-three">
            <h1 className='title'>Customer Reviews</h1>
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
          {/* <section className="section-four">
        </section> */}
          <section className="section-five" >
            <div className='pixelFooterContainer'>
              <img className='pixel' src='./nikitaPix.png' alt='pixel image' />
              <img className='cloud' src='./cloud.png' alt='cloud' />
            </div>
            <h1 className='title'>Rated Number #1 In Russia</h1>
            <div className='footer'>
              <a style={{ zIndex: 100 }} rel="noopener noreferrer" href='https://www.linkedin.com/in/gurjot--sandhu/' target="_blank">
                <h1 className='footerText'>Created By Gurjot Sandhu</h1>
              </a>
            </div>
          </section>
        </div>
      </div>

      <Loader className='loader' containerStyles={{ position: 'fixed', }} innerStyles={{ fontFamily: "RedOctober-Fat" }} />
    </>
  );
}

export default App;
