function postedBy(parent, args, context) {
  const query = {
    where: { id: parent.id },
  };
  return context.prisma.link.findUnique(query).postedBy();
}

function votes(parent, args, context) {
  const query = {
    where: { id: parent.id },
  };
  return context.prisma.link.findUnique(query).votes();
}

module.exports = {
  postedBy,
  votes,
};
