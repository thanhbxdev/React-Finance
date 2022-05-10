import { Category } from '../commons/interface/schemas/Category';
import HttpRequest from '../helper/httpRequest';
import { ResponseMessage } from '../commons/interface/ResponseMessage';

const CategoryService = {
  async all(month: number): Promise<Category[]> {
    return HttpRequest.get('/category/all', { params: { month } });
  },
  async listByType(type: 'INCOME' | 'EXPENSES'): Promise<Category[]> {
    return HttpRequest.get('/category/list', { params: { type } });
  },
  async create(data: object): Promise<Category> {
    return HttpRequest.post('/category/create', data);
  },
  async update(id: string, data: object): Promise<Category> {
    return HttpRequest.put(`/category/${id}/update`, data);
  },
  async delete(id: string): Promise<ResponseMessage> {
    return HttpRequest.delete(`/category/${id}/delete`);
  },
};

export default CategoryService;
