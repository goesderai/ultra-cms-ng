import {HttpClient} from '@angular/common/http';

export abstract class BaseService {

  protected apiUrl: string = 'http://localhost:1337/api';

  protected constructor(protected readonly http: HttpClient) {
    // Do something here
  }

}
