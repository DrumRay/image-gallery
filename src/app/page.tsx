import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image"



  export default async function DynamicPage() {
    const response = await fetch(`https://api.unsplash.com/photos/random/?count=10&client_id=${process.env.UNSPLASH_KEY}`);
    const images: UnsplashImage[] = await response.json();

    return(
       <div>
        <div className="d-flex flex-column align-items-center m-5">
            <h1>
              Интерактивная галерея на базе Unsplash API
            </h1>
          </div>
            <div className="images-container">
            {
                  images.map(image => (
                      <Image
                      src={image.urls.raw}
                      width={250}
                      height={250}
                      alt={image.description}
                      key={image.urls.raw} 
                      className="image-home"
                      />
                  ))
              }
          </div>
        </div>
    );
}
