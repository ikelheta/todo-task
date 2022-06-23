import TaskSchema from "../db/tasks"
import { from, Observable, of, forkJoin, tap } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Task } from '../models/task';


export class TaskController {

  public static addTask(data: Task): Observable<any> {
    console.log(data)
    return of(data).pipe(
      mergeMap((m) => from(TaskSchema.create(m)))
    )
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  public static deleteTask(id: string, createdBy): Observable<any> {
    return of(true).pipe(
      mergeMap(() => from(TaskSchema.findOneAndDelete({ _id: id, createdBy })))
    )
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  public static updateTask(id: string, data: any, createdBy): Observable<any> {
    return of(true).pipe(
      mergeMap(() => from(TaskSchema.findOneAndUpdate({ _id: id, createdBy }, data, { new: true })))
    )
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  public static getSingleTask(id: string, createdBy): Observable<any> {
    return of(id).pipe(
      mergeMap((m) => from(TaskSchema.findOne({ _id: id, createdBy })))
    )
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  public static getAllTaskForUser(id: string): Observable<any> {
    return of(id).pipe(
      mergeMap((m) => from(TaskSchema.find({ createdBy: id }).sort({ startDate: 1 }))),

    )
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //
  //   Pet.aggregate([
  //     {
  //         $addFields: {
  //             sortField: {
  //                 $switch: {
  //                     branches: [
  //                         { case: { $eq: [ "$type", "Parrot" ] }, then: 0 },
  //                         { case: { $eq: [ "$type", "Cat" ] }, then: 1 },
  //                         { case: { $eq: [ "$type", "Dog" ] }, then: 2 },
  //                     ],
  //                     default: 3
  //                 }
  //             }
  //         }
  //     },
  //     {
  //         $sort: { sortField: 1 }
  //     }
  // ])
  //


}