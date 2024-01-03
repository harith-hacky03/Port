import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import ui from '../assets/ui.svg'
import webflow from '../assets/webflow.svg'
import webDev from '../assets/webDev.svg'
import webDes from '../assets/webDes.svg'
import webre from '../assets/webre.svg'
import pap2 from '../assets/pap2.png'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MotionPathPlugin)
const Example = () => {
 

  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const titRef=useRef(null)
  const plRef=useRef(null)

  useEffect(()=>{
    const curTitRef=titRef.current
    const curPlRef=plRef.current
    gsap.to(curPlRef,{
      scrollTrigger:{
        trigger:".mni",
        start:"-20% -20%",
       
      },
      motionPath:{
        path:[{x:100,y:0},{x:1310,y:0}]
      },
      duration:1,
      onComplete:()=>{
        gsap.to(
          curPlRef,{
            opacity:0
          }
        )
      }
    })

    gsap.fromTo(curTitRef,{
      opacity:0
    },{
      scrollTrigger:{
        trigger:".mni",
        start:"-20% -20%",
    
      },
      opacity:1,
      duration:1,
      delay:0.5
    })
  },[])
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-35%"]);

  return (
    <section ref={targetRef} className=" relative pb-7 md:pb-0 mni  h-[300vh] bg-neutral-900">
      <div className="pt-12 w-[60%] mx-auto items-center text-center">
      <span ref={titRef} className=" titles uppercase  text-center   text-slate-200">
          Services
        </span>
      </div>
     
      <img ref={plRef} className="absolute top-10 md:block hidden" width={200} src={pap2} alt=""/>
      
      <div className="sticky top-0 hidden md:flex h-[600px] items-center overflow-hidden">
        <motion.div style={{ x }} className="md:flex gap-4 ">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>

      <div className="sticky top-0 md:hidden  items-center overflow-hidden">
        <div style={{ x }} className="md:flex mt-5 mx-[10px] gap-8 grid grid-flow-row ">
          {cards.map((card) => {
            return <Card card={card}  key={card.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[340px] w-[340px] md:h-[450px] md:w-[450px] overflow-hidden bg-black"
    >
      <img src={card.url} 
        className="mx-auto w-[300px] md:w-[350px]  inset-0 z-0 "
      />
      <div className=" md:pt-5  bottom-0 left-[17%] text-center z-10 grid place-content-center">
        <p className="  sty text-2xl font-black uppercase text-white ">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
  {
    url: webDev,
    title: "WEB DEVELOPMENT",
    id: 1,
  },
  {
    url: webDes,
    title: "WEB DESIGN",
    id: 2,
  },
  {
    url: webre,
    title: "WEBSITE RENEWAL",
    id: 3,
  },
  {
    url: webflow,
    title: "WEBFLOW DESIGN",
    id: 4,
  },
  {
    url: ui,
    title: "UI DESIGN",
    id: 5,
  },
];