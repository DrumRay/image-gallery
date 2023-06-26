import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Alert } from "@/components/bootstrap";

interface PageProps {
    params: {username:string},
}

async function getUser(username:string): Promise<UnsplashUser> {
    const response = await fetch (`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_KEY}`); 
    
    if (response.status === 404) notFound();

    return await response.json();
}

export async function generateMetadata({params: {username}}: PageProps): Promise<Metadata> {
    const user = await getUser(username);
    return {
        title: user.username + " - Image Gallery"
    };
}

export default async function Page({params: {username}}: PageProps) {
    const user = await getUser(username);

    return (
        <div>
            <Alert>
            На этой странице профиля используется <strong>generateMetadata</strong> 
            для динамической установки <strong>заголовка страницы</strong> на основе ответа API.
            </Alert>
            <h1>{user.username}</h1>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <a href={"https://unsplash.com/" + user.username}>Unsplash profile</a>
        </div>
    );
}
