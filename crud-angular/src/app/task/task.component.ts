import {Component, Input, OnInit} from '@angular/core';
import {task} from '../../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() tarea: task;

  constructor() { }

  ngOnInit(): void {
  }

}
