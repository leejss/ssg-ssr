import type { NextPage } from "next";
import type { Post } from "../types/Post";
import getPosts from "../lib/posts";

interface HomePageProps {
  posts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return (
          <section key={post.id}>
            <h2>{post.title}</h2>
            <div>{post.date}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: post.contentHtml,
              }}
            ></div>
          </section>
        );
      })}
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
}

// export async function getServerSideProps() {
//   const posts = await getPosts();
//   return {
//     props: {
//       posts,
//     },
//   };
// }
