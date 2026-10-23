import { useEffect, type RefObject } from "react";
export default function BenefitsMotion({ target }: {target: RefObject<HTMLDivElement>}) {
  useEffect(() => {
    let cancelled=false;
    let dispose=()=>{};
    import('@/lib/motion').then(({gsap})=>{
      if(cancelled || !target.current) return;
      const match=gsap.matchMedia();
      match.add('(prefers-reduced-motion: no-preference)',()=>{
        const cards=target.current!.querySelectorAll('.benefit-flight');
        gsap.fromTo(cards,{x:()=>innerWidth<768?65:innerWidth*.65,y:45,z:-90,rotationY:-14,rotationZ:3}, {x:0,y:0,z:0,rotationY:0,rotationZ:0,stagger:.14,ease:'power2.out',duration:1,scrollTrigger:{trigger:target.current,start:'top 92%',end:'top 30%',scrub:.65}});
      });
      dispose=()=>match.revert();
    });
    return ()=>{cancelled=true;dispose();};
  },[target]);
  return null;
}
