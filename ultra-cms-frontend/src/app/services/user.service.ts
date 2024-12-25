import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  authenticate(credential: any) {
    return axios.post(this.apiUrl + '/auth/local', credential);
  }

}
