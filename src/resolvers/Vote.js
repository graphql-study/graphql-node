function link(parent, args, context) {
  const query = {
    where: { id: parent.id },
  };
  return context.prisma.vote.findUnique(query).link();
}

function user(parent, args, context) {
  const query = {
    where: { id: parent.id },
  };
  return context.prisma.vote.findUnique(query).user();
}

module.exports = {
  link,
  user,
};
