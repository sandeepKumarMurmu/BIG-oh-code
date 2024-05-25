
const formCreation = [
    async (req, res) => {
        return res.json({ message: "From created successfully." })
    }
];


const formFilling = [
    async (req, res) => {
        return res.json({ message: "From Filled successfully." })
    }
];


const formList = [
    async (req, res) => {
        return res.json({ message: "From listed successfully." })
    }
]


module.exports = {
    formCreation,
    formFilling,
    formList
}