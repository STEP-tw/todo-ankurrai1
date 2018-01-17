let counter = 0;

const getNewItemBox = function(){
  let form = document.querySelector("div");
  let inputBox = document.createElement("input");
  inputBox.name = `${++counter}`;
  form.appendChild(inputBox)
  form.innerHTML += '<br/><br/>'
}
