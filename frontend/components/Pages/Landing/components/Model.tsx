import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Html } from "drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three/src/core/Object3D"; //Object3D types
import { AnimationClip } from "three/src/animation/AnimationClip"; //Animation types
// import { useInterval } from "usehooks-ts";

interface group {
  current: {
    rotation: {
      x: number;
      y: number;
      z: number;
    };
  };
}

interface actions {
  current: {
    idle: {
      play: () => void;
    };
  };
}

const baseSpeed = 0.001;
const incrementSpeed = 0.001;
const maxSpeed = 0.01;

const Model = ({ latestKeypress }) => {
  /* Refs */
  const group: group = useRef();
  const actions: actions = useRef();

  /* State */
  const [model, setModel] = useState<Object3D | null>(null);
  const [animation, setAnimation] = useState<AnimationClip[] | null>(null);
  const [rotateAt, setRotateAt] = useState(baseSpeed);

  /* Mixer */
  const [mixer] = useState(() => new THREE.AnimationMixer(null));

  useEffect(() => {
    if (!latestKeypress) return;
    setRotateAt((rotateAt) => Math.min(maxSpeed, rotateAt + incrementSpeed));
    setTimeout(() => {
      setRotateAt((rotateAt) => Math.max(baseSpeed, rotateAt - incrementSpeed));
    }, Math.random() * 3000);
  }, [latestKeypress]);

  /* Load model */
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("3d/scene.gltf", async (gltf) => {
      const nodes = await gltf.parser.getDependencies("node");
      const animations = await gltf.parser.getDependencies("animation");
      setModel(nodes[0]);
      setAnimation(animations);
    });
  }, []);

  /* Set animation */
  // useEffect(() => {
  //   // if (animation && typeof group.current != "undefined") {
  //   //   actions.current = {
  //   //     idle: mixer.clipAction(animation[0], group.current as Object3D),
  //   //   };
  //   //   actions.current.idle.play();
  //   //   return () => animation.forEach((clip) => mixer.uncacheClip(clip));
  //   // }
  // }, [animation]);

  /* Animation update */
  useFrame((_, delta) => mixer.update(delta));
  /* Rotation */
  useFrame(() => {
    if (typeof group.current != "undefined")
      return (group.current.rotation.y += rotateAt);
  });

  return (
    <>
      {model ? (
        <group ref={group} position={[0, -1, 2.6]} dispose={null}>
          <primitive ref={group} name="Object_0" object={model} />
        </group>
      ) : null}
    </>
  );
};

export default Model;
