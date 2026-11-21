import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let character: THREE.Object3D;
        loader.load(
          "/models/character.glb",
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            // Colorful modern materials for character
            const skinMaterial = new THREE.MeshStandardMaterial({
              color: 0xdf9c7e, // Natural warm healthy Indian/tan skin tone
              roughness: 0.55,
              metalness: 0.0,
            });
            const shirtMaterial = new THREE.MeshStandardMaterial({
              color: 0x4f46e5, // Vibrant modern tech indigo hoodie
              roughness: 0.65,
              metalness: 0.05,
            });
            const pantMaterial = new THREE.MeshStandardMaterial({
              color: 0x1e293b, // Deep midnight charcoal navy denim
              roughness: 0.75,
              metalness: 0.02,
            });
            const hairMaterial = new THREE.MeshStandardMaterial({
              color: 0x1c1917, // Natural deep brown-black hair
              roughness: 0.8,
              metalness: 0.02,
            });
            const shoeMaterial = new THREE.MeshStandardMaterial({
              color: 0xf8fafc, // Crisp clean white sneakers
              roughness: 0.35,
              metalness: 0.05,
            });
            const soleMaterial = new THREE.MeshStandardMaterial({
              color: 0x6366f1, // Vibrant indigo accent sole
              roughness: 0.5,
              metalness: 0.05,
            });
            const deskMaterial = new THREE.MeshStandardMaterial({
              color: 0x181824, // Sleek matte dark workstation desk
              roughness: 0.5,
              metalness: 0.2,
            });
            const keyboardMaterial = new THREE.MeshStandardMaterial({
              color: 0x1f2430, // Sleek tech keyboard tray
              roughness: 0.45,
              metalness: 0.2,
            });

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;

                const rawName = mesh.name || "";
                const cleanName = rawName.toLowerCase().replace(/[^a-z0-9]/g, "");

                // Face (Plane007), Ears (Ear001), Hands (Hand), Neck (Neck) -> Complete natural skin tone
                if (
                  cleanName === "plane007" ||
                  cleanName.includes("ear") ||
                  cleanName.includes("hand") ||
                  cleanName.includes("neck") ||
                  cleanName.includes("face")
                ) {
                  mesh.material = skinMaterial;
                }
                // Shirt / Developer Hoodie (BODYSHIRT)
                else if (
                  cleanName.includes("bodyshirt") ||
                  cleanName.includes("shirt")
                ) {
                  mesh.material = shirtMaterial;
                }
                // Pants (Pant)
                else if (cleanName.includes("pant")) {
                  mesh.material = pantMaterial;
                }
                // Hair and Eyebrows
                else if (
                  cleanName === "hair" ||
                  cleanName.includes("eyebrow")
                ) {
                  mesh.material = hairMaterial;
                }
                // Shoes and Soles
                else if (cleanName === "shoe" || cleanName.includes("shoe")) {
                  mesh.material = shoeMaterial;
                } else if (cleanName === "sole" || cleanName.includes("sole")) {
                  mesh.material = soleMaterial;
                }
                // Workstation Desk (Cube002, Plane003)
                else if (
                  cleanName === "cube002" ||
                  cleanName === "plane003"
                ) {
                  mesh.material = deskMaterial;
                }
                // Keyboard
                else if (cleanName === "keyboard") {
                  mesh.material = keyboardMaterial;
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
