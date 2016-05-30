import { Education }  from './education';
import { Experience } from './experience';
import { Portfolio }  from './portfolio';
import { Profile }    from './profile';
import { Reference }  from './reference';
import { Training }   from './training';
export class Applicant {
  id:string;
  job_id:string;
  name:string;
  profile:Profile;
  skills:Array<string>;
  experiences:Array<Experience> = [];
  portfolios:Array<Portfolio> = [];
  educations:Array<Education> = [];
  trainings:Array<Training> = [];
  hobbies:Array<string>;
  references:Array<Reference> = [];
  coverLetter:string;
  source:string;
  notifications:boolean;
  agreement:boolean;

  constructor() {
    this.profile = new Profile();
    this.experiences.push(new Experience());
    this.portfolios.push(new Portfolio());
    this.educations.push(new Education());
    this.trainings.push(new Training());
    this.references.push(new Reference());
  }
}