import React, { useEffect, useRef } from 'react'
import { Canvas } from "@react-three/fiber";
import { useState, Suspense } from 'react'
import Loader from '../components/Loader'
import Island from '../models/Island'
import HomeInfo from '../components/HomeInfo';
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from '../assets/icons';

const Home = () => {
    const audioRef = useRef(new Audio(sakura));
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);
    useEffect(() => {
        if (isPlayingMusic) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlayingMusic])

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let screenRotation = [0.1, 4.7, 0];
        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }
        return [screenScale, screenPosition, screenRotation];
    }
    const adjustPlaneForScreenSize = () => {
        let planeScreenScale, planeScreenPosition;
        if (window.innerWidth < 768) {
            planeScreenScale = [1.5, 1.5, 1.5];
            planeScreenPosition = [0, -1.5, 0];
        } else {
            planeScreenScale = [3, 3, 3];
            planeScreenPosition = [0, -4, -4];
        }
        return [planeScreenScale, planeScreenPosition];
    }
    const [screenScale, screenPosition, screenRotation] = adjustIslandForScreenSize();
    const [planeScreenScale, planeScreenPosition] = adjustPlaneForScreenSize();
    console.log(planeScreenPosition, planeScreenScale);
    return (
        <section className='w-full h-screen relative'>
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}>
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2}></directionalLight>
                    <ambientLight intensity={0.5}></ambientLight>
                    <spotLight></spotLight>
                    <hemisphereLight skyColor="#00fffb" groundColor="#5e005d" intensity={1}></hemisphereLight>
                    <Bird />
                    <Sky
                        isRotating={isRotating}
                    />
                    <Island
                        position={screenPosition}
                        scale={screenScale}
                        rotation={screenRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane
                        isRotating={isRotating}
                        position={planeScreenPosition}
                        scale={planeScreenScale}
                        rotation={[0, 20, 0]}
                    />
                </Suspense>
            </Canvas>

            <div className='absolute bottom-2 left-2'>
                <img
                    src={!isPlayingMusic ? soundoff : soundon}
                    alt='jukebox'
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                    className='w-10 h-10 cursor-pointer object-contain'
                />
            </div>
        </section>
    )
}

export default Home;
