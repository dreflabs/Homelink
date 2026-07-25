import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
        category: true,
      },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, content, authorId } = body;

    const newArticle = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        authorId,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
