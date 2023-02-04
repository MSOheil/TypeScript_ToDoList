import { v4 as uuidV4 } from "uuid"


// console.log(uuidV4())

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: task[] = loadTasks();
tasks.forEach(AddNewTask)

type task = {
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
};

form?.addEventListener('submit', e => {
    e.preventDefault();
    if (input?.value == null || input?.value == "") {
        return;
    }
    const task: task = {
        id: uuidV4(),
        title: input?.value,
        completed: false,
        createdAt: Date()
    }
    tasks.push(task);
    saveTasks();
    AddNewTask(task);
    input.value = '';
});

function AddNewTask(task: task): boolean {
    const item = document.createElement("li");


    var lable = document.createElement("lable");

    var checkBox = document.createElement("input");

    checkBox.addEventListener('change', () => {
        task.completed = checkBox.checked;
        console.log(tasks);
    });
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    lable.append(checkBox, task.title);

    item.append(lable);

    list?.append(item);

    return true;

}

function saveTasks() {
    localStorage.setItem("Tasks", JSON.stringify(tasks));

}
function loadTasks(): task[] {
    var taskJson = localStorage.getItem("Tasks");
    if (taskJson == null) return [];
    return JSON.parse(taskJson);
}