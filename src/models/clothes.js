'use strict';
const uid = require('uuid').v4;

class Clothes {
    constructor(name) {
        this.db = [];
    }
    create(obj) {      
        const record = {
            id: uid(),
            data: obj
        }
        this.db.push(record);
        return record;
    }
    read(id) {
        if (id) {//id is defined
            return this.db.find((record) => record.id == id);
        }
        return this.db;
    }

    update(id, obj) {
        for (let i = 0; i < this.db.length; i++) {
            if (this.db[i].id === id) {
                this.db[i].data = obj;
                return this.db[i];
            }
        }
    }
    delete(id) {
        this.db = this.db.filter((record) => record.id !== id);
        return null;//Returns: The record from the database as it exists after you delete it (i.e. null)
    }
}
module.exports=Clothes;