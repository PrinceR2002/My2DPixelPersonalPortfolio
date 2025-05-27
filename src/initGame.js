import makeKaplayCtx from "./kaplayCtx";
import makePlayer from "./entity/Player";
import { makeSection, addBlinkingArrow, emptySection } from "./components/Section";
import { PALETTE } from "./constants";
import makeSocialIcon from "./components/SocialIcon";
import makeDataSetsIcon from "./components/DataSetsIcons";
import { makeAppear } from "./utils";
import makeWorkExperienceCard from "./components/WorkExperienceCard";
import makeEmailIcon from "./components/EmailIcon";
//import makeProjectCard from "./components/ProjectCard";
import { cameraZoomValueAtom, store } from "./store";


export default async function initGame() {
  const generalData = await (await fetch("./configs/generalData.json")).json();

    const dataSets = await (await fetch("./configs/DataSets.json")).json();
    const experiencesData = await (
      await fetch("./configs/experiencesData.json")
    ).json();
    const projectsData = await (
      await fetch("./configs/projectsData.json")
    ).json();
     const socialsData = await (await fetch("./configs/socialsData.json")).json();
;


    const k = makeKaplayCtx();
    k.loadSprite("player", "./sprites/player.png", {
    sliceX: 4,
    sliceY: 8,
    anims: {
      "walk-down-idle": 0,
      "walk-down": { from: 0, to: 3, loop: true },
      "walk-left-down": { from: 4, to: 7, loop: true },
      "walk-left-down-idle": 4,
      "walk-left": { from: 8, to: 11, loop: true },
      "walk-left-idle": 8,
      "walk-left-up": { from: 12, to: 15, loop: true },
      "walk-left-up-idle": 12,
      "walk-up": { from: 16, to: 19, loop: true },
      "walk-up-idle": 16,
      "walk-right-up": { from: 20, to: 23, loop: true },
      "walk-right-up-idle": 20,
      "walk-right": { from: 24, to: 27, loop: true },
      "walk-right-idle": 24,
      "walk-right-down": { from: 28, to: 31, loop: true },
      "walk-right-down-idle": 28,

        }
    
        
    });

    k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
    k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");

    k.loadSprite("github-logo", "./logos/github-logo.png");
    k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
    k.loadSprite("youtube-logo", "./logos/youtube-logo.png");
    k.loadSprite("x-logo", "./logos/x-logo.png");
    k.loadSprite("substack-logo", "./logos/substack-logo.png");
    k.loadSprite("email-logo", "./logos/email-logo.png");
  
    k.loadSprite("data-retrieval", "./logos/data-retrieval.png");
    k.loadSprite("knowledge-base", "./logos/knowledge-base.png");
    k.loadSprite("generator", "./logos/generator.png");
    k.loadSprite("green-check", "./logos/green-check.png");




    k.loadSprite("ArXiv", "./logos/ArXiv.png");
    k.loadSprite("Common Crawl", "./logos/Common Crawl.png");
    k.loadSprite("PubMed", "./logos/PubMed.png");
    k.loadSprite("SEC-EDGAR", "./logos/SEC-EDGAR.png");
    k.loadSprite("Stack-Overflow", "./logos/stack-overflow.png");
    k.loadSprite("WikiPedia", "./logos/WikiPedia.png");
  

  k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
  k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");

  k.loadShaderURL("tiledPattern", null, `${import.meta.env.BASE_URL}shaders/tiledPattern.frag`);


  if(k.width() < 1000){
    store.set(cameraZoomValueAtom, 0.5);
    k.setCamScale(k.vec2(0.5));
  } else {
    store.set(cameraZoomValueAtom, 0.8);
    k.setCamScale(k.vec2(0.8));
  }

  k.onUpdate(() => {
    const cameraZoomValue = store.get(cameraZoomValueAtom);
    if (cameraZoomValue !== k.camScale().x) k.camScale(k.vec2(cameraZoomValue));
  });

  const tiledBackground = k.add([
    k.uvquad(k.width(), k.height()),
    k.shader("tiledPattern", () => ({
      u_time: k.time() / 100,
      u_color1: k.Color.fromHex(PALETTE.color1),
      u_color2: k.Color.fromHex(PALETTE.color2),
      u_speed: k.vec2(1, -1),
      u_aspect: k.width() / k.height(),
      u_size: 4.5,
    })),
    k.pos(0, 0),
    k.fixed(),
  ]);

  tiledBackground.onUpdate(() => {
    tiledBackground.width = k.width();
    tiledBackground.height = k.height();
    tiledBackground.uniform.u_aspect = k.width() / k.height();
  });

  makeSection(k, k.vec2(k.center().x -400, k.center().y), "< Traditional LLM", (parent)=> {});
  makeSection(k, k.vec2(k.center().x +400, k.center().y), "With RAG >", (parent)=> {});

  const startingLeftX = k.center().x - 400;
  const startingRightX = k.center().x + 400;
  const y = k.center().y;
  const count = 10; // number of blocks you want
  const spacing = 100;
  let userPromptStartingXPos = 0;
  let userPromptStartingXPosRight = 0;

  let DataRetrievalStartingXPosRight = 0;
  let DataRetrievalStartingYPosRight = 0;

  let DataRetrievalVertXPosRight = 0;
  let DataRetrievalVertYPosRight = 0;

  let DataRetrievalEndingXPosRight = 0;
  let DataRetrievalEndingYPosRight = 0;

  let GeneratorStartingX = 0;
  let GeneratorStartingY = 0;

  let ResponseX = 0;
  let ResponseY = 0;

  let GeneratorStartingLeftX = 0;
  let GeneratorStartingLeftY = 0;






 // Left path ----------------------------------------------------------------
for (let i = 0; i < count; i++) {
    const section = emptySection(k, k.vec2(startingLeftX - i * spacing, y));

    if (i >= 9) break; // only 9 arrows total
    // Add blinking arrow next to section
  addBlinkingArrow(k, k.vec2(section.pos.x - 60, section.pos.y), "←");

  }
  
  // Capture the X pos of the last left block (far left end)
  userPromptStartingXPos = startingLeftX - (count - 1) * spacing;
  

  // Vertical path from left-end
  for (let i = 0; i < count; i++) {
    const section = emptySection(k, k.vec2(userPromptStartingXPos, y - i * spacing));    

    if (i >= 9) break; // only 9 arrows total
    // Add blinking arrow next to section
   addBlinkingArrow(k, k.vec2(section.pos.x - 60, section.pos.y), "↑");
    
  }

  GeneratorStartingLeftX = userPromptStartingXPos;
  GeneratorStartingLeftY = y - (count - 1) * spacing;

  for (let i = 0; i < count; i++) {
    const section = emptySection(k, k.vec2(GeneratorStartingLeftX - i * spacing, GeneratorStartingLeftY));

    if (i >= 9) break; // only 9 arrows total
     // Add blinking arrow next to section
   addBlinkingArrow(k, k.vec2(section.pos.x -60, section.pos.y), "←");
  }
 //-------------------------------------------------------------------------------------------

  
  // Right path ----------------------------------------------------------------
  for (let i = 0; i < count; i++) {
   const section = emptySection(k, k.vec2(startingRightX + i * spacing, y));

   if (i >= 9) break; // only 9 arrows total
    addBlinkingArrow(k, k.vec2(section.pos.x + 60, section.pos.y), "→");
  }

    // Capture the X pos of the last left block (far right end)
    userPromptStartingXPosRight = startingRightX + (count - 1) * spacing;
  

    // Vertical path from right-end
    for (let i = 0; i < count; i++) {
      const section = emptySection(k, k.vec2(userPromptStartingXPosRight, y - i * spacing));

      if (i >= 9) break; // only 9 arrows total
      addBlinkingArrow(k, k.vec2(section.pos.x + 60, section.pos.y), "↑");
  }
    
      // Capture the X & Y pos of the ...
      DataRetrievalStartingXPosRight = userPromptStartingXPosRight + (count - 1);
      DataRetrievalStartingYPosRight = y - (count - 1) * spacing; 


// Final horizontal path to the right from top-right corner
for (let i = 0; i < count; i++) {
    const section = emptySection(
      k,
      k.vec2(DataRetrievalStartingXPosRight + i * spacing, DataRetrievalStartingYPosRight)
    );
  
    if (i >= 9) break; // only 9 arrows total
    addBlinkingArrow(k, k.vec2(section.pos.x + 60, section.pos.y), "→");
  }

    // Capture the X & Y pos of the ...
    DataRetrievalVertXPosRight = DataRetrievalStartingXPosRight + (count - 1) * spacing;
    DataRetrievalVertYPosRight = DataRetrievalStartingYPosRight; 
  
        // Vertical path from Data Retrieval input to output
    for (let i = 0; i < 3; i++) {
        const section = emptySection(k, k.vec2(DataRetrievalVertXPosRight, DataRetrievalVertYPosRight - i * spacing));

        if (i >= 2) break; // only 2 arrows total
        addBlinkingArrow(k, k.vec2(section.pos.x + 60, section.pos.y), "↑");
          
    }


        //Data Retrival Output----------------------------------------------------------------
        DataRetrievalEndingXPosRight = DataRetrievalVertXPosRight;
        DataRetrievalEndingYPosRight = DataRetrievalVertYPosRight - (3 - 1) * spacing; ; 

        for (let i = 0; i < count; i++) {
            const section = emptySection(
              k,
              k.vec2(DataRetrievalEndingXPosRight - i * spacing, DataRetrievalEndingYPosRight)
            );

            if (i >= 9) break; // only 9 arrows total
            addBlinkingArrow(k, k.vec2(section.pos.x + 60, section.pos.y), "←");
          }

        //---------------------------------------------------------------------------------------

        //Data retrieval --> Generator -----------------------------------------------------------

        GeneratorStartingX = DataRetrievalEndingXPosRight - (count - 1) * spacing;
        GeneratorStartingY = DataRetrievalEndingYPosRight;

        for (let i = 0; i < count; i++) {
            const section = emptySection(k, k.vec2(GeneratorStartingX, GeneratorStartingY - i * spacing));
          
            if (i >= 9) break; // only 9 arrows total
            addBlinkingArrow(k, k.vec2(section.pos.x + 60, section.pos.y), "↑");
        }

    //-------------------------------------------------------------------------------------------

    //Generator --> Response --------------------------------------------------------------------

    ResponseX = GeneratorStartingX;
    ResponseY = GeneratorStartingY - (count - 1) * spacing;

    for (let i = 0; i < count; i++) {
    const section = emptySection(k, k.vec2(ResponseX + i * spacing, ResponseY));

    if (i >= 9) break; // only 9 arrows total
    addBlinkingArrow(k, k.vec2(section.pos.x + 60, section.pos.y), "→");
   }
   //--------------------------------------------------------------------------------------------

//Left Side Attributes -----------------------------------------------------------------------------

   makeSection(
    k,
    k.vec2(k.center().x - 400, k.center().y),
    "",
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);
      const firstExperience = experiencesData[8]; 
  
        makeWorkExperienceCard(
          k,
          container,
          k.vec2(firstExperience.pos.x -1100, firstExperience.pos.y + 150),
          firstExperience.cardHeight,
          firstExperience.roleData
        );
      
  
      makeAppear(k, container);
    }
  );
  //---User Prompt Section-------------------------------------------------------------------------------------
