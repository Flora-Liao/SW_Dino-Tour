// Just to honor the post that saved my life.
// https://stackoverflow.com/questions/53189292/waiting-for-promises-inside-the-object-to-resolve

const awaitObjectWithPromise = async(obj) => {
    for (let prop in obj) {
        // If the propriety has a 'then' function it's a Promise
        if (typeof obj[prop].then === 'function') {
            obj[prop] = await obj[prop];
        }
        if (typeof obj[prop] === 'object') {
            obj[prop] = await awaitObjectWithPromise(obj[prop]);
        }
    }
    return obj;
}

module.exports = awaitObjectWithPromise;