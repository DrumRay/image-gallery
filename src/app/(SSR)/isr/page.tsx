import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image"
import Link from "next/link";
import { Alert } from "@/components/bootstrap"

export const metadata = {
    title: 'Incremental Static Regeneration - Image Gallery',
  }

  export const revalidate = 15;

  export default async function DynamicPage() {
    const response = await fetch("https://api.unsplash.com/photos/random/?client_id=" + process.env.UNSPLASH_KEY,
    {
        // next: { revalidate: 15 }
    }
    );
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width/image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
            Эта страница использует <strong>инкрементальную статическую регенерацию</strong>. 
            Новое изображение извлекается каждые 15 секунд (после обновления страницы)
             и затем обслуживается из кэша в течение этого временного интервала.    
            </Alert>
            <Image 
                src={image.urls.raw} 
                width={width}
                height={height}
                alt={image.description}
                className="rounded shadow mw-100 h-100"
            />
            by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
        </div>
    );
}