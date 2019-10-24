const PovarenokGrabber = require("./src/strategies/PovarenokGrabber")


;(async () => {
    const grabbers = [
        new PovarenokGrabber(),
    ];

    const data = grabbers.map(i => i.runGrabbing());
})();
