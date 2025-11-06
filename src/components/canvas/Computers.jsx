import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');
  const questTexture = useTexture('./quest.png');

  // 모델 로드 후 모니터 화면 텍스처 교체
  useEffect(() => {
    if (computer.scene && questTexture) {
      let monitorScreen = null;
      let maxTextureSize = 0;

      // 모든 mesh를 순회하며 가장 큰 emissiveMap을 가진 것 찾기 (모니터 화면)
      computer.scene.traverse((child) => {
        if (child.isMesh && child.material && child.material.emissiveMap) {
          const texture = child.material.emissiveMap;
          const textureSize = texture.image ? texture.image.width * texture.image.height : 0;

          // 가장 큰 텍스처를 모니터 화면으로 간주
          if (textureSize > maxTextureSize) {
            maxTextureSize = textureSize;
            monitorScreen = child;
          }
        }
      });

      // 모니터 화면에만 quest.png 적용
      if (monitorScreen) {
        console.log('🎯 모니터 화면 발견:', monitorScreen.material.name);
        questTexture.flipY = false;
        monitorScreen.material.map = questTexture;
        monitorScreen.material.emissiveMap = questTexture;
        monitorScreen.material.emissive = new THREE.Color(0xffffff);
        monitorScreen.material.emissiveIntensity = 0.01; // 밝기 조절 (0.0 ~ 2.0)
        monitorScreen.material.needsUpdate = true;
      }
    }
  }, [computer.scene, questTexture]);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 20]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = event => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
