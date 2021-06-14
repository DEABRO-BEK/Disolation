/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 6
*/



// file: fruit.js

IMPORT("EasyRegistry")
/*var BLOCK_TYPE_PLANT = Block.createSpecialType({
  base: 18,
  solid: false,
  destroytime: 0.1,
  explosionres: 1,
  renderlayer: 1,
  lightopacity: 1,
  translucency: 0.5,
  sound: "grass"
});*/

EasyRegistry.creatBlockPlant("cinderfruit", "cinder fruit", "cinderfruit_full", 4);
EasyRegistry.creatBlockPlant("cinderfruit2", "cinder fruit", "cinderfruit_full_plant", 4);

Block.setRandomTickCallback(BlockID.cinderfruit, function(x, y, z, id, data){  
var coords = coords.relative; 
  if(World.getBlockID(coords.x, coords.y - 1, coords.z)==BlockID.soilCharred){
      World.setBlock(this.x, this.y, this.z, cinderfruit2, 0);
     }
});9




// file: mask.js

IMPORT("EasyRegistry");
EasyRegistry.createArmorItem("mask", "mask", "mask", 0, 999999999, 99999, "helmet", {
  takeOn(/*item, slot, player*/){
    if(World.getBiome(this.x, this.z)==desolation.id){
    Entity.clearEffect(player, 4)
    Entity.clearEffect(player, 9)
  }}
}); 




// file: header.js

function randomInt(min, max){ 
return Math.floor(Math.random() * (max - min + 1)) + min; 
}


IMPORT("Inventory");
IMPORT("Structures");
//IMPORT("StructuresAPI");
IMPORT("TileRender");




// file: biome/blocks.js

var BLOCK_TYPE_LEAVES = Block.createSpecialType({
    base: 18,
    destroytime: 0.7,
    explosionres: 1,
    renderallfaces: true,
    renderlayer: 1,
    lightopacity: 1,
    translucency: 0.5,
    sound: "grass"
});

var BLOCK_TYPE_WOOD = Block.createSpecialType({
    solid: true,
    renderlayer: 2,
    explosionres: 8,
    translucency: 0,
    sound: "wood"
});

IDRegistry.genBlockID("soilCharred"); 
Block.createBlock("soilCharred", [
    {name: "Charred Soil", texture: [["charred_soil", 0]],inCreative: true}]);
Block.setDestroyTime(BlockID.soilCharred, 2);
ToolAPI.registerBlockMaterial(BlockID.soilCharred, "dirt", 0, true);



//WOOD
(function(){
    let constructVariationsSet = function(name, top, side){
        return [
            {name: name, texture: [[top, 0], [top, 0], [side, 0]], inCreative: true},
            {name: name, texture: [[side, 0], [side, 0], [top, 0], [top, 0], [side, 1]], inCreative: false},
            {name: name, texture: [[side, 1], [side, 1], [side, 1], [side, 1], [top, 0]], inCreative: false}
        ]
    }
    let makeDropFunction = function(id){
        Block.registerDropFunction(id, function(coords, blockID, blockData, level, enchant, item, region){
            return [[blockID, 1, 0]];
        });
    }
    let makePlaceFunction = function(id){
        Block.registerPlaceFunction(id, function(coords, item, block, player, region){
            let r = coords.relative;
            switch(coords.side){
                case 0: case 1:
                    region.setBlock(r.x, r.y, r.z, id, 0); break;
                case 2: case 3:
                    region.setBlock(r.x, r.y, r.z, id, 1); break;
                case 4: case 5:
                    region.setBlock(r.x, r.y, r.z, id, 2); break;
            }
        });
    };
    (function(ids){
        for(let i in ids){
            let block = ids[i];
            let bid = block[0], 
                name = block[1], 
                topt = block[2], 
                sidet = block[3];
            IDRegistry.genBlockID(bid);
            Block.createBlock(bid, constructVariationsSet(name, topt, sidet), BLOCK_TYPE_WOOD);
            ToolAPI.registerBlockMaterial(BlockID[bid], "wood", 0, false);
            makeDropFunction(BlockID[bid]);
            makePlaceFunction(BlockID[bid]);
        }
    })([
        ["charredLog", "Charred Log", "charred_log_top", "charred_log"]    
    ]);
})();

//LEAVES
IDRegistry.genBlockID("burnedLeaves");
Block.createBlock("burnedLeaves", [
    {name: "Ash Bramble", texture: [["ash_bramble", 0]], inCreative: true}
], BLOCK_TYPE_LEAVES);
Block.registerDropFunction("burnedLeaves", function(){
    if(Math.random() < .09){
        return [[280, 1, 0]]
    }
    else {
        return [];
    }
});
ToolAPI.registerBlockMaterial(BlockID.burnedLeaves, "plant");

