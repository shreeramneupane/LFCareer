import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Position } from '../../models/position';
import { PositionService } from '../../services/position/position.service';

@Component({
    selector: 'employee-list',
    templateUrl: 'app/templates/position/list.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PositionService]
})

export class PositionListComponent implements OnInit {
    public positions: Position[];
    public errorMessage: string;

    constructor(
        private _positionListService: PositionService
    ){}

    ngOnInit() {
        this._positionListService.getPositions().subscribe(
            positions => this.positions = positions,
            error =>  this.errorMessage = <any>error
        );
    }
}
