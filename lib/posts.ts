import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

interface PostFrontMatterResult {
  title: string;
  date: string;
}

const postDirectory = path.join(process.cwd(), "posts");

const getPosts = async () => {
  const fileNames = fs.readdirSync(postDirectory);
  const allPosts = fileNames.map(async (filename) => {
    const id = filename.replace(/.md$/, "");

    const fullPath = path.join(postDirectory, filename);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(data as PostFrontMatterResult),
    };
  });

  // return allPosts.sort(({ date: a }, { date: b }) => {
  //   if (a < b) {
  //     return 1;
  //   } else if (a > b) {
  //     return -1;
  //   } else return 0;
  // });
  return await Promise.all(allPosts);
};

export default getPosts;
