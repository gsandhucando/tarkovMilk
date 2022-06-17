/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("../../tarkovMilk.glb");
    const myMesh = React.useRef();
  
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      myMesh.current.rotation.y = a / 2;
    });
  
  return (
    <group ref={myMesh} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={nodes.Object_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={nodes.Object_3.material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("../../tarkovMilk.glb");
