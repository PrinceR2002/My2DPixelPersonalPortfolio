import { PALETTE } from "../constants";

// Right Arrow
export function addBlinkingArrow(k, posVec2, direction = "→") {
    const arrow = k.add([
      k.text(direction, { font: "ibm-bold", size: 30 }),
      k.color(PALETTE.color3),
      k.anchor("center"),
      k.pos(posVec2),
    ]);
  
    let t = 0;
    arrow.onUpdate(() => {
      t += k.dt();
      arrow.opacity = 0.5 + 0.5 * Math.sin(t * 2);
    });
  
    return arrow;
  }

  
// Create a non-interactive visual section
export function emptySection(k, posVec2) {
    return k.add([
      k.rect(50, 50, { radius: 10 }),
      k.anchor("center"),
      k.pos(posVec2),
      k.color(PALETTE.color3),
    ]);
  }
  
// Create an interactive section with collision logic
export function makeSection(k, posVec2, sectionName, onCollide = null) {
  const section = k.add([
    k.rect(80, 80, { radius: 10 }),
    k.anchor("center"),
    k.area(),
    k.pos(posVec2),
    k.color(PALETTE.color4),
    sectionName,
  ]);


  const textObj = section.add([
    k.text(sectionName, { font: "ibm-bold", size: 64 }),
    k.color(PALETTE.color3),
    k.anchor("center"),
    k.pos(0, -150),
  ]);

  // Animate up and down
  const baseY = textObj.pos.y;
  let t = 0;
  textObj.onUpdate(() => {
    t += k.dt();
    textObj.pos.y = baseY + Math.sin(t * 2) * 10; // 10px bounce, adjust as needed
  });



  if (onCollide) {
    const onCollideHandler = section.onCollide("player", () => {
      onCollide(section);
      onCollideHandler.cancel();
    });
  }

  return section;
}
