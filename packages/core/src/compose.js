export default (...fns) => x => fns.reduceRight((v, f) => f(v), x);
