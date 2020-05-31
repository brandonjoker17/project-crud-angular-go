import { task } from '../models/task';

export class AddTask {
    static readonly type = '[Task] Add Task Item';
    constructor(public readonly payload: task) {}
}

export class DeleteTask {
  static readonly type = '[Task] Delete Task item';
  constructor(public readonly payload: number) {}
}

export class SelectTask {
  static readonly type = '[Task] Selected Task';
  constructor(public readonly payload: number) {}
}

export class UpdateTask {
  static readonly type = '[Task] Update Task';
  constructor(public readonly payload: task) {}
}

export class EmptyTask {
  static readonly type = '[Task] Task Empty';
}
