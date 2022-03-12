export default class IService {
    constructor(model) {
        this.model = model;
    }

    async aggregate(pipeline) {
        try {
            let items = await this.model.aggregate(pipeline);
            return items
        } catch (errors) {
            console.log(errors);
            throw errors;
        }
    }

    async aggregateCount(pipeline) {
        try {
            let items = await this.model.aggregate(pipeline);
            if(items){
                return items.length;
            }else{
                return 0;
            }
        } catch (errors) {
            throw errors;
        }
    }

    async getAll() {
        try {
            let items = await this.model.find({});
            return items;
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

    async searchAll(query = {}) {
        try {
            let items = await this.model
                .find(query);
            return items;
        } catch (errors) {
            throw errors;
        }
    }

    async search(query = {}, skip=0, limit=10, sortBy='_id') {
        try {
            let items = await this.model
                .find(query)
                .sort(sortBy)
                .skip(skip)
                .limit(limit);
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

    async getByID(id) {
        try {
            let item = await this.model.findById(id);
            if (item) {
                return item;
            }
            return null;
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

    async insertMany(datas) {
        try {
            let items = await this.model.insertMany(datas);
            if (items) {
                return items;
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

    async updateByField(filter, data) {
        try {
            let item = await this.model.findOneAndUpdate(filter, data, { new: true });
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

    async deleteMany(obj) {
        try {
            let items = await this.model.deleteMany(obj);
            if (!items) {
                let error = new Error('Item not found');
                throw error;
            } else {
                return {
                    items: items,
                    deleted: true
                };
            }
        } catch (errors) {
            throw errors;
        }
    }
}
