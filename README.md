# CSR-kive

CSR-kive is a comprehensive Corporate Social Responsibility (CSR) management platform that helps organizations track, manage, and report on their CSR initiatives. The platform includes features for employee engagement, event management, and AI-powered audit report generation.

## Project Structure

```
csr-kive/
├── admin/
│   ├── frontend/          # React-based admin dashboard
│   └── backend/           # Express.js backend server
├── audit-gen/             # Flask-based audit report generator
├── employee/              # Employee portal
└── assets/               # Static assets
```

## Features

### Admin Dashboard
- **Event Management**: Create and manage CSR events
- **Employee Management**: Track employee participation and contributions
- **Leaderboard**: Gamified system to encourage participation
- **AI-Powered Audit Reports**: Generate comprehensive reports with AI summaries
- **Dashboard Analytics**: Overview of CSR activities and impact

### Audit Report Generator
- AI-powered report summarization using BART model
- PDF report generation with detailed event information
- Customizable report templates
- Secure report storage and retrieval

## Technology Stack

### Frontend (Admin Dashboard)
- React 18.x
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios for API calls
- Lucide React for icons

### Backend (Admin Server)
- Express.js
- MongoDB
- Mongoose ODM
- CORS support
- Environment configuration

### Audit Generator
- Flask 3.0.2
- Flask-CORS
- ReportLab for PDF generation
- Hugging Face Transformers
- PyTorch
- SentencePiece

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- Python 3.8 or higher
- MongoDB instance

### Installation

1. **Admin Frontend**
```bash
cd admin/frontend
npm install
npm run dev
```

2. **Admin Backend**
```bash
cd admin/backend
npm install
node index.js
```

3. **Audit Generator**
```bash
cd audit-gen
pip install -r requirements.txt
python app.py
```

## API Endpoints

### Admin Backend (Port 5000)
- `GET /api/admin/:id` - Get admin details
- `GET /api/employee` - List all employees
- `GET /api/employee/:id` - Get employee details
- `POST /api/admin/:id/events` - Create new event

### Audit Generator (Port 5001)
- `GET /api/generate-report/:org_id` - Generate reports for all events
- `GET /api/generate-single-report/:org_id/:event_name` - Generate specific event report

## Development

### Frontend Development
The admin frontend is built with React and TypeScript. Key components include:
- `AdminLayout`: Main layout with navigation
- `Dashboard`: Overview of CSR activities
- `Employees`: Employee management
- `Leaderboard`: Gamification system
- `Audits`: Report generation and management
- `EventDetails`: Detailed event view and management

### Backend Development
The backend uses Express.js with MongoDB for data persistence. Key features:
- RESTful API design
- MongoDB integration
- Authentication and authorization
- Event and employee management

### Audit Generator
The audit generator is a Flask application that:
- Generates PDF reports
- Integrates with Hugging Face's BART model for AI summaries
- Provides secure report storage
- Handles concurrent report generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Hugging Face for the BART model
- ReportLab for PDF generation
- The React and Flask communities 