#!/bin/bash

# Print project structure
echo "📁 Vicky Hair Salon - QR Alert System Project Structure"
echo "=========================================================="
echo ""
echo "Root Directory:"
tree -L 3 -I 'node_modules|target|.git' --dirsfirst
echo ""
echo "✅ Project created successfully!"
echo ""
echo "📚 Documentation Files:"
echo "  - README.md          - Complete documentation"
echo "  - QUICKSTART.md      - Quick start guide"
echo "  - ARCHITECTURE.md    - System architecture"
echo ""
echo "🚀 Next Steps:"
echo "  1. cd backend && mvn spring-boot:run"
echo "  2. cd frontend && npm install && npm start"
echo "  3. Open http://localhost:3000"
echo ""
