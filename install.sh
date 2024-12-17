#!/bin/bash

GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

# Function to create .env file
create_env_file() {
  server_side=${1-backend}
  touch .env
  if [ "$server_side" == "backend" ]; then
    for i in "${!env_backend_array[@]}"; do
      if [ -z "${value_backend_array[i]}" ]; then
        if [ "${env_backend_array[i]}" == "MAILER_PASS" ]; then
          read -sp "${text_backend_array[$i]}: " value
          echo ""
        else
          read -p "${text_backend_array[$i]}: " value
        fi
        echo "${env_backend_array[$i]}=$value" >> .env
      else
        echo "${env_backend_array[$i]}=${value_backend_array[$i]}" >> .env
      fi
    done
  else
    for i in "${!env_frontend_array[@]}"; do
      if [ -z "${value_frontend_array[i]}" ]; then
        read -p "${text_frontend_array[$i]}: " value
        echo "${env_frontend_array[$i]}=$value" >> .env
      else
        echo "${env_frontend_array[$i]}=${value_frontend_array[$i]}" >> .env
      fi
    done
  fi
}

# Arrays for environment variables and their descriptions
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
value_backend_array=("3000" "" "" "" "http://localhost:5173/" "" "" "" "" "" "" "")

env_frontend_array=("VITE_API_URL" "VITE_IMG_URL" "VITE_BASE_URL")
text_frontend_array=(
  "API URL"
  "Image URL"
  "Base URL"
)
value_frontend_array=("http://localhost:3000/api/" "http://localhost:3000/images/" "http://localhost:5173/")

# Welcome message
echo "Welcome to the installation script"
echo "This script will guide you through the installation process"
echo ""
echo "Please make sure you have the following installed:"
echo -e "${CYAN}1. Node.js${NC}"
echo -e "${CYAN}2. NPM${NC}"
echo -e "${CYAN}3. MongoDB${NC}"
echo -e "${CYAN}4. Git${NC}"

# Check for required installations
read -p "Do you have the above installed? (y/n): " installed
if [ "$installed" == "n" ]; then
  echo "Please install the above and try again"
  exit 1
fi

# Ask for project directory name
echo ""
read -p "Enter the name of the project directory: " project_name

# Clone the Git repository
echo ""
echo "Cloning the repository..."
echo ""
git clone "https://github.com/NamelessProj/GamesLock.git" "$project_name"
cd "$project_name" || exit

# Create .env files
echo ""
echo ""
echo -e "${CYAN}Creating .env file for backend...${NC}"
echo ""
cd backend || exit
create_env_file
echo ""
echo ""

npm install
cd ..

echo ""
echo ""
echo -e "${CYAN}Creating .env file for frontend...${NC}"
echo ""
cd frontend || exit
create_env_file "frontend"
echo ""
echo ""

npm install
cd ..

echo ""
echo ""

echo "Installation completed successfully."
echo "You can now start the server by running the following commands:"
echo -e "${GREEN}cd $project_name/backend${NC}"
echo -e "${GREEN}npm start${NC}"
echo -e "${GREEN}cd $project_name/frontend${NC}"
echo -e "${GREEN}npm run dev${NC}"

echo ""

echo -e "You will have access to the application at ${GREEN}http://localhost:5173${NC}"
echo ""
read -p "The installation is now finished. (Enter to close)" init_end

exit 0