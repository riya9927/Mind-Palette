'use client'
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import NewsLetter from "@/Components/NewsLetter";
// import { ToastContainer } from "react-toastify";
import { ToastContainer, toast } from 'react-toastify';


export default function Home() {
  return (
    <>
    <ToastContainer theme="dark" />
    <Header />
    <BlogList />
    <NewsLetter />
    <Footer />
    </>
  );
}
