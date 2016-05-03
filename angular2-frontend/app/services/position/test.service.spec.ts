/// <reference path="../../../typings/main/ambient/jasmine/index.d.ts" />

import {it, describe, expect, beforeEachProviders, inject} from "angular2/testing";
import {Response, XHRBackend, ResponseOptions, HTTP_PROVIDERS} from "angular2/http";
import {MockConnection, MockBackend} from "angular2/src/http/backends/mock_backend";
import {provide} from "angular2/core";
import 'rxjs/Rx';

import { PositionService } from './position.service';

describe('Position List Service Tests', () => {
    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            PositionService
        ]
    });

    it('should return a list of employees',
        inject([XHRBackend, PositionService], (backend, service) => {
            backend.connections.subscribe(
                (connection:MockConnection) => {
                    var options = new ResponseOptions({
                        body: [
                            {
                                "name": "Software Engineer",
                                "id": 1
                            }
                        ]
                    });

                    var response = new Response(options);

                    connection.mockRespond(response);
                }
            );

            service.getPosition().subscribe(
                (positions) => {
                    expect(positions[0].name).toBe('Abhinav Mishra');
                }
            );

            service.getPosition().subscribe(
                (positions) => {
                    expect(positions[0].id).toBe(1);
                }
            );
        })
    );
});

