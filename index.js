const ArcadePhysisc = require('./src/physics/arcade/ArcadePhysics');

function index(config) {
  return new ArcadePhysisc(config);
}

module.exports = index;
