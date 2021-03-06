/*
 * mongoose와 마찬가지로 prisma 또한 한국어 형태소 쿼리가 불가능하다. (100% 매칭되어야함)
 * 하, 한국어 (x)
 * ㅎ, 한국어 (x)
 * 한, 한국어 (o)
 * 한국, 한국어 (o)
 
{
  feed(filter: "한국어 테스트") {
    id
    url
    description
  }
}
*/
async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};
  return await context.prisma.link.findMany({ where });
}

module.exports = {
  feed,
};
