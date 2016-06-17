export class Job {
  id:number;
  specification:string;
  description:string;
  intro:string;
  valid_until:string;
  number_of_opening:number;
  position_id:string;
  stages:Array<any>;

  constructor() {
    this.stages = [];
  }
}
