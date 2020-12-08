/**
 * Handler for Required Fields 
 * 
 * @param {*} body 
 * @param {*} options 
 */
const isRequired = (body, options) => {
    const required = [];
    options.forEach((value) => {
      if (!Object.keys(body).includes(value)) {
        required.push({ [value]: `${value} field is required` });
      }
    });
    return required;
  };
  
module.exports = isRequired;