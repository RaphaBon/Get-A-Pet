const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model(
    'Pet',
    new Schema({
        name: {type: String, required: true},
        age: {type: Number, required: true},
        weight: {type: Number, required: true},
        color: {type: String, required: true},
        image: {type: Array, requied: true},
        available: {type: Boolean},  //Para definir se ja foi adotado ou não
        user: Object, //Para passar alguns dados para a tabela PET
        adopter: Object,
    }, {timestamps: true}   //Cria colunas no banco para marcar quando foi criado e quando foi alterado o registro.
)
)


module.exports = Pet