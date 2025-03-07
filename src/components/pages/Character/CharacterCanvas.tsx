import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Group } from 'three';
import { useRef } from 'react';
import { FC, memo } from 'react';
import { getModelPath } from '@/helpers/CharacterHelper';
import { ICharacter } from '@/models/Stores/User/IUser';

interface ICharacterCanvasProps {
  appearance: Omit<ICharacter, 'modelPath'>;
}

const CharacterCanvas: FC<ICharacterCanvasProps> = memo(({ appearance }) => {
  const group = useRef<Group>(null);
  const modelPath = getModelPath({
    sex: appearance.sex,
    bodyType: appearance.bodyType,
    hairStyle: appearance.hairStyle,
    clothes: appearance.clothes,
    hat: appearance.hat,
  });

  const { scene } = useGLTF(modelPath, true);

  return (
    <Canvas camera={{ position: [-1.5, 1, 3], fov: 40 }} shadows="basic" gl={{ antialias: false }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[5, 5, 5]} castShadow shadow-mapSize={[512, 512]} />

      <group ref={group} position={[0, -1, 0]}>
        <primitive object={scene} />
      </group>

      <OrbitControls
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={1}
        maxDistance={6}
        enableDamping={false}
      />

      <Environment preset="city" />
    </Canvas>
  );
});

export default CharacterCanvas;
