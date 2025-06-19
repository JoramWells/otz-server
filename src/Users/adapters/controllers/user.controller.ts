import { UserInterface } from "otz-types";
import { User } from "../../domain/models/user/user.model";
import bcrypt from "bcrypt";
import { generateDefaultHashedPassword } from "../../utils/generateDefaultHashedPassword";
import { Op } from "sequelize";
import { Hospital } from "../../domain/models/hospital/hospital.model";
import { UserResponseInterface } from "../../entities/UserResponseInterface";
import { Request, Response } from "express";

export class UserController {
  async create(req: Request,res:Response): Promise<UserInterface> {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      phoneNo,
      sex,
      idNo,
      email,
      countyID,
      password,
      hospitalID,
      role,
    } = req.body;

    const results = await User.create({
      firstName,
      middleName,
      lastName,
      dob,
      phoneNo,
      email,
      countyID,
      sex,
      password,
      idNo,
      hospitalID,
      role,
    });
    const user: UserInterface = {
      id: results.id,
      firstName: results.firstName,
      middleName,
      sex,
      role,
      countyID,
      phoneNo,
      idNo,
      lastName: "",
      dob: "",
      email: "",
      password: "",
    };
    return user;
  }

  async find(
    req: Request,
    res: Response
  ): Promise<UserResponseInterface | null | undefined> {

    const {page, pageSize, searchQuery, hospitalName} = req.body

    let where = {};
    let hospitalWhere = {};

    if(hospitalName?.length>0){
      hospitalWhere={
        ...hospitalWhere,
        hospitalName: hospitalName
      }
    }

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${searchQuery}%` } },
          { middleName: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }

    let offset;
    let limit;
    let nextPage;

    if (page && pageSize) {
      offset = (page - 1) * pageSize;
      limit = pageSize;
    }

    try {
      const { rows, count } = await User.findAndCountAll({
        where,
        offset,
        limit,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Hospital,
            attributes: ["hospitalName"],
            where: hospitalWhere
          },
        ],
      });
      nextPage =
        offset && limit && offset + limit < count
          ? parseInt(page, 10) + 1
          : null;

      return res.json ({
        data: rows,
        total: count,
        page: page,
        nextPage,
        pageSize: limit,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findById(req:Request,res: Response): Promise<UserInterface | null> {
      const { id } = req.params;

    const results = await User.findOne({
      where: {
        id,
      },
    });

    return res.json(results);
  }

  async edit(req:Request,res: Response): Promise<UserInterface | null> {
    const { id } = req.params;

    const {
      firstName,
      middleName,
      lastName,
      phoneNo,
      role,
      dob,
      hospitalID,
    } = req.body;

    // delete cache
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);

    const results = await User.findOne({
      where: {
        id,
      },
    });

    if (results) {
      results.firstName = firstName;
      results.middleName = middleName;
      results.lastName = lastName;
      results.phoneNo = phoneNo;

      results.dob = dob;
      results.role = role;
      results.hospitalID = hospitalID;
      await results.save();
    }
    return results;
  }

  async editPassword(req:Request,res: Response): Promise<UserInterface | null> {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      const { password }: UserInterface = req.body;

    const results = await User.findOne({
      where: {
        id,
      },
    });

    if (results && password) {
      const passwordHash = await generateDefaultHashedPassword(password);
      results.password = passwordHash;
      await results.save();
    }
    return results;
  }

  async login(
    req:Request,res: Response

  ): Promise<UserInterface | null> {
    const {firstName,password,hospitalID}=req.body
    try {
      const user: User | null = await User.findOne({
        where: { firstName: firstName, hospitalID: hospitalID },
      });

      if (user !== null && user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return user;
        } else {
          console.log("Password does not match!!");
          return null;
        }
      }
      return null;
    } catch (error) {
      console.log("Error comparing password!!", error);
      throw new Error("Error logging in user");
    }
  }

  //
  async delete(req:Request,res: Response): Promise<number | null> {
      const { id } = req.params;

    const results: number | null = await User.destroy({
      where: {
        id,
      },
    });
    console.log("deleted cache!!");

    return results;
  }
}

module.exports = {UserController};
