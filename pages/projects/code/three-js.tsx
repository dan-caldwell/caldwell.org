import Post from '../../[...slug]';
export { getStaticProps } from '../../../utils/next-page';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';

const ThreeJS = (props) => {
    return (
        <Post {...props}>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <PresentationControls
                    speed={1.5} 
                    global 
                    zoom={1} 
                    polar={[-1, 1]}
                >
                    <Box position={[0, 0, 0]} />
                </PresentationControls>
            </Canvas>
        </Post>
    )
}

const Box = (props) => {
    const ref = useRef(null);
    const [hovering, setHovering] = useState(false);
    const [clicked, setClicked] = useState(false);
    
    useFrame((state, delta) => ref.current.rotation.y += 0.01);
    
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovering(true)}
            onPointerOut={() => setHovering(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovering ? 'hotpink' : 'orange'} />
        </mesh>
    )

}

export default ThreeJS;