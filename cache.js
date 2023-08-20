function cache(fn){
    const cache = [];
    return function(...args) {
        const key = args.join(',');
        const cachedResult = cache.find(entry => entry.key === key);
        if (cachedResult) {
            return cachedResult.result;
        } else {
            const result = fn(...args);
            cache.push({ key, result });
            if (cache.length > 10) {
                cache.shift();
            }
            return result;
        }
    }   
   
}

function add(x, y) {
    console.log(`Calling add with arguments ${x} and ${y}`);
    return x + y;
}

const cachedAdd = cache(add);

console.log(cachedAdd(1, 2)); 
console.log(cachedAdd(1, 2)); 
console.log(cachedAdd(2, 3)); 