const fs = require("fs");
const util = require("util");

const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);


const dataDir = __dirname + `/../../data`;


module.exports = class PersistenceService {
    constructor(name) {
        this.name = name;
    }

    async ensureDir() {
        return mkDir(`${dataDir}/${this.name}`);
    }

    async saveJson(key, value) {
        await this.ensureDir();

        const data = JSON.stringify(value);

        return new Promise((res, rej) => {
            fs.writeFile(`${dataDir}/${this.name}/${key}.json`, data, err => err ? rej(err) : res());
        });
    }

    async loadJson(key) {

    }
};

Object.assign(module.exports, {
    isDir,
});

async function mkDir(path) {
    if (await isDir(path)) return;

    return mkdir(path, {recursive: true});
}

async function isDir(path) {
    return stat(path)
        .then(stats => stats.isDirectory())
        .catch(error => {
            if (error && error.code === 'ENOENT') return false;

            throw error;
        });
}

