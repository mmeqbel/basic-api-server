'use strict';
module.exports = {
    idValidator: (req, res, next) => {
        if (!req.params.id) {
            next('Invalid person ID');
        } else {
            next();
        }
    },
    typeValidator:(req, res, next) => {   //Should ensure that the record created only has the fields that you defined
        if (!req.body.type) {
            next('Invalid obj');
        } else {
            next();
        }
    }
}