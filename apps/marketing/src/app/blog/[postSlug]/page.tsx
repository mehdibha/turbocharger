import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { Badge } from "@turbocharger/ui";
import { formatDate } from "@turbocharger/utils";
import { MDX } from "@/components/mdx";
import { getPostBySlug } from "@/lib/posts";

// export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
//   const { post } = await getPostBySlug(params.postSlug);

//   if (!post) {
//     return {};
//   }

//   return {
//     title: post.title,
//     openGraph: {
//       images: post?.thumbnail ? [post.thumbnail] : undefined,
//     },
//   };
// }

interface PostPageProps {
  params: {
    postSlug: string;
  };
}

export default async function PostPage(props: PostPageProps) {
  const { params } = props;
  const post = getPostBySlug(params.postSlug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mt-20">
      <h1 className="mb-4 text-4xl font-bold">{post.metadata.title}</h1>
      <div className="flex items-center space-x-2">
        <p>Published in {formatDate(post.metadata.publishedAt)}</p>
        <p>•</p>
        <p>{post.timeToRead} min read</p>
        <p>•</p>
        <div className="flex space-x-1">
          {post.metadata.keywords &&
            post.metadata.keywords.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </div>
      <article className="mt-8">{post.content && <MDX source={post.content} />}</article>
    </div>
  );
}
