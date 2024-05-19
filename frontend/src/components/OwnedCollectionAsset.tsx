// SomeComponent.tsx or another TypeScript file
import { useEffect, useState } from "react";
import { Aptos } from "@aptos-labs/ts-sdk";
import { Tag } from "antd";
import { TokenMetadata } from "../interface/TokenMetadata";
import Image from "./Image";
import Heading from "./Heading";
import ImageViewer from "./ImageView";

interface Props {
  accountAddress: string;
  collectionAddress: string;
  aptos: Aptos;
}

const OwnedAssetsComponent: React.FC<Props> = ({
  accountAddress,
  collectionAddress,
  aptos,
}) => {
  const [ownedAssets, setOwnedAssets] =
    useState<TokenMetadata[]>(sampleTokenMetadata);

  const fetchMetadata = async (uri: string) => {
    const response = await fetch(uri);
    const metadata = await response.json();
    return metadata;
  };

  const fetchOwnedAssets = async () => {
    try {
      const ownedDigitalAssets =
        await aptos.getAccountOwnedTokensFromCollectionAddress({
          accountAddress: accountAddress,
          collectionAddress: collectionAddress,
        });
      const assetsWithMetadata = await Promise.all(
        ownedDigitalAssets.map(async (asset: any) => {
          let metadata = {
            name: "Default Name",
            image: "Default Image URL",
            description: "Default Description",
            attributes: [],
          };
          if (asset.current_token_data.token_uri) {
            const fetchedMetadata = await fetchMetadata(
              asset.current_token_data.token_uri
            );
            // Assuming the fetched metadata is properly structured; validate or use fallbacks as necessary
            metadata = {
              name: fetchedMetadata.name || metadata.name,
              image: fetchedMetadata.image || metadata.image,
              description: fetchedMetadata.description || metadata.description,
              attributes: fetchedMetadata.attributes || metadata.attributes,
            };
          }
          return {
            token_data_id: asset.current_token_data.token_data_id,
            token_name: asset.current_token_data.token_name,
            token_uri: asset.current_token_data.token_uri,
            metadata: metadata,
          };
        })
      );
      setOwnedAssets(assetsWithMetadata);
    } catch (error) {
      console.error("Failed to fetch owned assets:", error);
    }
  };

  // useEffect(() => {
  //   fetchOwnedAssets();
  //   const interval = setInterval(fetchOwnedAssets, 10000); // Polling every 10 seconds

  //   return () => clearInterval(interval); // Cleanup function to clear the interval
  // }, [accountAddress, collectionAddress]);
  return (
    <div className="flex flex-wrap gap-8 h-screen w-screen">
      {}
      {ownedAssets.map((asset, index) => (
        <div key={index}>
          <ImageViewer imageSrc={asset.metadata.image}>
            <Heading text={asset.token_name} level="h3" />
            <p>ID: {asset.token_data_id}</p>
            <button>Share it on Twitter</button>
            {/* {asset.metadata.attributes?.map((attr, idx) => (
              <Tag style={{ margin: "5px" }} key={idx}>
                {attr.trait_type}: {attr.value}
              </Tag>
            ))} */}
          </ImageViewer>
          {/* <Heading text={asset.token_name} level="h3" />
          <p>ID: {asset.token_data_id}</p>
          <a href={asset.token_uri}>
            {asset.metadata.image && (
              <Image
                src={asset.metadata.image}
                alt={asset.token_name}
                className="h-32 w-32 rounded-md"
              />
            )}
          </a> */}
          {/* <a href={asset.token_uri}>View JSON</a> */}
          {/* {asset.metadata.attributes?.map((attr, idx) => (
            <Tag style={{ margin: "5px" }} key={idx}>
              {attr.trait_type}: {attr.value}
            </Tag>
          ))} */}
        </div>
      ))}
    </div>
  );
};

export default OwnedAssetsComponent;

const sampleTokenMetadata: TokenMetadata[] = [
  {
    token_data_id: "1",
    token_name: "Token One",
    token_uri: "https://example.com/token1",
    metadata: {
      name: "Token One",
      image:
        "https://cdn.pixabay.com/photo/2021/11/03/08/24/baskets-6765014_1280.jpg",
      description: "Description for Token One",
      attributes: [
        { trait_type: "Color", value: "Red" },
        { trait_type: "Size", value: "Large" },
      ],
    },
  },
  {
    token_data_id: "2",
    token_name: "Token Two",
    token_uri: "https://example.com/token2",
    metadata: {
      name: "Token Two",
      image:
        "https://cdn.pixabay.com/photo/2021/11/03/08/24/baskets-6765014_1280.jpg",
      description: "Description for Token Two",
      attributes: [
        { trait_type: "Color", value: "Blue" },
        { trait_type: "Size", value: "Medium" },
      ],
    },
  },
  {
    token_data_id: "3",
    token_name: "Token Three",
    token_uri: "https://example.com/token3",
    metadata: {
      name: "Token Three",
      image:
        "https://cdn.pixabay.com/photo/2021/11/03/08/24/baskets-6765014_1280.jpg",
      description: "Description for Token Three",
      attributes: [
        { trait_type: "Color", value: "Green" },
        { trait_type: "Size", value: "Small" },
      ],
    },
  },
];
