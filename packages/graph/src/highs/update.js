// - Takes a function and an object
// - Calls the function passing the object
// - Merges the returned object (updates) with the object.
// Used by hooks as they all take props and return updated props
export default fn => obj => ({ ...obj, ...fn(obj) });
