# CBAP Mock Exam System

A comprehensive CBAP (Certified Business Analysis Professional) mock exam application built with React, TypeScript, and Vite.

## Features

- 3 Complete Mock Exams (120 questions each)
- 300-minute timer per exam
- 80% passing score (96/120 correct answers)
- Progress tracking and question navigation
- Mark for Review functionality
- Detailed results with explanations
- Turkish interface support
- localStorage persistence

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment to Vercel

1. Connect your GitHub repository to Vercel
2. Set the following build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist/spa`
   - Install Command: `npm install`

The `vercel.json` configuration handles SPA routing automatically.

## Project Structure

- `/client` - React frontend application
- `/shared` - Shared TypeScript types
- `/public/data` - Mock exam question datasets
- `/server` - Express server (development only)

## Mock Exams

- **Mock Exam 1**: Complete 120 questions
- **Mock Exam 2**: Complete 120 questions  
- **Mock Exam 3**: Complete 120 questions
- **Mock Exam 4**: Coming soon
- **Mock Exam 5**: Coming soon
