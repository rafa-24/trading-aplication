import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";


export const searchUser = async(userRepo: Repository<User> ,userId: number) => {
    const user = await userRepo.findOne({where: {id: userId}});

    if(user) return user;
    return  false;
}