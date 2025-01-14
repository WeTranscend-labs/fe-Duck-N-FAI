# DuckStrike - Smart Crypto Transaction Extension 🦆

DuckStrike is a modern, AI-powered crypto transaction extension that makes managing your cryptocurrency transactions easier and more intuitive than ever.

![DuckStrike](https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=2000&auto=format&fit=crop)

## 🌟 Features

- **AI-Powered Assistance**: Natural language processing for intuitive transaction management
- **Real-time Transaction Support**: Execute transactions with simple commands
- **Cross-chain Compatibility**: Support for multiple blockchain networks
- **Enhanced Security**: Enterprise-grade security measures for your transactions
- **Interactive UI**: Modern, responsive interface with dark/light mode support
- **Wallet Integration**: Seamless connection with popular crypto wallets

## 🚀 Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Wallet Integration**: RainbowKit
- **Icons**: Lucide React
- **Font**: Poppins

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/duckstrike.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_id
```

## 📦 Project Structure

```
duckstrike/
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── ui/             # UI components
│   ├── sections/       # Page sections
│   └── wallet/         # Wallet integration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── providers/          # Context providers
└── public/             # Static assets
```

## 🎨 Customization

- **Theme**: Modify `tailwind.config.ts` for custom colors and styles
- **Components**: Customize UI components in the `components/ui` directory
- **Layout**: Adjust page layouts in `app/layout.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [RainbowKit](https://www.rainbowkit.com/)
- [Framer Motion](https://www.framer.com/motion/)
