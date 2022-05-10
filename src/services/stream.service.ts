import { Stream, StreamType } from '../commons/interface/schemas/Stream';
import HttpRequest from '../helper/httpRequest';
import { PaginationResponse } from '../commons/interface/Pagination';
import { ResponseMessage } from '../commons/interface/ResponseMessage';
import { Analytic } from '../commons/interface/Analytic';

interface StreamCreateDto {
  price: number;

  time: number;

  categoryId: string;

  currencyId: string;

  title?: string;

  description?: string;

  type: StreamType;
}

interface AnalyticDto {
  startDate: number;
  endDate?: number;
}

const StreamService = {
  async create(data: StreamCreateDto): Promise<Stream> {
    return HttpRequest.post('/stream/create', data);
  },
  async update(id: string, data: object): Promise<Stream> {
    return HttpRequest.put(`/stream/${id}/update`, data);
  },
  async list(params?: object): Promise<PaginationResponse<Stream>> {
    return HttpRequest.get('/stream/list', { params });
  },
  async all(month: number): Promise<Stream[]> {
    return HttpRequest.get('/stream/all', { params: { month } });
  },
  async delete(id: string): Promise<ResponseMessage> {
    return HttpRequest.delete(`/stream/${id}/delete`);
  },
  async analytic(analyticDto: AnalyticDto): Promise<Analytic> {
    return HttpRequest.post(`/stream/analytic`, analyticDto);
  },
};

export default StreamService;
