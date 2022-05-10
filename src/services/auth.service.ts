import HttpRequest from '../helper/httpRequest';
import { Account, SourceCurrency } from '../commons/interface/schemas/Account';
import { ResponseMessage } from '../commons/interface/ResponseMessage';

interface LoginResponse {
  accessToken: string;
  account: Account;
}

const AuthService = {
  async login(data: object): Promise<LoginResponse> {
    return HttpRequest.post('/auth/login', data);
  },
  async getProfile(): Promise<Account> {
    return HttpRequest.get('/auth/profile');
  },
  async getCurrencies(): Promise<SourceCurrency[]> {
    return HttpRequest.get('/account/currency/sources');
  },
  async createCurrency(values: object): Promise<SourceCurrency> {
    return HttpRequest.post('/account/currency/create', values);
  },
  async updateCurrency(id: string, values: object): Promise<SourceCurrency> {
    return HttpRequest.put(`/account/currency/${id}/update`, values);
  },
  async deleteCurrency(id: string): Promise<ResponseMessage> {
    return HttpRequest.delete(`/account/currency/${id}/delete`);
  },
};

export default AuthService;
