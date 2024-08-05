import { BadRequestException, Injectable } from '@nestjs/common';

// DB

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


// type

import { userType } from 'src/types/types';

//


@Injectable()
export class UserService {

  async getUser(): Promise<userType[]> {
    const allUsers = await prisma.user.findMany()

    if (allUsers.length === 0) {
      return []
    }
    return allUsers
  }

  async getSingleUser(id: number): Promise<userType> {

    if (id < 1) {
      throw new BadRequestException('ID пользователя не может быть равен 0', { cause: new Error(), description: 'Не верное значение ID' })

    }
    const getSingleUser = await prisma.user.findUnique({where: {id: id}})

    return getSingleUser

  }


  async createUser(user: userType) {
    const newUser = await prisma.user.create({data: user})
    return newUser
  }


  async deleteUser(id: number) {
    const deleteUser = await prisma.user.delete({where: {id: Number(id)}})
    return deleteUser
  }
}
