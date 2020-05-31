import {State, Action, StateContext, Selector} from '@ngxs/store';
import { task } from '../models/task';
import { AddTask, DeleteTask, EmptyTask, SelectTask, UpdateTask } from './task.actions';
import {Injectable} from '@angular/core';

export interface TaskStateModel {
    Tasks: Array<task>;
    SelectedTask: task|null;
}

@State<TaskStateModel>({
  name: 'task',
  defaults: {
      Tasks: [],
      SelectedTask: null
  }
})
@Injectable()
export class TaskState {
  @Selector() static selectAllTasks(state: TaskStateModel): Array<task> {
    return state.Tasks;
  }

  @Selector() static getSelectedTask(state: TaskStateModel): task {
    return state.SelectedTask;
  }

  @Action(AddTask)
  addTask(
    { getState, setState }: StateContext<TaskStateModel>,
    { payload }: AddTask
  ) {
    const state = getState();
    setState({
      ...state,
      Tasks: [...state.Tasks, payload]
    });
  }

  @Action(DeleteTask)
  deleteTask(
    { getState, setState }: StateContext<TaskStateModel>,
    { payload }: DeleteTask
  ){
    const state = getState();
    const newListTask = this.arrayRemove(state.Tasks, payload);
    setState({
      ...state,
      Tasks: newListTask
    });
  }

  @Action(EmptyTask)
  emptyTask({ getState, setState }: StateContext<TaskStateModel> ){
    const state = getState();
    setState({
      ...state,
      SelectedTask: null
    });
  }

  @Action(SelectTask)
  selectTask(
    { getState, setState }: StateContext<TaskStateModel>,
    { payload }: SelectTask
  ){
    const state = getState();
    const nuevaTask = this.getTaskById(state.Tasks, payload);
    setState({
      ...state,
      SelectedTask: nuevaTask
    });
  }

  @Action(UpdateTask)
  updateTask(
    { getState, setState }: StateContext<TaskStateModel>,
    { payload }: UpdateTask
  ) {
    const state = getState();
    const nuevaListTask = this.generateNewListTask(state.Tasks, payload);
    setState({
      Tasks: nuevaListTask,
      SelectedTask: null
    });
  }

  private arrayRemove(arr: Array<task>, value: number): Array<task> {
    return arr.filter(element => {
      return element.id !== value;
    });
  }

  private getTaskById(arr: Array<task>, id: number): task {
    return arr.find(tarea => tarea.id === id);
  }
  private generateNewListTask(arr: Array<task>, item: task): Array<task> {
    return arr.map(obj => {
      if (obj.id === item.id){
        obj = {...item};
      }
      return obj;
    });
  }
}
