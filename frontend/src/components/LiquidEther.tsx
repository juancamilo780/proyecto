// @ts-nocheck
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './LiquidEther.css'
export default function LiquidEther({colors=['#5227FF','#FF9FFC','#B19EEF'], style={}, className=''}){
  const mountRef=useRef(null); const rafRef=useRef(null)
  useEffect(()=>{
    const container=mountRef.current; if(!container) return
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); renderer.setSize(container.clientWidth,container.clientHeight); renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); container.prepend(renderer.domElement)
    const scene=new THREE.Scene(); const camera=new THREE.Camera()
    const data=new Uint8Array(colors.length*4); colors.forEach((hex,i)=>{const c=new THREE.Color(hex); data[i*4]=Math.round(c.r*255); data[i*4+1]=Math.round(c.g*255); data[i*4+2]=Math.round(c.b*255); data[i*4+3]=255}); const pal=new THREE.DataTexture(data,colors.length,1,THREE.RGBAFormat); pal.needsUpdate=true
    const vs='attribute vec3 position;varying vec2 uv;void main(){uv=position.xy*0.5+0.5;gl_Position=vec4(position,1.0);}'
    const fs='precision highp float;uniform sampler2D pal;uniform float t;varying vec2 uv;void main(){float v=0.5+0.5*sin(6.2831*(uv.x+uv.y+t*0.05)); vec3 c=texture2D(pal,vec2(v,0.5)).rgb; gl_FragColor=vec4(c,0.6);}'
    const mat=new THREE.RawShaderMaterial({vertexShader:vs,fragmentShader:fs,transparent:true,uniforms:{pal:{value:pal},t:{value:0}}})
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat); scene.add(mesh)
    const clock=new THREE.Clock()
    function loop(){ mat.uniforms.t.value+=clock.getDelta(); renderer.render(scene,camera); rafRef.current=requestAnimationFrame(loop) }
    loop()
    const ro=new ResizeObserver(()=>{ renderer.setSize(container.clientWidth,container.clientHeight) })
    ro.observe(container)
    return()=>{ if(rafRef.current) cancelAnimationFrame(rafRef.current); ro.disconnect(); renderer.dispose(); const cnv=renderer.domElement; if(cnv&&cnv.parentNode) cnv.parentNode.removeChild(cnv) }
  },[colors])
  return <div ref={mountRef} className={`liquid-ether-container ${className}`} style={style}/>
}
