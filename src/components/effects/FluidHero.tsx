import {useEffect,useRef} from 'react';
import {useReducedMotion} from '@/hooks/useReducedMotion';
export default function FluidHero(){
 const ref=useRef<HTMLCanvasElement>(null); const reduced=useReducedMotion();
 useEffect(()=>{
  if(reduced || !ref.current)return;
  const canvas=ref.current, gl=canvas.getContext('webgl',{alpha:false,antialias:false}); if(!gl)return;
  const shaders:WebGLShader[]=[];
  const compile=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);shaders.push(s);return s;};
  const program=gl.createProgram()!;
  gl.attachShader(program,compile(gl.VERTEX_SHADER,'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
  gl.attachShader(program,compile(gl.FRAGMENT_SHADER,`precision mediump float;
  uniform vec2 res,mouse,velocity;uniform float time;
  float field(vec2 p){return sin(p.x*3.1+sin(p.y*2.8+time*.13))+cos(p.y*3.7+sin(p.x*2.4-time*.09));}
  void main(){vec2 uv=gl_FragCoord.xy/res;vec2 p=(uv-.5)*vec2(res.x/res.y,1.);vec2 m=(mouse-.5)*vec2(res.x/res.y,1.);
  float influence=exp(-dot(p-m,p-m)*5.);p-=velocity*influence*.8;
  for(int i=0;i<3;i++){float f=float(i);p+=.085*vec2(sin(p.y*5.+time*.12+f),cos(p.x*4.-time*.11+f));}
  float n=field(p);float blue=exp(-length(p-vec2(-.4,.17)+vec2(n*.16,sin(n)*.18))*2.2);float coral=exp(-length(p-vec2(.52,-.26)+vec2(cos(n)*.17,n*.12))*2.8);
  vec3 col=vec3(.0784,.0863,.1059);col+=vec3(.2745,.3569,.9333)*blue*.8;col+=vec3(1.,.3765,.2745)*coral*.7;
  col+=.035*pow(max(0.,sin(n*2.+p.x*4.)),10.)*(blue+coral);gl_FragColor=vec4(col,1.);}`));
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);return;}
  gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const position=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const u=(name:string)=>gl.getUniformLocation(program,name);const resolution=u('res'),pointer=u('mouse'),velocity=u('velocity'),time=u('time');
  let frame=0,visible=true,x=.5,y=.5,tx=.5,ty=.5,vx=0,vy=0,last=0,elapsed=0;
  const resize=()=>{const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio,1.5);canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);gl.viewport(0,0,canvas.width,canvas.height);};
  const move=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;const r=canvas.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=1-(e.clientY-r.top)/r.height;};
  const draw=(now:number)=>{frame=0;if(!visible||document.hidden)return;if(now-last<32){frame=requestAnimationFrame(draw);return;}elapsed+=Math.min((now-last)/1000,.05);last=now;vx+=(tx-x-vx)*.1;vy+=(ty-y-vy)*.1;x+=(tx-x)*.08;y+=(ty-y)*.08;gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform2f(pointer,x,y);gl.uniform2f(velocity,vx*6,vy*6);gl.uniform1f(time,elapsed);gl.drawArrays(gl.TRIANGLES,0,6);canvas.dataset.ready="true";frame=requestAnimationFrame(draw);};
  const resume=()=>{cancelAnimationFrame(frame);if(visible&&!document.hidden){last=performance.now();frame=requestAnimationFrame(draw);}};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;resume();});observer.observe(canvas);const size=new ResizeObserver(resize);size.observe(canvas);canvas.closest<HTMLElement>('.hero')?.addEventListener('pointermove',move);document.addEventListener('visibilitychange',resume);resize();resume();
  return()=>{delete canvas.dataset.ready;cancelAnimationFrame(frame);observer.disconnect();size.disconnect();canvas.closest<HTMLElement>('.hero')?.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',resume);gl.deleteBuffer(buffer);shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);gl.getExtension('WEBGL_lose_context')?.loseContext();};
 },[reduced]);
 return <div className="fluid-hero" aria-hidden="true"><div className="fluid-orb orb-blue"/><div className="fluid-orb orb-coral"/><canvas ref={ref} className="fluid-canvas"/><div className="grain"/></div>;
}
