import Model from './model.js';
import View from './view.js';

export default class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  onSubmit() {
    const btn = document.querySelector('#submit-btn');
    btn.addEventListener('click', () => {
      const totaltasks = this.model.getAppData().length;
      const value = document.querySelector('#addTask').value;
      const payload = {
        task: value,
        id: totaltasks
      };
      this.model.setAppData(payload).then(allTasks => {
        this.view.render(allTasks, true);
        this.clearText();
      });
    });
  }

  addDraggableEvents() {
    const list = document.querySelector('.project-list');
    const progressList = document.querySelector('.progress');
    const doneList = document.querySelector('.done');

    list.addEventListener('dragover', this.dragOver);
    list.addEventListener('drop', this.dragDrop);

    progressList.addEventListener('dragover', this.dragOver);
    progressList.addEventListener('drop', this.dragDrop);

    doneList.addEventListener('dragover', this.dragOver);
    doneList.addEventListener('drop', this.dragDrop);
  }

  dragEventHandler(item) {
    const content = document.getElementById(item.id);
    content.addEventListener('drag', this.dragStart);
  }

  dragStart(e) {
    window.draggedID = e.target.id;
    e.dataTransfer.setData('text', e.target.id);
    e
    .currentTarget
    .style
    .backgroundColor = 'yellow';
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragDrop(e) {
    e.preventDefault();
    const a = document.getElementById(window.draggedID);
    this.append(a)
  }

  clearText() {
    const field = document.querySelector('#addTask');
    field.value = '';
  }
}
