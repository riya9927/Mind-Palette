'use client'
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import NewsLetter from "@/Components/NewsLetter";


export default function Home() {
  return (
    <>
    <Header />
    <BlogList />
    <NewsLetter />
    <Footer />
    </>
  );
}
