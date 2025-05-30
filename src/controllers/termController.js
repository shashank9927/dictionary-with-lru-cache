const Term = require('../models/term.js')
const {getCacheKey, getFromCache, setInCache} = require('../utils/cache.js')

//create a new term in dictionary
const createTerm = async (req,res) => {
    try {
        const term = new Term(req.body);
        await term.save();

        res.status(201).json({
            success:true,
            data: term,
            source: 'db'
        });

    }
    catch(error){
        res.status(400).json({
            success:false;
            error: error.message
        });
    }
};


//get single term
const getTerm = async (req,res) => {
    try {
        const term = await Term.findById(req.params.id);
        if(!term){
            return res.status(404).json({
                success: false,
                error: "Term not found"
            });
        }
        res.json({
            success: true,
            data: term,
            source: db
        });


    }
    catch(error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//update term 
const updateTerm = async (req,res) => {
    try{
        const term = await Term.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true, runValidators: true}
        );

        if(!term){
            res.status(400).json({
                success: false,
                error: "Term not found"
            });
        }
        res.json({
            success: true,
            data: term,
            source: "db"
        });

    }
    catch(error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

//delete term
const deleteTerm = async(req,res) => {
    try{
        const term = await Term.findByIdAndDelete(req.params.id)
        if(!term){
            res.status(404).json({
                success: false,
                error: "Term not found"
            });

        }
        res.json({
            success: true,
            data: {},
            source: 'db'
        });
   
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    createTerm,
    getTerm,
    updateTerm,
    deleteTerm
}