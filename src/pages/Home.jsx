import React from 'react'
import { Canvas } from "@react-three/fiber";
import { Suspense } from 'react'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'

const Home = () => {
    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let screenRotation = [0.1, 4.7, 0];
        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }
        return { screenScale, screenPosition, screenRotation };
    }
    const { screenScale, screenPosition, screenRotation } = adjustIslandForScreenSize();
    return (
        <section className='w-full h-screen relative'>
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                Popup
            </div>
            <Canvas className='w-full h-screen bg-transparent'
            camera={{near: 0.1, far: 1000}}>
                <Suspense fallback={<Loader />}> 
                <directionalLight position={[1,1,1]} intensity={2}></directionalLight>
                <ambientLight intensity={0.5}></ambientLight> 
                <spotLight></spotLight>
                <hemisphereLight skyColor="#00fffb" groundColor="#5e005d" intensity={1}></hemisphereLight>
                <Sky />
                <Island 
                    position={screenPosition}
                    scale={screenScale}
                    rotation={screenRotation}
                />
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home;