makeSection(
  k,
  k.vec2(userPromptStartingXPos-400, k.center().y),
  "User Promt",
  (parent) => {
    const container = parent.add([k.opacity(0), k.pos(0)]);
   const userPrompt = experiencesData[1]
      makeWorkExperienceCard(
        k,
        container,
        k.vec2(userPrompt.pos.x - 800, userPrompt.pos.y -650),
        userPrompt.cardHeight,
        userPrompt.roleData
      );
    

    makeAppear(k, container);
  }
);
// Add a left-facing sprite next to the section
const userPromptSectionLeftPos = k.vec2(userPromptStartingXPos - 400, k.center().y);

// Add a left-facing sprite right *next to* the section (to its left)
const rightFacingSprite = k.add([
  k.sprite("player"),
  k.pos(userPromptSectionLeftPos.x-200, userPromptSectionLeftPos.y - 100), // Adjust -150 for spacing
  k.scale(8),
]);
rightFacingSprite.play("walk-right-idle");

makeSection(
  k,
  k.vec2(GeneratorStartingLeftX +200, GeneratorStartingLeftY),
  //generalData.section2Name,
  "Generator",
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);
      const experienceData = experiencesData[6]
        makeWorkExperienceCard(
          k,
          container,
          k.vec2(experienceData.pos.x-300, experienceData.pos.y ),
          experienceData.cardHeight,
          experienceData.roleData
        );
      
  
      makeAppear(k, container);
    }
  );
 // Store the section's position in a variable for clarity
 const generatorLeftPos = k.vec2(DataRetrievalStartingXPosRight-400, ResponseY);


 const generatorLeftIcon = k.add([
  k.sprite("generator"),
  k.pos(GeneratorStartingLeftX +200, GeneratorStartingLeftY),
  k.anchor("center"),
  k.scale(0.4), // Adjust scale if needed
 ]);
   //Response------------------------------------------------------------------------------
   makeSection(
    k,
    k.vec2(GeneratorStartingLeftX-1000, GeneratorStartingLeftY),
    //generalData.section2Name,
    "Response",
      (parent) => {
        const container = parent.add([k.opacity(0), k.pos(0)]);
        const experienceData = experiencesData[7]
          makeWorkExperienceCard(
            k,
            container,
            k.vec2(experienceData.pos.x - 650, experienceData.pos.y -700),
            experienceData.cardHeight+50,
            experienceData.roleData
          );
        
    
        makeAppear(k, container);
      }
    );

 const responseLeftIcon = k.add([
  k.sprite("green-check"),
  k.pos(GeneratorStartingLeftX-1000, GeneratorStartingLeftY),
  k.anchor("center"),
  k.scale(0.2), // Adjust scale if needed
 ]);



  
