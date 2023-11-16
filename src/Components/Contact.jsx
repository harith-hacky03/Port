import React, { useEffect } from 'react'
import './Landing.css'
import gsap from 'gsap';
import './Contact.css'
import insta from '../assets/insta.png'
import mail from '../assets/mail.png'
import linkedin from '../assets/linkedin.png'
const Landing = () => {

  /*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates to the left or right enough, it will loop back to the other side
- Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
- The returned timeline will have the following methods added to it:
- next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
- current() - returns the current index (if an animation is in-progress, it reflects the final index)
- times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
*/
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1); 
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

useEffect(()=>{ 
const elems = gsap.utils.toArray(".elem");
const loop = horizontalLoop(elems, { paused: false,repeat:-1,speed:3 });


},[])


const links=[{
    image:insta,
    title:"INSTAGRAM",
    link:"https://instagram.com/_._._harith_._._?igshid=Zzh1dDVmdm50aTc4"
},
{
    image:mail,
    title:"EMAIL",
    link:"mailto:harithchandrasekaran5@gmail.com"
},{
    image:linkedin,
    title:"LINKEDIN",
    link:"https://www.linkedin.com/in/harith-chandrasekaran-45b953290"
},
]

const feedbacks=[{
    company:'Virgin Shelters',
    cont:'Exceptional web developer who consistently delivers high-quality work on time and within budget. His expertise and attention to detail are invaluable to our team.'
},{
    company:'Gemco Labs',
    cont:' ability to grasp complex technical concepts and translate them into user-friendly solutions is truly remarkable. His commitment to excellence is evident in every project he undertakes.'
},{
    company:'Web3 ',
    cont:'Harith is a pleasure to work with. He is always responsive to feedback and eager to go the extra mile to ensure client satisfaction.'
}]



  return (
    <div className=' min-h-screen bg-white overflow-hidden md:grid grid-cols-2'>
      <div className='md:pt-24 pt-8 '>
        <div className='bor'>
            <div className='titles text-center'>Contact</div>
            <div className='grid grid-flow-row'>
                {links.map((m)=>{
                    return(
                        <div>
                        <div  className='bore w-[80%] md:w-[50%] px-5 py-2 mx-auto items-center gap-7 my-5 flex'>
                          <a href={m.link}><div className='flex justify-between items-center '>
                            <img  className='md:w-[60px] w-[45px]'  src={m.image}/>
                            <div className='md:ml-20 cc ml-[80px] font-semibold md:mr-40'>{m.title}</div>
                            </div></a>
                        </div>
                        </div>
                    )
                })}
            </div>
            </div>
      </div>
      <div className='stripe md:mt-[10%]'>
        <div className='cont bg-black'>
          <div className='elem '>
            <h1 className='text-5xl textt text-white'>TESTIMONIALS</h1>
            <img className='bett' src='https://assets.website-files.com/637853f6f3d6aacb22fa97db/6388474cbaaa350e3c0e56fd_giphy.gif' alt=''/>
          </div>
          <div className='elem '>
            <h1 className='text-5xl textt  text-white'>TESTIMONIALS</h1>
            <img className='bett' src='https://assets.website-files.com/637853f6f3d6aacb22fa97db/6388474cbaaa350e3c0e56fd_giphy.gif' alt=''/>
          </div>
          <div className='elem '>
            <h1 className='text-5xl textt  text-white'>TESTIMONIALS</h1>
            <img className='bett' src='https://assets.website-files.com/637853f6f3d6aacb22fa97db/6388474cbaaa350e3c0e56fd_giphy.gif' alt=''/>
          </div>
          <div className='elem '>
            <h1 className='text-5xl textt  text-white'>TESTIMONIALS</h1>
            <img className='bett' src='https://assets.website-files.com/637853f6f3d6aacb22fa97db/6388474cbaaa350e3c0e56fd_giphy.gif' alt=''/>
          </div>
        </div>
        <div className='grid grid-flow-row'>
                {feedbacks.map((f)=>{
                    return(
                        <div className='bob py-6'>
                            <div className='md:w-[20%] font-bold ml-auto md:px-0 px-6  cc'>{f.company}</div>
                            <div className='px-6 font-semibold cc'>{f.cont}</div>
                        </div>
                    )
                })}
        </div>
      </div>
     
    </div>
  )
}

export default Landing