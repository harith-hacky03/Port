import React, { useEffect,useRef } from 'react'
import gsap from 'gsap'
import './About.css'
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const About = () => {

  useEffect(()=>{
    gsap.fromTo(".tx",{
      opacity:0
    },{
      opacity:1,
      scrollTrigger:{
        trigger:".tr",
        scrub:true,
        start:"80% 200%",
        
      }
    })
  })


return (
  <div className='min-h-screen tr overflow-hidden pb-[50px] md:pb-[200px]'>
    <div className='contin pag mt-[7%]'>
      <div className='let md:text-[40px] text-[22px] p-5  w-[1200px]'>
        <p  className='mt-[20px] tx'>Harith, a frontend developer with a strong focus on seamlessly connecting frontend and backend technologies. I specialize in translating design concepts into interactive and responsive web applications.</p>
        <p className='mt-10 md:mt-0 tx'>Proficient in frameworks like React, as well as backend technologies such as Node.js and Express, I aim to create user-centric interfaces that not only look visually appealing but also function seamlessly.</p>
      </div>
    </div>
  </div>
);

}

export default About