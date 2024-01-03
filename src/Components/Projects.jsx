import React from 'react'
import arrow from '../assets/arrow.svg'
import virSel from '../assets/virShel.png'
import './Projects.css'
import gemco from '../assets/gemco.png'
import priChem from '../assets/priChem.png'
import web3 from '../assets/web3.png'
import sketch from '../assets/sketch.png'

const Projects = () => {


 
    

    const preview=[
        {
            title:'VIRGIN SHELTERS',
            image:virSel,
            cont:"A Modern animated real-estate website built using react, tailwind css and gsap with the AI chatbot facility enabled.",
            link:'https://virginshelters.in/'
        },
        {
            title:'GEMCO LABS',
            image:gemco,
            cont:"Renewed website with advanced designs and animations. Renewed designs and added the contact form and cart facility with increases the customer interaction rate by 30%.",
            link:'https://www.gemcolabs.com/'
        },
        {
            title:'PRIYADHARSHINI CHEMICALS',
            image:priChem,
            cont:"Added cart facility , contact form , feedback receiving services and made the website responsive for all kind of devices.",
            link:'https://prichemgroups.com/domestic.php'
        },
        {
            title:'WEB3 SASTRA',
            image:web3,
            cont:"As the leader of the web development cluster , designed and developed the website from stratch and managed the team of web developers . ",
            link:'https://www.web3sastra.org/'
        },
        {
            title:'SKETCH BOOK',
            image:sketch,
            cont:"As a React.js Developer for the Sketchbook project, I am dedicated to crafting a cutting-edge collaborative whiteboard web app. Leveraging my expertise in React.js and Socket.io, I drive the development of real-time collaboration features, ensuring an intuitive and responsive user interface. I am committed to enhancing the Sketchbook experience, employing my skills to create a dynamic platform that facilitates seamless collaboration and fosters effective project communication.",
            link:"https://soft-muffin-0fda76.netlify.app/"
        }
    ]
  return (
    <div className='min-h-screen bg-black '>
        <div className=" titles uppercase pt-4  text-center  text-slate-200">PROJECTS</div>
        
        <div className='pt-2 md:block hidden'>
            <div className='grid grid-rows-4 '>
                {preview.map((m)=>{
                    return(
                        <div className='add  '>
                            <div className='h-[1px] bg-white'></div>
                        <div className='absolute border-10px border border-black previewer bg-white w-[400px]'>
                            <img className=''  src={m.image}/>
                            <div className='p-2 cc font-semibold '>{m.cont}</div>
                        </div>
                        <div className='h-[120px] flex'>
                            <div className='w-[100%]  text-white  tii '>{m.title}</div>
                            <a href={m.link}>
                            <img width={100} className='bg-white  absolute right-0 ' src={arrow} alt=''/>
                            </a>
                        </div>
                        
                        </div>
                    )
                })}
            </div>
        </div>

        <div className='md:hidden'>
            <div className='pb-3'>
                {preview.map((p)=>{
                    return(
                        <div className='cc p-5  bg-neutral-900 my-8 mx-2'>
                            <img src={p.image} alt=''/>
                            <div className='flex justify-between items-center my-3'>
                            <div className='text-white mt-2 font-semibold'>{p.title}</div>
                            <a href={p.link}><div className='text-white border border-2px bordter-white px-3 rounded-md font-semibold'>Visit Site</div></a>
                            </div>
                            <div className='text-white'>{p.cont}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}



export default Projects