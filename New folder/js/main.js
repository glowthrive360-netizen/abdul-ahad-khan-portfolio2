// main.js - animations and small three.js canvases for project previews
gsap.registerPlugin(ScrollTrigger);

// small floating effect for profile image
const profileImg = document.querySelector('.profile-img');
if(profileImg){
  gsap.to(profileImg, {y:-8, duration:2, repeat:-1, yoyo:true, ease:"sine.inOut"});
}

// tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max:12,
  speed:400,
  glare:true,
  "max-glare":0.15
});

// Intersection animations
gsap.utils.toArray('.card').forEach((el, i) => {
  gsap.from(el, {
    opacity:0, y:24, duration:0.8, delay: i*0.08,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Contact form handler (demo)
function handleContact(e){
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.innerText = "Sending...";
  setTimeout(()=>{
    btn.innerText = "Send Message";
    alert("Thanks — message demo sent (no backend).");
    e.target.reset();
  }, 900);
}

// Create simple three.js rotating spheres as project thumbnails
function makeMiniScene(containerId, colorHex) {
  const container = document.getElementById(containerId);
  if(!container) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  const geometry = new THREE.IcosahedronGeometry(1.2,1);
  const material = new THREE.MeshStandardMaterial({color: colorHex, metalness:0.4, roughness:0.2});
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(5,5,5);
  scene.add(light);
  camera.position.z = 3.5;
  function resize(){
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  function animate(){
    mesh.rotation.y += 0.01;
    mesh.rotation.x += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

makeMiniScene('proj1-canvas', 0x5b8def);
makeMiniScene('proj2-canvas', 0xff8a65);
makeMiniScene('proj3-canvas', 0x6ad3c9);

// Smooth scroll nav
document.querySelectorAll('.navlinks a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth', block:'start'});
  });
});
