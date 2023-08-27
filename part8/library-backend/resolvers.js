const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { GraphQLError } = require("graphql");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      if (args.genre) {
        if (!args.author) {
          return await Book.find({
            genres: { $in: [args.genre] },
          }).populate("author");
        } else {
          return await Book.find({
            author: args.author,
            genres: { $in: [args.genre] },
          });
        }
      }

      if (!args.author) {
        return await Book.find({}).populate("author");
      }

      return await Book.find({ author: args.author }).populate("author");
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (_, args) => {
      const book = {
        ...args,
      };

      let author = await Author.findOne({ name: args.author }).exec();

      if (!author) {
        try {
          author = await Author.create({ name: args.author });
        } catch (error) {
          throw new GraphQLError("Saving person failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      book.author = author._id.toString();

      try {
        const newBook = (await Book.create(book)).populate("author");

        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
        return newBook;
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOne({ name: args.name }).exec();

      if (!author) return null;

      author.born = args.setBornTo;
      return await author.save();
    },
    createUser: async (_, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        password: "secret",
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({
        username: args.username,
        password: "secret",
      });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: args.username,
        id: user._id,
        favoriteGenre: user.favoriteGenre,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
