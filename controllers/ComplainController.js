const ComplainModel = require("../models/ComplainModel");

const ComplainController = {
  CreateComplain: (request, response) => {
    const { name, contact, location, threat, category } = request.body;

    console.log(request.body);

    if ( !name|| !contact|| !location|| !threat || !category) {
      response.json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }

    const date = new Date()

    const objtoSend = {
      name: name,
      contact: contact,
      location: location,
      threat: threat,
      created_at: date,
      is_resolved: false,
      is_accepted: false,
      category: category
    };

    ComplainModel.findOne({ name: name, contact: contact, threat: threat }, (error, complain) => {
      if (error) {
        response.json({
          message: "DB ERROR",
          status: false,
        });
      } else {
        if (complain) {
          response.json({
            message: "Complain already exists in database",
            status: false,
          });
        } else {
          ComplainModel.create(objtoSend, (error, complain) => {
            if (error) {
              response.json({
                message: `Internal error ${error}`,
                status: false,
              });
            } else {
              response.json({
                message: "Complain successfully added",
                complain: complain,
                status: true,
              });
            }
          });
        }
      }
    });
  },

  GetComplains: (request, response) => {
    ComplainModel.find({}, (error, complains)=> {
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Complains successfully get",
                complains,
                status: true
            })
        }
    })
  },

  GetByCategory: (request, response) => {

    if(!request.body.category){
        response.json({
          message: "REQUIRED FIELDS ARE MISSING",
          status: false,
      }) 
      return
      }

    ComplainModel.find({category: request.body.category}, (error, complains)=> {
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: `${request.body.category} Complains successfully get`,
                complains,
                status: true
            })
        }
    })
  },

  GetComplainById: (request, response) => {

    const {id} = request.params

    if(!id){
        response.json({
            message: "ID IS REQUIRED",
            status: false
        })
        return
    }

    ComplainModel.findById(id, (error, complain)=>{
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Complain successfully get",
                complain,
                status: true
            })
        }
    })
  },

  DeleteConplainById: (request, response) => {

    const {id} = request.params

    if(!id){
        response.json({
            message: "ID IS REQUIRED",
            status: false
        })
        return
    }

    ComplainModel.findByIdAndDelete(id, (error, complain)=>{
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Complain successfully deleted",
                complain,
                status: true
            })
        }
    })
  },

  UpdateById: async (request, response) => {
    const {id} = request.params
    const {body} = request

    if(!body || !id){
      response.json({
        message: "REQUIRED FIELDS ARE MISSING",
        status: false,
    }) 
    return
    }

    ComplainModel.findByIdAndUpdate(request.params.id, request.body, (error, updatedComplain) => {
      if(error){
        response.json({
            message: "DB ERROR",
            status: false,
        })
    }else{
        response.json({
            message: "Complain successfully updated",
            updatedComplain: updatedComplain,
            status: true
        })
    }
    })
  }
}

module.exports = ComplainController
