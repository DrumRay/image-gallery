"use client";

import { UnsplashImage } from "@/models/unsplash-image";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css"
import Image from "next/image";

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState<UnsplashImage[] | null> (null);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);
    
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();

        if (query) {
            try { 
                setSearchResults(null);
                setSearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);
                const response = await fetch("/api/search?query=" + query);
                const images: UnsplashImage[] = await response.json();
                setSearchResults(images);
                
            } catch (error) {
                console.error(error);
                setSearchResultsLoadingIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }

        }
    }
    
    return(
        <div>
            <Alert>
            На этой странице данные извлекаются на <strong>стороне клиента</strong>. 
            Чтобы не раскрывать учетные данные API, запрос отправляется на 
            <strong> обработчик маршрута</strong> Next.js, который работает на сервере. 
            Этот обработчик маршрута затем извлекает данные из API Unsplash и возвращает их клиенту.
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Поисковой запрос</Form.Label>
                    <Form.Control 
                    name="query"
                    placeholder="Например: dogs, ocean, ..."
                    />
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
                    Поиск
                </Button>
            </Form>

            <div className="d-flex flex-column align-items-center">
                {searchResultsLoading && <Spinner animation="border" />}
                {searchResultsLoadingIsError && <p>Что-то пошло не так. Попробуйте снова.</p>}
                {searchResults?.length === 0 && <p>Ничего не найдено. Попробуйте другой запрос.</p>}
            </div>

            {searchResults && 
                <>
                    { searchResults.map(image => (
                        <Image
                        src={image.urls.raw}
                        width={250}
                        height={250}
                        alt={image.description}
                        key={image.urls.raw} 
                        className={styles.image}
                        />
                    ))}
                
                </>
            }
        </div>
    );
}