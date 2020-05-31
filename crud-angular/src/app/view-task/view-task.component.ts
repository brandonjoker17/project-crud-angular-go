import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {TaskState} from '../../store/task.state';
import {task} from '../../models/task';
import * as assert from 'assert';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  @Select(TaskState.selectAllTasks) tareas$: Observable<task[]>;
  constructor(private store: Store) { }

  ngOnInit(): void {}


}