IDRegistry.genBlockID("burnedLeavesNS");
Block.createBlock("burnedLeavesNS", [
    {name: "Charred Branches", texture: [["charred_branches", 0]], inCreative: true}
], BLOCK_TYPE_LEAVES);
Block.registerDropFunction("burnedLeavesNS", function(){
    if(Math.random() < .09){
        return [[280, 1, 0]]
    }
    else {
        return [];
    }
});
ToolAPI.registerBlockMaterial(BlockID.burnedLeavesNS, "plant");

const ChNSrender = new ICRender.CollisionShape(); 
ChNSrender.addEntry().addBox(1, 1, 1, 0, 0, 0); 
BlockRenderer.setCustomCollisionShape(BlockID.burnedLeavesNS, 0, ChNSrender); 
Block.setShape(BlockID.burnedLeavesNS, 0, 0, 0, 1, 1, 1, 0);




// file: biome/items.js





// file: biome/biome.js

var desolation = new CustomBiome("desolation")
desolation.setServerJson(JSON.stringify({
"minecraft:climate": {
        "downfall": 0.0,
        "snow_accumulation": [
          0.0,
          0.0
        ],
        "temperature": 2.0,
        "blue_spores": 0,
        "red_spores": 0,
        "white_ash": 85,
        "ash": 0
      },
      "minecraft:overworld_height": {
        "noise_type": "default"
      },
      "animal": {},
      "monster": {},
      "overworld": {},
      "desolation": {},
      "minecraft:surface_parameters": {
        "top_material": "minecraft:block_soil_charred",
        "mid_material": "minecraft:block_soil_charred",
        "foundation_material": "minecraft:stone",
        "sea_floor_material": "minecraft:dirt",
        "sea_material": "minecraft:water",
        "sea_floor_depth": 7
      },
      "minecraft:overworld_generation_rules": {
        "hills_transformation": "forest_hills",
        "river_transformation": "frozen_river",
        "generate_for_climates": [
          [
            "cold",
            25
          ],
          [
            "medium",
            32
          ],
          [
            "frozen",
            10
          ]
        ],
        "mutate_transformation": "birch_forest",
        "shore_transformation": "cold_beach"
      } 
}));

desolation.setClientJson(JSON.stringify({
      "water_surface_color": "#3f515d",
      "water_fog_color": "#294252",
      "water_surface_transparency": 0.3,
      "water_fog_distance": 10,
      "fog_identifier": "desolation:desolation"
}));
  
//TREES
var CharredN = new Structure("CharredN");
var CharredS= new Structure("CharredS");
var CharredSM = new Structure("CharredSM");
var CharredG = new Structure("CharredG");
var CharredGM = new Structure("CharredGM");

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
if(World.getBiome(chunkX * 16, chunkZ * 16) != desolation.id) return;
var region = BlockSource.getCurrentWorldGenRegion();
let coords = GenerationUtils.randomCoords(chunkX, chunkZ);
  coords = GenerationUtils.findSurface(coords.x, 72, coords.z);
  if (coords.y > 55 && random.nextFloat() < .45 && World.nativeGetBlockID(coords.x, coords.y, coords.z) == BlockID.soilCharred) {
CharredN.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, region);
  }
  if (coords.y > 55 && random.nextFloat() < .7 && World.nativeGetBlockID(coords.x, coords.y, coords.z) == BlockID.soilCharred) {
CharredS.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, region);
  }
  if (coords.y > 55 && random.nextFloat() < .3 && World.nativeGetBlockID(coords.x, coords.y, coords.z) == BlockID.soilCharred) {
CharredSM.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, region);
  }
  if (coords.y > 55 && random.nextFloat() < .5 && World.nativeGetBlockID(coords.x, coords.y, coords.z) == BlockID.soilCharred) {
CharredG.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, region);
  }
  if (coords.y > 55 && random.nextFloat() < .25 && World.nativeGetBlockID(coords.x, coords.y, coords.z) == BlockID.soilCharred) {
CharredGM.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, region);
  }
  if (random.nextFloat() < .35) {
    if(World.getBlockID(coords.x, coords.y, coords.z) == BlockID.soilCharred && World.getBlockID(coords.x, coords.y + 1, coords.z) == 0) 
      World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.burnedLeavesNS, 0); 
  }      
});












