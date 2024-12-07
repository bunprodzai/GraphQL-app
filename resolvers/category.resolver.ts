import Article from "../models/article.model";
import Category from "../models/category.model";

export const CategoryResolvers = {
  Query: {
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
  Mutation: {
    createCategory: async (_: any, args) => {
      const { category } = args;
      
      const newRecord = new Category(category);
      await newRecord.save();

      return newRecord;
    },
    updateCategory: async (_: any, args) => {
      const { id, category } = args;
      await Category.updateOne({_id: id},  category);

      const recordUpdate = await Category.findOne({_id: id});

      return recordUpdate;
    } ,
    deteleCategory: async (_: any, args) => {
      const { id } = args;
      await Category.updateOne({_id: id}, {deleted: true});

      return "Xoa thanh cong";
    }
  }
};