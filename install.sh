#!/bin/bash

GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to create .env file
create_env_file() {
  local -n env_array=$1
  local -n text_array=$2
  local -n value_array=$3

  touch .env

  for i in "${!env_array[@]}"; do
    if [ -z "${value_array[i]}" ]; then
      while true; do
        if [[ "${env_array[i]}" == *"_PASS" ]]; then
          read -sp "${text_array[$i]}: " value
          echo ""
        else
          read -p "${text_array[$i]}: " value
        fi
        if [ -n "${value}" ]; then
            break
        fi
      done
    else
      read -r -p "$(echo -e "${text_array[$i]} ${GREEN}(default: ${value_array[i]})${NC}: ")" value
      value=${value:-${value_array[i]}}
    fi
    echo "${env_array[$i]}=$value" >> .env
  done
}

# Arrays for backend environment variables, their descriptions and their default values
env_backend_array=("PORT" "NODE_ENV" "DATABASE_URI" "JWT_SECRET" "FRONTEND_URL" "MAILER_HOST" "MAILER_PORT" "MAILER_SECURE" "MAILER_PASS" "MAILER_USER" "MAILER_DEV_EMAIL" "ADMIN_EMAIL")
text_backend_array=(
  "Port number for the server"
  "Node environment (dev/prod)"
  "Database URI"
  "JWT secret"
  "Frontend URL"
  "Mailer host (smtp)"
  "Mailer port (25/465/587)"
  "Mailer secure (true/false)"
  "Mailer password"
  "Mailer user (email)"
  "Mailer dev email (email)"
  "Admin email (email)"
)
value_backend_array=("3000" "dev" "" "" "http://localhost:5173/" "smtp.gmail.com" "465" "true" "" "" "" "")

# Arrays for frontend environment variables, their descriptions and their default values
env_frontend_array=("VITE_BACKEND_URL" "VITE_API_URL" "VITE_IMG_URL")
text_frontend_array=(
  "Backend URL"
  "API URL"
  "Image URL"
)
value_frontend_array=("http://localhost:3000" "\$VITE_BACKEND_URL/api/" "\$VITE_BACKEND_URL/images/")

current_dir=$(pwd)

# Welcome message
echo "Welcome to the installation script for GamesLock"
echo "This script will guide you through the installation process"
echo ""
echo -e "\e]8;;https://github.com/NamelessProj/GamesLock/blob/master/README.md\a${YELLOW}Before you start, please read the README file (hold   Ctrl. while clicking this line)${NC}\e]8;;\a"
echo ""
echo "Please make sure you have the following installed:"
echo -e "1. ${CYAN}Node.js${NC}"
echo -e "2. ${CYAN}NPM${NC}"
echo -e "3. ${CYAN}MongoDB${NC}"
echo -e "4. ${CYAN}Git${NC}"

# Check for required installations
read -p "Do you have the above installed? (y/n): " installed
if [ "$installed" == "n" ]; then
  read -r -p "$(echo -e "${RED}Please install the above and try again.${NC} ${GREEN}(Enter to close)${NC}")" not_installed_end
  exit 1
fi

# Ask if user sure to installed the project here
echo ""
echo -e "Current location: ${GREEN}$current_dir${NC}"
read -r -p "$(echo -e "Are you sure to installed the project here ${GREEN}(y/n)${NC}: ")" ready_for_installation
if [ "$ready_for_installation" == "n" ]; then
  read -r -p "$(echo -e "${RED}Please put this script at the root of where you want the project to be.${NC} ${GREEN}(Enter to close)${NC}")" not_installed_end
  exit 1
fi

# Ask for project directory name
echo ""
default_project_name="GamesLock"
read -r -p "$(echo -e "Enter the name of the project directory ${GREEN}(default: ${default_project_name})${NC}: ")" project_name
project_name=${project_name:-$default_project_name}

# Clone the Git repository
echo ""
echo "Cloning the repository..."
echo ""
git clone "https://github.com/NamelessProj/GamesLock.git" "$project_name"
cd "$project_name" || exit

# Create backend .env files
echo ""
echo ""
echo -e "${CYAN}Creating .env file for backend...${NC}"
echo ""
cd backend || exit
create_env_file env_backend_array text_backend_array value_backend_array
echo ""
echo -e "${CYAN}Installing backend dependencies...${NC}"
echo ""
npm install
cd ..

# Create frontend .env files
echo ""
echo ""
echo -e "${CYAN}Creating .env file for frontend...${NC}"
echo ""
cd frontend || exit
create_env_file env_frontend_array text_frontend_array value_frontend_array
echo ""
echo -e "${CYAN}Installing frontend dependencies...${NC}"
echo ""
npm install
cd ..

echo ""
echo ""

# Installation completed
echo "Installation completed successfully."
echo "You can now start the server by running the following commands:"
echo ""
echo -e "${GREEN}cd $project_name/backend${NC}"
echo -e "${GREEN}npm start${NC}"
echo -e "${GREEN}cd $project_name/frontend${NC}"
echo -e "${GREEN}npm run dev${NC}"
echo ""
echo ""

# Final message
echo -e "You will have access to the application at ${GREEN}http://localhost:5173${NC}"
echo -e "${RED}Unless you have put your own address${NC}"
echo ""
echo ""
echo -e "${RED}The installation is now finished.${NC}"
read -r -p "$(echo -e "${RED}When closing, the installation file will be deleted.${NC} ${GREEN}(Enter to close)${NC}")" init_end

# Delete the installer script
rm -- "$0"

exit 0