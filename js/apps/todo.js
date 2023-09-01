
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
 
    if(todoObj.content) { 
       todoData.push(todoObj);
    }
    addInput.value = '';

    updateLS(todoData);

  })

  createTodoElement({content: 'remains to do', isDone: false});
  createTodoElement({content: 'already done', isDone: true});

}

export function updateLS(data){
    // localStorageへtodoDataをJSONに変換してからセット
    localStorage.setItem('myTodo', JSON.stringify(data));
}

export function getTodoData(){
  return JSON.parse(localStorage.getItem('myTodo'));
}

export function createTodoElement(todo){
  const todosUl = document.querySelector('.todos');
  const donesUl = document.querySelector('.dones');

  // todo => todoObj
  // li > p
  const todoItem = document.createElement('li');
  todoItem.classList.add('td-item');
  const todoContent = document.createElement('p');
  todoContent.classList.add('td-content');
  todoContent.textContent = todo.content;
  todoItem.appendChild(todoContent);

  // btn
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('td-btn-container');
  const btn = document.createElement('img');
  btn.classList.add('td-btn');
  // upallow-btn
  const upBtn = btn.cloneNode(false); // 子のーどがあるならtrue
  // upallow-btn-img
  upBtn.setAttribute('src', './images/todo_button/up.png');

  // btn-img
  if(!todo.isDone){  // todo.isDoenがfalseの時
    
    upBtn.classList.add('edit-btn');
    btn.classList.add('isDone-btn');

    btn.setAttribute('src', './images/todo_button/ok.png');
    btnContainer.appendChild(btn);
    btnContainer.appendChild(upBtn);
    todoItem.appendChild(btnContainer); // append to li elm
    todosUl.appendChild(todoItem);
  }else{
    
    upBtn.classList.add('undo-btn');
    btn.classList.add('delete-btn');

    btn.setAttribute('src', './images/todo_button/cancel.png');
    btnContainer.appendChild(btn);
    btnContainer.appendChild(upBtn);
    todoItem.appendChild(btnContainer); // append to li elm
    donesUl.appendChild(todoItem);
  }
  
  todoItem.addEventListener('click', e => {

    // clickしたターゲットが〇〇を含んでいる場合
      if(e.target.classList.contains('isDone-btn')){
        todo.isDone = true;
        console.log(todo.isDone);
      }
      if(e.target.classList.contains('undo-btn')){
        todo.isDone = false;
        console.log(todo.isDone);
      }
 
  })

}