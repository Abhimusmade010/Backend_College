const validateWithZod = (schema) => {
  return (req, res, next) => {
    
    if (!schema || typeof schema.safeParse !== 'function') {
      return res.status(500).json({ 
        success: false, 
        error: "Invalid schema provided to validation middleware" 
      });
    }
    

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        success: false, 
        errors: result.error.errors 
      });
    }
    
    // Add validated data to request object
    req.validatedData = result.data;
    next();
  };
};

module.exports = validateWithZod;
