import { gql } from "apollo-server-express";

// graphQL
export const ArticletypeDefs = gql`
  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String,
    category: Category
  }
  
  type Query {
  getListArticle(
    sortKey: String, 
    sortType: String, 
    currentPage: Int = 1, 
    limitItem: Int = 2,
    filterKey: String,
    filterValue: String,
    keyword: String
    ): [Article],
  getArticle(id: ID): Article,
  }

  input ArticleInput {
    title: String,
    avatar: String,
    description: String
  }

  type Mutation {
    createArticle(article: ArticleInput): Article,
    deteleArticle(id: ID): String,
    updateArticle(id: ID, article: ArticleInput): Article
  }
`;