import { skip } from "node:test";
import Article from "../models/article.model";
import Category from "../models/category.model";

export const ArticleResolvers = {
  Query: {
    getListArticle: async (_: any, args) => {
      const { sortKey, sortType, currentPage, limitItem, filterKey, filterValue, keyword } = args;

      const find = {
        deleted: false
      }

      // sort
      const sort = {};
      if(sortKey && sortType){
        sort[sortKey] = sortType;
      }
      // end sort 

      // Panigation
      const skip = (currentPage - 1) * limitItem;
      // end Panigation 

      // filer 

      if(filterKey && filterValue){
        find[filterKey] = filterValue;
      }

      // end filer 
      
      // search 

      if(keyword){
        const keywordRegex = new RegExp(keyword,"i");
        find["title"] = keywordRegex;
      }

      // search 

      const articles = await Article.find(find).sort(sort).limit(limitItem).skip(skip);
      return articles;
    },
    getArticle: async (_: any, args) => {
      const { id } = args;
      const article = await Article.findOne({ deleted: false, _id: id });
      return article;
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
    }
  }
};