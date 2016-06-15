import { Component }                  from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { PageHeader }          from '../../shared/components/page-header/pageHeader.component';
import { Stage }               from '../shared/stage'
import { StageFormComponent }  from '../stage-form/stage-form.component';
import { StageService }        from '../shared/stage.service';

import * as toastr from 'toastr';

@Component({
  selector  : 'stage-new',
  template  : require('./stage-new.component.html'),
  providers : [StageService],
  directives: [ROUTER_DIRECTIVES, StageFormComponent, PageHeader]
})

export class StageNewComponent {
  stage = this.stageService.newStage();

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
