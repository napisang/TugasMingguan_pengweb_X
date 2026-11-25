import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post tidak ditemukan');
    }

    return post;
  }

  async update(id: number, data: Prisma.PostUpdateInput) {
    await this.findOne(id);

    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.post.delete({
      where: { id },
    });
  }

  count() {
    return this.prisma.post.count();
  }
}