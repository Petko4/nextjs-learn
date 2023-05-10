import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import NewsArticleEntry from "@/components/NewsArticleEntry";
import NewsArticleGrid from "@/components/NewsArticleGrid";
import { Alert } from "react-bootstrap";

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

/**
 * getServerSideProps()
 *  - fetch data on server and forward as props to the page function then
 *    the prerendered page is serverd to client
 *  - the method can be used only in pages
 *  - the method can't be used in components
 */
export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  // console.log(`${new Date().toISOString()} - getServerSideProps()`);
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {
      newsArticles: newsResponse.articles,
    },
  };
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  // console.log(`${new Date().toISOString()} - BreakingNewsPage()`);
  // console.log(newsArticles);
  return (
    <>
      <Head>
        <title key="title">Breaking News - NextJS News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          This page uses <strong>getServerSideProps</strong> to fetch data
          server-side on every request. This allows search engines to crawl the
          page content and <strong>imporve SEO</strong>
        </Alert>
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
}
