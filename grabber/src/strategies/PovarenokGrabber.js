const fetch = require("node-fetch");
const cheerio = require("cheerio");


module.exports = class PovarenokGrabber {
    async runGrabbing() {
        const url = `https://www.povarenok.ru/recipes/cat/`;
        const html = await this.getUrl(url);
        const list = this.getCategoriesList(html);
        let subCategoriesUrl = await this.loadEachSubCategoryUrl(list);
        return this.print(subCategoriesUrl);


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


    async loadEachSubCategoryUrl(urls) {
        let requests = urls.map(url => this.getUrl(url));
        let subCategoriesUrl = await Promise.all(requests)
            .then(responses => Promise.all(responses.map(response => this.getTypesOfDishesList(response))));
        return subCategoriesUrl;
    }

    async print(list) {

        console.log(list);
    }

    async getTypesOfDishesList(categoryHTML) {
        const $ = cheerio.load(categoryHTML);
        const TypesOfDishesList = [];

        $(".dishtype-bl >  h2 > a").each(function (i) {
            TypesOfDishesList[i] = $(this).attr("href");
        });

        return TypesOfDishesList;
    }
};
