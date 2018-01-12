let displayTodo = function() {
  document.getElementById("table").innerHTML=inSingleHtml(data);
};

const inSingleHtml = function(todo) {
  let todoTitles=Object.keys(todo);
  todoTitles.map(intoTableRow).join("");
};

const intoTableRow = function(todoTitles) {
  let feedBack = "";
  title += `<td><aref="oldTodo">${todoTitles}</a></td>`;
  return `<tr>${title}</tr>`;
};
<a href="#"></a>
