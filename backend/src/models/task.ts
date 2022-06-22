export interface ITask {
  title: string
  description: string
  status: string
  priority: string
  createdBy: string
  startDate: Date
  endDate: Date


}

export class Task implements ITask {
  title: string
  description: string
  status: string
  priority: string
  createdBy: string
  startDate: Date
  endDate: Date
  constructor(o: any) {
    this.title = o.title
    this.description = o.description
    this.status = o.status
    this.priority = o.priority
    this.createdBy = o.createdBy
    this.startDate = o.startDate
    this.endDate = o.endDate
  }
}