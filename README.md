# TipSpark - Base Mini App

TipSpark is a Base Mini App that enables users to tip content creators with cryptocurrency, fostering a sustainable content ecosystem through personalized appreciation.

## Features

- **Personalized Tipping**: Tip creators for specific content you enjoyed
- **Direct Creator Support**: Seamless crypto payments via Base wallet
- **In-Frame Discovery**: Find new creators and content within Farcaster frames
- **Builder Mode**: Easy creator onboarding and content management
- **Mobile-First Design**: Optimized for mobile experience

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base L2 (Ethereum)
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd tipspark
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with trending content
│   ├── discover/          # Content discovery page
│   ├── builder/           # Creator tools and content creation
│   ├── profile/           # User profile and earnings
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable UI components
│   ├── AppShell.tsx       # Main app layout with navigation
│   ├── ContentCard.tsx    # Content display with tipping
│   ├── CreatorProfileCard.tsx # Creator information display
│   └── TipInputForm.tsx   # Tipping interface
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript interfaces
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

## Key Components

### Data Models

- **User**: Farcaster identity with wallet connection
- **Creator**: Extended user profile for content creators
- **ContentItem**: Individual pieces of content that can receive tips
- **Tip**: Transaction records linking users to content

### Core Features

1. **Tipping Flow**
   - View content in feed
   - Click tip button
   - Select amount and currency (ETH/USDC)
   - Confirm transaction via Base wallet
   - Receive confirmation

2. **Creator Onboarding**
   - Connect Base wallet
   - Set up creator profile
   - Add content with metadata
   - Share content in Farcaster frames

3. **Discovery**
   - Browse trending content
   - Search creators and topics
   - Filter by content type
   - Follow favorite creators

## Base Mini App Integration

This app is designed to run within Base App and Farcaster clients:

- **MiniKit Provider**: Handles wallet connection and Base chain integration
- **OnchainKit Components**: Provides identity and wallet UI components
- **Frame Actions**: Enables tipping directly within Farcaster frames
- **Manifest Configuration**: Declares app capabilities and metadata

## Development

### Adding New Features

1. Define TypeScript interfaces in `lib/types.ts`
2. Create reusable components in `components/`
3. Add new pages in `app/` directory
4. Update navigation in `AppShell.tsx`

### Styling Guidelines

- Use Tailwind CSS with custom design tokens
- Follow mobile-first responsive design
- Maintain dark theme consistency
- Use glass morphism effects for depth

### Testing

```bash
npm run build    # Test production build
npm run lint     # Check code quality
```

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js:

1. Connect your repository to Vercel
2. Add environment variables
3. Deploy automatically on push to main

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please open an issue on GitHub or contact the development team.
