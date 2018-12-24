const ArcadePhysisc = require('./src/physics/arcade/ArcadePhysics');
const Scene = require('./src/scene/Scene');

function index(config) {
  return new ArcadePhysisc(new Scene(), config);
}

module.exports = index;
