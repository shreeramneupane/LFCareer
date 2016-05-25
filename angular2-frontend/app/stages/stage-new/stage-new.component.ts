import { Component }                  from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { PageHeader }          from '../../shared/components/page-header/pageHeader.component';
import { Stage }               from '../shared/stage'
import { StageFormComponent }  from '../stage-form/stage-form.component';
import { StageService }        from '../shared/stage.service';

@Component({
  selector   : 'stage-new',
  templateUrl: 'app/stages/stage-new/stage-new.component.html',
  providers  : [StageService],
  directives : [ROUTER_DIRECTIVES, StageFormComponent, PageHeader]
})

export class StageNewComponent {
  stage = this.stageService.newStage();
  pageHeader:string = 'Create Stage';

  constructor(private stageService:StageService, private router:Router) {
  }

  onSubmit(stage:Stage) {
    this.stageService.createStage(stage)
    .subscribe(
    stage => {
      this.router.navigate(['StageList']);
      toastr.success('New Stage Created Successfully!');
    },
    error => toastr.error(error)
    );
  }
}
