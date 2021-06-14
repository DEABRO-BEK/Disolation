IMPORT("EasyRegistry");
EasyRegistry.createArmorItem("mask", "mask", "mask", 0, 999999999, 99999, "helmet", {
  takeOn(/*item, slot, player*/){
    if(World.getBiome(this.x, this.z)==desolation.id){
    Entity.clearEffect(player, 4)
    Entity.clearEffect(player, 9)
  }}
}); 