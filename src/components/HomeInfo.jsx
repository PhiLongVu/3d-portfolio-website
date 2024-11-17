import { render } from '@react-three/fiber'
import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'
const InfoBox = ({ text, link, btnText }) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={arrow} className="w-4 h-4 object-contain"/>
        </Link>
    </div>
)
const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I'm
            <span className='font-semibold mx-2 text-white'>Phi</span>
            👋
            <br />
            a front-end developer
        </h1>
    ),
    2: (
        <InfoBox
        text="lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        link='/projects'
        btnText='Projects'
         />
    ),
    3: (
        <InfoBox
        text="lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        link='/about'
        btnText='About'
         />
    ),
    4: (
        <InfoBox
        text="lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        link='/contact'
        btnText='Contact'
         />
    )

}
const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null
}

export default HomeInfo
