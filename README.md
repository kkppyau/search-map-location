# search-map-location

## Getting Started

### Environment Setup

1. Copy the environment sample file and rename it:

```bash
cp .env.example .env
```

2. Update the environment variables in `.env` file:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

### Installation

```bash
npm install
# or
yarn install
```

### Running the Project

```bash
npm run dev
# or
yarn dev
```

### Building the Project for production

```bash
npm run build
# or
yarn build
```

## Environment Variables

| Variable            | Description      | Example                 |
| ------------------- | ---------------- | ----------------------- |
| NEXT_PUBLIC_API_URL | API endpoint URL | https://api.example.com |

## Potential Improvements

### 1. Multiple Environment Support

- Currently, the application supports only one environment configuration
- Implement support for multiple environments (development, staging, production)
- Add environment-specific configuration files and variables
- Create documentation for environment setup and switching

### 2. Testing

- Add unit tests for React **components**
- Add end-to-end testing using Selenium or Playwright, etc
- Set up continuous integration pipeline for deployment and automated testing

## Important Notes

- Never commit `.env` files to the repository
- Always use `.env.example` as a template
- Make sure to update environment variables before starting the project

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.
