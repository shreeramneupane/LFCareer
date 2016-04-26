import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Position } from '../../models/position';
import { PositionListService } from '../../services/position/position.list.service';

@Component({
    selector: 'employee-list',
    templateUrl: 'app/templates/position/list.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PositionListService]
})

export class PositionListComponent implements OnInit {
    public positions: Position[];
    public errorMessage: string;

    constructor(
        private _positionListService: PositionListService
    ){}

    ngOnInit() {
        this._positionListService.getPositions().subscribe(
            positions => this.positions = positions,
            error =>  this.errorMessage = <any>error
        );
    }
}
