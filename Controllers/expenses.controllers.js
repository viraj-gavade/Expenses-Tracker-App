const { GetAllExpenses, DeleteAllExpenses, AddExpenses, GetSingleExpenses, DeleteSingleExpenses, SortExpenses } = require('../database')


const getallexpenses = async (req,res)=>{
    const result = await GetAllExpenses()
    res.status(200).json(result)
}


const sortexpenses = async (req,res)=>{
    const result = await SortExpenses()
    res.status(200).json(result)
}

const getsingleexpense = async (req,res)=>{
    const result = await GetSingleExpenses()
    res.status(200).json(result)
}


const addexpense = async (req,res)=>{
    const result = await AddExpenses()
    res.status(200).json(result)
}

const deleteallexpense = async (req,res)=>{
    const result = await DeleteAllExpenses()
    res.status(200).json(result)
}

const deletesingleexpense = async (req,res)=>{
    const result = await DeleteSingleExpenses()
    res.status(200).json(result)
}




module.exports = {
    getallexpenses,
    deletesingleexpense,
    deleteallexpense,
    addexpense,
    sortexpenses,
    getsingleexpense
}