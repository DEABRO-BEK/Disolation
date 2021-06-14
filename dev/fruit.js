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
});

EasyRegistry.createFoodItem("cinderfruit3", "cinder fruit", "cinderfruit", 0, 64 , 0, {
  eat: function(){
    Entity.addEffect(player, 12, 1, 200)
  
}});




Callback.addCallback('ItemUse', function (coords, item, block) {
if(block.id == BlockID.cinderfruit2){
  World.drop(this.x, this.y, this.z, ItemID.cinderfruit3, 1, 0)
}
});