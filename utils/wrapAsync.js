module.exports=(fn)=>{
      return (req,res,err)=>{
       fn(req,res,err).catch(next);
      };
};