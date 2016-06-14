export class Sorter {
  getSorterObject(array) {
    let sorterObject:any = {sortBy: ''};
    array.forEach((name) => {
      sorterObject[name] = 'fa-sort'
    })
    return sorterObject;
  }

  changeClassName(sorter, sortBy) {
    let sortObject = jQuery.extend(true, {}, sorter);

    for (var key in sortObject) {
      if (key == sortBy) {
        if (sortObject[key] == 'fa-sort' || sortObject[key] == 'fa-sort-desc') {
          sortObject[key] = 'fa-sort-asc';
          sortObject.sortBy = sortBy;
        } else {
          sortObject[key] = 'fa-sort-desc';
          sortObject.sortBy = '-' + sortBy;
        }
      } else if (key == 'sortBy') {
        //do nothing
      } else {
        sortObject[key] = 'fa-sort';
      }
    }
    return sortObject;
  }
}