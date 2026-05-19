/**
 * pnpm hook to skip the postinstall build script for @nxg-org/mineflayer-pathfinder.
 * The 2026-rewrite branch ships a pre-compiled dist/ folder, so re-building from
 * TypeScript source is unnecessary and currently fails due to upstream type errors.
 */
function readPackage(pkg) {
  if (pkg.name === "@nxg-org/mineflayer-pathfinder") {
    if (pkg.scripts && pkg.scripts.postinstall) {
      delete pkg.scripts.postinstall;
    }
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
