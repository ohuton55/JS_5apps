

export function hello() {

  const addForm = document.querySelector('.td-add-form'); 
  const addInput = document.querySelector('.td-add-input');  

  const todoData = [];

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
    updateTodo(addInput, todoData);
  })

  //createTodoElement({content: 'remains to do', isDone: false}, addInput, todoData);
  //createTodoElement({content: 'already done', isDone: true}, addInput, todoData);

}

export function updateLS(data){
    // localStorageへtodoDataをJSONに変換してからセット
    localStorage.setItem('myTodo', JSON.stringify(data));
}

export function getTodoData(){
  return JSON.parse(localStorage.getItem('myTodo'));
}

export function createTodoElement(todo, addInput, todoData, todosUl, donesUl){

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
  if(!todo.isDone){  // todo.isDoneがfalseの時
    
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
    console.log('click!');
    if(e.target.classList.contains('isDone-btn')){
      todo.isDone = true;
    }
    if(e.target.classList.contains('undo-btn')){
      todo.isDone = false;
    }
    if(e.target.classList.contains('edit-btn')){
      addInput.value = e.target.parentElement.previousElementSibling.textContent;
      // todoDataから要素を1つずつ取り出す（data)
      // todoがdataに一致しないものだけをtodoDataに格納する
      todoData = todoData.filter(data => data !== todo);
      addInput.focus();
    }
    if(e.target.classList.contains('delete-btn')){
      todoData = todoData.filter(data => data !== todo);
    }
    updateLS(todoData);
    updateTodo(addInput, todoData);
  })
}

export function updateTodo(addInput, todoData){

  const todosUl = document.querySelector('.todos');
  const donesUl = document.querySelector('.dones');
  
  todosUl.innerHTML = ''; //<ul>内の<li><p><img>を空に
  donesUl.innerHTML = '';
  
  todoData = getTodoData();
  todoData.forEach(todo => {
    createTodoElement(todo, addInput, todoData, todosUl, donesUl);
  })
}