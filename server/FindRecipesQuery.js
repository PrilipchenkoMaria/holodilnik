const we_have = [{
    name: "Творог",
    weight: 500,
}, {
    name: "Яйцо куриное",
    weight: 2,
    measure: "piece",
}, {
    name: "Пшеничная мука",
    weight: 2,
    measure: "spoon",
}, {
    name: "Сахар",
    weight: 5,
}];


function subPropIn(parentProp, subProp, values) {
    return {
        [parentProp]: {
            $not: {
                $elemMatch: {
                    [subProp]: {
                        $not: {
                            $in: values,
                        },
                    },
                },
            },
        },
    };
}
function atLeast(attr, filterProp, idProp, object) {
    const atLeast = {
        [attr]: {
            $elemMatch: {
                [idProp]: object[idProp],
                [filterProp]: {$lte: object[filterProp]},
            },
        },
    };
    const notExist = {
        [attr]: {
            $not: {$elemMatch: {[idProp]: object[idProp]}},
        },
    };
    return {$or: [atLeast, notExist]};
}
const query = {
    $and: [
        subPropIn('ingredients', 'name', we_have.map(i => i.name)),
        ...we_have.map(i => atLeast('ingredients', 'weight', 'name', i)),
    ],
};
db.getCollection('recipes').find(query);
