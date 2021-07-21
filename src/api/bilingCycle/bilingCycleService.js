const BilingCycle = require('./bilingCycle')
const errorHandler = require('../commom/errorHandler')

BilingCycle.methods(['get', 'post', 'put', 'delete'])
BilingCycle.updateOptions({ new: true, runValidators: true })
BilingCycle.after('post', errorHandler).after('put', errorHandler)

BilingCycle.route('count', (req, res, next) => {
    BilingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

BilingCycle.route('summary', (req, res, next) => {
    BilingCycle.aggregate(
        { $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } } },
        { $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } } },
        { $project: { _id: 0, credit: 1, debt: 1 } },
        (error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json(result[0] || { credit: 0, debt: 0 })
            }
        }
    )
})

module.exports = BilingCycle