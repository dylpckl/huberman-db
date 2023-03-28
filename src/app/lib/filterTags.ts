const tagsToRemove = [
  "andrew huberman",
  "huberman lab podcast",
  "huberman podcast",
  "andrew huberman podcast",
  "the huberman lab podcast",
  "dr. andrew huberman",
  "huberman lab",
  "science podcast",
  "neuroscience",
];

export function filterTags(tags: string[]) {
  // console.log(tags);
  return tags.filter((el) => !tagsToRemove.includes(el));
  // const filteredTags = tags.filter(function (tag) {
  //   return tagsToRemove.indexOf(tag) < 0;
  // });
  //   return filteredTags;
}
