import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { Children } from 'react'

const Smooth=({children})=>{
    useEffect(()=>{
        const lenis=new Lenis({
            duration:1.5,
            smoothWheel:true,
          
        })
        function raf(time){
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return ()=>lenis.destroy()
    },[])
    return(
        <>
        {children}
        </>
    )
}
export default Smooth