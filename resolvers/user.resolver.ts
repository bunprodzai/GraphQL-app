import { generateToken } from "../helpers/generateToken.helper";
import User from "../models/user.model";
import md5 from "md5";
export const UserResolvers = {
  Query: {
    getUser: async (_: any, args, context) => {
      console.log(context["user"]);
      
      const user = await User.findOne({token: context["user"].token, deleted: false});

      if(user) {
        return{
          code: 200,
          message: "Thành công",
          fullName: user.fullName,
          email: user.email,
          token: user.token,
          id: user._id
        }
      } else {
        return {
          code: 400,
          message: "Lỗi!"
        }
      }
    }
  },
  Mutation: {
    registerUser: async (_: any, args) => {
      const { user } = args;
      
      const emailExist = await User.findOne({email: user.email, deleted: false});

      if(emailExist){
        return {
          code: 403,
          message: "Email đã tồn tại"
        }
      } else {
        user.password = md5(user.password);
        user.token = generateToken();

        const userNew = new User(user);
        const data = await userNew.save();
        
        return {
          code: 200,
          message: "Đăng ký thành công",
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          token: data.token
        }
      }
    },
    loginUser: async (_: any, args) => {
      const { email, password } = args.user;

      const user = await User.findOne({email: email, deleted: false});

      if(user) {
        if(md5(password) != user.password){
          return {
            code: 400,
            message: "Sai mật khẩu"
          }
        } else {
          return{
            code: 200,
            message: "Đăng nhập thành công",
            fullName: user.fullName,
            email: user.email,
            token: user.token,
            id: user._id
          }
        }
      } else {
        return {
          code: 400,
          message: "Email không tồn tại!"
        }
      }

    }
  }
};