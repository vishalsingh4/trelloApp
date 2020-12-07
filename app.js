import Model from './src/model.js';
import View from "./src/view.js";

const app = () => {
    document.onreadystatechange = function() {
        if ( document.readyState === "complete" ) {
            const model = new Model();
            const data = model.getAppData();

            const container = document.querySelector('#app');
            const view = new View(container);
            view.generateDashboardView(data);
        }
    }
}

app(); 