import React from "react"
import ContentLoader from "react-content-loader"
import { GenerateList } from "core/utils/List";

export const ProductLoader = () => {
    const itens = GenerateList(3);

    return (
        <>
            {itens.map(item => (
                <ContentLoader
                    key={item.toString()}
                    speed={1}
                    width={200}
                    height={240}
                    viewBox="0 0 200 240"
                    backgroundColor="#ecebeb"
                    foregroundColor="#f8f8fa"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="200" height="240" />
                </ContentLoader>
            ))}
        </>
    );
}


export const ProductInfoDetails = () => (
    <ContentLoader
        viewBox="0 0 585 480"
        height={480}
        width={585} 
        backgroundColor="#ecebeb"
        foregroundColor="#f8f8fa"
        >

        <rect x="0" y="0" rx="10" ry="10" width="550" height="355" />
        <rect x="0" y="375" rx="2" ry="2" width="275" height="15" />
        <rect x="0" y="400" rx="2" ry="2" width="140" height="15" />
    </ContentLoader>
);

export const ProductDescriptionDetails = () => (
    <ContentLoader
        viewBox="0 0 585 480"
        height={480}
        width={585} 
        backgroundColor="#ecebeb"
        foregroundColor="#f8f8fa"
        >
        <rect x="20" y="20" rx="2" ry="2" width="350" height="15" />
        <rect x="20" y="50" rx="2" ry="2" width="275" height="15" />
        <rect x="20" y="80" rx="2" ry="2" width="140" height="15" />
    </ContentLoader>

);
