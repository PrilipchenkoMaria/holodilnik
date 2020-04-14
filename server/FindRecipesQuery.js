const weHave = [{
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

function minimumIngredients(attr, filterProp, idProp, object) {
  const atLeast = {
    [attr]: {
      $elemMatch: {
        [idProp]: object[idProp],
        [filterProp]: { $lte: object[filterProp] },
      },
    },
  };
  const notExist = {
    [attr]: {
      $not: { $elemMatch: { [idProp]: object[idProp] } },
    },
  };
  return { $or: [atLeast, notExist] };
}

const query = {
  $and: [
    subPropIn("ingredients", "name", weHave.map((i) => i.name)),
    ...weHave.map((i) => minimumIngredients("ingredients", "weight", "name", i)),
  ],
};
// eslint-disable-next-line no-undef
db.getCollection("recipes").find(query);
