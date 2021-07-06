export const resolvers = {
  Query: {
    findUsers: (_parent, _args, context) => {
      return context.prisma.user.findMany()
    },
    findUserByEmail: (_parent, args, context) => {
      return context.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      })
    },
    findRoomsByUser: (_parent, args, context) => {
      return context.prisma.room.findMany({
        where: {
          userId: args.userId,
        },
      })
    },
    findRoomById: (_parent, args, context) => {
      return context.prisma.room.findUnique({
        where: {
          id: args.id,
        },
      })
    },
    getRoomTypes: (_parent, _args, context) => {
      return context.prisma.roomType.findMany()
    },
    getFurnitureCategories: (_parent, _args, context) => {
      return context.prisma.category.findMany()
    },
    getFurnitureMaterial: (_parent, _args, context) => {
      return context.prisma.furnitureMaterial.findMany()
    },
    getCategoryStyles: (_parent, args, context) => {
      return context.prisma.categoryStyles.findMany({
        where: {
          categoryId: args.categoryId,
        },
      })
    },
    getRecommendedCategories: (_parent, args, context) => {
      return context.prisma.recommendedCategories.findMany({
        where: {
          roomId: args.roomId,
        },
      })
    },
  },
  RecommendedCategories: {
    category: (parent, _args, context) => {
      return context.prisma.category.findMany({
        where: {
          id: parent.categoryId,
        },
      })
    },
  },
  Category: {},
  Room: {
    furniture: (parent, _args, context) => {
      return context.prisma.furniture.findMany({
        where: {
          roomId: parent.id,
        },
      })
    },
    user: (parent, _args, context) => {
      return context.prisma.user.findMany({
        where: {
          id: parent.userId,
        },
      })
    },
    roomtype: (parent, _args, context) => {
      return context.prisma.roomType.findMany({
        where: {
          id: parent.typeId,
        },
      })
    },
    cartitems: (parent, _args, context) => {
      return context.prisma.cartItems.findMany({
        where: {
          roomId: parent.id,
        },
      })
    },
  },
  Furniture: {
    category: (parent, _args, context) => {
      return context.prisma.category.findMany({
        where: {
          id: parent.categoryId,
        },
      })
    },
    material: (parent, _args, context) => {
      return context.prisma.furnitureMaterial.findMany({
        where: {
          id: parent.MaterialId,
        },
      })
    },
    categoryStyles: (parent, _args, context) => {
      console.log('test', parent)
      return context.prisma.categoryStyles.findMany({
        where: {
          id: parent.CategoryStyleId,
        },
      })
    },
  },
  Mutation: {
    createUser: (_parent, args, context) => {
      return context.prisma.user.create({
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        },
      })
    },
    updateUser: (_parent, args, context) => {
      return context.prisma.user.update({
        where: { id: args.id },
        data: {
          givenName: args.data.givenName,
          familyName: args.data.familyName,
          displayName: args.data.displayName,
          googleId: args.data.googleId,
          twitterId: args.data.twitterId,
          githubId: args.data.githubId,
        },
      })
    },
    createRoom: (_parent, args, context) => {
      return context.prisma.room.create({
        data: {
          user: {
            connect: {
              id: args.userId,
            },
          },
          type: {
            connect: {
              id: args.typeId,
            },
          },
          wallColor: args.wallColor,
          floorColor: args.floorColor,
        },
      })
    },
    updateRoom: (_parent, args, context) => {
      return context.prisma.room.update({
        where: { id: args.id },
        data: {
          typeId: args.typeId,

          wallColor: args.wallColor,
          floorColor: args.floorColor,
        },
      })
    },
    createFurniture: (_parent, args, context) => {
      return context.prisma.furniture.create({
        data: {
          room: {
            connect: {
              id: args.roomId,
            },
          },
          color: args.color,
          category: {
            connect: {
              id: args.categoryId,
            },
          },
          material: {
            connect: {
              id: args.materialId,
            },
          },
          categorystyle: {
            connect: {
              id: args.styleId,
            },
          },
        },
      })
    },
    deleteFurniture: (_parent, args, context) => {
      return context.prisma.furniture.delete({
        where: {
          id: args.id,
        },
      })
    },
    createRecommendedCategory: (_parent, args, context) => {
      return context.prisma.recommendedCategories.create({
        data: {
          room: {
            connect: {
              id: args.roomId,
            },
          },
          category: {
            connect: {
              id: args.categoryId,
            },
          },
        },
      })
    },
    deleteRecommendedCategory: (_parent, args, context) => {
      return context.prisma.recommendedCategories.delete({
        where: {
          id: args.id,
        },
      })
    },
  },
}
