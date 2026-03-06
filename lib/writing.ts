import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx/mdx-components";

const WRITING_DIRECTORY = path.join(process.cwd(), "content/writing");

export type WritingFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  status: string;
};

export type WritingEntry = WritingFrontmatter & {
  slug: string;
};

function toSlug(filename: string) {
  return filename.replace(/\.mdx$/, "");
}

async function getWritingFiles() {
  const files = await fs.readdir(WRITING_DIRECTORY, { withFileTypes: true });

  return files
    .filter((file) => file.isFile() && file.name.endsWith(".mdx"))
    .map((file) => file.name);
}

export async function getWritingEntries(): Promise<WritingEntry[]> {
  const files = await getWritingFiles();

  const entries = await Promise.all(
    files.map(async (filename) => {
      const source = await fs.readFile(path.join(WRITING_DIRECTORY, filename), "utf8");
      const { data } = matter(source);

      return {
        slug: toSlug(filename),
        title: String(data.title),
        description: String(data.description),
        publishedAt: String(data.publishedAt),
        status: String(data.status),
      };
    }),
  );

  return entries.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getWritingBySlug(slug: string) {
  const fullPath = path.join(WRITING_DIRECTORY, `${slug}.mdx`);
  const source = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(source);

  const { content: compiled } = await compileMDX({
    source: content,
    components: mdxComponents,
  });

  return {
    slug,
    frontmatter: {
      title: String(data.title),
      description: String(data.description),
      publishedAt: String(data.publishedAt),
      status: String(data.status),
    } satisfies WritingFrontmatter,
    content: compiled,
  };
}
