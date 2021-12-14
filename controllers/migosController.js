 const Migos = require('../model/migosModel');
 const APIFeatures = require('../utils/apiFeatures');
 const AppError = require('../utils/appError');
 const catchAsync = require('../utils/catchAsync');
 
  exports.getAllMigos = catchAsync(async(req, res) => {
      // Execute Query
      const features = new APIFeatures(Migos.find(), req.query).filter().sort().limitFields().paginate();
      
      const migos = await features.query;
 
      res.status(200).json({
        status: 'success',
        results: migos.length,
        data: {
          migos
        }
      });
 });
 
 exports.getMigos = catchAsync(async(req, res, next) => {
    const migo = await Migos.findById(req.params.id);

    if (!migo) {
       return next(new AppError('No migo found with that ID', 404));
    }

     res.status(200).json({
       status: 'success',
       data: {
         migo
       }
     }); 
 });
 
 
 exports.createMigos = catchAsync(async(req, res) => {
    const newMigo = await Migos.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        migo: newMigo
      }
     });
 });
 
 
exports.updateMigos = catchAsync(async(req, res, next) => {
      const migos = await Migos.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!migos) {
        return next(new AppError('No migos found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          migos
        }
      });
 });
 
 exports.deleteMigos = catchAsync(async(req, res, next) => {
     const migos = await Migos.findByIdAndDelete(req.params.id);

     if (!migos) {
       return next(new AppError('No migos found with that ID', 404));
     }

      res.status(204).json({
        status: 'success',
        data: null
      });
 });