//Right Side Attributes -----------------------------------------------------------------------------

   //Knowledge Base -----------------------------------------------------------------------------
   makeSection(
    k,
    k.vec2(DataRetrievalEndingXPosRight+300, DataRetrievalEndingYPosRight+100),
    //generalData.section2Name,
    "Knowledge Base",
    (parent) => {
      /* make the container independent of the section
       so that the skill icons appear on top of every section's children.
       so that when the skill icons are pushed around by the player
       they always remain on top */
      const container = k.add([
        k.opacity(0),
        k.pos(parent.pos.x + 600, parent.pos.y),
      ]);

      for (const dataSet of dataSets) {
        makeDataSetsIcon(
          k,
          container,
          k.vec2(dataSet.pos.x, dataSet.pos.y),
          dataSet.logoData,
          dataSet.name
        );
      }

      const experienceData = experiencesData[3]
        makeWorkExperienceCard(
          k,
          container,
          k.vec2(experienceData.pos.x -1500, experienceData.pos.y - 750), // or adjust position
          experienceData.cardHeight,
          experienceData.roleData
        );
      

      makeAppear(k, container);
    }
  );


 // Store the section's position in a variable for clarity
 const knowledgeBasePos = k.vec2(DataRetrievalEndingXPosRight+300, DataRetrievalEndingYPosRight+100);


 const knowledgeBaseIcon = k.add([
  k.sprite("knowledge-base"),
  k.pos(knowledgeBasePos.x, knowledgeBasePos.y+10),
  k.anchor("center"),
  k.scale(0.3), // Adjust scale if needed
 ]);
