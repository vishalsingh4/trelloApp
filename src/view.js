import Controller from "./controller.js";

export default class View {

    constructor(container) {
        this.container = container;
        
    }

    generateDashboardView(data) {
        const addList = document.querySelector('.add-taskArea');
        const frag = document.createDocumentFragment();

        const textarea = document.createElement('textarea');
        textarea.setAttribute('id', 'addTask');
        textarea.setAttribute('placeholder', 'Add Project....');

        const btn = document.createElement('button');
        const btnText = document.createTextNode('Submit');
        btn.appendChild(btnText);
        btn.setAttribute('id', 'submit-btn');

        frag.appendChild(textarea);
        frag.appendChild(btn);
        addList.appendChild(frag);
        this.render(data);
    }

    render(data, addTask) {
        let controller = new Controller();
        const content = document.querySelector('.dashboard-view');
        while(content.firstChild) {
            content.removeChild(content.firstChild)
        }

        data.forEach(item => {
            const content = document.querySelector('.dashboard-view');
            const div = document.createElement('div');
            const head = document.createTextNode(item.task);
            div.appendChild(head);

            div.classList.add('card')
            div.setAttribute('id', item.id + 1);
            div.setAttribute('draggable', true);
            
            content.appendChild(div);
            controller.dragEventHandler(div);
        });
        
        controller.addDraggableEvents();
        if(!addTask) {
            controller.onSubmit();
        }
    }
}