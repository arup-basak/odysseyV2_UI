import { useEffect, useState } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { OdysseyResource } from "./interface/OdysseyTypes";
import MintedProgress from "./modules/MintedProgress";
import Image from "./components/Image";
import Heading from "./components/Heading";
import Text from "./components/Text";
import CountButton from "./components/CountButton";
import ShowTime from "./components/ShowTime";
import ShowAPT from "./components/ShowAPT";
import Logo from "./modules/Logo";
import OwnedCollectionAsset from "./components/OwnedCollectionAsset";
import BackgroundImage from "./components/ui/BackgroundImage";
interface Stage {
  key: string;
  value: {
    start_time: number;
    end_time: number;
  };
}

interface FeesData {
  key: string;
  value: {
    amount: string; // Note: amount is still considered as string
  }[];
}

interface Fees {
  key: string;
  amount: string; // Note: amount is still considered as string
}

function App() {
  const [odyssey, setOdyssey] = useState<OdysseyResource | null>(null);
  const [collectionName, setCollectionName] = useState("");
  const [odysseyStatus, setOdysseyStatus] = useState("");
  const [allowlistBalance, setAllowlistBalance] = useState(0);
  const [publiclistBalance, setPubliclistBalance] = useState(0);
  const [loading, setLoading] = useState(false); // State for loading
  const { account, signAndSubmitTransaction } = useWallet();
  const [stages, setStages] = useState<Stage[]>([]);
  const [fees, setFees] = useState<Fees[]>([]);

  const aptos = getNetwork();

  const baseUrl = process.env.REACT_APP_API_BASE_URL; // Get base URL from environment variable

  if (!baseUrl) {
    throw new Error("REACT_APP_API_BASE_URL is not defined in .env file");
  }

  const fetchOdyssey = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/get-odyssey`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setOdyssey(data.odyssey);

      const sum_fees: Fees[] = data.odyssey.fees.data.map((item: FeesData) => {
        // Summing up the amount values within the value array
        const totalAmount = item.value.reduce(
          (acc, fee) => acc + parseInt(fee.amount),
          0
        );
        return { key: item.key, amount: totalAmount };
      });

      setFees(sum_fees);

      const collectionData = await aptos.getCollectionDataByCollectionId({
        collectionId: data.odyssey.collection.inner,
      });

      setCollectionName(collectionData.collection_name);

      // setCoverImageIconTitle(
      //   data.odyssey.cover,
      //   collectionData.collection_name
      // );
      //displaySystemStatus(data.odyssey);
    } catch (e: any) {
      console.error("Error getting odyssey:", e.message);
    }
  };

  const fetchStage = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/get-stage`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const response2 = await fetch(
        `${baseUrl}/api/allowlist-balance/${account?.address}`
      );
      const data2 = await response2.json();
      setAllowlistBalance(data2.balance);

      const response3 = await fetch(
        `${baseUrl}/api/publiclist-balance/${account?.address}`
      );
      const data3 = await response3.json();
      setPubliclistBalance(data3.balance);

      setStages(data.stage.mint_stages.data); // Store the stages array in state
    } catch (e: any) {
      console.error("Error getting odyssey:", e.message);
    }
  };

  // Change Favicon and Title
  const changeFaviconAndTitle = async (imageUrl: string, newTitle: string) => {
    try {
      const dataURL = await getPNGDataURL(imageUrl);

      // Change Favicon
      const oldFavicon = document.querySelector('link[rel="icon"]');
      if (oldFavicon) {
        oldFavicon.setAttribute("href", dataURL);
      } else {
        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = dataURL;
        document.head.appendChild(favicon);
      }

      // Change Title
      document.title = newTitle;
    } catch (error) {
      console.error("Error changing favicon and title:", error);
    }
  };

  // Function to convert PNG image to Data URL
  const getPNGDataURL = async (imageUrl: string): Promise<string> => {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result as string;
        resolve(dataURL);
      };
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOdyssey();
      fetchStage();
    }, 1000); // Polling every 1000ms (1 second)

    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, [account?.address]);

  const updateTokenMetadataImage = async (index: string, token: string) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/update-metadata-image/${index}/${token}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Updated token metadata:", data);
    } catch (error: any) {
      console.error("Error updating token metadata:", error.message);
    }
  };

  const handleMint = async (mintQty: number) => {
    if (!odyssey || loading) return; // Check if odyssey is null or if already loading, return

    try {
      setLoading(true); // Set loading to true when minting starts

      const response = await fetch(
        `${baseUrl}/api/get-mint-txn/${account?.address}/${mintQty}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      //aptos.transaction.batch.forSingleAccount({ sender: account, data: data.payloads });
      //Sign and submit transaction to chain
      const response2 = await signAndSubmitTransaction(data.payloads);

      //Wait for transaction
      const mintedTransactions = await aptos.waitForTransaction({
        transactionHash: response2.hash,
      });

      //console.log(mintedTransactions);

      // Function to filter and find all 'Mint' events
      const findAllMintedTokens = async (transactions: any) => {
        const changes = transactions.changes || [];
        const mintedToken = [];
        for (const change of changes) {
          if (change.data) {
            if (change.data.type === "0x4::token::TokenIdentifiers") {
              console.log(change);
              const tokenAddress = change.address;
              const tokenIndex = change.data.data.index.value;
              await updateTokenMetadataImage(tokenIndex, tokenAddress);
              mintedToken.push(change);
            }
          }
        }
        return mintedToken;
      };

      const tokens = await findAllMintedTokens(mintedTransactions);

      setLoading(false);
    } catch (error) {
      console.error("Minting error:", error);
      setLoading(false); // Set loading to false if there is an error
    }
  };

  // Function to format Unix timestamp to local time

  function getNetwork() {
    let network = "devnet";
    if (process.env.REACT_APP_APTOS_NETWORK !== undefined) {
      network = process.env.REACT_APP_APTOS_NETWORK;
    }
    let selectedNetwork = Network.DEVNET;
    const lowercaseNetwork = network.toLowerCase();
    switch (lowercaseNetwork) {
      case "testnet":
        selectedNetwork = Network.TESTNET;
        break;
      case "mainnet":
        selectedNetwork = Network.MAINNET;
        break;
      case "random":
        selectedNetwork = Network.RANDOMNET;
        break;
    }
    const APTOS_NETWORK = selectedNetwork;
    const aptosConfig = new AptosConfig({ network: APTOS_NETWORK });
    const aptos = new Aptos(aptosConfig);

    return aptos;
  }

  return (
    <main>
      <BackgroundImage />
      <div className="md:mx-auto md:max-w-screen-xl md:m-8 space-y-4 md:space-y-6 overflow-y-scroll">
        <div className="flex justify-between">
          <Logo />
          <WalletSelector />
        </div>
        {odyssey && (
          <>
            <div className="glass-morphism border border-white border-opacity-50 p-6 md:p-8 rounded-2xl m-2 md:m-auto min-h-[20vh] max-w-screen-lg">
              <div className="flex flex-col md:flex-row md:space-x-8">
                <Image
                  src={odyssey.cover}
                  alt="cover image"
                  className="w-full h-fit md:w-1/2 aspect-square rounded-2xl"
                />

                <div className="space-y-2 md:space-y-4 mt-4 md:mt-0 md:w-1/2">
                  <Heading text={collectionName} level="h2" />
                  <Text text={odyssey.description} />
                  <div className="space-y-2">
                    {stages.map((stage, index) => {
                      const fee = fees.find((fee) => fee.key === stage.key);

                      return (
                        <div
                          key={index}
                          className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl p-3 md:p-4 grid grid-cols-2"
                        >
                          <Text
                            text={stage.key}
                            className="text-sm md:text-lg font-semibold"
                          />

                          <ShowTime
                            startInTimestamp={stage.value.start_time}
                            endInTimestamp={stage.value.end_time}
                          />

                          {fee && (
                            <>
                              <ShowAPT value={fee.amount} />
                              <Text
                                text={
                                  stage.key === "Presale mint stage"
                                    ? `Per Wallet: ${allowlistBalance}`
                                    : `Per Wallet: ${publiclistBalance}`
                                }
                                className="text-xs md:text-base"
                              />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <MintedProgress
                    maxSupply={parseInt(odyssey.collection_size)}
                    totalMinted={parseInt(odyssey.minted)}
                  />
                  <CountButton
                    onSubmit={handleMint}
                    minLimit={0}
                    defaultValue={1}
                    maxLimit={10}
                  />
                </div>
              </div>
            </div>
            <div>
              <Heading text="Your Minted NFTs: " level="h3" />
              {account && (
                <OwnedCollectionAsset
                  accountAddress={account.address}
                  collectionAddress={odyssey.collection.inner}
                  aptos={aptos}
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
