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