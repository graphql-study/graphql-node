function postedBy(parent, args, context) {
  const query = {
    where: { id: parent.id },
  };
  return context.prisma.link.findUnique(query).postedBy();
}

module.exports = {
  postedBy,
};
