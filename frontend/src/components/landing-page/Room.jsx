
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/room-transformed.glb')
  const { actions } = useAnimations(animations, group)
  //I want to zoom out the model here

  const { camera } = useThree();
  camera.position.z = 80; 
  camera.position.y = 80;
  camera.position.x = 80;
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  const scale = 1;
  

  return (
    <group ref={group} {...props} dispose={null} scale={scale} >
      <group name="Sketchfab_Scene">
        <group name="RootNode">
          <group name="Part_009_L3" position={[91.344, 27.246, 8.141]} rotation={[0, 0, -Math.PI / 10]} />
          <group name="polySurface269" position={[-1.655, 36.155, -39.841]}>
            <mesh name="polySurface269_feu_0" geometry={nodes.polySurface269_feu_0.geometry} material={materials.material_24} />
          </group>
          <group name="polySurface270" position={[-41.298, 80.52, 27.583]}>
            <mesh name="polySurface270_feu_0" geometry={nodes.polySurface270_feu_0.geometry} material={materials.material_24} />
          </group>
          <group name="polySurface271" position={[-0.155, 36.164, -38.255]}>
            <mesh name="polySurface271_feu_0" geometry={nodes.polySurface271_feu_0.geometry} material={materials.material_24} />
          </group>
          <group name="polySurface272" position={[-0.659, 35.216, -41.605]}>
            <mesh name="polySurface272_feu_0" geometry={nodes.polySurface272_feu_0.geometry} material={materials.material_24} />
          </group>
          <group name="polySurface273" position={[-40.672, 82.036, 25.645]}>
            <mesh name="polySurface273_feu_0" geometry={nodes.polySurface273_feu_0.geometry} material={materials.material_24} />
          </group>
        </group>
        <group name="locAlign_pCube182" position={[-36.203, 60.591, 38.226]} rotation={[1.404, 0.304, 1.094]} scale={0.545}>
          <group name="pCube182" rotation={[0, Math.PI / 10, 0]}>
            <mesh name="pCube182_blanc_0" geometry={nodes.pCube182_blanc_0.geometry} material={materials.blanc} />
          </group>
        </group>
        <mesh name="pCube1_brun_0" geometry={nodes.pCube1_brun_0.geometry} material={materials.brun} position={[0, 0, 0.079]} />
        <mesh name="pCube2_rose_0" geometry={nodes.pCube2_rose_0.geometry} material={materials.rose} />
        <mesh name="pCube3_lila_0" geometry={nodes.pCube3_lila_0.geometry} material={materials.lila} />
        <mesh name="pCube17_beige_0" geometry={nodes.pCube17_beige_0.geometry} material={materials.beige} />
        <mesh name="pCylinder1_blanc_0" geometry={nodes.pCylinder1_blanc_0.geometry} material={materials.blanc} position={[-1.996, 0, -3.253]} />
        <mesh name="pCylinder16_brun_fonc��_0" geometry={nodes['pCylinder16_brun_fonc��_0'].geometry} material={materials.brun_fonc} />
        <mesh name="pCylinder16_vert_0" geometry={nodes.pCylinder16_vert_0.geometry} material={materials.vert} />
        <mesh name="pSphere8_transparence_0" geometry={nodes.pSphere8_transparence_0.geometry} material={materials.transparence} />
        <mesh name="pSphere8_eau_0" geometry={nodes.pSphere8_eau_0.geometry} material={materials.material} />
        <mesh name="pSphere8_lambert1_0" geometry={nodes.pSphere8_lambert1_0.geometry} material={materials.lambert1} />
        <mesh name="polySurface201_light_0" geometry={nodes.polySurface201_light_0.geometry} material={materials.light} position={[0, -50.499, 0.044]} scale={1.712} />
        <mesh name="polySurface152_bleu_0" geometry={nodes.polySurface152_bleu_0.geometry} material={materials.bleu} />
        <mesh name="polySurface155_jaune_0" geometry={nodes.polySurface155_jaune_0.geometry} material={materials.jaune} />
        <mesh name="pCube79_turquoise_0" geometry={nodes.pCube79_turquoise_0.geometry} material={materials.turquoise} />
        <mesh name="Mesh1_poisson2_0" geometry={nodes.Mesh1_poisson2_0.geometry} material={materials.poisson2} />
        <mesh name="Mesh1_poisson1_0" geometry={nodes.Mesh1_poisson1_0.geometry} material={materials.poisson1} />
        <mesh name="polySurface188_noir_0" geometry={nodes.polySurface188_noir_0.geometry} material={materials.noir} />
        <mesh name="pCone18_vert_fonc��_0" geometry={nodes['pCone18_vert_fonc��_0'].geometry} material={materials.vert_fonc} />
        <mesh name="pSphere97_vert_pale_0" geometry={nodes.pSphere97_vert_pale_0.geometry} material={materials.vert_pale} />
        <mesh name="Mesh2_musique_0" geometry={nodes.Mesh2_musique_0.geometry} material={materials.musique} />
        <mesh name="noteMesh1_musique_0" geometry={nodes.noteMesh1_musique_0.geometry} material={materials.musique} />
        <mesh name="Neck01_pasted__turquoise_0" geometry={nodes.Neck01_pasted__turquoise_0.geometry} material={materials.pasted__turquoise} />
        <mesh name="pPlane8_plafond_0" geometry={nodes.pPlane8_plafond_0.geometry} material={materials.plafond} position={[-0.899, 0.538, -0.578]} />
        <mesh name="pSphere140_pasted__rose1_0" geometry={nodes.pSphere140_pasted__rose1_0.geometry} material={materials.pasted__rose1} position={[-1.996, 0, -3.253]} />
        <mesh name="pSphere140_pasted__rose_0" geometry={nodes.pSphere140_pasted__rose_0.geometry} material={materials.pasted__rose} position={[-1.996, 0, -3.253]} />
        <mesh name="polySurface231_blanc_0" geometry={nodes.polySurface231_blanc_0.geometry} material={materials.blanc} position={[-23.381, -3.331, -19.841]} />
        <mesh name="polySurface231_beige_0" geometry={nodes.polySurface231_beige_0.geometry} material={materials.beige} position={[-23.381, -3.331, -19.841]} />
        <mesh name="polySurface231_rose_0" geometry={nodes.polySurface231_rose_0.geometry} material={materials.rose} position={[-23.381, -3.331, -19.841]} />
        <mesh name="polySurface231_pasted__rose_0" geometry={nodes.polySurface231_pasted__rose_0.geometry} material={materials.pasted__rose} position={[-23.381, -3.331, -19.841]} />
      </group>
    </group>
  )
}

useGLTF.preload('/room-transformed.glb')
