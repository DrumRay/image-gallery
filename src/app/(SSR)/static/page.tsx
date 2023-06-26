import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image"
import Link from "next/link";
import { Alert } from "@/components/bootstrap"

export const metadata = {
    title: 'Static Fetching - Image Gallery',
  }

export default async function StaticPage() {
    const response = await fetch("https://api.unsplash.com/photos/random/?client_id=" + process.env.UNSPLASH_KEY);
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width/image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
            Эта страница <strong>извлекает и кэширует данные во время сборки</strong>. Несмотря на то, 
            что API Unsplash всегда возвращает новое изображение, 
            мы видим одно и то же изображение после обновления страницы, пока проект не будет перекомпилирован снова.
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