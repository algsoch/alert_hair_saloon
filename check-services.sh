#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "═══════════════════════════════════════════════════════"
echo -e "${BLUE}  🔍 Vicky Salon - Service Status Check${NC}"
echo "═══════════════════════════════════════════════════════"
echo ""

# Check Backend
echo -e "${YELLOW}1️⃣  Checking Backend (Port 8080)...${NC}"
if lsof -i :8080 >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Backend is RUNNING${NC}"
    echo ""
    echo "   Testing health endpoint..."
    HEALTH=$(curl -s http://localhost:8080/api/health 2>/dev/null)
    if [ ! -z "$HEALTH" ]; then
        echo -e "   ${GREEN}Response: $HEALTH${NC}"
    fi
    BACKEND_OK=1
else
    echo -e "${RED}   ❌ Backend is NOT running${NC}"
    echo -e "   ${YELLOW}Start with: cd backend && mvn spring-boot:run${NC}"
fi
echo ""

# Check Frontend
echo -e "${YELLOW}2️⃣  Checking Frontend (Port 3000)...${NC}"
if lsof -i :3000 >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Frontend is RUNNING${NC}"
    echo -e "   ${GREEN}Open: http://localhost:3000${NC}"
    FRONTEND_OK=1
else
    echo -e "${RED}   ❌ Frontend is NOT running${NC}"
    echo -e "   ${YELLOW}Start with: cd frontend && npm start${NC}"
fi
echo ""

# Summary
echo "═══════════════════════════════════════════════════════"
if [ ! -z "$BACKEND_OK" ] && [ ! -z "$FRONTEND_OK" ]; then
    echo -e "${GREEN}🎉 All Systems Running!${NC}"
    echo ""
    echo "   📱 Frontend: http://localhost:3000"
    echo "   ⚙️  Backend:  http://localhost:8080/api/health"
    echo ""
    echo "   Ready to test! Click 'Notify Barber' button."
elif [ ! -z "$BACKEND_OK" ] || [ ! -z "$FRONTEND_OK" ]; then
    echo -e "${YELLOW}⚠️  Partial System Running${NC}"
    echo ""
    [ -z "$BACKEND_OK" ] && echo "   ❌ Backend needs to be started"
    [ -z "$FRONTEND_OK" ] && echo "   ❌ Frontend needs to be started"
else
    echo -e "${RED}❌ No Services Running${NC}"
    echo ""
    echo "   Start services in two terminals:"
    echo "   Terminal 1: cd backend && mvn spring-boot:run"
    echo "   Terminal 2: cd frontend && npm start"
fi
echo "═══════════════════════════════════════════════════════"
echo ""
