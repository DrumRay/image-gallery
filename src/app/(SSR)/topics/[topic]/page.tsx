import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css"
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

// export const revalidate = 0;

// export const dynamicParams = false;

interface PageProps {
    params: { topic: string },
    // searchParams: {[key:string]:string | string [] | undefined },
}

export function generateMetadata({params: {topic} }: PageProps): Metadata {
    return {
        title: topic.toUpperCase() + " - Image Gallery"
    }
}

export function generateStaticParams() {
    return ["robots", "home", "nature"].map(topic => ({ topic }));
}

export default async function Page({params: {topic}}: PageProps) {
    const response = await fetch(`https://api.unsplash.com/photos/random/?query=${topic}&count=10&client_id=${process.env.UNSPLASH_KEY}`);
    const images: UnsplashImage[] = await response.json();
    
    return (
        <div>
            <Alert>
                Эта страница использует <strong>generateStaticParams</strong> для рендеринга и кэширования 
                статических страниц на этапе сборки, 
                даже если URL содержит динамический параметр. Страницы, которые 
                не включены в generateStaticParams, будут извлекаться и рендериться при первом доступе, 
                а затем <strong>кэшироваться для последующих запросов</strong> (это можно отключить).
                 </Alert>
            <h1>{topic}</h1>
            {
                images.map(image => (
                    <Image
                    src={image.urls.raw}
                    width={250}
                    height={250}
                    alt={image.description}
                    key={image.urls.raw} 
                    className={styles.image}
                    />
                ))
            }
        </div>
    );
}