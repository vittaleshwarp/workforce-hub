export const notFound=(req,res)=>res.status(404).json({message:'Resource not found'});
export const errorHandler=(err,req,res,next)=>{ console.error(err); res.status(err.status||500).json({message:err.status?err.message:'Something went wrong. Please try again.'}); };
