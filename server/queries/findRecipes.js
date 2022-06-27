const { ObjectId } = require("mongodb");

const recipeStateEnum = {
  draft: 0,
  rejected: 1,
  review: 2,
  published: 3,
};

Object.freeze(recipeStateEnum);

function getRecipePublishedOrFilter(userId) {
  return {
    $or: [
      { state: recipeStateEnum.published },
      { createdBy: ObjectId.isValid(userId) && ObjectId(userId) },
    ],
  };
}

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

function getRecipesMatchingQuery(ingredients, userId) {
  return {
    ...getRecipePublishedOrFilter(userId),
    $and: [
      subPropIn("ingredients", "name", ingredients.map((i) => i.name)),
      ...ingredients.map((i) => minimumIngredients("ingredients", "weight", "name", i)),
    ],
  };
}

module.exports = {
  getRecipePublishedOrFilter,
  getRecipesMatchingQuery,
  recipeStateEnum,
};