//--------------------------------------------------------------------------------------------

makeSection(
  k,
  k.vec2(k.center().x + 400, k.center().y),
  "",
  (parent) => {
    const container = parent.add([k.opacity(0), k.pos(0)]);
    const firstExperience = experiencesData[0]; 

      makeWorkExperienceCard(
        k,
        container,
        k.vec2(firstExperience.pos.x, firstExperience.pos.y + 150),
        firstExperience.cardHeight,
        firstExperience.roleData
      );
    

    makeAppear(k, container);
  }
);

//---User Prompt Section-------------------------------------------------------------------------------------
makeSection(
  k,
  k.vec2(k.center().x + 1650, k.center().y),
  "User Promt",
  (parent) => {
    const container = parent.add([k.opacity(0), k.pos(0)]);
   const userPrompt = experiencesData[1]
      makeWorkExperienceCard(
        k,
        container,
        k.vec2(userPrompt.pos.x - 400, userPrompt.pos.y -650),
        userPrompt.cardHeight,
        userPrompt.roleData
      );
    

    makeAppear(k, container);
  }
);
// Add a left-facing sprite next to the section
const userPromptSectionPos = k.vec2(k.center().x + 1650, k.center().y);

// Add a left-facing sprite right *next to* the section (to its left)
const leftFacingSprite = k.add([
  k.sprite("player"),
  k.pos(userPromptSectionPos.x + 100, userPromptSectionPos.y - 100), // Adjust -150 for spacing
  k.scale(8),
]);

