const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = `https://www.povarenok.ru/recipes/cat/`;

getUrl(url, function (html) {
    getCategoriesList(html);
});


async function getUrl(url, callback) {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Not found");
            }
            return res.text();
        })
        .then(html => {
            callback(html);
        });
}

function getCategoriesList(html) {
    const $ = cheerio.load(html);
    const categoriesList = [];

    $(".dishtype-bl > div > h2 > a").each(function (i) {
        categoriesList[i] = $(this).attr("href");
    });

    printCategoriesList(categoriesList);
}

function printCategoriesList(list) {
    console.log(list);
}

/*1.загрузить данные по ссылке
2.Выбрать нужные ссылки.Создать массив из выбранных ссылок
3. Вывести в командную строку данные из массива
 */


/*
getUrl(`https://www.povarenok.ru/recipes/cat/`, function (html) {
    console.log(html);
});



function getUrl(url, callback) {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Not found");
            }
            return res.text();
        })
        .then(html => {
            callback(html);
        });
}

*/


class PovarenokGrabber {

    async getCategoriesList() {
        let categoriesList;
        let categoriesSelector = "body > div.page-width > div.site-content > div > div.content-md > section > div.dishtype-bl > div > h2 > a";

    }

}



