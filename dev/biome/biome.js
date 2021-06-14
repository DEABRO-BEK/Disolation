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








