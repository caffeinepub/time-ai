/**
 * Solution Page Mapping
 * 
 * This file provides a centralized, maintainable mapping for solution routes.
 * 
 * To add a new solution page:
 * 1. Create the page component in frontend/src/pages/Solutions/<Name>.tsx
 * 2. Import it below
 * 3. Add an entry to the solutionPageMap object with the route path as key
 * 4. Add the corresponding entry to frontend/src/content/solutionsCatalog.ts
 * 5. Add the route config to frontend/src/router/routes.ts
 * 6. Add the search index entry to frontend/src/content/searchIndex.ts
 */

import React from 'react';
import { FedEx } from '../pages/Solutions/FedEx';
import { UPS } from '../pages/Solutions/UPS';
import { USPS } from '../pages/Solutions/USPS';
import { DHL } from '../pages/Solutions/DHL';
import { Amazon } from '../pages/Solutions/Amazon';
import { Cisco } from '../pages/Solutions/Cisco';
import { Microsoft } from '../pages/Solutions/Microsoft';
import { Google } from '../pages/Solutions/Google';
import { AWS } from '../pages/Solutions/AWS';
import { Oracle } from '../pages/Solutions/Oracle';
import { CaffeineAI } from '../pages/Solutions/CaffeineAI';
import { ICP } from '../pages/Solutions/ICP';
import { DFINITY } from '../pages/Solutions/DFINITY';
import { Ethereum } from '../pages/Solutions/Ethereum';
import { Solana } from '../pages/Solutions/Solana';
import { Polygon } from '../pages/Solutions/Polygon';
import { ShopRite } from '../pages/Solutions/ShopRite';
import { StopAndShop } from '../pages/Solutions/StopAndShop';
import { Lowes } from '../pages/Solutions/Lowes';
import { HomeDepot } from '../pages/Solutions/HomeDepot';
import { Walmart } from '../pages/Solutions/Walmart';
import { Costco } from '../pages/Solutions/Costco';
import { SamsClub } from '../pages/Solutions/SamsClub';
import { Copper } from '../pages/Solutions/Copper';
import { FDIC } from '../pages/Solutions/FDIC';
import { Zelle } from '../pages/Solutions/Zelle';
import { PayPal } from '../pages/Solutions/PayPal';
import { XTwitter } from '../pages/Solutions/XTwitter';
import { TradingView } from '../pages/Solutions/TradingView';
import { CoinGecko } from '../pages/Solutions/CoinGecko';
import { Snapchat } from '../pages/Solutions/Snapchat';
import { Instagram } from '../pages/Solutions/Instagram';
import { Fidelity } from '../pages/Solutions/Fidelity';
import { Robinhood } from '../pages/Solutions/Robinhood';
import { DuckDuckGo } from '../pages/Solutions/DuckDuckGo';
import { Gemini } from '../pages/Solutions/Gemini';
import { Zoom } from '../pages/Solutions/Zoom';
import { YouTube } from '../pages/Solutions/YouTube';
import { Discord } from '../pages/Solutions/Discord';
import { TMobileDeutscheTelekom } from '../pages/Solutions/TMobileDeutscheTelekom';
import { McAfee } from '../pages/Solutions/McAfee';
import { Venmo } from '../pages/Solutions/Venmo';
import { TruthSocial } from '../pages/Solutions/TruthSocial';
import { Base } from '../pages/Solutions/Base';
import { Grok } from '../pages/Solutions/Grok';
import { Swift } from '../pages/Solutions/Swift';
import { FedNow } from '../pages/Solutions/FedNow';
import { BRICS } from '../pages/Solutions/BRICS';
import { GBBC } from '../pages/Solutions/GBBC';
import { IMF } from '../pages/Solutions/IMF';
import { USDC } from '../pages/Solutions/USDC';
import { USDT } from '../pages/Solutions/USDT';
import { USD1 } from '../pages/Solutions/USD1';
import { WLFI } from '../pages/Solutions/WLFI';
import { NYSE } from '../pages/Solutions/NYSE';
import { Anthropic } from '../pages/Solutions/Anthropic';
import { Palantir } from '../pages/Solutions/Palantir';
import { Avalanche } from '../pages/Solutions/Avalanche';
import { Cardano } from '../pages/Solutions/Cardano';
import { Tezos } from '../pages/Solutions/Tezos';
import { Vercel } from '../pages/Solutions/Vercel';
import { Netlify } from '../pages/Solutions/Netlify';
import { Supabase } from '../pages/Solutions/Supabase';
import { MongoDB } from '../pages/Solutions/MongoDB';
import { Redis } from '../pages/Solutions/Redis';
import { GitHub } from '../pages/Solutions/GitHub';

export const solutionPageMap: Record<string, () => React.JSX.Element> = {
  '/solutions/fedex': FedEx,
  '/solutions/ups': UPS,
  '/solutions/usps': USPS,
  '/solutions/dhl': DHL,
  '/solutions/amazon': Amazon,
  '/solutions/cisco': Cisco,
  '/solutions/microsoft': Microsoft,
  '/solutions/google': Google,
  '/solutions/aws': AWS,
  '/solutions/oracle': Oracle,
  '/solutions/caffeine-ai': CaffeineAI,
  '/solutions/icp': ICP,
  '/solutions/dfinity': DFINITY,
  '/solutions/ethereum': Ethereum,
  '/solutions/solana': Solana,
  '/solutions/polygon': Polygon,
  '/solutions/shoprite': ShopRite,
  '/solutions/stop-and-shop': StopAndShop,
  '/solutions/lowes': Lowes,
  '/solutions/home-depot': HomeDepot,
  '/solutions/walmart': Walmart,
  '/solutions/costco': Costco,
  '/solutions/sams-club': SamsClub,
  '/solutions/copper': Copper,
  '/solutions/fdic': FDIC,
  '/solutions/zelle': Zelle,
  '/solutions/paypal': PayPal,
  '/solutions/x-twitter': XTwitter,
  '/solutions/tradingview': TradingView,
  '/solutions/coingecko': CoinGecko,
  '/solutions/snapchat': Snapchat,
  '/solutions/instagram': Instagram,
  '/solutions/fidelity': Fidelity,
  '/solutions/robinhood': Robinhood,
  '/solutions/duckduckgo': DuckDuckGo,
  '/solutions/gemini': Gemini,
  '/solutions/zoom': Zoom,
  '/solutions/youtube': YouTube,
  '/solutions/discord': Discord,
  '/solutions/t-mobile-deutsche-telekom': TMobileDeutscheTelekom,
  '/solutions/mcafee': McAfee,
  '/solutions/venmo': Venmo,
  '/solutions/truth-social': TruthSocial,
  '/solutions/base': Base,
  '/solutions/grok': Grok,
  '/solutions/swift': Swift,
  '/solutions/fednow': FedNow,
  '/solutions/brics': BRICS,
  '/solutions/gbbc': GBBC,
  '/solutions/imf': IMF,
  '/solutions/usdc': USDC,
  '/solutions/usdt': USDT,
  '/solutions/usd1': USD1,
  '/solutions/wlfi': WLFI,
  '/solutions/nyse': NYSE,
  '/solutions/anthropic': Anthropic,
  '/solutions/palantir': Palantir,
  '/solutions/avalanche': Avalanche,
  '/solutions/cardano': Cardano,
  '/solutions/tezos': Tezos,
  '/solutions/vercel': Vercel,
  '/solutions/netlify': Netlify,
  '/solutions/supabase': Supabase,
  '/solutions/mongodb': MongoDB,
  '/solutions/redis': Redis,
  '/solutions/github': GitHub,
};
