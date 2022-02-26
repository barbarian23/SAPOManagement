export default class IService {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            let items = await this.model.find({});
            return items
        } catch (errors) {
            throw errors;
        }
    }

    async countAll() {
        try {
            let total = await this.model.countDocuments({});
            return total;
        } catch (errors) {
            throw errors;
        }
    }

    async search(query = {}, skip, limit, sortBy) {
        let _skip = skip ? Number(skip) : 0;
        let _limit = limit ? Number(limit) : 10;
        let _sortBy = sortBy ? sortBy : { createdAt: -1 };

        try {
            let items = await this.model
                .find(query)
                .sort(_sortBy)
                .skip(_skip)
                .limit(_limit);
            return items;
        } catch (errors) {
            throw errors;
        }
    }

    async count(query = {}) {
        try {
            let total = await this.model.countDocuments(query);
            return total;
        } catch (errors) {
            throw errors;
        }
    }

    async get(id) {
        try {
            let item = await this.model.findById(id);
            if (!item) {
                throw error;
            }
            return item;
        } catch (errors) {
            throw errors;
        }
    }

    async insert(data) {
        try {
            let item = await this.model.create(data);
            if (item) {
                return item;
            } else {
                throw new Error('Something wrong happened');
            }
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            let item = await this.model.findByIdAndUpdate(id, data, { new: true });
            return item;
        } catch (errors) {
            throw errors;
        }
    }

    async delete(id) {
        try {
            let item = await this.model.findByIdAndDelete(id);
            if (!item) {
                let error = new Error('Item not found');
                throw error;
            } else {
                return {
                    item: item,
                    deleted: true
                };
            }
        } catch (errors) {
            throw errors;
        }
    }
}
