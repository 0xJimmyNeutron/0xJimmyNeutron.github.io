import { Flex, Text, Heading, Card, Inset, Strong, Grid } from '@radix-ui/themes'
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightArrowLeft, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Canvas from './Canvas';

function round(value: number, decimals: number) {
  return Number(Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals).toFixed(decimals);
}

function App() {
  const [price, setPrice] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://api.seer.coinhall.org/api/coinhall/pools?chains=neutron&addresses=neutron14mssc4ycudkmznstwtcm3assr4gt40nq38x58ap574thgrxgzr0qpxhu9m&limit=1&verified=false';
        const response = await fetch(url, {
          headers: {
            'Host': 'api.seer.coinhall.org',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://coinhall.org/',
            'Origin': 'https://coinhall.org',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'TE': 'trailers',
          }
        });
        const json = await response.json();
        const assets = json.pools[0].assets;
        const asset = assets.find((a: any) => a.name === 'Goddard');
        setPrice(round(asset.usdPrice, 7));
      } catch (error) {
        setPrice('---');
      }
    };

    fetchData();
  });

  return (
    <div className="app">
      <Canvas />
      <Flex gap="4" justify="end" align="center">
        <a
          className="price-link"
          href="https://coinhall.org/neutron/neutron14mssc4ycudkmznstwtcm3assr4gt40nq38x58ap574thgrxgzr0qpxhu9m"
          target="_blank"
        >
          <div className="price fa-border">
            {price === undefined
              ? '---'
              : <Heading size="3">${price}</Heading>
            }
          </div>
        </a>
      </Flex>
      <Flex gap="4" justify="center" align="center">
        <img className="header-goddard" src="logo.png" />
      </Flex>
      <Flex direction="column" gap="3">
        <Flex gap="4" justify="center" align="center">
          <Heading size="9">
            GODDARD
          </Heading>
        </Flex>
        <Heading size="4" align="center">
          The Mechanical Canine of $NTRN
        </Heading>
        <Flex className="social-icons" gap="4" justify="center" align="center">
          <a 
            className="social-icon-link"
            href="https://www.twitter.com/goddardntrn"
            target="_blank"
          >
            <FontAwesomeIcon 
              className="social-icon"
              border
              icon={faXTwitter} 
              size="2x" 
            />
          </a>
          <a 
            className="social-icon-link"
            href="https://t.me/goddardntrn"
            target="_blank"
          >
            <FontAwesomeIcon 
              className="social-icon"
              border
              icon={faTelegram}
              size="2x"
            />
          </a>
          <a 
            className="social-icon-link"
            href="https://coinhall.org/neutron/neutron14mssc4ycudkmznstwtcm3assr4gt40nq38x58ap574thgrxgzr0qpxhu9m"
            target="_blank"
          >
            <FontAwesomeIcon 
              className="social-icon"
              border
              icon={faChartLine}
              size="2x"
            />
          </a>
          <a 
            className="social-icon-link"
            href="https://app.astroport.fi/swap?from=ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9&to=factory/neutron1t5qrjtyryh8gzt800qr5vylhh2f8cmx4wmz9mc/ugoddard"
            target="_blank"
          >
            <FontAwesomeIcon 
              className="social-icon"
              border
              icon={faArrowRightArrowLeft}
              size="2x"
            />
          </a>
        </Flex>
      </Flex>
      <div className="how-to-buy">
        <Flex gap="4" align="center" justify="center">
          <div className="line-break" />
        </Flex>
        <Heading size="6" mb="6">
          How to Buy $GODRD
        </Heading>
        <Flex wrap="wrap" gap="9" align="center" justify="between">
          <Card asChild size="2" style={{ width: 360, height: 480 }}>
            <a
              href="https://www.keplr.app/download"
              target="_blank"
            >
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://assets-global.website-files.com/63eb7ddf41cf5b1c8fdfbc74/63fcb4fc23dfbad06e19f84b_icon-kplr-br.svg"
                  alt="Keplr Wallet"
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: 360,
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                Download <Strong>Keplr Wallet</Strong>
                <br />
                <br />
                An IBC-enabled wallet for the Cosmos ecosystem is necessary to acquire $GODRD.
              </Text>
            </a>
          </Card>
          <Card asChild size="2" style={{ width: 360, height: 480 }}>
            <div>
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://v1.cosmos.network/img/brandmark.c15d55f6.png"
                  alt="ATOM"
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: 360,
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>Send $ATOM to Wallet</Strong>
                <br />
                <br />
                Use an exchange or bridge to send $ATOM to your Keplr wallet.
              </Text>
            </div>
          </Card>
          <Card asChild size="2" style={{ width: 360, height: 480 }}>
            <a
              href="https://app.astroport.fi/bridge"
              target="_blank"
            >
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://static.chainbroker.io/mediafiles/projects/neutron/neutron.jpeg"
                  alt="Neutron"
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: 360,
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>Bridge $ATOM to Neutron Chain</Strong>
                <br />
                <br />
                If your $ATOM is on the Cosmos chain, bridge $ATOM to the Neutron chain.
              </Text>
            </a>
          </Card>
          <Card size="2" asChild style={{ width: 360, height: 480 }}>
            <a 
              href="https://app.astroport.fi/swap?from=ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9&to=factory/neutron1t5qrjtyryh8gzt800qr5vylhh2f8cmx4wmz9mc/ugoddard"
              target="_blank"
            >
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://global.discourse-cdn.com/standard14/uploads/astroport/original/1X/54ed8e9ab7e9c5bdb3f2b2bd48f912c17bcf9c18.png"
                  alt="Astroport Fi"
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: 360,
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>Buy $GODRD on Astroport</Strong>
                <br />
                <br />
                Connect your wallet and swap to $GODRD using Astroport.
              </Text>
            </a>
          </Card>

        </Flex>
      </div>

      <div className="tokenomics">
        <Flex gap="4" align="center" justify="center">
          <div className="line-break" />
        </Flex>
        <Heading size="6" mb="6">
          $GODRD Tokenomics
        </Heading>
        <Flex wrap="wrap" gap="9" align="center" justify="between">
          <Card size="2" style={{ width: 360, height: 480 }}>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src="https://icons.veryicon.com/png/o/application/awesome-common-free-open-source-icon/coins-21.png"
                alt="Supply"
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 360,
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Text as="p" size="3">
              <Strong>420M Total Supply ✅</Strong>
              <br />
              <br />
              Minting has been locked, and the supply is fixed at 420,000,000.
            </Text>
          </Card>
          <Card size="2" style={{ width: 360, height: 480 }}>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src="https://icons.veryicon.com/png/o/business/risk-management/liquidity-risk.png"
                alt="LP Burned"
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 360,
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Text as="p" size="3">
              <Strong>LP Burned & Cannot Be Pulled ✅</Strong>
              <br />
              <br />
              The initial liquidity pool of $GODRD / $ATOM is controlled by the Astroport contract.
            </Text>
          </Card>
          <Card size="2" style={{ width: 360, height: 480 }}>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src="https://icons.veryicon.com/png/o/avatar/user-2/admin-fill-1.png"
                alt="Admin Renounced"
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 360,
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Text as="p" size="3">
              <Strong>Ownership Renounced ✅</Strong>
              <br />
              <br />
              Admin control of $GODRD has been revoked and set to the zero address.
            </Text>
          </Card>
          <Card size="2" style={{ width: 360, height: 480 }}>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src="https://icons.veryicon.com/png/o/application/application-and-product-feature-icons/free-1.png"
                alt="0 Tax"
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 360,
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Text as="p" size="3">
              <Strong>0 Buy / Sell Tax ✅</Strong>
              <br />
              <br />
              There is no buy or sell tax when swapping $GODRD.
            </Text>
          </Card>

        </Flex>
      </div>
    </div>
  );
}

export default App;
