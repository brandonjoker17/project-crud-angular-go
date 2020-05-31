import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {task} from '../../models/task';
import {AddTask} from '../../store/task.actions';

@Component({
  selector: 'app-input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.scss']
})
export class InputTaskComponent implements OnInit {
  tarea: task;
  constructor(private store: Store) {
    this.tarea = new task();
  }

  ngOnInit(): void {
  }

  addTaskToState(event: Event){
      event.preventDefault();
      this.store.dispatch(new AddTask(this.tarea));
      console.log(this.tarea);
      this.tarea = new task();
  }
}
