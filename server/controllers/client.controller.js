const Client        = require('../models/client.model');
const sequelize     = require('../utils/database');

exports.getList = (request, response) => {

    let query = "select * from public.fn_client_getlist() as result ";

    sequelize.query(query, 
        { 
            type: sequelize.QueryTypes.SELECT,
            raw: true
        },
        {
          mapToModel: false
        } 
    ).then(records => {
        let result = JSON.parse(records[0].result);
        response.status(200).send({
            ok: true,
            message: 'Clientes encontrados',
            result
        });
    }).catch(error=>{
        response.status(500).send({
            ok: false,
            message: 'Error al tratar de buscar Cliente',
            result: error
        });
    });
};

exports.getOne = (request, response) => {

    const { id } = request.params;

    let iid = parseInt(id);

    let query = "select * from public.fn_client_getone(:iid) as result ";

    sequelize.query(query, 
        { 
            replacements: {
                iid
            },
            type: sequelize.QueryTypes.SELECT,
            raw: true
        },
        {
          mapToModel: false
        }            
    ).then(record => {
        if(record!==null){
            let result = JSON.parse(record[0].result);
            response.status(200).send({
                ok: true,
                message: 'Cliente encontrado',
                result
            });
        }else
            response.status(400).send({
                ok: false,
                message: 'Cliente no encontrado',
                result: record
            });
    }).catch(error=>{
        console.log(error);
        response.status(500).send({
            ok: false,
            message: 'Error al tratar de buscar Cliente',
            result: error
        });
    });
}

// Método para Crear Registros de Cliente.
exports.create = (request, response) => {
    const {code, 
           name, 
           email, 
           website,
           phone_number,
           contact,
           status
          } = request.body;

    Client.create({
            code, 
            name, 
            email, 
            website,
            phone_number,
            contact,
            status
        })
        .then(record=>{
            return response.status(201).json({
                ok: true,
                message: 'Cliente creado exitosamente.', 
                result: record
            })
        }).catch(err=>{
            console.log(err);
            return response.status(500).json({
            ok: false,
            message: 'Error al crear Cliente',
            result: err
        });
    }).catch(err=>{
        return response.status(500).json({
            ok: false,
            message: 'Error al crear Cliente',
            result: err
        })
    })
}

// Método para Modificar Registros de Cliente
exports.update = (request, response) => {
    const {id}   = request.params;

    const {
            code, 
            name, 
            email, 
            website,
            phone_number,
            contact,
            status
          } = request.body;
    Client.update({
            code, 
            name, 
            email, 
            website,
            phone_number,
            contact,
            status},
        {where : {id}}
    )
    .then(result=>{
        response.status(200).json({
            ok: true,
            message: 'Cliente actualizado exitosamente.',
            result: result
        });
    })
    .catch(err=>{
        response.status(500).json({
            ok: false,
            message: 'No se pudo actualizar Cliente.',
            result: err
        });
    });
}

// Método para Modificar Registros de Cliente
exports.delete = (request, response) => {
    const {id}   = request.params;

    Client.findOne({where: {id}})
        .then(record=>{
            Client.destroy(record)
            .then(result=>{
                response.status(200).json({
                    ok: true,
                    message: 'Cliente eliminado exitosamente.',
                    result: result
                });
            })
            ;
        }).catch(err=>{
            response.status(500).json({
                ok: false,
                message: 'No se pudo eliminar el Cliente.',
                result: err
            });
        });
}