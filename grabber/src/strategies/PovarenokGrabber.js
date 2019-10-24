const fetch = require("node-fetch");
const cheerio = require("cheerio");


module.exports = class PovarenokGrabber {
    async runGrabbing() {
        const url = `https://www.povarenok.ru/recipes/cat/`;
        const html = await this.getUrl(url);
        const list = this.getCategoriesList(html);
        return this.printCategoriesList(list);
    }

    async getUrl(url) {
        return fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not found");
                }
                return res.text();
            });
    }

    getCategoriesList(html) {
        const $ = cheerio.load(html);
        const categoriesList = [];

        $(".dishtype-bl > div > h2 > a").each(function (i) {
            categoriesList[i] = $(this).attr("href");
        });

        return categoriesList;
    }

    printCategoriesList(list) {
        console.log(list);
    }
};
