import { useLayoutEffect, useEffect, type RefObject } from "react";
let played = false;
const useOpeningEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
export default function BrandIntro({target}: {target: RefObject<HTMLElement>}) {
  useOpeningEffect(() => {
    const root = target.current;
    if (!root || played || matchMedia('(prefers-reduced-motion: reduce)').matches || scrollY > 80) return;
    played = true;
    root.dataset.intro = 'pending';
    let disposed = false;
    let revert = () => {};
    const finish = () => { delete root.dataset.intro; };
    import('@/lib/motion').then(({gsap}) => {
      if (disposed) return;
      const context = gsap.context(() => {
        const timeline = gsap.timeline({onComplete: finish});
        timeline.fromTo('.brand-intro', {opacity:1,scale:1}, {opacity:0,scale:1.12,duration:1.25,ease:'power2.inOut'}, .45)
          .fromTo('.hero-reveal', {opacity:0,y:24}, {opacity:1,y:0,duration:1.1,ease:'power3.out'}, .85);
      }, root);
      revert = () => context.revert();
    }).catch(finish);
    const interrupt = () => { disposed = true; revert(); finish(); };
    window.addEventListener('wheel', interrupt, {passive:true,once:true});
    window.addEventListener('touchstart', interrupt, {passive:true,once:true});
    root.addEventListener('focusin', interrupt);
    return () => { disposed=true; revert(); finish(); window.removeEventListener('wheel',interrupt); window.removeEventListener('touchstart',interrupt); root.removeEventListener('focusin',interrupt); };
  }, [target]);
  return <div className="brand-intro" aria-hidden="true">smartlocal</div>;
}


