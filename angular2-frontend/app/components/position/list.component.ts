import {Component, OnInit}         from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Position} from '../../models/position';
import {PositionService}   from '../../services/position.service';

@Component({
    selector: 'positions-list',
    templateUrl: 'app/templates/position/list.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        PositionService,
    ]
})

export class PositionsListComponent implements OnInit {
    constructor(private _positionListService:PositionService) {
    }

    errorMessage:string;
    positions:Position[];

    ngOnInit() {
        this.getPositions();
    }

    getPositions() {
        this._positionListService.getPositions()
            .subscribe(
                positions => this.positions = positions,
                error => this.errorMessage = <any>error);
    }
}
