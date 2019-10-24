const {expect} = require("chai");
const Entity = require("./PersistenceService");
const fs = require("fs");


describe("PersistenceService", () => {
    const testDir = __dirname + "/../../data/saveJsonTest";
    before(async function () {
        if (!await Entity.isDir(testDir)) {
            return;
        }

        fs.unlinkSync(testDir + "/testKey.json");
        fs.rmdirSync(testDir);
    });
    it("saveJson", async () => {
        const data = {test: "abc"};

        await new Entity("saveJsonTest").saveJson("testKey", data);

        expect(fs.existsSync(testDir + "/testKey.json")).to.be.ok;
    });

    it("loadJson", async () => {
        const data = {test: "abc"};

        const instance = new Entity("test");
        await instance.saveJson("test", data);
        const res = await instance.loadJson("test");

        expect(data).to.be.deep.equal(res);
    });
});

