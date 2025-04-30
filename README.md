# YouTube Clone

A YouTube clone built with Go backend and modern frontend technologies.

## Project Structure

```
.
├── backend/
│   ├── cmd/
│   │   └── api/          # Main application entry point
│   └── internal/
│       ├── config/       # Configuration management
│       ├── handlers/     # HTTP request handlers
│       ├── models/       # Data models
│       └── services/     # Business logic
└── frontend/             # Frontend application
```

## Prerequisites

- Go 1.21 or later
- PostgreSQL 14 or later
- Node.js 18 or later (for frontend)
- Make (optional, for using Makefile commands)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run the server:
   ```bash
   go run cmd/api/main.go
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation will be available at `/api/docs` once the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 