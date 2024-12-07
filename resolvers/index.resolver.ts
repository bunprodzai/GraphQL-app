import { ArticleResolvers } from "./article.resolver";
import { CategoryResolvers } from "./category.resolver";
import { UserResolvers } from "./user.resolver";
export const resolvers = [
  ArticleResolvers,
  CategoryResolvers,
  UserResolvers
]