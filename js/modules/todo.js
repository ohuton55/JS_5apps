export function hello() {
  const addForm = document.querySelector('.td-add-form');
  const addInput = document.querySelector('.td-add-input');

  let todoData = [];

  addForm.addEventListener('submit', e => {
    e.preventDefault(); // デフォルトの更新を抑制する

    let todoObj = {
      content: addInput.value.trim(),
      isDone: false
   };
  
  todoData.push(todoObj);
  addInput.value = '';

  updateLS(todoData);

  })
}

export function updateLS(data){
    // localStorageへtodoDataをJSONに変換してからセット
    localStorage.setItem('myTodo', JSON.stringify(data));
}
