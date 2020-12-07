export default class Model {

    getAppData() {
        const listData = window.localStorage.getItem('listData');
        if(!listData){
            window.localStorage.setItem('listData', JSON.stringify([])
            );
        }
        return JSON.parse(window.localStorage.getItem('listData'));
    }

    setAppData(data){
        const promise = new Promise ((resolve, reject)  => {
            const draggableData = JSON.parse(window.localStorage.getItem('listData'));
            
                for(let todo of draggableData) {
                    if((todo.id === data.id) || (todo.task === data.task.trim())) {
                        draggableData.splice(data.id, 1, data);
                        alert('Duplicate data !!');
                        reject(`Duplicate data ${data}`);
                        return;
                    }
                }
                draggableData.push(data);
            

            window.localStorage.setItem('listData', JSON.stringify([...draggableData]));
            resolve(this.getAppData()); 
        })
        return promise;
    }
}