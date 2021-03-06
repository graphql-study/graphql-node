function links(parent, args, context) {
  const query = {
    where: { id: parent.id },
  };
  return context.prisma.user.findUnique(query).links();
}

module.exports = {
  links,
};
