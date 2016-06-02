import { Education }  from './education';
import { Experience } from './experience';
import { Portfolio }  from './portfolio';
import { Reference }  from './reference';
import { Achievement }from './achievement';
export class Applicant {
  id:string;
  name:string;
  email:string;
  address:string;
  linkedin:string;
  phone_number:string;
  skills:Array<string>;
  experiences:Array<Experience> = [];
  portfolios:Array<Portfolio> = [];
  educations:Array<Education> = [];
  achievements:Array<Achievement> = [];
  hobbies:Array<string>;
  references:Array<Reference> = [];
  coverLetter:string;
  source:string = 'website';
  notifications:boolean;
  agreement:boolean;

  constructor() {
    this.experiences.push(new Experience());
    this.portfolios.push(new Portfolio());
    this.educations.push(new Education());
    this.achievements.push(new Achievement());
    this.references.push(new Reference());
  }
}