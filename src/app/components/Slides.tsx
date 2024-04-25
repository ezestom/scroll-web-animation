"use client"

import { ImageProps, Image as DImage, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { Group, MathUtils } from "three"

function DreiImage(props: ImageProps) {
   const ref = useRef(null)
   const group = useRef<Group>(null)
   const data = useScroll()

   useFrame((state, delta) => {
      if (group.current && ref.current && data) {
         group.current.position.z = MathUtils.damp(
            group.current.position.z,
            Math.max(0, data.delta * 100),
            4,
            delta
         )

         //   @ts-ignore
         ref.current.material.grayscale = MathUtils.damp(
            // @ts-ignore
            ref.current.material.grayscale,
            Math.max(0, 1 - data.delta * 1000),
            4,
            delta
         )
      }
   })
   return (
      <group ref={group}>
         <DImage ref={ref} {...props} />
      </group>
   )
}

function Slide({ urls = [""], ...props }) {
   const ref = useRef(null)
   const { width } = useThree((state) => state.viewport)
   const w = width < 10 ? 1.5 / 3 : 1 / 3

   return (
      <group ref={ref} {...props}>
         <DreiImage position={[-width * w, 0, 0]} scale={[5, 7]} url={urls[0]} />
         <DreiImage position={[0, 0, 0]} url={urls[1]} scale={[7, 5]} />
         <DreiImage position={[width * w, 0, 1]} url={urls[2]} scale={[5, 5]} />
      </group>
   )
}

export default function Slides() {
   const { width } = useThree((state) => state.viewport)
   return (
      <>
         <Slide
            position={[0, 0, 0]}
            urls={[
               "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
               "https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
               "https://images.pexels.com/photos/297303/pexels-photo-297303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            ]}
         />
         <Slide
            position={[width * 1, 0, 0]}
            urls={[
               "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
               "https://images.pexels.com/photos/2224861/pexels-photo-2224861.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
               "https://images.pexels.com/photos/1796505/pexels-photo-1796505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            ]}
         />
         <Slide
            position={[width * 2, 0, 0]}
            urls={[
               "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
               "https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
               "https://images.pexels.com/photos/297303/pexels-photo-297303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            ]}
         />
      </>
   )
}