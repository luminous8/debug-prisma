
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'production' ? [] : ['query', 'info', 'warn', 'error'],
});

prisma.$on('query', (e) => {
  try {
    console.log('Query: ' + e.query)
    console.log(`${e.query} ${e.params}`)
  } catch (error) {
    // todo fix code above to avoid issues
    console.log(`prisma.$on('query', (e) => { error ${error}`)
  }
})

prisma.$use(async (params, next) => {
  const before = process.hrtime.bigint();
  const result = await next(params);
  const after = process.hrtime.bigint();
  console.log(`...${params.action} on ${params.model} took ${Number(after - before) / 1_000_000}ms.`);
  return result;
});

module.exports = { ...prisma, };