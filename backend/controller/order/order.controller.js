import IController from "../icontroller";
import { OrderService } from "../../service";
import { responceJson } from '../../util';

class OrderController extends IController {
      constructor(service) {
            super(service);
      }

      async search(req, res, next) {
            try {
                  const { page, pageSize, keyword, sortBy, startDate, endDate, status } = req.query;
                  let _page = page ? Number(page) : 0;
                  let _pageSize = pageSize ? Number(pageSize) : 10;
                  let _sortBy = sortBy ? sortBy : '-confirmed_at';
                  let _keyword = keyword ? keyword : null;
                  let _startDate = startDate ? Number(startDate) : 0;
                  let _endDate = endDate ? Number(endDate) : 0;
                  let _status = status ? status : null;
            
                  const total = await this.service.countOrders(_keyword, _startDate, _endDate, _status);
                  const orders = await this.service.searchPagingOrders(_page, _pageSize, _keyword, _sortBy, _startDate, _endDate, _status);
                  responceJson(res, 200, {
                        items: orders,
                        total: total
                  });
            } catch (e) {
                  responceJson(res, 400, {error: e});
                  next(e);
            }
      }

      async searchLineItems(req, res, next) {
            try {
                  const { page, pageSize, keyword, sortBy, startDate, endDate, status } = req.query;
                  let _page = page ? Number(page) : 0;
                  let _pageSize = pageSize ? Number(pageSize) : 10;
                  let _sortBy = sortBy ? sortBy : '-confirmed_at';
                  let _keyword = keyword ? keyword : null;
                  let _startDate = startDate ? Number(startDate) : 0;
                  let _endDate = endDate ? Number(endDate) : 0;
                  let _status = status ? status : null;
     
                  const total = await this.service.countLineItems(_keyword, _startDate, _endDate, _status);
                  const lineItems = await this.service.searchPagingLineItems(_page, _pageSize, _keyword, _sortBy, _startDate, _endDate, _status);
                  responceJson(res, 200, {
                        items: lineItems,
                        total: total
                  });
            } catch (e) {
                  responceJson(res, 400, {error: e});
                  next(e);
            }
      }

      async getLineItemsBySKU(req, res, next) {
            try {
                  const { sku, status, keyword } = req.query;
                  let _sku = sku ? sku : null;
                  let _status = status ? status : null;
                  let _keyword = keyword ? keyword : null;
                  const lineItems = await this.service.getLineItemsBySKU(_sku, _status, _keyword);
                  responceJson(res, 200, lineItems);
            } catch (e) {
                  console.log(e);
                  responceJson(res, 400, {error: e});
                  next(e);
            }
      }

      async getLineItemsByID(req, res, next) {
            try {
                  const { id, status, keyword } = req.query;
                  let _id = id ? id : null;
                  let _status = status ? status : null;
                  let _keyword = keyword ? keyword : null;
                  const lineItems = await this.service.getLineItemsByID(_id, _status, _keyword);
                  responceJson(res, 200, lineItems);
            } catch (e) {
                  console.log(e);
                  responceJson(res, 400, {error: e});
                  next(e);
            }
      }
}
export default new OrderController(OrderService);