leftFacingSprite.play("walk-left-idle");

//---Data Retrieval---------------------------------------------------------------------------------------------
makeSection(
  k,
  k.vec2(DataRetrievalStartingXPosRight-400, DataRetrievalStartingYPosRight-100),
  "Data Retrieval",
  (parent) => {
    const container = parent.add([k.opacity(0), k.pos(0)]);
    const experienceData = experiencesData[2]
      makeWorkExperienceCard(
        k,
        container,
        k.vec2(experienceData.pos.x - 650, experienceData.pos.y -650),
        experienceData.cardHeight,
        experienceData.roleData
      );
    

    makeAppear(k, container);
  }
);

// Store the section's position in a variable for clarity
const sectionPos = k.vec2(DataRetrievalStartingXPosRight - 400, DataRetrievalStartingYPosRight - 100);

// Add the image sprite 200 pixels to the right of the section
const imageEntity = k.add([
  k.sprite("data-retrieval"),
  k.pos(sectionPos.x, sectionPos.y+10),
  k.anchor("center"),
  k.scale(0.3), // Adjust scale if needed
]);


 //Generator------------------------------------------------------------------------------
   makeSection(
    k,
    k.vec2(DataRetrievalStartingXPosRight-400, ResponseY),
    //generalData.section2Name,
    "Generator",
      (parent) => {
        const container = parent.add([k.opacity(0), k.pos(0)]);
        const experienceData = experiencesData[4]
          makeWorkExperienceCard(
            k,
            container,
            k.vec2(experienceData.pos.x - 650, experienceData.pos.y -650),
            experienceData.cardHeight,
            experienceData.roleData
          );
        
    
        makeAppear(k, container);
      }
    );


 // Store the section's position in a variable for clarity
 const generatorPos = k.vec2(DataRetrievalStartingXPosRight-400, ResponseY);


 const generatorIcon = k.add([
  k.sprite("generator"),
  k.pos(generatorPos.x, generatorPos.y),
  k.anchor("center"),
  k.scale(0.4), // Adjust scale if needed
 ]);


  //Response------------------------------------------------------------------------------
  makeSection(
    k,
    k.vec2(ResponseX+ 1000, ResponseY),
    //generalData.section2Name,
    "Response",
      (parent) => {
        const container = parent.add([k.opacity(0), k.pos(0)]);
        const experienceData = experiencesData[5]
          makeWorkExperienceCard(
            k,
            container,
            k.vec2(experienceData.pos.x - 650, experienceData.pos.y -700),
            experienceData.cardHeight+50,
            experienceData.roleData
          );
        
    
        makeAppear(k, container);
      }
    );

    const responsePos = k.vec2(ResponseX+1000, ResponseY);


 const responseIcon = k.add([
  k.sprite("green-check"),
  k.pos(responsePos.x, responsePos.y),
  k.anchor("center"),
  k.scale(0.2), // Adjust scale if needed
 ]);
//---General Welome Section-------------------------------------------------------------------------------------
makeSection(
  k,
  k.vec2(k.center().x, k.center().y),
  "",
  (parent) => {
    const container = parent.add([k.pos(-805, -700), k.opacity(0)]);

    container.add([
      k.text(generalData.header.title, { font: "ibm-bold", size: 88 }),
      k.color(k.Color.fromHex(PALETTE.color4)),
      k.pos(550, 0),
      k.opacity(0),
    ]);

    container.add([
      k.text(generalData.header.subtitle, {
        font: "ibm-bold",
        size: 48,
      }),
      k.color(k.Color.fromHex(PALETTE.color4)),
      k.pos(565, 100),
      k.opacity(0),
    ]);

    const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

    for (const socialData of socialsData) {
      if (socialData.name === "Email") {
        makeEmailIcon(
          k,
          socialContainer,
          k.vec2(socialData.pos.x, socialData.pos.y),
          socialData.logoData,
          socialData.name,
          socialData.address
        );
        continue;
      }

      makeSocialIcon(
        k,
        socialContainer,
        k.vec2(socialData.pos.x, socialData.pos.y),
        socialData.logoData,
        socialData.name,
        socialData.link,
        socialData.description
      );
    }

    makeAppear(k, container);
    makeAppear(k, socialContainer);
  }
);

//-------------------------------------------------------------------------------------------------------


makePlayer(k, k.vec2(k.center()), 700);
  

}