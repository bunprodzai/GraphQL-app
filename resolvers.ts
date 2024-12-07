import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({ deleted: false });
      return articles;
    },
    getArticle: async (_: any, args) => {
      const { id } = args;
      const article = await Article.findOne({ deleted: false, _id: id });
      return article;
    },
    getListCategory: async () => {
      const categorys = await Category.find({ deleted: false });
      return categorys;
    },
    getCategory: async (_: any, args) => {
      const { id } = args;

      const record = await Category.findOne({_id: id, deleted: false});

      return record;
    }
  },
  Article: {
    category: async (article) => {
      const categoryId = article.categoryId;
      const category = await Category.findOne({_id: categoryId, deleted: false});
      return category;
    }
  },
  Mutation: {
    createArticle: async (_: any, args) => {
      const { article } = args;

      const record = new Article(article);
      await record.save();

      return record;
    },
    deteleArticle: async (_: any, args) => {
      const { id } = args;

      await Article.updateOne({_id: id}, {deleted: true, deletedAt: new Date});

      return "Xoa thanh cong";
    },
    updateArticle: async (_: any, args) => {
      const { id, article } = args;
      
      await Article.updateOne({_id: id}, article);

      const record = await Article.findOne({_id: id})

      return record;
    },
    createCategory: async (_: any, args) => {
      const { category } = args;
      
      const newRecord = new Category(category);
      await newRecord.save();

      return newRecord;
    }
  }
};