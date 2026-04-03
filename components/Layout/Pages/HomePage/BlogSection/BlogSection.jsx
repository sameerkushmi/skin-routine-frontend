"use client";

import BlogSkeleton from "@/components/Shared/Loader/BlogSkeleton/BlogSkeleton";
import api from "@/components/utils/Api/api";
import { useMyContext } from "@/components/utils/Context/Context";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiArrowRightThin, PiBookOpenTextLight } from "react-icons/pi";

export default function BlogSection() {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs')
        setBlogs(data.blogs)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  if (loading || !blogs.length) return null

  return (
    <section className="bg-[#FFF8F9] py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
              <PiBookOpenTextLight className="text-pink-400 text-lg sm:text-xl" />
              <span className="text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] font-bold uppercase text-pink-400/80">
                The Journal
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-800 leading-tight">
              Beauty Tips & <span className="italic font-light text-pink-300">Insights</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-stone-500 font-light max-w-xs text-[12px] sm:text-sm leading-relaxed"
          >
            Expert advice, seasonal trends, and ritual tips to help you glow from the inside out.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group cursor-pointer will-change-transform"
            >
              <Link href={`/blog/${blog._id}`} className="block space-y-4 sm:space-y-6">

                {/* Image */}
                <div className="relative aspect-[16/10] rounded-[20px] sm:rounded-[32px] overflow-hidden bg-stone-100 shadow-sm">
                  <Image
                    src={blog.heroImage.url}
                    alt={blog.title}
                    fill
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
                  />
                </div>

                {/* Content */}
                <div className="px-1 sm:px-2 space-y-2 sm:space-y-3">
                  <p className="text-[8px] sm:text-[10px] font-medium text-pink-300 uppercase tracking-widest">
                    {blog.createdAt && new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) || "June 15, 2024"}
                  </p>

                  <h3 className="text-lg sm:text-xl font-serif text-stone-800 leading-snug group-hover:text-pink-400 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex items-center gap-1 sm:gap-2 pt-1 sm:pt-2 text-stone-800 font-medium text-[10px] sm:text-xs uppercase tracking-tighter group-hover:gap-3 sm:group-hover:gap-4 transition-all duration-300">
                    <span>Read Article</span>
                    <PiArrowRightThin className="text-pink-400 text-base sm:text-lg" />
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-20 text-center"
        >
          <Link
            href="/blogs"
            className="inline-block px-8 sm:px-12 py-3 sm:py-4 rounded-full border border-stone-200 text-stone-800 text-xs sm:text-sm font-medium hover:bg-stone-900 hover:text-white transition-all duration-500"
          >
            Explore All Journal Entries
          </Link>
        </motion.div>

      </div>
    </section>
  );
}