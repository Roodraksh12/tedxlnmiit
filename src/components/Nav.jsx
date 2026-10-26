import { useContext, useEffect, useRef, useState } from 'react';
import { Home, Compass, Info, Images, Mic2, Users, GraduationCap, Menu, ArrowUpRight } from 'lucide-react';
import { NavbarContext } from '../context/NavContext';
import './Nav.css';
const items = [
  {name:'Home',href:'/',icon:Home}, {name:'Theme',href:'/theme',icon:Compass},
  {name:'About',href:'/about',icon:Info}, {name:'Gallery',href:'/gallery',icon:Images},
  {name:'Past Speakers',href:'/past-speakers',icon:Mic2}, {name:'Team',href:'/team',icon:Users},
  {name:'Campus Ambassador',href:'/campus ambassador',icon:GraduationCap},
];
export default function Navbar(){
  const {navOpen,setNavOpen}=useContext(NavbarContext);
  const [visible,setVisible]=useState(true),[active,setActive]=useState('/');
  const navRef=useRef(null),linksRef=useRef([]),focusWithin=useRef(false);
  const [indicator,setIndicator]=useState({x:0,width:0});
  const moveTo=index=>{const el=linksRef.current[index];if(el)setIndicator({x:el.offsetLeft,width:el.offsetWidth})};
  useEffect(()=>{
    const path=decodeURIComponent(location.pathname).replace(/\/$/,'')||'/';setActive(path);
    const index=Math.max(0,items.findIndex(item=>item.href===path));
    const restore=()=>moveTo(index);restore();
    const observer=new ResizeObserver(restore);if(navRef.current)observer.observe(navRef.current);
    let last=window.scrollY,raf=0;
    const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{const y=window.scrollY;if(Math.abs(y-last)>8||y<80){setVisible(y<80||y<last);last=y}raf=0})};
    window.addEventListener('scroll',onScroll,{passive:true});
    return()=>{observer.disconnect();cancelAnimationFrame(raf);window.removeEventListener('scroll',onScroll)};
  },[]);
  const restore=()=>moveTo(Math.max(0,items.findIndex(item=>item.href===active)));
  return <header className={`ted-nav-header ${visible||navOpen?'':'is-hidden'}`} onFocusCapture={()=>setVisible(true)}>
    <a className="ted-brand" href="/" aria-label="TEDxLNMIIT home"><img src="/images/logo-white2.webp" alt="TEDxLNMIIT" width="180" height="60"/></a>
    <nav className="ted-nav-pill" ref={navRef} aria-label="Main navigation" onFocusCapture={()=>{focusWithin.current=true}} onPointerLeave={()=>{if(!focusWithin.current)restore()}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget)){focusWithin.current=false;restore()}}}>
      <span className="ted-nav-indicator" aria-hidden="true" style={{width:indicator.width,transform:`translateX(${indicator.x}px)`,opacity:indicator.width?1:0}}/>
      {items.map(({name,href,icon:Icon},index)=><a key={href} ref={el=>linksRef.current[index]=el} className="ted-nav-link" href={href} aria-current={active===href?'page':undefined} onPointerEnter={()=>moveTo(index)} onFocus={()=>moveTo(index)}><Icon size={19} strokeWidth={1.65} aria-hidden="true"/><span>{name}</span></a>)}
    </nav>
    <div className="ted-nav-actions"><a className="ted-ticket" href="/tickets">Get Tickets <ArrowUpRight size={15} aria-hidden="true"/></a><button className="ted-menu" type="button" onClick={()=>setNavOpen(true)} aria-label="Open navigation menu" aria-expanded={navOpen}><Menu size={23}/></button></div>
  </header>;
}
