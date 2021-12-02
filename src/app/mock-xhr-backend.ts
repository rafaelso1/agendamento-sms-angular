import { HttpEvent, HttpRequest, HttpResponse, HttpBackend } from '@angular/common/http';
import { empty, Observable, Observer } from 'rxjs';

export class MockXHRBackend implements HttpBackend {
    private scheduleItems : any = [
        {
            id: 1,
            name: "Junior da Silva Almeia",
            tel: "11999999999"
        },
        {
            id: 2,
            name: "Rafael Soares da Silva",
            tel: "11988888888"
        }
    ]

    handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
            let responseOptions;
            switch (request.method) {
                case 'GET':
                    let scheduleItems;
                    const idToFind = parseInt(request.url.split('/')[1], 10);
                    scheduleItems = this.scheduleItems.filter((i: { id: number; }) => i.id === idToFind);
                    responseOptions = {
                        body: JSON.parse(JSON.stringify(scheduleItems[0])),
                        status: 200
                    };
                    break;
                case 'POST':
                    const scheduleItem = request.body;
                    scheduleItem.id = this._getNewId();
                    this.scheduleItems.push(scheduleItem);
                    responseOptions = { status: 201 };
                    break;
                case 'DELETE':
                    const id = parseInt(request.url.split('/')[1], 10);
                    this._deleteScheduleItem(id);
                    responseOptions = { status: 200 };
                    break;
            }

            const responseObject = new HttpResponse(responseOptions);
            responseObserver.next(responseObject);
            responseObserver.complete();
            return () => {
            };

        });
    }

    _deleteScheduleItem(id: number) {
        const scheduleId = this.scheduleItems.find((i: { id: number; }) => i.id === id);
        const index = this.scheduleItems.indexOf(scheduleId);
        if (index >= 0) {
            this.scheduleItems.splice(index, 1);
        }
    }

    _getNewId() {
        if (this.scheduleItems.length > 0) {
            return Math.max.apply(Math, this.scheduleItems.map((scheduleId: { id: any; }) => scheduleId.id)) + 1;
        } else {
            return 1;
        }
    }
}