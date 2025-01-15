
# DuckStrike - Frontend

## Project Overview
DuckStrike is an innovative platform that integrates blockchain technology and artificial intelligence (AI) to provide seamless cryptocurrency management and interactions. The platform allows users to manage their crypto wallets, perform transactions, get real-time market insights, and leverage AI for personalized assistance.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A web browser to access the frontend application

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/WeTranscend-labs/fe-duck-strike.git
    cd fe-duckstrike
    ```
2. Install dependencies:
    ```bash
	npm install
    ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
		```env
		NEXT_PUBLIC_APP_NAME=<your-app-name>
		NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=<your-wallet-project-id>
		BINANCE_API_KEY=<your-binance-key>
		BINANCE_API_SECRET=<your-binance-secret>
		CMC_API_KEY=<your-coin-market-cap-key>
		GOOGLE_GENERATIVE_AI_API_KEY=<your-google-cloud-key>
		```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

The DuckStrike frontend leverages a variety of modern technologies to provide a seamless, efficient, and secure user experience. Below are the key technologies and libraries used in this project:

- **Next.js**: A React framework for building fast, scalable, and optimized web applications. It powers the server-side rendering (SSR) and static site generation (SSG) for improved performance.
  
- **React**: A JavaScript library for building user interfaces. React provides the core functionality for rendering UI components and managing application state.
  
- **TypeScript**: A superset of JavaScript that adds static types, providing better tooling and error checking during development.
  
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid UI development with minimal custom styles. It makes it easy to create responsive, maintainable, and customizable designs.

- **Radix UI**: A set of low-level UI primitives that provide the building blocks for creating accessible and customizable components. Radix UI is used for elements such as dialogs, sliders, and popovers.
  
- **RainbowKit**: A UI library for integrating Ethereum wallet connections, such as MetaMask and WalletConnect, into your web application with minimal setup.
- **AI SDKs**: 
  - **Google Generative AI SDK**: For integrating generative AI features to offer personalized user experiences, such as AI-powered assistants and predictions.

- **Viem & Ethers.js**: Libraries used for interacting with Ethereum blockchain, handling wallet connections, signing transactions, and reading smart contract data.
  
- **Binance API**: Integrated for accessing cryptocurrency market data, making trades, and fetching real-time information from Binance.

- **CoinMarketCap API**: Used for fetching real-time cryptocurrency market data, such as current prices, volume, and market trends.

These technologies work together to provide a secure, user-friendly, and scalable frontend for DuckStrike, integrating both blockchain and AI for enhanced functionality.

## Project Structure
```
.  
├── app/                      # Contains the main application logic and routing structure for pages.  
├── components/               # Reusable UI components that are used across the app.  
├── configs/                  # Stores configuration files, such as environment variables and API keys.  
├── hooks/                    # Custom React hooks for managing state and side-effects.  
├── lib/                      # Utility functions and helper libraries that support app functionality.  
├── llm/                      # Integrates with large language models (AI-powered features) for chatbots and other AI capabilities.  
├── providers/                # Context providers that manage global state and shared functionality across the app.  
├── public/                   # Static assets like images, icons, and fonts that are served publicly.  
└── .env                      # Environment configuration file containing sensitive keys and settings.  
```

## Contributing

Contributions are welcome! If you'd like to contribute to DuckStrike, please fork the repository, make your changes, and submit a pull request. We appreciate your help!

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.





