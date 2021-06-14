LIBRARY({
  name: "EasyRegistry", // 
  version: 0.1,
  shared: false,
  api: "CoreEngine"
});
var BLOCK_TYPE_PLANT = Block.createSpecialType({
  base: 18,
  solid: false,
  destroytime: 0.1,
  explosionres: 1,
  renderlayer: 1,
  lightopacity: 1,
  translucency: 0.5,
  sound: "grass"
});

var EasyRegistry = {
  creatItem(id, name, texture, stack, category, glint, damage) {
    IDRegistry.genItemID(id);
    Item.createItem(id, name, { name: texture, meta: meta }, { stack: stack });
    /*Item.registerUseFunction(id, function(coords, item, block){
    callbacks.use//.func
    });*/
    /*Item.registerNoTargetUseFunction(id, function(coords, item, block){
    callbacks.NoTargetUse.funcc
    });*/
    Item.setCategory(ItemID[id], category)
    Item.setGlint(id, glint ? glint : false)
    Item.setMaxDamage(id, damage ? damage : 0)

  },
  createFoodItem(id, name, texture, meta, stack, food) {
    IDRegistry.genItemID(id);
    Item.createFoodItem(id, name, {
      name: texture,
      meta: meta
    }, { stack: stack, food: food });

    Item.setCategory(ItemID[id], 4)
    Item.setGlint(id, glint ? glint : false)
    // Item.setMaxDamage(id, damage ? damage : 0)

Callback.addCallback('FoodEaten', function (food, satRatio) {
func.eat(food, setRatio)

});

  },
  createArmorItem(id, name, texture, slot, armor, durability, type, func) {
    IDRegistry.genItemID(id);
    Item.createArmorItem(id, name, {
      name: texture
    }, { armor: armor, durability: durability, texture: texture, type: type });
    Armor.registerOnTakeOnListener(ItemID[id], function(item, slot, player) {
      if (slot == slot && item.id == ItemID[id]) {
        func.takeOn(/*item, slot, player*/)
      }
    })
  },
  
  creatBlockPlant(id, name, texture, lightlevel){
    
var BLOCK_TYPE_PLANT = Block.createSpecialType({
  base: 18,
  solid: false,
  destroytime: 0.1,
  explosionres: 1,
  renderlayer: 4,
  lightlevel: lightlevel,
  lightopacity: 1,
  translucency: 0.5,
  sound: "grass"
});
    IDRegistry.genBlockID(id);
Block.createBlock(id, [{ name: name, texture: [[texture, 0]], inCreative: true }],  BLOCK_TYPE_PLANT);
  }
}
EXPORT("EasyRegistry", EasyRegistry);