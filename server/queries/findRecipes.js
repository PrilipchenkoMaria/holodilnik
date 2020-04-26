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

function recipesQuery(ingredients) {
  return {
    $and: [
      subPropIn("ingredients", "name", ingredients.map((i) => i.name)),
      ...ingredients.map((i) => minimumIngredients("ingredients", "weight", "name", i)),
    ],
  };
}

module.exports = recipesQuery;
