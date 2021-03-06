async function feed(parent, args, context, info) {
  return await context.prisma.link.findMany();
}

module.exports = {
  feed,
};
